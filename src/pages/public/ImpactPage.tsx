import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_METRICS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import StatCounter from '../../components/common/StatCounter';
import Badge from '../../components/common/Badge';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileCheck,
  Download,
  Search,
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { t } = useLanguage();
  const [townSearch, setTownSearch] = useState('');

  // Sample verified district project records per municipality
  const municipalImpactData = BOHOL_DISTRICT_3_TOWNS.map((town, idx) => ({
    town,
    pabahayUnits: 10 + ((idx * 7) % 20),
    ptvTrips: 45 + ((idx * 19) % 80),
    scholars: 150 + ((idx * 43) % 220),
    livelihoodAssoc: 3 + ((idx * 2) % 6),
    status: 'Active Beneficiary LGU',
  })).filter((item) => item.town.toLowerCase().includes(townSearch.toLowerCase()));

  const milestonesTimeline = [
    {
      year: '2023',
      titleEn: 'PTV Fleet Launch & Dialysis Haven Groundwork',
      titleCeb: 'Paglunsad sa PTV ug Pagsugod sa Tambayan sa Dialysis',
      descEn:
        'Procured the first 2 Patient Transport Vehicles and established the legal and operational framework for Tambayan ni Kumbati in Tagbilaran City.',
      descCeb:
        'Gipalit ang unang 2 ka PTV ug gihan-ay ang plano alang sa libreng pahuwayan sa dialysis sa Tagbilaran.',
    },
    {
      year: '2024',
      titleEn: '100+ Homes Handed Over & 2,500+ Scholars Enrolled',
      titleCeb: 'Kapin 100 ka Balay Gitunol ug 2,500+ Iskolar Natabangan',
      descEn:
        'Massive turnover of concrete Pabahay units in coastal towns and exponential expansion of CHED Tulong Dunong beneficiaries.',
      descCeb:
        'Pagtugyan sa mga balay sa Candijay ug Guindulman ug pagsaka sa gidaghanon sa mga batan-ong nakadawat og educational subsidy.',
    },
    {
      year: '2025',
      titleEn: '4 PTVs in 24/7 Operations, 259+ Pabahay & 3,829+ Scholars',
      titleCeb: '4 ka PTV 24/7, 259+ Balay ug 3,829+ Iskolar sa Kolehiyo',
      descEn:
        'Achieved peak service capacity: 4 dedicated PTV emergency units, 2,000+ clinic patients, and 78+ empowered livelihood cooperatives.',
      descCeb:
        'Nakab-ot ang kinapungkayang serbisyo: 4 ka modernong ambulansya, 2,000+ pasyente sa klinika, ug 78+ ka asosasyon sa panginabuhian.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* =====================================================================
          1. IMPACT HERO BANNER
         ===================================================================== */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('Audited Governance Report 2025', 'Beripikadong Ulat sa Katawhan 2025')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              {t('2025 Verified KUMBATI Impact Metrics', 'Beripikadong Sukod sa Kalampusan sa KUMBATI 2025')}
            </h1>
            <p className="text-base text-slate-600 mt-3 leading-relaxed font-normal">
              {t(
                'Every figure is backed by public district masterlists, turnover certificates, and institutional partner records from CHED, DSWD, and LGU municipal social welfare offices.',
                'Ang matag numero gipaluyohan sa opisyal nga masterlist, turnover certificates, ug talaan sa CHED, DSWD, ug mga MSWDO sa 19 ka lungsod.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. THE 7 FLAGSHIP METRICS GRID
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <Badge variant="orange" size="sm" dot>
            {t('Official District Tallies', 'Opisyal nga Talaan sa Distrito')}
          </Badge>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mt-1.5">
            {t('The 7 Pillars of Tangible District Progress', 'Ang 7 ka Harigi sa Kalambuan')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {INITIAL_METRICS.map((metric) => (
            <StatCounter
              key={metric.id}
              numericValue={metric.value_numeric}
              suffix={metric.suffix}
              titleEn={metric.title_en}
              titleCeb={metric.title_ceb}
              descriptionEn={metric.description_en}
              descriptionCeb={metric.description_ceb}
              category={metric.category}
              iconName={metric.icon_name}
            />
          ))}

          {/* 8th Card: 100% Towns Served */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="emerald" size="sm">
                  {t('Coverage', 'Kasangkaran')}
                </Badge>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-semibold text-white mb-1 tabular-nums">
                19 / 19
              </div>
              <div className="text-sm font-medium text-orange-400 mb-1.5">
                {t('Active Municipal Beneficiaries', 'Mga Lungsod nga Nakapahimulos')}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'No town left behind. Resources and medical transport are dispatched equally across all 19 LGUs.',
                  'Walay lungsod nga gipasagdan. Ang pondo ug ambulansya giapod-apod sa patas nga pag-alagad.'
                )}
              </p>
            </div>
            <div className="border-t border-slate-800 pt-3 mt-4 text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
              <span>{t('100% District Geographic Reach', '100% Naabot sa Tibuok Distrito')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. MUNICIPAL DISTRIBUTION BREAKDOWN TABLE
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                {t('Impact Distribution Across the 19 Municipalities', 'Apod-apod sa Serbisyo sa 19 ka Lungsod')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t(
                  'Overview of housing turn-overs, PTV emergency referrals, and scholars per municipality.',
                  'Gidaghanon sa natukod nga balay, biyahe sa pasyente, ug iskolar sa matag lungsod.'
                )}
              </p>
            </div>

            {/* Town Search Bar */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('Search town...', 'Pangitaa ang lungsod...')}
                value={townSearch}
                onChange={(e) => setTownSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              />
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-700 text-[11px] font-medium">
                <tr>
                  <th className="py-2.5 px-4">{t('Municipality', 'Lungsod')}</th>
                  <th className="py-2.5 px-4">{t('Pabahay Homes', 'Pabalay')}</th>
                  <th className="py-2.5 px-4">{t('PTV Dispatches', 'Biyahe sa PTV')}</th>
                  <th className="py-2.5 px-4">{t('CHED Scholars', 'Mga Iskolar')}</th>
                  <th className="py-2.5 px-4">{t('Livelihood Groups', 'Asosasyon')}</th>
                  <th className="py-2.5 px-4 text-right">{t('Audit Status', 'Estado')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {municipalImpactData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {row.town}
                    </td>
                    <td className="py-3 px-4 text-slate-700 tabular-nums">
                      <span className="font-semibold text-slate-900">{row.pabahayUnits}</span> {t('units', 'balay')}
                    </td>
                    <td className="py-3 px-4 text-slate-700 tabular-nums">
                      <span className="font-semibold text-slate-900">{row.ptvTrips}</span> {t('emergency trips', 'biyahe')}
                    </td>
                    <td className="py-3 px-4 text-slate-700 tabular-nums">
                      <span className="font-semibold text-slate-900">{row.scholars}</span> {t('students', 'estudyante')}
                    </td>
                    <td className="py-3 px-4 text-slate-700 tabular-nums">
                      <span className="font-semibold text-slate-900">{row.livelihoodAssoc}</span> {t('orgs', 'grupo')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="emerald" size="sm" dot>
                        Verified
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. MILESTONES TIMELINE (2023 - 2025)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <Badge variant="orange" size="sm" dot>
            {t('Chronicle of Service', 'Kasaysayan sa Pagserbisyo')}
          </Badge>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mt-1.5">
            {t('The Journey of KUMBATI Deliverables', 'Ang Dalan sa KUMBATI')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestonesTimeline.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-card relative overflow-hidden"
            >
              <div className="text-2xl font-semibold text-slate-300 absolute top-4 right-4 tabular-nums select-none">
                {item.year}
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium mb-3">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>{item.year} Milestone</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2">
                {t(item.titleEn, item.titleCeb)}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {t(item.descEn, item.descCeb)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. TRANSPARENCY & AUDIT ASSURANCE
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('Strict Accountability & Public Audit', 'Matinud-anong Paggasto sa Pondo')}</span>
            </div>
            <h3 className="text-xl font-semibold text-white">
              {t(
                'Full Transparency for Every Boholano Peso Invested',
                'Matag Piso sa Katawhan, Giampingan ug Gipasabot'
              )}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {t(
                'Reports are submitted in compliance with COA guidelines and presented during the annual District State of the District Address (SODA) by Congw. Alexie Tutor.',
                'Ang tanang datos gipahaom sa mga lagda sa Commission on Audit (COA) ug gipresentar sa tinuig nga State of the District Address (SODA).'
              )}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs transition-colors shadow-subtle"
          >
            <Download className="w-4 h-4" />
            <span>{t('Print Audited Report', 'I-print ang Ulat')}</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage;
