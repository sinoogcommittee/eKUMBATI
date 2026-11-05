import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { BOHOL_DISTRICT_3_TOWNS, INITIAL_PROGRAMS } from '../../lib/constants';
import {
  ConstituentSubmission,
  SubmissionType,
  SubmissionStatus,
} from '../../types/kumbati.types';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import Badge, { getStatusBadgeVariant } from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { Card, Chip, SearchBar } from '../../components/m3';
import {
  ShieldCheck,
  Send,
  Search,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Phone,
  FileText,
  User,
  Printer,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { triggerHaptic } from '../../lib/haptics';

const LOCAL_STORAGE_SUBMISSIONS_KEY = 'kumbati_constituent_submissions';

export const ActionCenterPage: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') === 'track' ? 'track' : 'submit';
  const prefillProgram = searchParams.get('program') || '';

  // Helper to resolve program name from query parameter (slug, ID, or partial name)
  const resolveProgramName = (param: string): string => {
    if (!param) return INITIAL_PROGRAMS[0]?.title_en || 'Pabahay Socialized Housing';
    const found = INITIAL_PROGRAMS.find(
      (p) =>
        p.slug.toLowerCase() === param.toLowerCase() ||
        p.id.toLowerCase() === param.toLowerCase() ||
        p.title_en.toLowerCase() === param.toLowerCase() ||
        p.title_en.toLowerCase().includes(param.toLowerCase())
    );
    return found ? found.title_en : param;
  };
  const prefillCode = searchParams.get('code') || '';

  const [activeTab, setActiveTab] = useState<'submit' | 'track'>(activeTabParam);

  // Form State
  const [formData, setFormData] = useState({
    type: 'assistance' as SubmissionType,
    full_name: '',
    contact_number: '',
    email: '',
    municipality: BOHOL_DISTRICT_3_TOWNS[4] as string, // Default Candijay
    barangay: '',
    program_category: resolveProgramName(prefillProgram),
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<ConstituentSubmission | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Tracking State
  const [searchCode, setSearchCode] = useState(prefillCode);
  const [isSearching, setIsSearching] = useState(false);
  const [trackedTicket, setTrackedTicket] = useState<ConstituentSubmission | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // If URL has tracking code prefilled, auto-search
  useEffect(() => {
    if (prefillCode) {
      handleTrackTicket(prefillCode);
    }
  }, [prefillCode]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'track' || tabParam === 'submit') {
      setActiveTab(tabParam);
    }
    const progParam = searchParams.get('program');
    if (progParam) {
      const resolved = resolveProgramName(progParam);
      setFormData((prev) => ({
        ...prev,
        program_category: resolved,
      }));
    }
  }, [searchParams]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast(t(`Reference code ${code} copied!`, `Nahi-kopya ang reference code ${code}!`), 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handlePrintSlip = () => {
    triggerHaptic('light');
    window.print();
  };

  // Helper to save to localStorage
  const saveSubmissionToLocalStorage = (ticket: ConstituentSubmission) => {
    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
      const list: ConstituentSubmission[] = existing ? JSON.parse(existing) : [];
      list.unshift(ticket);
      localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(list));
    } catch {
      // Ignore storage errors
    }
  };

  // Helper to read from localStorage
  const findSubmissionInLocalStorage = (code: string): ConstituentSubmission | null => {
    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
      if (!existing) return null;
      const list: ConstituentSubmission[] = JSON.parse(existing);
      return list.find((item) => item.reference_code.toUpperCase() === code.trim().toUpperCase()) || null;
    } catch {
      return null;
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.contact_number || !formData.barangay || !formData.message) {
      alert(t('Please fill in all required fields.', 'Palihug pun-i ang tanan nga gikinahanglanong impormasyon.'));
      return;
    }

    setIsSubmitting(true);

    // Generate unique alphanumeric tracking code: KMB-YYYY-XXXXX
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    const currentYear = Math.max(new Date().getFullYear(), 2027);
    const referenceCode = `KMB-${currentYear}-${randomChars}`;

    const newSubmission: ConstituentSubmission = {
      id: `sub-${Date.now()}`,
      reference_code: referenceCode,
      type: formData.type,
      status: 'pending',
      full_name: formData.full_name,
      contact_number: formData.contact_number,
      email: formData.email || undefined,
      municipality: formData.municipality,
      barangay: formData.barangay,
      subject: formData.subject || `${formData.type.toUpperCase()}: ${formData.program_category}`,
      message: formData.message,
      program_category: formData.program_category,
      created_at: new Date().toISOString(),
    };

    // Save to local storage for instant offline resilience
    saveSubmissionToLocalStorage(newSubmission);

    // If Supabase is connected, attempt remote insert
    if (isSupabaseConfigured) {
      try {
        await supabase.from('constituent_submissions').insert([newSubmission]);
      } catch (err) {
        console.warn('[ActionCenter] Remote insert warning, fallback used:', err);
      }
    }

    setIsSubmitting(false);
    setSubmittedTicket(newSubmission);
    showToast(t('Ticket submitted successfully! Reference code generated.', 'Malampusong nasumiter ang hangyo! Reference code namugna.'), 'success');
  };

  // Track Code Handler
  const handleTrackTicket = async (codeToSearch?: string) => {
    const code = (codeToSearch || searchCode).trim().toUpperCase();
    if (!code) return;

    setIsSearching(true);
    setSearchError(null);
    setTrackedTicket(null);

    // First check localStorage
    const localMatch = findSubmissionInLocalStorage(code);

    if (localMatch) {
      setTrackedTicket(localMatch);
      setIsSearching(false);
      return;
    }

    // Next check Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('constituent_submissions')
          .select('*')
          .eq('reference_code', code)
          .single();

        if (error || !data) {
          throw new Error('Ticket not found in remote records.');
        }

        setTrackedTicket(data as ConstituentSubmission);
        setIsSearching(false);
        return;
      } catch {
        // Fall through to error
      }
    }

    // Default sample for demo preview if code equals 'KMB-2027-DEMO1' or legacy 'KMB-2025-DEMO1'
    if (code === 'KMB-2027-DEMO1' || code === 'KMB-2025-DEMO1') {
      const demoTicket: ConstituentSubmission = {
        id: 'sub-demo-1',
        reference_code: 'KMB-2027-DEMO1',
        type: 'assistance',
        status: 'action_taken',
        full_name: 'Maria Elena Dumadag',
        contact_number: '0917-882-9901',
        municipality: 'Candijay',
        barangay: 'Panadtaran',
        subject: 'Pabahay Application Inspection',
        message: 'Requesting validation of barangay indigency certificate for housing unit.',
        program_category: 'Pabahay',
        admin_notes: 'Endorsed to District Field Engineer for land lot verification. Scheduled visit on Friday.',
        created_at: '2027-02-14T08:30:00Z',
      };
      setTrackedTicket(demoTicket);
      setIsSearching(false);
      return;
    }

    setIsSearching(false);
    setSearchError(
      t(
        `No record found for tracking code "${code}". Please verify your reference code or contact the district office.`,
        `Walay nakit-an nga talaan alang sa code nga "${code}". Palihug susiha ang imong code o tawag sa opisina.`
      )
    );
  };

  const getTimelineSteps = (status: SubmissionStatus) => {
    const stages: { key: SubmissionStatus; labelEn: string; labelCeb: string }[] = [
      { key: 'pending', labelEn: 'Submitted', labelCeb: 'Nadawat' },
      { key: 'in_review', labelEn: 'In Review', labelCeb: 'Gisusi' },
      { key: 'action_taken', labelEn: 'Action Taken', labelCeb: 'Gilihok' },
      { key: 'resolved', labelEn: 'Resolved', labelCeb: 'Nahuman' },
    ];

    const statusWeights: Record<SubmissionStatus, number> = {
      pending: 1,
      in_review: 2,
      action_taken: 3,
      resolved: 4,
      closed: 4,
    };

    const currentWeight = statusWeights[status] || 1;

    return stages.map((st, idx) => ({
      ...st,
      isCompleted: idx + 1 <= currentWeight,
      isCurrent: idx + 1 === currentWeight,
    }));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =====================================================================
          1. ACTION CENTER HERO
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/80 via-amber-50/20 to-transparent pt-10 pb-12 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Digital Constituent Desk', 'Sentro sa Aksyon')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
              {t('Constituent Action Center & Tracker', 'Sentro sa Aksyon ug Reference Tracker')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              {t(
                'Submit an assistance request, program inquiry, or community grievance directly to Congresswoman Alexie Tutor\'s district team. Track your resolution status live using your unique reference code.',
                'Isumite ang imong hangyo sa hinabang, pangutana, o sumbong diretso sa buhatan ni Congw. Alexie Tutor. Subaya ang estado sa imong ticket gamit ang imong Reference Code.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. TWO-TAB INTERFACE: SUBMIT VS TRACK
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center sm:justify-start mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200 max-w-md w-full">
            <button
              onClick={() => {
                setActiveTab('submit');
                setSearchParams({});
              }}
              className={`flex-1 py-3 px-5 rounded-full text-center text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer ${
                activeTab === 'submit'
                  ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{t('Submit Assistance / Query', 'Pagsumite og Hangyo')}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('track');
                setSearchParams({ tab: 'track' });
              }}
              className={`flex-1 py-3 px-5 rounded-full text-center text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer ${
                activeTab === 'track'
                  ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t('Track Existing Code', 'Susiha ang Reference Code')}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SUBMISSION FORM */}
        {activeTab === 'submit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white/98 rounded-3xl border border-orange-200/80 border-t-white p-6 sm:p-10 shadow-sinoog hover:shadow-sinoog-hover transition-all duration-300 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset className="border-0 p-0 m-0">
                  <legend className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                    {t('Submission Type', 'Klase sa Hangyo')} *
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'assistance', labelEn: 'Assistance', labelCeb: 'Hinabang' },
                      { value: 'query', labelEn: 'Inquiry', labelCeb: 'Pangutana' },
                      { value: 'complaint', labelEn: 'Concern / Grievance', labelCeb: 'Sumbong' },
                      { value: 'suggestion', labelEn: 'Commendation', labelCeb: 'Giya / Suhestyon' },
                    ].map((typeOption) => (
                      <Chip
                        key={typeOption.value}
                        variant="filter"
                        selected={formData.type === typeOption.value}
                        onClick={() =>
                          setFormData({ ...formData, type: typeOption.value as SubmissionType })
                        }
                      >
                        {t(typeOption.labelEn, typeOption.labelCeb)}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="action-full-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t('Full Name', 'Tibuok Ngalan')} *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                      <input
                        id="action-full-name"
                        name="full_name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Juan / Maria Dela Cruz"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-orange-200/90 bg-white/95 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-2xs min-h-[44px] transition-all"
                      />
                    </div>
                  </div>

                  {/* Mobile Contact Number */}
                  <div>
                    <label htmlFor="action-contact-number" className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t('Contact Number (Mobile)', 'Numero sa Telepono')} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                      <input
                        id="action-contact-number"
                        name="contact_number"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="0917-xxx-xxxx"
                        value={formData.contact_number}
                        onChange={(e) =>
                          setFormData({ ...formData, contact_number: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-orange-200/90 bg-white/95 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-2xs min-h-[44px] transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Municipality */}
                  <div>
                    <label htmlFor="action-municipality" className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t('Municipality', 'Lungsod')} *
                    </label>
                    <select
                      id="action-municipality"
                      name="municipality"
                      autoComplete="address-level2"
                      value={formData.municipality}
                      onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-orange-200/90 bg-white/95 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-2xs min-h-[44px] transition-all"
                    >
                      {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                        <option key={town} value={town}>
                          {town}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Barangay */}
                  <div>
                    <label htmlFor="action-barangay" className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t('Barangay', 'Barangay')} *
                    </label>
                    <input
                      id="action-barangay"
                      name="barangay"
                      type="text"
                      required
                      autoComplete="address-level3"
                      placeholder="e.g. Poblacion, Panadtaran"
                      value={formData.barangay}
                      onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-orange-200/90 bg-white/95 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-2xs min-h-[44px] transition-all"
                    />
                  </div>

                  {/* Program Category */}
                  <div>
                    <label htmlFor="action-program" className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t('Related Program', 'May Kalabotang Programa')}
                    </label>
                    <select
                      id="action-program"
                      name="program_category"
                      value={formData.program_category}
                      onChange={(e) =>
                        setFormData({ ...formData, program_category: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-orange-200/90 bg-white/95 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-2xs min-h-[44px] transition-all"
                    >
                      {INITIAL_PROGRAMS.map((prog) => (
                        <option key={prog.id} value={prog.title_en}>
                          {prog.title_en}
                        </option>
                      ))}
                      <option value="General District Concern">
                        {t('General Concern / Other', 'Uban pang Tabang')}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="action-subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Subject / Brief Summary', 'Ulohan sa Hangyo')}
                  </label>
                  <input
                    id="action-subject"
                    name="subject"
                    type="text"
                    placeholder={t('e.g. PTV Medical Transit to Tagbilaran Hospital', 'e.g. Sakyanan sa Pasyente paingon sa Tagbilaran')}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-orange-200/90 bg-white/95 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-2xs min-h-[44px] transition-all"
                  />
                </div>

                {/* Message Details */}
                <div>
                  <label htmlFor="action-message" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('Detailed Message & Particulars', 'Detalyadong Mensahe')} *
                  </label>
                  <textarea
                    id="action-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t(
                      'Please detail patient name, hospital destination, date needed, or assistance requirements...',
                      'Isulat ang ngalan sa pasyente, tambalanan, petsa nga gikinahanglan, o detalye sa imong hangyo...'
                    )}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-2xl border border-orange-200/90 bg-white/95 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-2xs min-h-[120px] transition-all"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    {t('Submit to Congressional Desk', 'Isumite sa Buhatan sa Kongreso')}
                  </Button>
                </div>
              </form>
            </div>

            {/* Explanatory Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gradient-to-b from-white via-white/98 to-amber-50/25 rounded-3xl p-6 sm:p-7 border border-orange-200/80 border-t-white shadow-sinoog hover:shadow-sinoog-hover transition-all duration-300 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-sinoog">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {t('What happens after you submit?', 'Unsay mahitabo human sa pagsumite?')}
                </h3>
                <ul className="text-xs text-slate-700 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {t(
                        'You instantly receive a verified Reference Code (e.g. KMB-2027-XXXXX).',
                        'Makadawat ka dayon og opisyal nga Reference Code.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {t(
                        'Caseworkers review your documents within 24–48 hours.',
                        'Susi-on sa mga kawani ang imong papeles sulod sa 24-48 oras.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {t(
                        'For emergency PTV dispatch, staff calls your mobile number immediately.',
                        'Alang sa emerhensiya sa PTV, tawagan ka dayon sa buhatan.'
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Sample Code Quick Search Card */}
              <div className="bg-gradient-to-b from-white via-white/98 to-amber-50/25 rounded-3xl p-6 sm:p-7 border border-orange-200/80 border-t-white shadow-sinoog hover:shadow-sinoog-hover transition-all duration-300 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Demo Preview Code
                </span>
                <p className="text-xs text-slate-600">
                  {t(
                    'Want to see how ticket resolution looks? Try tracking demo code:',
                    'Gusto nimo makita kung unsaon pagsubay? Sulayi kining demo code:'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('track');
                    setSearchCode('KMB-2027-DEMO1');
                    handleTrackTicket('KMB-2027-DEMO1');
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-orange-50 hover:text-orange-600 text-xs font-mono font-bold text-slate-800 transition-all text-center border border-orange-200/80 border-t-white shadow-sinoog-inner hover:shadow-sinoog hover:-translate-y-0.5 cursor-pointer"
                >
                  KMB-2027-DEMO1 &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE REFERENCE CODE TRACKER */}
        {activeTab === 'track' && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Search Box */}
            <search className="bg-white/98 rounded-3xl border border-orange-200/80 border-t-white p-6 sm:p-8 shadow-sinoog hover:shadow-sinoog-hover transition-all duration-300 backdrop-blur-md block">
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {t('Enter Reference Tracking Code', 'Ibutang ang Reference Code')}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {t(
                  'Format: KMB-YYYY-XXXXX (issued during online or physical district submission)',
                  'Pormat: KMB-YYYY-XXXXX (gihatag sa online o sa opisina)'
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div className="flex-1 w-full">
                  <SearchBar
                    label={t('Track Reference Code', 'Subaya ang Reference Code')}
                    placeholder="e.g. KMB-2027-DEMO1"
                    value={searchCode}
                    onValueChange={(val) => setSearchCode(val.toUpperCase())}
                  />
                </div>
                <Button
                  variant="primary"
                  size="md"
                  loading={isSearching}
                  onClick={() => handleTrackTicket()}
                  className="shrink-0 w-full sm:w-auto"
                >
                  {t('Track Status', 'Subaya ang Estado')}
                </Button>
              </div>

              {searchError && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{searchError}</span>
                </div>
              )}
            </search>

            {/* Tracked Ticket Resolution Timeline & Card */}
            {trackedTicket && (
              <Card variant="filled" className="space-y-8 p-6 sm:p-10">
                {/* Header: Code & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      {t('Official Tracking Slip', 'Opisyal nga Resibo')}
                    </span>
                    <div className="text-2xl font-black font-mono text-orange-600 mt-0.5">
                      {trackedTicket.reference_code}
                    </div>
                  </div>

                  <Badge variant={getStatusBadgeVariant(trackedTicket.status)} size="md" dot>
                    {trackedTicket.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Progress Tracker Stepper */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
                    {t('Resolution Progress Timeline', 'Dagan sa Pagsusi')}
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {getTimelineSteps(trackedTicket.status).map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                            step.isCompleted
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {step.isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[11px] font-bold leading-tight ${
                            step.isCompleted ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {t(step.labelEn, step.labelCeb)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white p-5 rounded-2xl border border-orange-200/80 border-t-white shadow-sinoog-inner">
                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">
                      {t('Beneficiary Name', 'Ngalan sa Benepisyaryo')}
                    </strong>
                    <span className="text-slate-800 font-bold text-sm">
                      {trackedTicket.full_name}
                    </span>
                  </div>

                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">
                      {t('Municipality & Barangay', 'Lungsod ug Barangay')}
                    </strong>
                    <span className="text-slate-800 font-bold text-sm">
                      {trackedTicket.barangay}, {trackedTicket.municipality}
                    </span>
                  </div>

                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">
                      {t('Program Category', 'Programa')}
                    </strong>
                    <span className="text-slate-800 font-bold">
                      {trackedTicket.program_category || 'General Assistance'}
                    </span>
                  </div>

                  <div>
                    <strong className="text-slate-400 uppercase text-[10px] block">
                      {t('Date Filed', 'Petsa sa Pagsumite')}
                    </strong>
                    <span className="text-slate-800 font-bold">
                      {new Date(trackedTicket.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Case Notes / Remarks from Congressional Staff */}
                {trackedTicket.admin_notes && (
                  <div className="p-5 rounded-2xl bg-white border border-orange-200/80 border-t-white shadow-sinoog-inner">
                    <div className="text-xs font-black uppercase tracking-wider text-orange-950 mb-1 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-orange-600" />
                      <span>{t('Staff Case Remarks & Next Steps', 'Mensahe gikan sa Buhatan')}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {trackedTicket.admin_notes}
                    </p>
                  </div>
                )}

                {/* Card Action Controls: Copy Code & Print Official Endorsement Slip */}
                <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleCopyCode(trackedTicket.reference_code)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t('Copy Code', 'Kopyaha ang Code')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintSlip}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-sinoog hover:shadow-sinoog-hover cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t('Print Official Slip', 'I-print ang Resibo')}</span>
                  </button>
                </div>
              </Card>
            )}
          </div>
        )}
      </section>

      {/* =====================================================================
          3. SUCCESSFUL SUBMISSION RECEIPT MODAL
         ===================================================================== */}
      {submittedTicket && (
        <Modal
          isOpen={Boolean(submittedTicket)}
          onClose={() => setSubmittedTicket(null)}
          maxWidth="md"
          title={t('Submission Successfully Logged', 'Malamposong Napadala ang Imong Hangyo')}
          subtitle={t(
            'Keep your reference tracking code safe for future follow-ups.',
            'Tipigi kini nga reference code alang sa pagsusi sa imong ticket.'
          )}
        >
          <div className="space-y-6 text-center">
            {/* Stamp Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            {/* Generated Code Box */}
            <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200">
              <div className="text-xs font-bold uppercase tracking-wider text-orange-900 mb-1">
                {t('Your Reference Tracking Code', 'Imong Reference Tracking Code')}
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-orange-600 my-2">
                {submittedTicket.reference_code}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleCopyCode(submittedTicket.reference_code)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-orange-200 text-xs font-bold text-slate-700 hover:bg-orange-100 transition-colors shadow-2xs cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('Copied to Clipboard!', 'Nahi-kopya na!')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('Copy Reference Code', 'Kopyaha ang Code')}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-sinoog hover:shadow-sinoog-hover cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('Print Official Slip', 'I-print ang Resibo')}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {t(
                'A caseworker from the district office will review your request. For urgent medical transit (PTV), you may also call the 24/7 hotline at 0917-832-6284.',
                'Susi-on kini sa mga kawani. Alang sa dinaliang sakyanan sa pasyente, mahimo sab kang motawag sa 0917-832-6284.'
              )}
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const code = submittedTicket.reference_code;
                  setSubmittedTicket(null);
                  setActiveTab('track');
                  setSearchCode(code);
                  handleTrackTicket(code);
                }}
                className="w-full"
              >
                {t('Track This Ticket Now', 'Subaya Kini nga Ticket')}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================================
          4. PRINTABLE OFFICIAL CONSTITUENT ENDORSEMENT SLIP (@media print)
         ===================================================================== */}
      {(submittedTicket || trackedTicket) && (
        <div className="hidden print:block printable-document text-slate-900 bg-white p-8 border-2 border-slate-900 rounded-none max-w-3xl mx-auto my-0">
          {(() => {
            const ticket = submittedTicket || trackedTicket!;
            return (
              <div className="space-y-6">
                {/* Official House Header */}
                <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                  <div className="text-[11px] font-bold tracking-widest uppercase text-slate-600">
                    Republic of the Philippines • House of Representatives
                  </div>
                  <h1 className="text-xl font-black uppercase tracking-wider text-slate-900">
                    Office of Congresswoman Kristine Alexie Besas Tutor
                  </h1>
                  <div className="text-xs font-semibold text-slate-700">
                    3rd Congressional District of Bohol • District Headquarters: Poblacion, Candijay, Bohol
                  </div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 pt-1">
                    Constituent Action Center & Case Management System
                  </div>
                </div>

                {/* Slip Title & Verification Badge */}
                <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                  <div>
                    <h2 className="text-base font-black uppercase text-slate-900">
                      Official Constituent Assistance Endorsement Slip
                    </h2>
                    <p className="text-xs text-slate-600">
                      Serbisyo Diretso sa Katawhan: Padayon ang Kumbati!
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-slate-900 text-white font-mono text-xs font-black uppercase tracking-wider">
                      {ticket.status.toUpperCase().replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Reference Code & Filing Timestamp Box */}
                <div className="bg-slate-50 border border-slate-400 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">
                      Official Reference Tracking Number
                    </div>
                    <div className="text-2xl font-black font-mono tracking-wider text-slate-900">
                      {ticket.reference_code}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-slate-500 font-bold uppercase text-[10px]">Date Filed</div>
                    <div className="font-bold text-slate-800">
                      {new Date(ticket.created_at).toLocaleDateString()} {new Date(ticket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {/* Constituent & Request Summary Grid */}
                <table className="w-full text-xs border border-slate-300 border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="w-1/3 p-2.5 font-bold uppercase text-slate-600 bg-slate-50 border-r border-slate-200">
                        Beneficiary Name
                      </td>
                      <td className="p-2.5 font-bold text-slate-900 text-sm">
                        {ticket.full_name}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold uppercase text-slate-600 bg-slate-50 border-r border-slate-200">
                        Contact Number
                      </td>
                      <td className="p-2.5 font-mono font-bold text-slate-900">
                        {ticket.contact_number}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold uppercase text-slate-600 bg-slate-50 border-r border-slate-200">
                        Municipality & Barangay
                      </td>
                      <td className="p-2.5 font-bold text-slate-900">
                        Barangay {ticket.barangay}, {ticket.municipality}, Bohol
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold uppercase text-slate-600 bg-slate-50 border-r border-slate-200">
                        Program Category
                      </td>
                      <td className="p-2.5 font-bold text-slate-900">
                        {ticket.program_category || 'Constituent Assistance'}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="p-2.5 font-bold uppercase text-slate-600 bg-slate-50 border-r border-slate-200">
                        Subject / Request
                      </td>
                      <td className="p-2.5 font-semibold text-slate-800">
                        {ticket.subject}
                      </td>
                    </tr>
                    {ticket.message && (
                      <tr className="border-b border-slate-200">
                        <td className="p-2.5 font-bold uppercase text-slate-600 bg-slate-50 border-r border-slate-200">
                          Constituent Narrative
                        </td>
                        <td className="p-2.5 text-slate-700 leading-relaxed italic">
                          &ldquo;{ticket.message}&rdquo;
                        </td>
                      </tr>
                    )}
                    {ticket.admin_notes && (
                      <tr>
                        <td className="p-2.5 font-bold uppercase text-slate-600 bg-slate-50 border-r border-slate-200">
                          Caseworker Action Notes
                        </td>
                        <td className="p-2.5 font-semibold text-slate-900">
                          {ticket.admin_notes}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Important Endorsement Instructions */}
                <div className="border border-slate-300 p-3 bg-slate-50 text-[11px] space-y-1">
                  <div className="font-bold uppercase text-slate-800">
                    Important Instructions for Constituent:
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Palihug i-presenta kining opisyal nga endorsement slip uban sa imong Barangay Certificate of Indigency, Valid Government ID, ug Medical Abstract / Hospital Bill / Enrollment Assessment Form ngadto sa imong Municipal Social Welfare Office (MSWDO) o sa Congressional Main Headquarters sa Poblacion, Candijay, Bohol.
                  </p>
                </div>

                {/* Verification Box & Signatures */}
                <div className="pt-6 grid grid-cols-2 gap-8 text-center text-xs">
                  <div className="border-t border-slate-400 pt-2">
                    <div className="font-bold uppercase text-slate-800">Receiving Officer / Caseworker</div>
                    <div className="text-[10px] text-slate-500">Office of Congw. Alexie Besas Tutor</div>
                  </div>
                  <div className="border-t border-slate-400 pt-2">
                    <div className="font-bold uppercase text-slate-800">Official Action Center Stamp</div>
                    <div className="text-[10px] text-slate-500">Bohol 3rd Congressional District</div>
                  </div>
                </div>

                {/* Footer Hotlines */}
                <div className="border-t-2 border-slate-900 pt-3 flex items-center justify-between text-[10px] text-slate-600 font-semibold">
                  <div>Main Office: 0917-832-6284 • PTV 24/7 Dispatch: 0917-832-6284</div>
                  <div>Email: congressmanalexietutor80@gmail.com</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ActionCenterPage;
