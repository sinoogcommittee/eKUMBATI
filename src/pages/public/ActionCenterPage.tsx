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
    setIsSubmitting(true);

    // Generate compliant tracking code: KMB-YYYY-XXXXX
    const year = new Date().getFullYear();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomPart = '';
    for (let i = 0; i < 5; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const referenceCode = `KMB-${year}-${randomPart}`;

    const newTicket: ConstituentSubmission = {
      id: `sub-${Date.now()}`,
      reference_code: referenceCode,
      type: formData.type,
      status: 'pending',
      full_name: formData.full_name.trim(),
      contact_number: formData.contact_number.trim(),
      email: formData.email.trim() || undefined,
      municipality: formData.municipality,
      barangay: formData.barangay.trim(),
      subject: formData.subject.trim() || `${formData.type.toUpperCase()} Request`,
      message: formData.message.trim(),
      program_category: formData.program_category,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('constituent_submissions').insert([
          {
            reference_code: newTicket.reference_code,
            type: newTicket.type,
            status: newTicket.status,
            full_name: newTicket.full_name,
            contact_number: newTicket.contact_number,
            email: newTicket.email,
            municipality: newTicket.municipality,
            barangay: newTicket.barangay,
            subject: newTicket.subject,
            message: newTicket.message,
            program_category: newTicket.program_category,
          },
        ]);

        if (error) {
          throw error;
        }
      } catch {
        // Fall back to localStorage gracefully
      }
    }

    saveSubmissionToLocalStorage(newTicket);
    setSubmittedTicket(newTicket);
    setIsSubmitting(false);

    // Reset Form
    setFormData({
      type: 'assistance',
      full_name: '',
      contact_number: '',
      email: '',
      municipality: BOHOL_DISTRICT_3_TOWNS[4] as string,
      barangay: '',
      program_category: 'Pabahay ni Kumbati',
      subject: '',
      message: '',
    });
  };

  // Track Handler
  const handleTrackTicket = async (overrideCode?: string) => {
    const code = (overrideCode || searchCode).trim().toUpperCase();
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

    // Default sample for demo preview if code equals 'KMB-2025-DEMO1'
    if (code === 'KMB-2025-DEMO1') {
      const demoTicket: ConstituentSubmission = {
        id: 'sub-demo-1',
        reference_code: 'KMB-2025-DEMO1',
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
        created_at: '2025-02-14T08:30:00Z',
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
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* =====================================================================
          1. ACTION CENTER HERO
         ===================================================================== */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Digital Constituent Desk', 'Sentro sa Aksyon')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mt-2">
              {t('Constituent Action Center & Tracker', 'Sentro sa Aksyon ug Reference Tracker')}
            </h1>
            <p className="text-base text-slate-600 mt-3 leading-relaxed font-normal">
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
        <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200/80 mb-8 max-w-md w-full">
          <button
            onClick={() => {
              setActiveTab('submit');
              setSearchParams({});
            }}
            className={`flex-1 py-2 text-center text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'submit'
                ? 'bg-white text-slate-900 shadow-subtle font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('Submit Request', 'Pagsumite og Hangyo')}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('track');
              setSearchParams({ tab: 'track' });
            }}
            className={`flex-1 py-2 text-center text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'track'
                ? 'bg-white text-slate-900 shadow-subtle font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('Track Reference Code', 'Susiha ang Code')}</span>
          </button>
        </div>

        {/* TAB 1: SUBMISSION FORM */}
        {activeTab === 'submit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">
                    {t('Submission Type', 'Klase sa Hangyo')} *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: 'assistance', labelEn: 'Assistance', labelCeb: 'Hinabang' },
                      { value: 'query', labelEn: 'Inquiry', labelCeb: 'Pangutana' },
                      { value: 'complaint', labelEn: 'Grievance', labelCeb: 'Sumbong' },
                      { value: 'suggestion', labelEn: 'Feedback', labelCeb: 'Giya' },
                    ].map((typeOption) => (
                      <button
                        key={typeOption.value}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, type: typeOption.value as SubmissionType })
                        }
                        className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors text-center border ${
                          formData.type === typeOption.value
                            ? 'bg-orange-500 text-white border-orange-600 shadow-subtle'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Full Name', 'Tibuok Ngalan')} *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Juan / Maria Dela Cruz"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                      />
                    </div>
                  </div>

                  {/* Mobile Contact Number */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Contact Number (Mobile)', 'Numero sa Telepono')} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="0917-xxx-xxxx"
                        value={formData.contact_number}
                        onChange={(e) =>
                          setFormData({ ...formData, contact_number: e.target.value })
                        }
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Municipality */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Municipality', 'Lungsod')} *
                    </label>
                    <select
                      value={formData.municipality}
                      onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
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
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Barangay', 'Barangay')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Poblacion, Panadtaran"
                      value={formData.barangay}
                      onChange={(e) => setFormData({ ...formData, barangay: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                    />
                  </div>

                  {/* Program Category */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Related Program', 'May Kalabotang Programa')}
                    </label>
                    <select
                      value={formData.program_category}
                      onChange={(e) =>
                        setFormData({ ...formData, program_category: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('Subject / Brief Summary', 'Ulohan sa Hangyo')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('e.g. PTV Medical Transit to Tagbilaran Hospital', 'e.g. Sakyanan sa Pasyente paingon sa Tagbilaran')}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                  />
                </div>

                {/* Message Details */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('Detailed Message & Particulars', 'Detalyadong Mensahe')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={t(
                      'Please detail patient name, hospital destination, date needed, or assistance requirements...',
                      'Isulat ang ngalan sa pasyente, tambalanan, petsa nga gikinahanglan, o detalye sa imong hangyo...'
                    )}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
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
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {t('What happens after you submit?', 'Unsay mahitabo human sa pagsumite?')}
                </h3>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {t(
                        'You instantly receive a verified Reference Code (e.g. KMB-2026-XXXXX).',
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
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 space-y-2.5 shadow-subtle">
                <span className="text-[11px] font-medium text-slate-500">
                  Demo Preview Code
                </span>
                <p className="text-xs text-slate-600 font-normal">
                  {t(
                    'Want to see how ticket resolution looks? Try tracking demo code:',
                    'Gusto nimo makita kung unsaon pagsubay? Sulayi kining demo code:'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('track');
                    setSearchCode('KMB-2025-DEMO1');
                    handleTrackTicket('KMB-2025-DEMO1');
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-mono font-medium text-slate-800 transition-colors text-center border border-slate-200"
                >
                  KMB-2025-DEMO1 &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE REFERENCE CODE TRACKER */}
        {activeTab === 'track' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Search Box */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 shadow-card">
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                {t('Enter Reference Tracking Code', 'Ibutang ang Reference Code')}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {t(
                  'Format: KMB-YYYY-XXXXX (issued during online or physical district submission)',
                  'Pormat: KMB-YYYY-XXXXX (gihatag sa online o sa opisina)'
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. KMB-2025-DEMO1"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
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
                <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{searchError}</span>
                </div>
              )}
            </div>

            {/* Tracked Ticket Resolution Timeline & Card */}
            {trackedTicket && (
              <div className="bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-6">
                {/* Header: Code & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400">
                      {t('Official Tracking Slip', 'Opisyal nga Resibo')}
                    </span>
                    <div className="text-xl sm:text-2xl font-semibold font-mono text-slate-900 mt-0.5 tabular-nums">
                      {trackedTicket.reference_code}
                    </div>
                  </div>

                  <Badge variant={getStatusBadgeVariant(trackedTicket.status)} size="md" dot>
                    {trackedTicket.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Progress Tracker Stepper */}
                <div>
                  <h4 className="text-xs font-medium text-slate-500 mb-3">
                    {t('Resolution Progress Timeline', 'Dagan sa Pagsusi')}
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {getTimelineSteps(trackedTicket.status).map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs mb-1.5 transition-colors ${
                            step.isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {step.isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[11px] leading-tight ${
                            step.isCompleted ? 'text-slate-900 font-medium' : 'text-slate-400'
                          }`}
                        >
                          {t(step.labelEn, step.labelCeb)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200/60">
                  <div>
                    <strong className="text-slate-400 font-normal text-[11px] block">
                      {t('Beneficiary Name', 'Ngalan sa Benepisyaryo')}
                    </strong>
                    <span className="text-slate-800 font-medium text-xs sm:text-sm">
                      {trackedTicket.full_name}
                    </span>
                  </div>

                  <div>
                    <strong className="text-slate-400 font-normal text-[11px] block">
                      {t('Municipality & Barangay', 'Lungsod ug Barangay')}
                    </strong>
                    <span className="text-slate-800 font-medium text-xs sm:text-sm">
                      {trackedTicket.barangay}, {trackedTicket.municipality}
                    </span>
                  </div>

                  <div>
                    <strong className="text-slate-400 font-normal text-[11px] block">
                      {t('Program Category', 'Programa')}
                    </strong>
                    <span className="text-slate-800 font-medium">
                      {trackedTicket.program_category || 'General Assistance'}
                    </span>
                  </div>

                  <div>
                    <strong className="text-slate-400 font-normal text-[11px] block">
                      {t('Date Filed', 'Petsa sa Pagsumite')}
                    </strong>
                    <span className="text-slate-800 font-medium tabular-nums">
                      {new Date(trackedTicket.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Case Notes / Remarks from Congressional Staff */}
                {trackedTicket.admin_notes && (
                  <div className="p-3.5 rounded-lg bg-orange-50/80 border border-orange-200/80">
                    <div className="text-xs font-semibold text-orange-950 mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-orange-600" />
                      <span>{t('Staff Case Remarks & Next Steps', 'Mensahe gikan sa Buhatan')}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
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
          <div className="space-y-5 text-center">
            {/* Stamp Icon */}
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            {/* Generated Code Box */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-xs font-medium text-slate-600 mb-1">
                {t('Your Reference Tracking Code', 'Imong Reference Tracking Code')}
              </div>
              <div className="text-2xl sm:text-3xl font-semibold font-mono text-slate-900 my-1 tabular-nums">
                {submittedTicket.reference_code}
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(submittedTicket.reference_code)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-subtle"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('Copied to Clipboard', 'Nahi-kopya na')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t('Copy Reference Code', 'Kopyaha ang Code')}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
