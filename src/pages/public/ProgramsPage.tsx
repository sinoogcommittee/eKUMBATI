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
  HelpCircle,
  ShieldCheck,
  Filter,
  Printer,
  ChevronRight,
  ChevronDown,
  Check,
  CheckCircle,
} from 'lucide-react';

const LOCAL_STORAGE_CHECKLIST_KEY = 'kumbati_programs_checklist_progress';

// Who Can Apply: Target Audience Dictionary
const TARGET_AUDIENCE_MAP: Record<string, { icon: string; en: string; ceb: string }> = {
  pabahay: {
    icon: '🏠',
    en: 'Who Can Apply: Indigent Families & Disaster Victims',
    ceb: 'Kinsay Mahimong Mo-apply: Kabus nga Pamilya ug Biktima sa Kalamidad',
  },
  'patient-transport-vehicles': {
    icon: '🚑',
    en: 'Who Can Apply: Emergency & Referral Patients',
    ceb: 'Kinsay Mahimong Mo-apply: Pasyente sa Emerhensiya ug Referral',
  },
  'tambayan-ni-kumbati-dialysis': {
    icon: '🏥',
    en: 'Who Can Apply: Hemodialysis Patients & Watchers',
    ceb: 'Kinsay Mahimong Mo-apply: Pasyente sa Dialysis ug mga Bantay',
  },
  'kumbati-medical-clinic': {
    icon: '💊',
    en: 'Who Can Apply: Individual Constituents, Seniors & PWDs',
    ceb: 'Kinsay Mahimong Mo-apply: Indibidwal nga Katawhan, Senior ug PWD',
  },
  'ched-tdp-scholars': {
    icon: '🎓',
    en: 'Who Can Apply: Enrolled College Students (GWA ≥ 80%)',
    ceb: 'Kinsay Mahimong Mo-apply: Estudyante sa Kolehiyo (GWA ≥ 80%)',
  },
  'sustainable-livelihood-program': {
    icon: '🤝',
    en: 'Who Can Apply: Registered Co-ops & Associations (SEC/CDA/DOLE)',
    ceb: 'Kinsay Mahimong Mo-apply: Rehistradong Kooperatiba ug Asosasyon (SEC/CDA/DOLE)',
  },
  'kumbati-community-infrastructure': {
    icon: '🏛️',
    en: 'Who Can Apply: Barangay Councils & LGU Officials',
    ceb: 'Kinsay Mahimong Mo-apply: Konseho sa Barangay ug Opisyales sa LGU',
  },
};

const QUICK_JUMP_PROGRAMS = [
  { num: '1', name: 'Pabahay', slug: 'pabahay' },
  { num: '2', name: 'PTV 24/7', slug: 'patient-transport-vehicles' },
  { num: '3', name: 'Dialysis', slug: 'tambayan-ni-kumbati-dialysis' },
  { num: '4', name: 'Medicine', slug: 'kumbati-medical-clinic' },
  { num: '5', name: 'Scholarships', slug: 'ched-tdp-scholars' },
  { num: '6', name: 'Livelihood', slug: 'sustainable-livelihood-program' },
  { num: '7', name: 'Rural Infra', slug: 'kumbati-community-infrastructure' },
];

