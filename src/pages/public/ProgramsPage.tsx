import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_PROGRAMS } from '../../lib/constants';
import { ProgramAdvocacy, ProgramCategory } from '../../types/kumbati.types';
import Badge, { getCategoryBadgeVariant } from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import {
  FileText,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Filter,
  PhoneCall,
  Printer,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | 'All'>('All');
  const [activeModalProgram, setActiveModalProgram] = useState<ProgramAdvocacy | null>(null);

  const categories: (ProgramCategory | 'All')[] = [
    'All',
    'Health',
    'Housing',
    'Education',
    'Livelihood',
    'Community',
  ];

  const filteredPrograms = INITIAL_PROGRAMS.filter((prog) => {
    if (selectedCategory === 'All') return true;
    return prog.category === selectedCategory;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* =====================================================================
          1. PROGRAMS HERO BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/80 via-amber-50/20 to-transparent pt-10 pb-12 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Constituent Assistance', 'Serbisyo sa Katawhan')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
              {t('7 Flagship Programs & Advocacies', '7 ka mga Nag-unang Programa ug Adbokasiya')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              {t(
                'Comprehensive guidelines, eligibility criteria, and step-by-step document requirements for the 7 official KUMBATI assistance programs in Bohol District 3.',
                'Kompletong giya, rekisitos, ug pamaagi sa pag-apply sa 7 ka opisyal nga programa sa KUMBATI alang sa mga lumulupyo sa Ikatulong Distrito.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CATEGORY FILTERS & PROGRAMS LIST
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 pr-2">
            <Filter className="w-3.5 h-3.5 text-orange-600" />
            <span>{t('Category', 'Kategoriya')}:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-kumbati scale-102 font-black'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              {cat === 'All'
                ? t('All 7 Programs', 'Tanan nga 7 ka Programa')
                : cat}
            </button>
          ))}
        </div>

        {/* 7 Programs Detailed Cards */}
        <div className="space-y-12">
          {filteredPrograms.map((prog, index) => {
            const badgeVariant = getCategoryBadgeVariant(prog.category);

            return (
              <div
                key={prog.id}
                id={prog.slug}
                className="bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-kumbati-hover transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                  {/* Left Column: Image with Category Tag */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                      <img
                        src={prog.cover_image_url}
                        alt={prog.title_en}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant={badgeVariant} size="sm" dot>
                          {prog.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 rounded-lg bg-black/70 text-white font-mono text-xs font-bold">
                          #{index + 1} Flagship
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title, Full Description & Requirements Checklist */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                        {t(prog.title_en, prog.title_ceb)}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-orange-600 mt-1">
                        {t(prog.summary_en, prog.summary_ceb)}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {t(prog.full_description_en, prog.full_description_ceb)}
                    </p>

                    {/* Requirements Checklist Box */}
                    <div className="bg-orange-50/70 rounded-2xl p-4 sm:p-5 border border-orange-100 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-black uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-orange-600" />
                          <span>{t('Required Documents Checklist', 'Listahan sa mga Kinahanglanong Dokumento')}</span>
                        </div>
                        <button
                          onClick={() => setActiveModalProgram(prog)}
                          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 underline flex items-center gap-1"
                        >
                          <span>{t('Print / Full View', 'I-print / Tan-awa')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {prog.requirements_en.map((req, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 bg-white/80 p-2 rounded-xl border border-orange-100/60"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{t(req, prog.requirements_ceb[rIdx] || req)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Link to={`/action-center?program=${prog.slug}`}>
                        <Button
                          variant="primary"
                          size="md"
                          icon={<ShieldCheck className="w-4 h-4" />}
                        >
                          {t('Apply / Inquire at Action Center', 'Pag-apply sa Sentro sa Aksyon')}
                        </Button>
                      </Link>

                      <button
                        onClick={() => setActiveModalProgram(prog)}
                        className="px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-4 h-4 text-orange-500" />
                        <span>{t('Eligibility Details', 'Kwalipikasyon')}</span>
                      </button>

                      {prog.slug === 'patient-transport-vehicles' && (
                        <a
                          href="tel:+639178326284"
                          className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-colors inline-flex items-center gap-1.5"
                        >
                          <PhoneCall className="w-4 h-4 animate-bounce" />
                          <span>{t('Call PTV: 0917-832-6284', 'Tawag PTV: 0917-832-6284')}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. HOW TO AVAIL: 3-STEP CONSTITUENT GUIDE
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              {t('Simple 3-Step Process', '3 ka Sayon nga Lakang')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              {t('How to Apply for KUMBATI Programs', 'Unsaon Pag-avail sa mga Programa')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {t('Prepare Required Documents', 'Ihanda ang mga Dokumento')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'Obtain your Barangay Indigency Certificate and corresponding proof (doctor prescription, COR for scholars, or land consent).',
                  'Kuhaa ang Barangay Indigency ug uban pang gikinahanglang papeles sama sa reseta o certificate of registration.'
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {t('Submit Online or Visit District Office', 'Isumite Online o Bisitaha ang Buhatan')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'Use our online Action Center form to submit digital photos of requirements, or visit the Candijay headquarters or Jagna Clinic.',
                  'Isumite pinaagi sa online Action Center o personal nga dalha sa District Office sa Candijay o Jagna Clinic.'
                )}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {t('Track Your Reference Code', 'Subaya ang Reference Code')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'Receive a unique tracking code (e.g., KMB-2025-XXXXX) to check real-time approval status and payout schedules.',
                  'Dawata ang imong tracking code aron masubay kung naaprobahan na ug kanus-a ang pagdawat sa hinabang.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. PROGRAM REQUIREMENTS MODAL
         ===================================================================== */}
      {activeModalProgram && (
        <Modal
          isOpen={Boolean(activeModalProgram)}
          onClose={() => setActiveModalProgram(null)}
          maxWidth="lg"
          title={t(activeModalProgram.title_en, activeModalProgram.title_ceb)}
          subtitle={t(
            'Official Checklist & Guidelines • Office of Congw. Alexie Tutor',
            'Opisyal nga Listahan sa mga Dokumento • Buhatan ni Congw. Alexie Tutor'
          )}
        >
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
              <div className="text-xs font-bold text-orange-950 uppercase tracking-wider mb-1">
                {t('Program Summary', 'Katingbanan')}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {t(activeModalProgram.summary_en, activeModalProgram.summary_ceb)}
              </p>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-600" />
                <span>{t('Mandatory Document Checklist', 'Gikinahanglang mga Papeles')}</span>
              </div>
              <div className="space-y-2">
                {activeModalProgram.requirements_en.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t(req, activeModalProgram.requirements_ceb[idx] || req)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t('Print Checklist', 'I-print')}</span>
              </button>

              <Link
                to={`/action-center?program=${activeModalProgram.slug}`}
                onClick={() => setActiveModalProgram(null)}
              >
                <Button variant="primary" size="sm" icon={<ChevronRight className="w-3.5 h-3.5" />} iconPosition="right">
                  {t('Proceed to Application', 'Ipadayon ang Pag-apply')}
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProgramsPage;
