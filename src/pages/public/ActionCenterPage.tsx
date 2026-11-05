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
} from 'lucide-react';

const LOCAL_STORAGE_SUBMISSIONS_KEY = 'kumbati_constituent_submissions';

export const ActionCenterPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab') === 'track' ? 'track' : 'submit';
  const prefillProgram = searchParams.get('program') || '';
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
    program_category: prefillProgram ? prefillProgram : 'Pabahay ni Kumbati',
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
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
        subject: 'Pabahay ni Kumbati Application Inspection',
        message: 'Requesting validation of barangay indigency certificate for housing unit.',
        program_category: 'Pabahay ni Kumbati',
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
            <div className="lg:col-span-8 bg-white/95 rounded-3xl border border-orange-200/80 p-6 sm:p-10 shadow-sinoog backdrop-blur-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                    {t('Submission Type', 'Klase sa Hangyo')} *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: 'assistance', labelEn: 'Assistance', labelCeb: 'Hinabang' },
                      { value: 'query', labelEn: 'Inquiry', labelCeb: 'Pangutana' },
                      { value: 'complaint', labelEn: 'Concern / Grievance', labelCeb: 'Sumbong' },
                      { value: 'suggestion', labelEn: 'Commendation', labelCeb: 'Giya / Suhestyon' },
                    ].map((typeOption) => (
                      <button
                        key={typeOption.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: typeOption.value as SubmissionType })
                        }
                        className={`py-2.5 px-3.5 rounded-full text-xs font-bold transition-all text-center cursor-pointer ${
                          formData.type === typeOption.value
                            ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sinoog font-black'
                            : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-orange-50/50 shadow-2xs'
                        }`}
                      >
                        {t(typeOption.labelEn, typeOption.labelCeb)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Full Name', 'Tibuok Ngalan')} *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Juan / Maria Dela Cruz"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Mobile Contact Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Contact Number (Mobile)', 'Numero sa Telepono')} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="0917-xxx-xxxx"
                        value={formData.contact_number}
                        onChange={(e) =>
                          setFormData({ ...formData, contact_number: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Municipality */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Municipality', 'Lungsod')} *
                    </label>
                    <select
                      value={formData.municipality}
                      onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Barangay', 'Barangay')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Poblacion, Panadtaran"
                      value={formData.barangay}
                      onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Program Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('Related Program', 'May Kalabotang Programa')}
                    </label>
                    <select
                      value={formData.program_category}
                      onChange={(e) =>
                        setFormData({ ...formData, program_category: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('Subject / Brief Summary', 'Ulohan sa Hangyo')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('e.g. PTV Medical Transit to Tagbilaran Hospital', 'e.g. Sakyanan sa Pasyente paingon sa Tagbilaran')}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Message Details */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('Detailed Message & Particulars', 'Detalyadong Mensahe')} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t(
                      'Please detail patient name, hospital destination, date needed, or assistance requirements...',
                      'Isulat ang ngalan sa pasyente, tambalanan, petsa nga gikinahanglan, o detalye sa imong hangyo...'
                    )}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              <div className="bg-orange-50/80 rounded-3xl p-6 sm:p-7 border border-orange-200/80 shadow-sinoog space-y-3">
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
              <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-orange-200/70 shadow-sinoog space-y-3">
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
                  className="w-full py-2.5 px-4 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-xs font-mono font-bold text-slate-800 transition-all text-center border border-slate-200 shadow-2xs cursor-pointer"
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
            <div className="bg-white/95 rounded-3xl border border-orange-200/80 p-6 sm:p-8 shadow-sinoog backdrop-blur-md">
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {t('Enter Reference Tracking Code', 'Ibutang ang Reference Code')}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {t(
                  'Format: KMB-YYYY-XXXXX (issued during online or physical district submission)',
                  'Pormat: KMB-YYYY-XXXXX (gihatag sa online o sa opisina)'
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. KMB-2027-DEMO1"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                    className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 text-sm font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
                  />
                </div>
                <Button
                  variant="primary"
                  size="md"
                  loading={isSearching}
                  onClick={() => handleTrackTicket()}
                  className="shrink-0"
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
            </div>

            {/* Tracked Ticket Resolution Timeline & Card */}
            {trackedTicket && (
              <div className="bg-white/95 rounded-3xl border border-orange-200/80 p-6 sm:p-10 shadow-sinoog space-y-8 backdrop-blur-md">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-100">
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
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
                    <div className="text-xs font-black uppercase tracking-wider text-orange-950 mb-1 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-orange-600" />
                      <span>{t('Staff Case Remarks & Next Steps', 'Mensahe gikan sa Buhatan')}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {trackedTicket.admin_notes}
                    </p>
                  </div>
                )}
              </div>
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
              <button
                type="button"
                onClick={() => handleCopyCode(submittedTicket.reference_code)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-orange-200 text-xs font-bold text-slate-700 hover:bg-orange-100 transition-colors shadow-2xs"
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
    </div>
  );
};

export default ActionCenterPage;