export const ProgramsPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | 'All'>('All');
  const [activeModalProgram, setActiveModalProgram] = useState<ProgramAdvocacy | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Interactive Checklist Progress stored per program in localStorage
  const [checkedDocs, setCheckedDocs] = useState<Record<string, number[]>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CHECKLIST_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleRequirement = (progId: string, reqIndex: number) => {
    setCheckedDocs((prev) => {
      const current = prev[progId] || [];
      const updated = current.includes(reqIndex)
        ? current.filter((idx) => idx !== reqIndex)
        : [...current, reqIndex];
      const next = { ...prev, [progId]: updated };
      try {
        localStorage.setItem(LOCAL_STORAGE_CHECKLIST_KEY, JSON.stringify(next));
      } catch {
        // Ignore localStorage quota errors
      }
      return next;
    });
  };

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

  const handleQuickJump = (slug: string) => {
    setSelectedCategory('All');
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-32 sm:pb-36">
      {/* =====================================================================
          1. PROGRAMS HERO BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/80 via-amber-50/20 to-transparent pt-10 pb-10 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Constituent Assistance', 'Serbisyo sa Katawhan')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3 text-balance">
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
          2. MAIN CONTENT CONTAINER (3-STEP GUIDE, STICKY FILTERS & PROGRAMS)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            2.1 TOP "HOW TO APPLY" 3-STEP CONSTITUENT GUIDE
           =================================================================== */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-sinoog mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
                <span>{t('Simple 3-Step Process', '3 ka Sayon nga Lakang')}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                {t('How to Apply for KUMBATI Programs', 'Unsaon Pag-apply sa mga Programa')}
              </h2>
            </div>

            {/* Mobile Accordion Toggle Button */}
            <button
              type="button"
              onClick={() => setIsGuideOpen(!isGuideOpen)}
              className="sm:hidden w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-bold text-orange-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>{t('📌 How to Apply in 3 Easy Steps (Tap to View)', '📌 3 ka Sayon nga Lakang sa Pag-apply (Pindota)')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isGuideOpen ? 'rotate-180 text-orange-400' : ''}`} />
            </button>
          </div>

          {/* 3 Horizontal Steps: Always visible on desktop, expandable on mobile */}
          <div className={`${isGuideOpen ? 'grid' : 'hidden sm:grid'} grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-800`}>
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-sinoog border border-orange-300/40">
                  1
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {t('1. Prepare Required Documents', '1. Ihanda ang mga Dokumento')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t(
                    'Review the checklist for your needed program below and gather your Barangay Indigency, ID, or medical abstract.',
                    'Susiha ang checklist sa ubos ug kuhaa ang Barangay Indigency, ID, o reseta/abstract.'
                  )}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-sinoog border border-orange-300/40">
                  2
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {t('2. Submit Online or at District Office', '2. Isumite Online o sa Buhatan')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t(
                    'Submit digital photos via the Action Center form, or visit our Candijay HQ or Jagna Clinic in person.',
                    'I-submit sa online Action Center o personal nga dad-a sa Candijay HQ o Jagna Clinic.'
                  )}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-sinoog border border-orange-300/40">
                  3
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {t('3. Track Your Reference Code', '3. Subaya ang Reference Code')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t(
                    'Receive an instant tracking code (e.g., KMB-2027-XXXXX) to follow up casework status and disbursement updates anytime.',
                    'Makadawat og Reference Code aron masubay ang estado sa imong ticket bisan unsang orasa.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2.2 STICKY CATEGORY FILTER BAR & QUICK-JUMP PROGRAM INDEX
           =================================================================== */}
        <div className="sticky top-14 sm:top-16 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-[#FFFDF9]/95 backdrop-blur-md border-y border-orange-100/80 shadow-2xs mb-8 transition-all">
          {/* Row 1: Category Filter Tabs */}
          <div className="relative mb-2.5">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 pr-1">
                <Filter className="w-3.5 h-3.5 text-orange-600" />
                <span className="hidden sm:inline">{t('Category', 'Kategoriya')}:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sinoog font-black'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-orange-300 hover:bg-orange-50/50 shadow-2xs'
                  }`}
                >
                  {cat === 'All'
                    ? t('All 7 Programs', 'Tanan nga 7 ka Programa')
                    : cat}
                </button>
              ))}
            </div>
            {/* Subtle Right-edge Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-1 w-6 bg-gradient-to-l from-[#FFFDF9] to-transparent pointer-events-none" />
          </div>

          {/* Row 2: Quick-Jump Program Index */}
          <div className="relative">
            <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[11px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 shrink-0 pr-1 flex items-center gap-1">
                <span>{t('Jump to', 'Ambak ngadto')}:</span>
              </span>
              {QUICK_JUMP_PROGRAMS.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleQuickJump(item.slug)}
                  className="px-2.5 py-1 rounded-lg bg-white/95 border border-orange-200/80 hover:border-orange-400 hover:bg-orange-50/80 text-slate-800 font-bold shrink-0 transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                >
                  <span className="text-orange-600 font-mono font-black mr-1">#{item.num}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            {/* Subtle Right-edge Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#FFFDF9] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ===================================================================
            2.3 7 DETAILED FLAGSHIP PROGRAM CARDS
           =================================================================== */}
        <div className="space-y-12">
          {filteredPrograms.map((prog, index) => {
            const badgeVariant = getCategoryBadgeVariant(prog.category);
            const targetAudience = TARGET_AUDIENCE_MAP[prog.slug];
            const checkedForThisProg = checkedDocs[prog.id] || [];
            const checkedCount = checkedForThisProg.length;
            const totalCount = prog.requirements_en.length;
            const allChecked = checkedCount === totalCount && totalCount > 0;

            return (
              <div
                key={prog.id}
                id={prog.slug}
                className="bg-gradient-to-b from-white via-white/98 to-amber-50/25 rounded-3xl border border-orange-200/80 border-t-white shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden backdrop-blur-md scroll-mt-40"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                  {/* Left Column: Image with Category Tag */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sinoog-inner border border-orange-100/60 border-t-white">
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
                        <span className="px-2.5 py-1 rounded-lg bg-black/70 text-white font-mono text-xs font-bold backdrop-blur-xs">
                          #{index + 1} Flagship
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Title, Target Badge, Full Description & Interactive Checklist */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                        {t(prog.title_en, prog.title_ceb)}
                      </h2>

                      {/* Who Can Apply Target Audience Badge */}
                      {targetAudience && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100/80 border border-orange-200/90 text-xs font-bold text-orange-950 shadow-2xs mt-2.5">
                          <span className="text-sm shrink-0">{targetAudience.icon}</span>
                          <span>{t(targetAudience.en, targetAudience.ceb)}</span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm font-semibold text-orange-600 mt-2">
                        {t(prog.summary_en, prog.summary_ceb)}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {t(prog.full_description_en, prog.full_description_ceb)}
                    </p>

                    {/* Interactive Required Documents Self-Check Container */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-orange-200/80 border-t-white shadow-sinoog-inner space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-100/70 pb-2.5">
                        <div className="text-xs font-black uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md bg-orange-100/80 flex items-center justify-center text-orange-600 shrink-0">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <span>{t('Required Documents Checklist', 'Listahan sa mga Kinahanglanon')}</span>
                        </div>

                        {/* Interactive Progress Counter Badge & Compact Print Pill */}
                        <div className="flex items-center gap-2 shrink-0 ml-auto">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                              allChecked
                                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                                : checkedCount > 0
                                ? 'bg-amber-100 border-amber-300 text-amber-800'
                                : 'bg-slate-100 border-slate-200 text-slate-600'
                            }`}
                          >
                            {allChecked
                              ? t('All Ready!', 'Andam Na Tanan!')
                              : t(
                                  `${checkedCount} / ${totalCount} Ready`,
                                  `${checkedCount} sa ${totalCount} Andam Na`
                                )}
                          </span>

                          <button
                            type="button"
                            onClick={() => setActiveModalProgram(prog)}
                            className="text-[11px] font-bold text-orange-700 hover:text-white hover:bg-orange-600 bg-orange-100/70 border border-orange-300/80 px-2.5 py-1 rounded-lg transition-all inline-flex items-center gap-1 whitespace-nowrap cursor-pointer shadow-2xs"
                            title={t('Print Checklist & Eligibility', 'I-print ang Listahan')}
                          >
                            <Printer className="w-3 h-3 shrink-0" />
                            <span>{t('Print / Full View', 'I-print / Tan-awa')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Interactive Checklist Items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {prog.requirements_en.map((req, rIdx) => {
                          const isChecked = checkedForThisProg.includes(rIdx);

                          return (
                            <button
                              key={rIdx}
                              type="button"
                              role="checkbox"
                              aria-checked={isChecked}
                              onClick={() => toggleRequirement(prog.id, rIdx)}
                              className={`w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                                isChecked
                                  ? 'bg-emerald-50/80 border-emerald-300/90 text-emerald-950 shadow-2xs'
                                  : 'bg-white border-orange-200/70 text-slate-700 hover:border-orange-300 hover:bg-orange-50/30'
                              }`}
                            >
                              {/* Custom Checkbox Toggle */}
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                  isChecked
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'border-2 border-slate-300 bg-white hover:border-orange-400'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>

                              <span
                                className={`text-xs leading-snug flex-1 ${
                                  isChecked ? 'font-semibold line-through decoration-emerald-500/60 text-slate-800' : ''
                                }`}
                              >
                                {t(req, prog.requirements_ceb[rIdx] || req)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons: Clean 2-Button Layout */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Link
                        to={`/action-center?tab=submit&program=${encodeURIComponent(prog.slug)}`}
                        className="flex-1 sm:flex-initial"
                      >
                        <Button
                          variant="primary"
                          size="md"
                          icon={<ShieldCheck className="w-4 h-4 shrink-0" />}
                          className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold shadow-sinoog"
                        >
                          {t('Apply / Inquire at Action Center', 'Pag-apply sa Sentro sa Aksyon')}
                        </Button>
                      </Link>

                      <button
                        type="button"
                        onClick={() => setActiveModalProgram(prog)}
                        className="px-5 py-2.5 rounded-full border-2 border-orange-200/90 hover:border-orange-500 hover:bg-orange-50/70 text-slate-700 text-xs font-bold shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>{t('Eligibility & Print View', 'Kwalipikasyon ug Pag-print')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. PROGRAM REQUIREMENTS & ELIGIBILITY MODAL
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

            {/* Target Audience in Modal */}
            {TARGET_AUDIENCE_MAP[activeModalProgram.slug] && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100/90 border border-orange-200 text-xs font-bold text-orange-950">
                <span>{TARGET_AUDIENCE_MAP[activeModalProgram.slug].icon}</span>
                <span>
                  {t(
                    TARGET_AUDIENCE_MAP[activeModalProgram.slug].en,
                    TARGET_AUDIENCE_MAP[activeModalProgram.slug].ceb
                  )}
                </span>
              </div>
            )}

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
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t('Print Checklist', 'I-print')}</span>
              </button>

              <Link
                to={`/action-center?tab=submit&program=${encodeURIComponent(activeModalProgram.slug)}`}
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
