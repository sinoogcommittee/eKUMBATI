import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_SITE_SETTINGS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  Award,
  BookOpen,
  Heart,
  Home,
  GraduationCap,
  Briefcase,
  Users,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

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
        'Pabahay ni Kumbati provides typhoon-proof concrete homes to 259+ underprivileged families with land security.',
      descCeb:
        'Paghatag og sementado ug lig-on nga panimalay sa kapin 259+ ka kabus nga pamilya lukop sa 19 ka lungsod.',
      icon: Home,
      color: 'orange',
    },
    {
      titleEn: 'Universal Education Access',
      titleCeb: 'Edukasyon Alang sa Tanan',
      descEn:
        'CHED-TDP and congressional tertiary scholarships empowering 3,829+ college youth to complete their degrees.',
      descCeb:
        'Tulong Dunong Program ug hinabang pinansyal sa kapin 3,829+ ka mga estudyante sa kolehiyo.',
      icon: GraduationCap,
      color: 'blue',
    },
    {
      titleEn: 'Sustainable Rural Livelihood',
      titleCeb: 'Malungtarong Panginabuhian',
      descEn:
        'Seed capital, machinery toolkits, and cooperative training for 78+ women, farmer, and fisherfolk associations.',
      descCeb:
        'Puhonan, gamit sa panguma ug negosyo alang sa 78+ ka mga kooperatiba ug asosasyon.',
      icon: Briefcase,
      color: 'emerald',
    },
    {
      titleEn: 'Grassroots Infrastructure',
      titleCeb: 'Imprastraktura sa Komunidad',
      descEn:
        'Solar streetlights, deep well drinking water systems, and flood protection for 31+ isolated rural communities.',
      descCeb:
        'Solar nga suga sa dalan, limpyong patubig, ug riprap sa 31+ ka mga hilit nga baryo ug sityo.',
      icon: Users,
      color: 'purple',
    },
  ];

  const legislativeHighlights = [
    {
      number: 'RA 11883 & Hospital Expansions',
      titleEn: 'Modernizing District Hospitals in Bohol',
      titleCeb: 'Pagpalapad sa mga Hospital sa Distrito sa Bohol',
      descEn:
        'Spearheaded national legislation upgrading local district hospitals, increasing bed capacities, and modernizing diagnostic ICUs and emergency rooms.',
      descCeb:
        'Nangulo sa pagpalabang og mga balaod aron madugangan ang katre, pasilidad, ug ekipo sa mga ospital sa Bohol.',
    },
    {
      number: 'Magna Carta of Barangay Health Workers',
      titleEn: 'Empowering Frontline BHWs and Tanods',
      titleCeb: 'Proteksyon ug Benepisyo sa mga BHW ug Tanod',
      descEn:
        'Authored and co-sponsored standardized monthly honoraria, hazard pay, PhilHealth coverage, and security of tenure for grassroots barangay health workers.',
      descCeb:
        'Nagpaluyo sa pagsaka sa honorarium, hazard pay, PhilHealth, ug proteksyon sa mga BHW nga nagserbisyo sa kabaryohan.',
    },
    {
      number: 'Tertiary Education Subsidy Protections',
      titleEn: 'Expanded Free College Grants (CHED-TDP)',
      titleCeb: 'Pagpalapad sa Libreng Kolehiyo ug Hinabang',
      descEn:
        'Allocated tens of millions in national scholarship funds ensuring students in the 19 municipalities remain enrolled through graduation.',
      descCeb:
        'Paggahin og pondo aron masiguro nga walay batan-on sa Distrito 3 nga moundang sa kolehiyo tungod sa kawad-on.',
    },
    {
      number: 'Socialized Housing & Disaster Resilience',
      titleEn: 'Community Resettlement and Land Tenure',
      titleCeb: 'Desenteng Relokasyon ug Seguridad sa Yuta',
      descEn:
        'Secured housing grants directly with national shelter agencies, turning Bohol District 3 into a national benchmark for congressional housing.',
      descCeb:
        'Diretsong nakig-alayon sa mga ahensya sa pabalay aron makatukod og mga balangay nga dili maguba sa bagyo.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =====================================================================
          1. ABOUT HERO BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/80 via-amber-50/20 to-transparent pt-10 pb-16 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Leadership & Stewardship', 'Pagdumala ug Serbisyo')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
              {t('About Congresswoman Alexie Besas Tutor', 'Mahitungod kang Congresswoman Alexie Besas Tutor')}
            </h1>
            <p className="text-lg text-slate-600 mt-4 leading-relaxed">
              {t(
                'A dedicated registered nurse serving as the voice, protector, and champion of the 19 municipalities of Bohol\'s 3rd Congressional District.',
                'Usa ka propesyonal nga nars nga nagserbisyo isip tingog, tigpanalipod, ug tigpaluyo sa 19 ka mga lungsod sa Ikatulong Distrito sa Bohol.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BIOGRAPHY & PUBLIC SERVICE JOURNEY
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait & Credentials Column */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-3xl blur-md opacity-30" />
              <div className="relative bg-white rounded-3xl p-6 border border-orange-100 shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt={INITIAL_SITE_SETTINGS.congresswoman_name}
                  className="w-full h-80 object-cover object-top rounded-2xl mb-5 shadow-sm"
                />
                <div className="space-y-3">
                  <div className="text-xl font-black text-slate-900">
                    {INITIAL_SITE_SETTINGS.congresswoman_name}
                  </div>
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                    {t(
                      'Representative • 19th Congress of the Philippines',
                      'Representante • Ika-19 nga Kongreso sa Pilipinas'
                    )}
                  </div>
                  <div className="border-t border-slate-100 pt-3 text-xs text-slate-600 space-y-1.5">
                    <div>
                      <strong className="text-slate-800">{t('Profession', 'Propesyon')}:</strong>{' '}
                      {t('Registered Nurse (RN)', 'Propesyonal nga Nars')}
                    </div>
                    <div>
                      <strong className="text-slate-800">{t('Term', 'Termino')}:</strong>{' '}
                      {t('Third Term Representative (2019–Present)', 'Ikatulong Termino (2019–Karon)')}
                    </div>
                    <div>
                      <strong className="text-slate-800">{t('District', 'Distrito')}:</strong>{' '}
                      {t('3rd District of Bohol (19 Towns)', 'Ikatulong Distrito sa Bohol')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t('From Healthcare Frontline to National Lawmaker', 'Gikan sa Panglawas Ngadto sa Balay Balaoranan')}
              </h2>

              <p>
                {t(INITIAL_SITE_SETTINGS.bio_summary_en, INITIAL_SITE_SETTINGS.bio_summary_ceb)}
              </p>

              <p>
                {t(
                  'Holding a clinical degree in Nursing, Congresswoman Alexie Tutor brings a deeply empathetic, patient-first perspective to the halls of Congress. Her legislative priorities are grounded in the everyday realities of rural Boholano families who face distance, poverty, and catastrophic healthcare expenses during emergencies.',
                  'Tungod sa iyang background isip nars, ang iyang pagserbisyo puno sa gugma ug pagbati sa mga pasyente ug pamilyang naglisod. Nasabtan niya pag-ayo ang kalisod sa mga mag-uuma ug mangingisda nga walay ikaplite sa tambalanan o ikapalit og maintenance medicine.'
                )}
              </p>

              <p>
                {t(
                  'Under her leadership, the 3rd District launched the historic 4-van Patient Transport Vehicle (PTV) fleet running 24/7 without charging constituents a single peso, followed by the landmark Tambayan ni Kumbati in Tagbilaran City—a free rest haven with air-conditioned dormitories and meals for dialysis patients.',
                  'Pinaagi sa iyang paningkamot, natukod ang 4 ka sakyanan sa PTV nga 24/7 nagbilar nga libre alang sa mga pasyente, ingon man ang Tambayan ni Kumbati sa Tagbilaran City diin makapahulay ug makakaon nga libre ang mga dialysis patients ug ilang mga bantay.'
                )}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/programs">
                <Button variant="primary" size="md" icon={<Heart className="w-4 h-4" />}>
                  {t('View 7 Flagship Programs', 'Tan-awa ang 7 ka Programa')}
                </Button>
              </Link>
              <Link to="/action-center">
                <Button variant="outline" size="md" icon={<ShieldCheck className="w-4 h-4" />}>
                  {t('Contact Action Center', 'Pakig-alayon sa Action Center')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. THE KUMBATI MANIFESTO & 5 PILLARS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl">
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
                  className="p-6 rounded-2xl bg-slate-850/80 border border-slate-800 hover:border-orange-500/40 transition-colors"
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
          4. LEGISLATIVE TRACK RECORD & BILLS CHAMPIONED
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="orange" size="sm" dot>
            {t('19th Congress', 'Ika-19 nga Kongreso')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
            {t('Key Legislative Achievements & Bills', 'Mahinungdanong mga Balaod ug Buhat')}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t(
              'Landmark laws and national budget appropriations sponsored by Congw. Alexie Tutor.',
              'Mga balaod ug pondo sa nasud nga gipalabang ug gipaningkamotan ni Congw. Alexie Tutor.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legislativeHighlights.map((leg, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-orange-100 shadow-sm hover:shadow-kumbati-hover transition-all duration-300"
            >
              <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{leg.number}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t(leg.titleEn, leg.titleCeb)}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(leg.descEn, leg.descCeb)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. BOHOL DISTRICT 3 PROFILE & 19 TOWNS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-50/70 rounded-3xl p-8 sm:p-12 border border-orange-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="orange" size="sm">
                {t('Geographic Heritage', 'Kabilin sa Distrito')}
              </Badge>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {t(
                  'The 19 Municipalities of Bohol\'s 3rd Congressional District',
                  'Ang 19 ka mga Lungsod sa Ikatulong Distrito sa Bohol'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {t(
                  'Spanning the lush interior highlands down to the eastern coral seas of Bohol, District 3 is home to resilient farming communities, vibrant fishing cooperatives, iconic natural wonders like the Chocolate Hills in Carmen, white sand beaches in Anda, and historic coastal trading ports in Jagna and Loay.',
                  'Gikan sa kabukiran sa Carmen hangtod sa kadagatan sa Anda ug Jagna, ang Ikatulong Distrito nailhan sa kugihan nga mag-uuma, mangingisda, ug talagsaong katahom sa kinaiyahan.'
                )}
              </p>

              <div className="pt-2">
                <Link to="/directory">
                  <Button variant="primary" size="sm" icon={<MapPin className="w-4 h-4" />}>
                    {t('View 19-Town Municipal Directory & Hotlines', 'Tan-awa ang Direktoryo sa 19 ka Lungsod')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center justify-between">
                  <span>{t('Municipalities List', 'Listahan sa mga Lungsod')}</span>
                  <span className="text-orange-600 font-bold">19 Towns</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                    <Link
                      key={town}
                      to={`/directory?town=${encodeURIComponent(town)}`}
                      className="p-1.5 rounded-lg bg-orange-50/50 hover:bg-orange-100 text-slate-700 hover:text-orange-700 font-semibold transition-colors flex items-center justify-between"
                    >
                      <span>{town}</span>
                      <ChevronRight className="w-3 h-3 text-orange-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
