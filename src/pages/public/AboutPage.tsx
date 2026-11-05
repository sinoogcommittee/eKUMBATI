import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_SITE_SETTINGS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import {
  OFFICIAL_COMMITTEE_MEMBERSHIPS,
  PRINCIPAL_AUTHORED_MEASURES,
  CO_AUTHORED_MEASURES,
  type OfficialLegislativeMeasure,
} from '../../lib/legislativeData';
import Badge from '../../components/common/Badge';
import { Card, Chip, SearchBar } from '../../components/m3';
import {
  Award,
  BookOpen,
  Home,
  GraduationCap,
  Briefcase,
  Users,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  ExternalLink,
  Landmark,
  Scale,
  FileText,
  CheckCircle2,
  Building2,
  Sparkles,
  Globe,
  Filter,
  Calendar,
  ChevronDown,
  HeartHandshake,
  Ambulance,
  Heart,
  Pill,
} from 'lucide-react';

type BioTab = 'background' | 'vision' | 'legislative';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const [bioTab, setBioTab] = useState<BioTab>('background');
  const [activeTab, setActiveTab] = useState<'principal' | 'coauthored'>('principal');
  const [billCategory, setBillCategory] = useState<string>('all');
  const [measureSearch, setMeasureSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(10);

  // The 7 Pillars of Team KUMBATI
  const sevenPillars = [
    {
      id: 'pabahay',
      titleEn: '1. Pabahay Socialized Housing',
      titleCeb: '1. Pabahay Desenteng Panimalay',
      descEn:
        'Dignified, typhoon-resilient concrete housing units with land security for 310+ underprivileged families across District 3.',
      descCeb:
        'Sementado ug lig-on nga panimalay alang sa 310+ ka pamilyang kabus ug biktima sa kalamidad lukop sa 19 ka lungsod.',
      icon: Home,
      stat: '310+ Homes',
      color: 'orange',
    },
    {
      id: 'ptv',
      titleEn: '2. Patient Transport Vehicles (PTV) 24/7',
      titleCeb: '2. Patient Transport Vehicles (PTV) 24/7',
      descEn:
        'Zero-fare emergency transit fleet equipped with oxygen and stretchers, completing over 6,200+ patient runs to tertiary hospitals.',
      descCeb:
        'Libreng sakyanan medikal nga 24/7 andam mohatod sa pasyente sa tambalanan sa Tagbilaran ug Cebu.',
      icon: Ambulance,
      stat: '4 Vans • 24/7',
      color: 'red',
    },
    {
      id: 'dialysis',
      titleEn: '3. Tambayan ni Kumbati for Dialysis Patients',
      titleCeb: '3. Tambayan ni Kumbati sa Dialysis Patients',
      descEn:
        'Free sanctuary in Tagbilaran City offering air-conditioned dormitory beds, hot meals, and showers for hemodialysis patients and watchers.',
      descCeb:
        'Libreng pahuwayan sa Tagbilaran nga may aircon nga katre, init nga pagkaon, ug ligoanan alang sa mga pasyente.',
      icon: Heart,
      stat: 'Tagbilaran Haven',
      color: 'purple',
    },
    {
      id: 'clinic',
      titleEn: '4. Kumbati Medical Clinic & Free Medicine Desk',
      titleCeb: '4. Kumbati Medical Clinic ug Libreng Tambal',
      descEn:
        'Direct outpatient physician check-ups, diagnostic lab vouchers, and maintenance medicine dispensed freely to 3,200+ constituents.',
      descCeb:
        'Libreng konsulta sa doktor, laboratory voucher, ug libreng tambal sa maintenance alang sa mga lumulupyo.',
      icon: Pill,
      stat: '3,200+ Patients',
      color: 'emerald',
    },
    {
      id: 'scholars',
      titleEn: '5. CHED-TDP & District Tertiary Scholarships',
      titleCeb: '5. CHED-TDP ug Iskolar sa Distrito',
      descEn:
        'Tulong Dunong Program and congressional education cash assistance empowering 4,500+ college students to finish their degrees.',
      descCeb:
        'Hinabang pinansyal sa tuition ug libro sa kapin 4,500+ ka batan-ong Boholano nga nag-eskwela sa kolehiyo.',
      icon: GraduationCap,
      stat: '4,500+ Scholars',
      color: 'blue',
    },
    {
      id: 'livelihood',
      titleEn: '6. Sustainable Livelihood & Cooperative Support',
      titleCeb: '6. Malungtarong Panginabuhian ug Kooperatiba',
      descEn:
        'Starter capital grants, agricultural processing machinery, and training for 88+ women, farmer, and fisherfolk associations.',
      descCeb:
        'Puhonan, makinarya sa pagproseso, ug ekipo nga gihatag sa 88+ ka mga kooperatiba ug asosasyon.',
      icon: Briefcase,
      stat: '88+ Co-ops',
      color: 'amber',
    },
    {
      id: 'infrastructure',
      titleEn: '7. Community Empowerment & Rural Upgrades',
      titleCeb: '7. Pagpalig-on sa Komunidad ug Imprastraktura',
      descEn:
        'Targeted solar streetlights, level-II potable water installations, and flood-resilient concrete bridges for 36+ rural barangays.',
      descCeb:
        'Solar nga suga sa dalan, limpyong patubig, ug lig-on nga tulay ug karsada sa 36+ ka mga barangay.',
      icon: Users,
      stat: '36+ Communities',
      color: 'indigo',
    },
  ];

  // Official Committee Appointments
  const committeeLeadership = OFFICIAL_COMMITTEE_MEMBERSHIPS.filter((c) => c.isLeadership);
  const committeeMemberships = OFFICIAL_COMMITTEE_MEMBERSHIPS.filter((c) => !c.isLeadership);

  // Sector Categories for Legislative Measures
  const sectorCategories = [
    { id: 'all', labelEn: 'All Sectors', labelCeb: 'Tanan' },
    { id: 'civil_service', labelEn: 'Civil Service & PRC', labelCeb: 'Serbisyo Sibil' },
    { id: 'health', labelEn: 'Health & Hospitals', labelCeb: 'Panglawas' },
    { id: 'education', labelEn: 'Education & Youth', labelCeb: 'Edukasyon' },
    { id: 'tourism_env', labelEn: 'Tourism & Environment', labelCeb: 'Turismo ug Kinaiyahan' },
    { id: 'social_welfare', labelEn: 'Social Welfare & PWD', labelCeb: 'Kaayohan ug PWD' },
    { id: 'appropriations', labelEn: 'Budget & Salaries', labelCeb: 'Pondo ug Suweldo' },
    { id: 'justice_safety', labelEn: 'Justice & Public Safety', labelCeb: 'Hustisya' },
    { id: 'local_gov', labelEn: 'Local Governance', labelCeb: 'Kagamhanang Lokal' },
    { id: 'economy_infra', labelEn: 'Economy & Infrastructure', labelCeb: 'Ekonomiya' },
  ];

  // Active dataset depending on selected tab
  const activeMeasures: OfficialLegislativeMeasure[] =
    activeTab === 'principal' ? PRINCIPAL_AUTHORED_MEASURES : CO_AUTHORED_MEASURES;

  // Filtered dataset by category and search query
  const filteredMeasures = activeMeasures.filter((m) => {
    const matchesCategory = billCategory === 'all' || m.category === billCategory;
    const q = measureSearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      m.displayId.toLowerCase().includes(q) ||
      m.measureId.toLowerCase().includes(q) ||
      m.titleEn.toLowerCase().includes(q) ||
      m.titleCeb.toLowerCase().includes(q) ||
      m.referral.toLowerCase().includes(q) ||
      m.principalAuthors.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  const displayedMeasures = filteredMeasures.slice(0, visibleCount);

  const getCommitteeIcon = (name: string) => {
    switch (name) {
      case 'Landmark':
        return Landmark;
      case 'Scale':
        return Scale;
      case 'Globe':
        return Globe;
      case 'Building2':
      default:
        return Building2;
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-32 sm:pb-36">
      {/* =====================================================================
          1. ABOUT HERO BANNER (OFFICIAL CONGRESSIONAL RECORD)
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/90 via-amber-50/30 to-transparent pt-10 pb-12 sm:pb-14 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs border border-orange-200/80">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>{t('House of Representatives of the Philippines', 'Balay Balaoranan sa Pilipinas')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t('About Congresswoman Kristine Alexie Besas Tutor', 'Mahitungod kang Congresswoman Kristine Alexie Besas Tutor')}
            </h1>
            <p className="text-sm sm:text-base text-slate-700 mt-3 sm:mt-4 leading-relaxed font-medium">
              {t(
                'Licensed Physical Therapist, Law Graduate, and Champion of Bohol\'s 3rd Congressional District. Serving as Vice Chairperson of the Committee on Civil Service & Professional Regulation, and Member for the Majority in Appropriations, Sustainable Development Goals, and Visayas Development.',
                'Lisensyadong Physical Therapist, Gradwado sa Balaod, ug Tingog sa 19 ka mga Lungsod sa Ikatulong Distrito sa Bohol. Pangalawang Pangulo sa Committee on Civil Service & Professional Regulation, ug Miyembro sa Mayorya sa Appropriations, Sustainable Development Goals, ug Visayas Development.'
              )}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setBioTab('background')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] cursor-pointer ${
                  bioTab === 'background'
                    ? 'bg-orange-600 text-white shadow-sinoog'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{t('Biography & Background', 'Kaagi & Propesyon')}</span>
              </button>
              <button
                type="button"
                onClick={() => setBioTab('vision')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] cursor-pointer ${
                  bioTab === 'vision'
                    ? 'bg-orange-600 text-white shadow-sinoog'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('7 Flagship Pillars', '7 ka mga Haligi')}</span>
              </button>
              <button
                type="button"
                onClick={() => setBioTab('legislative')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] cursor-pointer ${
                  bioTab === 'legislative'
                    ? 'bg-orange-600 text-white shadow-sinoog'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>{t('Committees & Bills', 'Komitiba & Balaod')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. "AT A GLANCE" QUICK-FACT PROFILE CARD
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sinoog-raised border border-slate-700/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center shadow-inner">
                <Sparkles className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                  {t('At a Glance: Profile & Key Credentials', 'Dali nga Kasayuran: Profile ug Kredensyal')}
                </h2>
                <span className="text-xs text-orange-400 font-bold">
                  Hon. Kristine Alexie Besas-Tutor • Bohol 3rd District
                </span>
              </div>
            </div>
            <Badge variant="orange" size="sm">
              {t('19th Congress Incumbent', 'Ika-19 nga Kongreso')}
            </Badge>
          </div>

          {/* 4 Quick-Fact Columns (2x2 on mobile, 4-col on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* 1. Profession */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1.5">
                <Stethoscope className="w-4 h-4" />
                <span>{t('Profession', 'Propesyon')}</span>
              </div>
              <div className="text-sm font-extrabold text-white leading-snug">
                {t(
                  'Licensed Physical Therapist & Law Graduate',
                  'Lisensyadong Physical Therapist ug Gradwado sa Balaod'
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                BSPT (Velez College) • Bachelor of Laws (LL.B)
              </div>
            </div>

            {/* 2. Constituency */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1.5">
                <MapPin className="w-4 h-4" />
                <span>{t('Constituency', 'Hurisdiksyon')}</span>
              </div>
              <div className="text-sm font-extrabold text-white leading-snug">
                {t(
                  '3rd Congressional District of Bohol',
                  'Ikatulong Distrito sa Bohol'
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {t('19 Municipalities • Eastern & Central Bohol', '19 ka mga Lungsod sa Bohol')}
              </div>
            </div>

            {/* 3. Tenure */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1.5">
                <Calendar className="w-4 h-4" />
                <span>{t('Tenure', 'Panahon sa Pagserbisyo')}</span>
              </div>
              <div className="text-sm font-extrabold text-white leading-snug">
                {t(
                  'Serving Since 2019 (Incumbent)',
                  'Nag-alagad Sukad 2019 (Kasamtangan)'
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {t('18th & 19th Congress • Board Member (2016–2019)', 'Ika-18 & 19 nga Kongreso')}
              </div>
            </div>

            {/* 4. Core Focus */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1.5">
                <HeartHandshake className="w-4 h-4" />
                <span>{t('Core Focus', 'Panguna nga Tutok')}</span>
              </div>
              <div className="text-sm font-extrabold text-white leading-snug">
                {t(
                  'Emergency Medical Transit, Shelter & Education',
                  'PTV Medical Transit, Pabahay ug Edukasyon'
                )}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {t('7 Flagship KUMBATI Programs & Reforms', '7 ka mga Nag-unang Haligi sa KUMBATI')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. TABBED SECTIONS SWITCHER BAR
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200/90 shadow-2xs max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setBioTab('background')}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px] cursor-pointer shrink-0 ${
                bioTab === 'background'
                  ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog font-black'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{t('Public Servant & Background', 'Serbisyo Publiko & Kaagi')}</span>
            </button>

            <button
              type="button"
              onClick={() => setBioTab('vision')}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px] cursor-pointer shrink-0 ${
                bioTab === 'vision'
                  ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog font-black'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('District 3 Vision & 7 Pillars', 'Panlantaw & 7 ka Haligi')}</span>
            </button>

            <button
              type="button"
              onClick={() => setBioTab('legislative')}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px] cursor-pointer shrink-0 ${
                bioTab === 'legislative'
                  ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog font-black'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>{t('Legislative Track Record', 'Talaan sa mga Balaod')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TAB 1: PUBLIC SERVANT & PROFESSIONAL BACKGROUND
         ===================================================================== */}
      {bioTab === 'background' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Portrait & Credentials Column */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-3xl blur-md opacity-30 shadow-sinoog" />
                <div className="relative bg-gradient-to-b from-white via-white/95 to-amber-50/20 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-orange-200/70 border-t-white/95 shadow-sinoog overflow-hidden">
                  <img
                    src="/images/cong_alexie.webp"
                    alt={INITIAL_SITE_SETTINGS.congresswoman_name}
                    className="w-full h-80 object-cover object-top rounded-2xl mb-5 shadow-sm"
                  />

                  <div className="space-y-4">
                    <div>
                      <div className="text-xl font-black text-slate-900">
                        Hon. Kristine Alexie Besas-Tutor
                      </div>
                      <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mt-0.5">
                        {t(
                          'Representative • 3rd Congressional District of Bohol',
                          'Representante • Ikatulong Distrito sa Bohol'
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">{t('Educational Background', 'Edukasyon')}:</strong>
                          <div className="text-slate-600 leading-normal">
                            Bachelor of Science in Physical Therapy (BSPT) • Velez College (Cebu City)
                          </div>
                          <div className="text-slate-600 leading-normal">
                            Bachelor of Laws (LL.B) Graduate
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Stethoscope className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">{t('Professional License', 'Propesyonal nga Lisensya')}:</strong>
                          <div className="text-slate-600 leading-normal">
                            {t('Licensed Physical Therapist (PRC Registered)', 'Lisensyadong Physical Therapist (PRC)')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Landmark className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">{t('Legislative Mandate', 'Mandato sa Kongreso')}:</strong>
                          <div className="text-slate-600 leading-normal">
                            {t('18th Congress (2019–2022) • 19th Congress (2022–Present)', 'Ika-18 nga Kongreso (2019–2022) • Ika-19 nga Kongreso (2022–Karon)')}
                          </div>
                          <div className="text-slate-500 text-[11px] leading-normal">
                            {t('House of Representatives of the Philippines', 'Balay Balaoranan sa Pilipinas')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">{t('Prior Public Service', 'Nahiunang Serbisyo Publiko')}:</strong>
                          <div className="text-slate-600 leading-normal">
                            {t(
                              'Provincial Board Member, 3rd District of Bohol (2016–2019)',
                              'Miyembro sa Sangguniang Panlalawigan sa Bohol (2016–2019)'
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">{t('Jurisdiction', 'Distrito')}:</strong>
                          <div className="text-slate-600 leading-normal">
                            {t('19 Municipalities of Bohol District 3', '19 ka mga Lungsod sa Ikatulong Distrito')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Direct House Verification Link */}
                    <div className="pt-2">
                      <a
                        href="https://www.congress.gov.ph/house-members/view/J075"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-orange-50/80 hover:bg-orange-500 text-orange-800 hover:text-white border border-orange-200/90 font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[44px]"
                      >
                        <span>{t('View Official House Profile', 'Tan-awa ang Opisyal nga Profile sa Kongreso')}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <Badge variant="orange" size="sm" dot>
                  {t('Champion of Boholano Welfare', 'Manlalaban sa Katawhang Boholano')}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {t(
                    'From Health Sciences & Legal Acumen to Congressional Leadership',
                    'Gikan sa Syensya sa Panglawas ug Balaod Ngadto sa Balay Balaoranan'
                  )}
                </h2>

                <p>
                  {t(
                    'Armed with a Bachelor of Science in Physical Therapy from the prestigious Velez College in Cebu City and complemented by a Bachelor of Laws degree, Congresswoman Kristine Alexie Besas Tutor bridges clinical empathy with rigorous statutory expertise. Her scientific understanding of human rehabilitation informs her relentless passion for expanding rural healthcare facilities, while her legal training enables her to author and steer landmark national reforms through committee deliberations and plenary votes.',
                    'Gisangkapan sa degree sa Physical Therapy gikan sa Velez College sa Sugbo ug Bachelor of Laws, gihiusa ni Congresswoman Kristine Alexie Besas Tutor ang kasingkasing sa pagtambal ug kahait sa pagpanday sa balaod. Ang iyang kahibalo sa medisina maoy hinungdan sa iyang tinguha sa pagpalapad sa mga ospital, samtang ang iyang background sa balaod naghatag kaniya og gahum sa pagpanalipod sa mga kawani sa gobyerno ug pagduso og mga nasudnong balaod.'
                  )}
                </p>

                <p>
                  {t(
                    'Before her tenure in the House of Representatives, she served with distinction as a Provincial Board Member representing Bohol\'s 3rd District from 2016 to 2019. Decisively elected to the 18th Congress in 2019 and re-elected to the 19th Congress, Congw. Tutor earned national recognition as Vice Chairperson of the Committee on Civil Service & Professional Regulation, and Member for the Majority in the Committees on Appropriations, Sustainable Development Goals, and Visayas Development.',
                    'Sa wala pa siya napili sa Kongreso, nagserbisyo siya isip Board Member sa Ikatulong Distrito sa Bohol gikan 2016 hangtod 2019. Napili sa Balay Balaoranan ug subling gisaligan sa katawhan, naila siya pinaagi sa iyang pagka-Pangalawang Pangulo sa Committee on Civil Service and Professional Regulation ug Miyembro sa Mayorya sa Appropriations, Sustainable Development Goals, ug Visayas Development.'
                  )}
                </p>

                <p>
                  {t(
                    'Congw. Tutor\'s legislative compass is guided by one core doctrine: public office must deliver tangible, life-saving, and dignity-restoring results directly to constituents ("Serbisyo Diretso sa Katawhan"). This governance philosophy gave birth to the KUMBATI brand—a dynamic public service network encompassing typhoon-resilient concrete housing (Pabahay), free 24/7 emergency medical transit (Patient Transport Vehicles), patient boarding havens (Tambayan ni Kumbati for Dialysis Patients in Tagbilaran), and comprehensive scholarship assistance for thousands of Boholano youth.',
                    'Ang pagserbisyo ni Congw. Tutor gipasukad sa usa ka baruganan: ang gahum sa kagamhanan kinahanglang maghatag og tinuod nga kaayohan, proteksyon, ug dignidad direkta sa katawhan ("Serbisyo Diretso sa Katawhan"). Kini ang nagmugna sa kalihukang KUMBATI—nga naghatag og libreng pabalay nga kongkreto, 24/7 nga sakyanan medikal (PTV), pahuwayan sa dialysis patients sa Tagbilaran, ug liboan ka scholarships sa mga batan-ong Boholano.'
                  )}
                </p>
              </div>

              {/* Action Callout */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setBioTab('vision')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-sinoog hover:shadow-sinoog-hover transition-all cursor-pointer min-h-[44px]"
                >
                  <span>{t('Explore 7 Flagship Commitments', 'Susiha ang 7 ka Haligi')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setBioTab('legislative')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:bg-orange-50 transition-all shadow-xs cursor-pointer min-h-[44px]"
                >
                  <Landmark className="w-4 h-4 text-orange-600" />
                  <span>{t('View Legislative Track Record', 'Tan-awa ang mga Balaod')}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          TAB 2: DISTRICT 3 VISION & THE 7 PILLARS OF TEAM KUMBATI
         ===================================================================== */}
      {bioTab === 'vision' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
          {/* Brand Manifesto Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-sinoog border border-slate-800">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>{t('Brand Manifesto', 'Ang Diwa sa KUMBATI')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {t('What Does "KUMBATI" Mean?', 'Unsa ang Kahulogan sa "KUMBATI"?')}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                {t(
                  '"KUMBATI" is the spirited Boholano rallying battle cry of tenacity, resilience, unity, and hope. It means fighting relentlessly for the welfare of the poor, working tirelessly without excuses, and showing up where help is needed most.',
                  'Ang "KUMBATI" mao ang tawag sa panaghiusa, kaisug, ug paglahutay sa katawhang Boholano. Kini nagpasabot sa dili pag-surender sa kalisod, pag-alagad sa tiunay nga kasingkasing, ug paghatag og tinuod nga solusyon sa mga kabus.'
                )}
              </p>
            </div>
          </div>

          {/* 7 Flagship Pillars Grid */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="orange" size="sm" dot>
                {t('Verified Flagship Deliverables', 'Gisaligan nga mga Haligi')}
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2 leading-tight">
                {t('The 7 Pillars of Team KUMBATI', 'Ang 7 ka mga Haligi sa Team KUMBATI')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {t(
                  'Tangible, life-changing programs active throughout Bohol\'s 3rd Congressional District.',
                  'Tinuod nga mga programa nga padayong nag-alagad sa katawhan sa Ikatulong Distrito.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sevenPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="p-6 rounded-3xl bg-gradient-to-b from-white via-white/98 to-amber-50/25 border border-orange-200/80 border-t-white shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shadow-inner">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider">
                          {pillar.stat}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 mb-2 leading-snug">
                        {t(pillar.titleEn, pillar.titleCeb)}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {t(pillar.descEn, pillar.descCeb)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {t('District 3 Program', 'Programa sa Distrito')}
                      </span>
                      <Link
                        to={`/programs#${pillar.id}`}
                        className="font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-0.5"
                      >
                        <span>{t('Learn More', 'Dugang Kasayuran')}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 19 Municipalities Jurisdiction Strip */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-orange-200/70 shadow-sinoog space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <Badge variant="orange" size="sm" dot>
                {t('District Jurisdiction', 'Hurisdiksyon')}
              </Badge>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                {t('19 Municipalities of Bohol District 3', 'Ang 19 ka Lungsod sa Ikatulong Distrito')}
              </h4>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                <Link
                  key={town}
                  to={`/directory?town=${encodeURIComponent(town)}`}
                  className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-orange-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-orange-600 transition-colors shadow-2xs"
                >
                  📍 {town}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          TAB 3: LEGISLATIVE TRACK RECORD & COMMITTEE APPOINTMENTS
         ===================================================================== */}
      {bioTab === 'legislative' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
          {/* Committee Leadership Section */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="orange" size="sm" dot>
                {t('Congressional Leadership', 'Pamunuan sa Balay Balaoranan')}
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
                {t('House Committee Leadership & Memberships', 'Mga Pamunuan ug Komitiba sa Balay Balaoranan')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {t(
                  'Official assignments of Rep. Kristine Alexie Besas Tutor recorded in the official journals of the House of Representatives.',
                  'Opisyal nga katungdanan ug pamunuan sa mga komitiba ni Rep. Alexie Tutor sumala sa Balay Balaoranan.'
                )}
              </p>
            </div>

            {/* Leadership Portfolio Card: Civil Service & Professional Regulation */}
            <div>
              {committeeLeadership.map((item) => {
                const Icon = getCommitteeIcon(item.iconName);
                return (
                  <div
                    key={item.id}
                    className="relative rounded-3xl p-6 sm:p-8 border transition-all duration-300 shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 bg-gradient-to-br from-white via-white/98 to-amber-50/30 border-orange-200/80 border-t-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-sinoog">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                            {item.journalNo}
                          </span>
                          <h4 className="text-lg sm:text-xl font-black text-slate-900">
                            {t(item.committeeEn, item.committeeCeb)}
                          </h4>
                        </div>
                      </div>
                      <Badge variant="orange" size="md" className="self-start">
                        {t(item.positionEn, item.positionCeb)}
                      </Badge>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {t(item.descriptionEn, item.descriptionCeb)}
                    </p>

                    <div className="border-t border-slate-200/80 pt-3 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                        <span>{t('Key Policy Priorities', 'Panguna nga Tutok sa Balaod')}</span>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {item.keyFunctions.map((func, fIdx) => (
                          <li key={fIdx} className="text-xs text-slate-700 flex items-start gap-2 bg-orange-50/60 p-2.5 rounded-xl border border-orange-100">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-orange-600 mt-0.5" />
                            <span>{func}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Member for the Majority Committees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {committeeMemberships.map((comm) => {
                const Icon = getCommitteeIcon(comm.iconName);
                return (
                  <div
                    key={comm.id}
                    className="bg-gradient-to-b from-white via-white/98 to-amber-50/25 p-5 rounded-3xl border border-orange-200/80 border-t-white hover:border-orange-400 transition-all shadow-sinoog flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-600 uppercase bg-slate-100 px-2 py-0.5 rounded-lg">
                          {comm.journalNo}
                        </span>
                      </div>
                      <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">
                        {t(comm.positionEn, comm.positionCeb)}
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                        {t(comm.committeeEn, comm.committeeCeb)}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {t(comm.descriptionEn, comm.descriptionCeb)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legislative Measures Database */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <Badge variant="orange" size="sm" dot>
                {t('Legislative Measures', 'Mga Balaodnon')}
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
                {t('Authored Bills & Congressional Measures', 'Mga Gipangamahanan ug Gipaluyohang Balaodnon')}
              </h3>
            </div>

            {/* Dual Mode Switcher Tabs */}
            <div className="flex items-center justify-center">
              <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('principal');
                    setVisibleCount(10);
                  }}
                  className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[40px] cursor-pointer ${
                    activeTab === 'principal'
                      ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('Principal Authored Measures', 'Panguna nga Gipanday')}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${activeTab === 'principal' ? 'bg-orange-800 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {PRINCIPAL_AUTHORED_MEASURES.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('coauthored');
                    setVisibleCount(10);
                  }}
                  className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[40px] cursor-pointer ${
                    activeTab === 'coauthored'
                      ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{t('Co-Authored Bills', 'Gipaluyohan nga Balaodnon')}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${activeTab === 'coauthored' ? 'bg-orange-800 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {CO_AUTHORED_MEASURES.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Search & Sector Filter Bar */}
            <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-orange-200/80 shadow-sinoog space-y-4 backdrop-blur-md">
              <SearchBar
                label={t('Search measures', 'Pangita og balaod')}
                placeholder={t(
                  'Search by bill number (e.g. HB 831, HR 301), keyword, or committee referral...',
                  'Pangita pinaagi sa numero sa balaod (e.g. HB 831, HR 301), pulong, o komitiba...'
                )}
                value={measureSearch}
                onValueChange={(val) => {
                  setMeasureSearch(val);
                  setVisibleCount(10);
                }}
              />

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-1">
                  <Filter className="w-3.5 h-3.5 text-orange-600" />
                  <span>{t('Sector:', 'Sektor:')}</span>
                </div>
                {sectorCategories.map((cat) => (
                  <Chip
                    key={cat.id}
                    variant="filter"
                    selected={billCategory === cat.id}
                    onClick={() => {
                      setBillCategory(cat.id);
                      setVisibleCount(10);
                    }}
                  >
                    {t(cat.labelEn, cat.labelCeb)}
                  </Chip>
                ))}
              </div>

              {/* Counter */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>
                  {t(
                    `Showing ${displayedMeasures.length} of ${filteredMeasures.length} measures`,
                    `Gipakita ang ${displayedMeasures.length} sa ${filteredMeasures.length} ka balaodnon`
                  )}
                </span>
                {(measureSearch || billCategory !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setMeasureSearch('');
                      setBillCategory('all');
                      setVisibleCount(10);
                    }}
                    className="text-orange-600 font-bold hover:underline cursor-pointer"
                  >
                    {t('Reset filters', 'Ibalik sa sinugdan')}
                  </button>
                )}
              </div>
            </div>

            {/* Measures Grid */}
            {displayedMeasures.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sinoog">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800">
                  {t('No legislative measures match your search', 'Walay nakit-an nga balaodnon sa imong gipangita')}
                </h4>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {displayedMeasures.map((measure, mIdx) => (
                  <Card
                    key={mIdx}
                    as="article"
                    variant="filled"
                    className="p-5 sm:p-6 flex flex-col justify-between rounded-3xl border border-orange-200/80 border-t-white bg-gradient-to-b from-white via-white/98 to-amber-50/20 shadow-sinoog"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-orange-100/80 text-orange-900 text-xs font-mono font-black">
                            <FileText className="w-3.5 h-3.5 text-orange-600" />
                            <span>{measure.displayId}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {measure.type === 'bill' ? 'House Bill' : 'Resolution'}
                          </span>
                        </div>
                        <Badge variant={measure.significance === 'National' ? 'blue' : 'emerald'} size="sm">
                          {measure.significance}
                        </Badge>
                      </div>

                      <h4 className="text-sm sm:text-base font-black text-slate-900 mb-1.5 leading-snug">
                        {measure.titleEn}
                      </h4>
                      <p className="text-xs text-slate-600 italic leading-relaxed mb-3">
                        {measure.titleCeb}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 font-medium">{t('Referral:', 'Komitiba:')}</span>
                        <span className="font-bold text-slate-800 text-right text-[11px]">{measure.referral}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                        <span>{measure.dateFiled}</span>
                        <span className="font-semibold text-orange-600">
                          {t(measure.categoryLabelEn, measure.categoryLabelCeb)}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredMeasures.length > visibleCount && (
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 10, filteredMeasures.length))}
                  className="py-3 px-6 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 text-slate-800 font-bold text-xs shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t(`Show More Measures (${filteredMeasures.length - visibleCount} remaining)`, `Ipakita ang Dugang (${filteredMeasures.length - visibleCount} nabilin)`)}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Official Congress.gov.ph Profile Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white shadow-sinoog-raised border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>{t('Official Congress.gov.ph Profile', 'Opisyal nga Profile sa Kongreso')}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  {t('Explore Rep. Kristine Alexie Besas Tutor\'s Complete Record', 'Susiha ang Tibuok Talaan ni Rep. Alexie Besas Tutor')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {t(
                    'Access all authored measures, committee reports, and plenary session logs in the official records of the House of Representatives.',
                    'Tan-awa ang tanang mga balaodnon, report sa komitiba, ug plenaryo ubos sa Opisyal nga Talaan sa Balay Balaoranan.'
                  )}
                </p>
              </div>

              <a
                href="https://www.congress.gov.ph/house-members/view/J075"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sinoog hover:shadow-sinoog-hover active:scale-98 min-h-[44px]"
              >
                <span>{t('Open congress.gov.ph Profile', 'Ablihi ang congress.gov.ph Profile')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutPage;
