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
import Button from '../../components/common/Button';
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
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'principal' | 'coauthored'>('principal');
  const [billCategory, setBillCategory] = useState<string>('all');
  const [measureSearch, setMeasureSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(10);

  const corePillars = [
    {
      titleEn: 'Compassionate Healthcare',
      titleCeb: 'Mahigugmaong Panglawas',
      descEn:
        'Zero-fare 24/7 patient transport (PTV), free dialysis lodging at Tambayan ni Kumbati, and direct outpatient clinics and prescription medicines.',
      descCeb:
        'Libreng sakyanan sa pasyente (PTV), pahuwayan sa dialysis patients sa Tagbilaran, ug libreng tambal ug konsultasyon sa doktor.',
      icon: Stethoscope,
      color: 'red',
    },
    {
      titleEn: 'Dignified Socialized Shelter',
      titleCeb: 'Desente ug Luwas nga Panimalay',
      descEn:
        'Pabahay ni Kumbati provides typhoon-proof concrete homes to 310+ underprivileged families with land security.',
      descCeb:
        'Paghatag og sementado ug lig-on nga panimalay sa kapin 310+ ka kabus nga pamilya lukop sa 19 ka lungsod.',
      icon: Home,
      color: 'orange',
    },
    {
      titleEn: 'Universal Education Access',
      titleCeb: 'Edukasyon Alang sa Tanan',
      descEn:
        'CHED-TDP and congressional tertiary scholarships empowering 4,500+ college youth to complete their degrees.',
      descCeb:
        'Tulong Dunong Program ug hinabang pinansyal sa kapin 4,500+ ka mga estudyante sa kolehiyo.',
      icon: GraduationCap,
      color: 'blue',
    },
    {
      titleEn: 'Sustainable Rural Livelihood',
      titleCeb: 'Malungtarong Panginabuhian',
      descEn:
        'Seed capital, machinery toolkits, and cooperative training for 88+ women, farmer, and fisherfolk associations.',
      descCeb:
        'Puhonan, gamit sa panguma ug negosyo alang sa 88+ ka mga kooperatiba ug asosasyon.',
      icon: Briefcase,
      color: 'emerald',
    },
    {
      titleEn: 'Grassroots Infrastructure',
      titleCeb: 'Imprastraktura sa Komunidad',
      descEn:
        'Solar streetlights, deep well drinking water systems, and flood protection for 36+ isolated rural communities.',
      descCeb:
        'Solar nga suga sa dalan, limpyong patubig, ug riprap sa 36+ ka mga hilit nga baryo ug sityo.',
      icon: Users,
      color: 'purple',
    },
  ];

  // =========================================================================
  // OFFICIAL COMMITTEE APPOINTMENTS (FROM docs/Committee Membership.docx)
  // =========================================================================
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

  // Helper to get committee icon
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
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =====================================================================
          1. ABOUT HERO BANNER (OFFICIAL CONGRESSIONAL RECORD)
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/90 via-amber-50/30 to-transparent pt-10 pb-16 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>{t('House of Representatives of the Philippines', 'Balay Balaoranan sa Pilipinas')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
              {t('About Congresswoman Kristine Alexie Besas Tutor', 'Mahitungod kang Congresswoman Kristine Alexie Besas Tutor')}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 mt-4 leading-relaxed font-medium">
              {t(
                'Licensed Physical Therapist, Law Graduate, and Champion of Bohol\'s 3rd Congressional District. Serving as Vice Chairperson of the Committee on Civil Service & Professional Regulation, and Member for the Majority in Appropriations, Sustainable Development Goals, and Visayas Development.',
                'Lisensyadong Physical Therapist, Gradwado sa Balaod, ug Tingog sa 19 ka mga Lungsod sa Ikatulong Distrito sa Bohol. Pangalawang Pangulo sa Committee on Civil Service & Professional Regulation, ug Miyembro sa Mayorya sa Appropriations, Sustainable Development Goals, ug Visayas Development.'
              )}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#committees"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[44px]"
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>{t('Committee Assignments', 'Mga Komitiba sa Kongreso')}</span>
              </a>
              <a
                href="#bills"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-orange-200 text-slate-800 font-bold text-xs hover:bg-orange-50 transition-all shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 min-h-[44px]"
              >
                <BookOpen className="w-3.5 h-3.5 text-orange-600" />
                <span>{t('Authored & Co-Authored Measures', 'Mga Balaodnon ug Resolusyon')}</span>
              </a>
              <a
                href="https://www.congress.gov.ph/house-members/view/J075"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[44px]"
              >
                <span>{t('Official Congress Record', 'Opisyal nga Rekord sa Kongreso')}</span>
                <ExternalLink className="w-3 h-3 text-orange-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BIOGRAPHY & PROFESSIONAL CREDENTIALS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Portrait & Credentials Column */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-3xl blur-md opacity-30 shadow-sinoog" />
              <div className="relative bg-gradient-to-b from-white via-white/95 to-amber-50/20 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-orange-200/70 border-t-white/95 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
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
                        <div className="text-slate-600">
                          Bachelor of Science in Physical Therapy (BSPT) • Velez College (Cebu City)
                        </div>
                        <div className="text-slate-600">
                          Bachelor of Laws (LL.B) Graduate
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Stethoscope className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">{t('Professional License', 'Propesyonal nga Lisensya')}:</strong>
                        <div className="text-slate-600">
                          {t('Licensed Physical Therapist (PRC Registered)', 'Lisensyadong Physical Therapist (PRC)')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Landmark className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">{t('Legislative Mandate', 'Mandato sa Kongreso')}:</strong>
                        <div className="text-slate-600">
                          {t('18th Congress (2019–2022) • 19th Congress (2022–Present)', 'Ika-18 nga Kongreso (2019–2022) • Ika-19 nga Kongreso (2022–Karon)')}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          {t('House of Representatives of the Philippines', 'Balay Balaoranan sa Pilipinas')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">{t('Prior Public Service', 'Nahiunang Serbisyo Publiko')}:</strong>
                        <div className="text-slate-600">
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
                        <div className="text-slate-600">
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
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <Badge variant="orange" size="sm" dot>
                {t('Champion of Boholano Welfare', 'Manlalaban sa Katawhang Boholano')}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t('From Health Sciences & Legal Acumen to Congressional Leadership', 'Gikan sa Syensya sa Panglawas ug Balaod Ngadto sa Balay Balaoranan')}
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
                  'Congw. Tutor\'s legislative compass is guided by one core doctrine: public office must deliver tangible, life-saving, and dignity-restoring results directly to constituents ("Serbisyo Diretso sa Katawhan"). This governance philosophy gave birth to the KUMBATI brand—a dynamic public service network encompassing typhoon-resilient concrete housing (Pabahay ni Kumbati), free 24/7 emergency medical transit (Patient Transport Vehicles), patient boarding havens (Tambayan ni Kumbati for Dialysis Patients in Tagbilaran), and comprehensive scholarship assistance for thousands of Boholano youth.',
                  'Ang pagserbisyo ni Congw. Tutor gipasukad sa usa ka baruganan: ang gahum sa kagamhanan kinahanglang maghatag og tinuod nga kaayohan, proteksyon, ug dignidad direkta sa katawhan ("Serbisyo Diretso sa Katawhan"). Kini ang nagmugna sa kalihukang KUMBATI—nga naghatag og libreng pabalay nga kongkreto, 24/7 nga sakyanan medikal (PTV), pahuwayan sa dialysis patients sa Tagbilaran, ug liboan ka scholarships sa mga batan-ong Boholano.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. COMMITTEE ASSIGNMENTS (OFFICIAL HOUSE RECORD)
         ===================================================================== */}
      <section id="committees" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="orange" size="sm" dot>
            {t('Official Congressional Organization', 'Opisyal nga Organisasyon sa Balay Balaoranan')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
            {t('House Committee Leadership & Memberships', 'Mga Pamunuan ug Komitiba sa Balay Balaoranan')}
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {t(
              'Official committee appointments and leadership assignments of Rep. Kristine Alexie Besas Tutor as recorded in the official journals of the House of Representatives of the Philippines.',
              'Opisyal nga katungdanan ug gisalig nga pamunuan sa mga komitiba kang Rep. Kristine Alexie Besas Tutor sumala sa opisyal nga mga journal sa Balay Balaoranan.'
            )}
          </p>
        </div>

        {/* Leadership Portfolio Card: Civil Service & Professional Regulation */}
        <div className="mb-8">
          {committeeLeadership.map((item) => {
            const Icon = getCommitteeIcon(item.iconName);
            return (
              <div
                key={item.id}
                className="relative rounded-3xl p-8 sm:p-10 border transition-all duration-300 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-1 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-white border-orange-300/80 shadow-orange-100/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-orange-600 text-white shadow-sinoog">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {item.journalNo}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                        {t(item.committeeEn, item.committeeCeb)}
                      </h3>
                    </div>
                  </div>
                  <Badge variant="orange" size="md" className="self-start">
                    {t(item.positionEn, item.positionCeb)}
                  </Badge>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {t(item.descriptionEn, item.descriptionCeb)}
                </p>

                <div className="border-t border-slate-200/80 pt-4 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>{t('Key Policy Priorities', 'Panguna nga Tutok sa Balaod')}</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {item.keyFunctions.map((func, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-700 flex items-start gap-2 bg-orange-50/60 p-3 rounded-xl border border-orange-100">
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
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sinoog">
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="slate" size="sm">
              {t('Committee Memberships', 'Mga Komitiba Isip Miyembro')}
            </Badge>
            <span className="text-xs font-bold text-slate-600">
              {t('3 Majority Memberships in the House of Representatives', '3 ka Komitiba sa Mayorya sa Balay Balaoranan')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {committeeMemberships.map((comm) => {
              const Icon = getCommitteeIcon(comm.iconName);
              return (
                <div
                  key={comm.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-orange-300 transition-all shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded-full">
                        {comm.journalNo}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mb-1">
                      {t(comm.positionEn, comm.positionCeb)}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {t(comm.committeeEn, comm.committeeCeb)}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {t(comm.descriptionEn, comm.descriptionCeb)}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-1.5">
                    {comm.keyFunctions.slice(0, 2).map((kf, kIdx) => (
                      <div key={kIdx} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1" />
                        <span className="line-clamp-1">{kf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. LEGISLATIVE TRACK RECORD: PRINCIPAL AUTHORED & CO-AUTHORED LAWS
         ===================================================================== */}
      <section id="bills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="orange" size="sm" dot>
            {t('Official Legislative Portfolio', 'Opisyal nga Talaan sa mga Balaod')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
            {t('Authored Bills & Congressional Measures', 'Mga Gipangamahanan ug Gipaluyohang Balaodnon')}
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {t(
              'Official legislative records authored and co-authored by Rep. Kristine Alexie Besas Tutor to advance healthcare, civil service eligibility, environmental conservation, and district infrastructure.',
              'Opisyal nga talaan sa mga balaodnon nga gipangamahanan ug gipaluyohan ni Rep. Alexie Tutor alang sa panglawas, serbisyo sibil, kinaiyahan, ug kalambuan sa Bohol.'
            )}
          </p>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('principal');
                setVisibleCount(10);
              }}
              className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px] cursor-pointer ${
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
              onClick={() => {
                setActiveTab('coauthored');
                setVisibleCount(10);
              }}
              className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-2 min-h-[44px] cursor-pointer ${
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

        {/* Search & Sector Filters Bar */}
        <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-orange-200/80 shadow-sinoog space-y-4 mb-8 backdrop-blur-md">
          {/* M3 Search Bar */}
          <SearchBar
            label={t('Search measures', 'Pangita og balaod')}
            placeholder={t(
              'Search by bill number (e.g., HB 831, HR 301), keyword, or committee referral...',
              'Pangita pinaagi sa numero sa balaod (e.g. HB 831, HR 301), pulong, o komitiba...'
            )}
            value={measureSearch}
            onValueChange={(val) => {
              setMeasureSearch(val);
              setVisibleCount(10);
            }}
          />

          {/* Sector Category Pills */}
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

          {/* Live Result Counter */}
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
                className="text-orange-600 font-bold hover:underline"
              >
                {t('Reset filters', 'Ibalik sa sinugdan')}
              </button>
            )}
          </div>
        </div>

        {/* Measures Grid */}
        {displayedMeasures.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sinoog">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {t('No legislative measures match your search', 'Walay nakit-an nga balaodnon sa imong gipangita')}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {t(
                'Try searching with a different keyword or resetting your sector filter.',
                'Sulayi ang laing pulong o i-reset ang imong filter.'
              )}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedMeasures.map((measure, mIdx) => (
              <Card
                key={mIdx}
                as="article"
                variant="filled"
                className="p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-mono font-black shadow-2xs">
                        <FileText className="w-3.5 h-3.5 text-orange-600" />
                        <span>{measure.displayId}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {measure.type === 'bill' ? 'House Bill' : 'House Resolution'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Badge variant={measure.significance === 'National' ? 'blue' : 'emerald'} size="sm">
                        {measure.significance}
                      </Badge>
                    </div>
                  </div>

                  {/* Title En */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {measure.titleEn}
                  </h3>

                  {/* Title Ceb Translation */}
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-4">
                    {measure.titleCeb}
                  </p>
                </div>

                {/* Details Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-500 font-medium">
                      {t('Primary Referral:', 'Komitiba:')}
                    </span>
                    <span className="font-bold text-slate-800 text-right">
                      {measure.referral}
                    </span>
                  </div>

                  {measure.principalAuthors && (
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium">
                        {t('Principal Authors:', 'Tagsulat:')}
                      </span>
                      <span className="text-slate-700 text-right font-medium">
                        {measure.principalAuthors}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{t('Filed:', 'Gisumite:')} {measure.dateFiled}</span>
                    </span>
                    <span className="font-semibold text-orange-600">
                      {t(measure.categoryLabelEn, measure.categoryLabelCeb)}
                    </span>
                  </div>

                  {measure.status && (
                    <div className="pt-1 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{measure.status}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredMeasures.length > visibleCount && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 10, filteredMeasures.length))}
              className="py-3 px-6 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 text-slate-800 font-bold text-xs shadow-2xs hover:shadow-sinoog transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t(`Show More Measures (${filteredMeasures.length - visibleCount} remaining)`, `Ipakita ang Dugang (${filteredMeasures.length - visibleCount} nabilin)`)}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setVisibleCount(filteredMeasures.length)}
              className="py-3 px-6 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 font-bold text-xs shadow-2xs hover:shadow-sinoog transition-all cursor-pointer"
            >
              {t(`Show All (${filteredMeasures.length})`, `Ipakita ang Tanan (${filteredMeasures.length})`)}
            </button>
          </div>
        )}

        {/* Official House Verification Callout Banner (NO J075!) */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white shadow-sinoog-raised border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>{t('Official Congress.gov.ph Profile', 'Opisyal nga Profile sa Kongreso')}</span>
            </div>
            <h4 className="text-xl font-black text-white">
              {t('Explore Rep. Kristine Alexie Besas Tutor\'s Complete Record', 'Susiha ang Tibuok Talaan ni Rep. Alexie Besas Tutor')}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t(
                'Access all principal authored measures, co-authored bills, committee reports, and plenary session logs registered in the official records of the House of Representatives.',
                'Tan-awa ang tanang mga balaodnon, report sa komitiba, ug plenaryo ubos sa Opisyal nga Talaan sa Balay Balaoranan.'
              )}
            </p>
          </div>

          <a
            href="https://www.congress.gov.ph/house-members/view/J075"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
          >
            <span>{t('Open congress.gov.ph Profile', 'Ablihi ang congress.gov.ph Profile')}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* =====================================================================
          5. THE KUMBATI MANIFESTO & 5 PILLARS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-sinoog border border-slate-800">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>{t('Brand Manifesto', 'Ang Diwa sa KUMBATI')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {t('What Does "KUMBATI" Mean?', 'Unsa ang Kahulogan sa "KUMBATI"?')}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              {t(
                '"KUMBATI" is the spirited Boholano rallying battle cry of tenacity, resilience, unity, and hope. It means fighting relentlessly for the welfare of the poor, working tirelessly without excuses, and showing up where help is needed most.',
                'Ang "KUMBATI" mao ang tawag sa panaghiusa, kaisug, ug paglahutay sa katawhang Boholano. Kini nagpasabot sa dili pag-surender sa kalisod, pag-alagad sa tiunay nga kasingkasing, ug paghatag og tinuod nga solusyon sa mga kabus.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-800/80 border border-slate-800 hover:border-orange-500/40 shadow-xs hover:shadow-sinoog hover:-translate-y-1 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {t(pillar.titleEn, pillar.titleCeb)}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t(pillar.descEn, pillar.descCeb)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. DISTRICT 3 COVERAGE & 19 MUNICIPALITIES
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-orange-200/70 shadow-sinoog">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="orange" size="sm" dot>
              {t('Official District Jurisdiction', 'Opisyal nga Hurisdiksyon')}
            </Badge>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              {t(
                'The 19 Municipalities of Bohol\'s 3rd Congressional District',
                'Ang 19 ka mga Lungsod sa Ikatulong Distrito sa Bohol'
              )}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {t(
                'Serving every constituent with equal dedication across eastern and central Bohol.',
                'Nag-alagad sa matag Boholano nga may tiunay nga dedikasyon lukop sa distrito.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {BOHOL_DISTRICT_3_TOWNS.map((town, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50 border border-slate-200/80 hover:border-orange-300 text-center transition-all group shadow-2xs hover:shadow-sinoog hover:-translate-y-0.5"
              >
                <div className="text-xs font-black text-slate-800 group-hover:text-orange-600 transition-colors">
                  {town}
                </div>
                <div className="text-[10px] text-slate-600 mt-0.5">
                  Bohol District 3
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/directory">
              <Button
                variant="primary"
                size="md"
                icon={<ChevronRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {t('View Complete 19-Town Directory & Hotlines', 'Tan-awa ang Directory sa 19 ka Lungsod')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
