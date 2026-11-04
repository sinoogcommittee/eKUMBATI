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
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Constituent Assistance', 'Serbisyo sa Katawhan')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mt-2">
              {t('7 Flagship Programs & Advocacies', '7 ka mga Nag-unang Programa ug Adbokasiya')}
            </h1>
            <p className="text-base text-slate-600 mt-3 leading-relaxed font-normal">
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
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 shrink-0 pr-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('Category', 'Kategoriya')}:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 border ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-subtle'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat === 'All'
                ? t('All 7 Programs', 'Tanan nga 7 ka Programa')
                : cat}
            </button>
          ))}
        </div>

        {/* 7 Programs Detailed Cards */}
        <div className="space-y-8">
          {filteredPrograms.map((prog, index) => {
            const badgeVariant = getCategoryBadgeVariant(prog.category);

            return (
              <div
                key={prog.id}
                id={prog.slug}
                className="bg-white rounded-xl border border-slate-200/80 shadow-card overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
                  {/* Left Column: Image with Category Tag */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative h-64 sm:h-72 w-full rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={prog.cover_image_url}
                        alt={prog.title_en}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant={badgeVariant} size="sm" dot>
                          {prog.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-0.5 rounded bg-black/70 text-white font-mono text-[11px] font-medium">
                          #{index + 1} Flagship
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title, Full Description & Requirements Checklist */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
                        {t(prog.title_en, prog.title_ceb)}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-orange-600 mt-1">
                        {t(prog.summary_en, prog.summary_ceb)}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {t(prog.full_description_en, prog.full_description_ceb)}
                    </p>

                    {/* Requirements Checklist Box */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span>{t('Required Documents Checklist', 'Listahan sa mga Kinahanglanong Dokumento')}</span>
                        </div>
                        <button
                          onClick={() => setActiveModalProgram(prog)}
                          className="text-[11px] font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
                        >
                          <span>{t('Full Guidelines', 'Tibuok Giya')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {prog.requirements_en.map((req, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2 rounded-md border border-slate-200/60"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{t(req, prog.requirements_ceb[rIdx] || req)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-2.5">
                      <Link to={`/action-center?program=${encodeURIComponent(prog.title_en)}`}>
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
                        className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors inline-flex items-center gap-1.5 bg-white shadow-subtle"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                        <span>{t('Eligibility Details', 'Kwalipikasyon')}</span>
                      </button>

                      {prog.slug === 'patient-transport-vehicles' && (
                        <a
                          href="tel:+639178326284"
                          className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow-subtle transition-colors inline-flex items-center gap-1.5"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{t('Call PTV Dispatch', 'Tawag PTV Dispatch')}</span>
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
        <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-10 border border-slate-800 shadow-card">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-medium text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded border border-orange-500/20">
              {t('Simple 3-Step Process', '3 ka Sayon nga Lakang')}
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-2">
              {t('How to Apply for KUMBATI Programs', 'Unsaon Pag-avail sa mga Programa')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="w-8 h-8 rounded-md bg-orange-500 text-white font-semibold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                {t('Prepare Required Documents', 'Ihanda ang mga Dokumento')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {t(
                  'Obtain your Barangay Indigency Certificate and corresponding proof (doctor prescription, COR for scholars, or land consent).',
                  'Kuhaa ang Barangay Indigency ug uban pang gikinahanglang papeles sama sa reseta o certificate of registration.'
                )}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="w-8 h-8 rounded-md bg-orange-500 text-white font-semibold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                {t('Submit Online or Visit District Office', 'Isumite Online o Bisitaha ang Buhatan')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {t(
                  'Use our online Action Center form to submit digital details, or visit the Candijay headquarters or Jagna Clinic.',
                  'Isumite pinaagi sa online Action Center o personal nga dalha sa District Office sa Candijay o Jagna Clinic.'
                )}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="w-8 h-8 rounded-md bg-orange-500 text-white font-semibold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                {t('Track Reference Code Live', 'Subaya ang Reference Code')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {t(
                  'Follow your application progress in real-time. Congressional caseworkers contact you once assistance is scheduled for turnover.',
                  'Subaya ang dagan sa imong papeles online. Kontakon ka dayon sa buhatan kung andam na ang hinabang.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details Modal */}
      {activeModalProgram && (
        <Modal
          isOpen={Boolean(activeModalProgram)}
          onClose={() => setActiveModalProgram(null)}
          title={t(activeModalProgram.title_en, activeModalProgram.title_ceb)}
          subtitle={t(activeModalProgram.summary_en, activeModalProgram.summary_ceb)}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">
                {t('Program Overview & Legislative Intent', 'Kinatibuk-ang Pagpasabot')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {t(
                  activeModalProgram.full_description_en,
                  activeModalProgram.full_description_ceb
                )}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/80">
              <h4 className="text-xs font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-600" />
                <span>{t('Complete Required Document Checklist', 'Kompletong Rekisitos')}</span>
              </h4>
              <div className="space-y-2">
                {activeModalProgram.requirements_en.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t(req, activeModalProgram.requirements_ceb[idx] || req)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('Print Checklist', 'I-print ang Rekisitos')}</span>
              </button>

              <Link
                to={`/action-center?program=${encodeURIComponent(activeModalProgram.title_en)}`}
                className="w-full sm:w-auto"
                onClick={() => setActiveModalProgram(null)}
              >
                <Button variant="primary" size="md">
                  {t('Proceed to Action Center', 'Padayon sa Pag-apply')}
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
