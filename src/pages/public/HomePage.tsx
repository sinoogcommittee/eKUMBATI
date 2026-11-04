import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_METRICS,
  INITIAL_PROGRAMS,
  INITIAL_ALBUMS,
} from '../../lib/constants';
import StatCounter from '../../components/common/StatCounter';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import DistrictLeafletMap from '../../components/maps/DistrictLeafletMap';
import HotlineModal from '../../components/common/HotlineModal';
import {
  PhoneCall,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MapPin,
  CheckCircle,
  FileText,
  Heart,
  Facebook,
  Image as ImageIcon,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);

  const featuredPrograms = INITIAL_PROGRAMS.slice(0, 3);
  const recentAlbums = INITIAL_ALBUMS.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* =====================================================================
          1. HERO SECTION (Quiet Chrome & Calm Space)
         ===================================================================== */}
      <section className="bg-white border-b border-slate-200/80 pt-10 sm:pt-16 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Civic Context Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                <span>
                  {t(
                    'Official Constituent Portal • 3rd District of Bohol',
                    'Opisyal nga Portal sa Katawhan • Ikatulong Distrito sa Bohol'
                  )}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
                {t(INITIAL_SITE_SETTINGS.hero_headline_en, INITIAL_SITE_SETTINGS.hero_headline_ceb)}
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {t(INITIAL_SITE_SETTINGS.hero_subtext_en, INITIAL_SITE_SETTINGS.hero_subtext_ceb)}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Button
                  variant="emergency"
                  size="lg"
                  onClick={() => setIsHotlineModalOpen(true)}
                  icon={<PhoneCall className="w-4 h-4" />}
                >
                  {t('PTV 24/7 Hotline', 'PTV 24/7 Hotline')}
                </Button>

                <Link to="/action-center">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ShieldCheck className="w-4 h-4" />}
                  >
                    {t('Action Center (Tracker)', 'Sentro sa Aksyon (Tracker)')}
                  </Button>
                </Link>

                <Link to="/programs">
                  <Button variant="outline" size="lg">
                    {t('7 Flagship Programs', '7 ka Programa')}
                  </Button>
                </Link>
              </div>

              {/* Verified Highlights Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-700">
                    {t('19 Municipalities Covered', '19 ka Lungsod Gialagaran')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-700">
                    {t('24/7 Patient Transport (PTV)', '24/7 Sakyanan sa Pasyente')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-700">
                    {t('Dialysis Tambayan Haven', 'Tambayan sa Dialysis Tagbilaran')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Representative Spotlight Card (Clean, Grounded) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white rounded-xl p-4 border border-slate-200/80 shadow-card">
                <div className="relative h-72 sm:h-80 w-full rounded-lg overflow-hidden mb-4 bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt={INITIAL_SITE_SETTINGS.congresswoman_name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 text-white">
                    <div className="text-[11px] font-medium text-orange-300">
                      {t('19th Congress of the Philippines', 'Ika-19 nga Kongreso sa Pilipinas')}
                    </div>
                    <div className="text-lg font-semibold tracking-tight">
                      {INITIAL_SITE_SETTINGS.congresswoman_name}
                    </div>
                    <div className="text-xs text-slate-300 font-normal">
                      {t(INITIAL_SITE_SETTINGS.district_title_en, INITIAL_SITE_SETTINGS.district_title_ceb)}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {t(
                    'Dedicated registered nurse, grassroots champion, and author of landmark healthcare, labor, and housing bills for Bohol District 3.',
                    'Propesyonal nga nars, tigpanalipod sa mga kabus, ug tagsulat sa mahinungdanong balaod sa panglawas, pabalay, ug panginabuhian.'
                  )}
                </p>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1 font-medium text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <span>{t('Biography & Legislative Record', 'Tibuok Kasaysayan ug Balay-Balaod')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Team KUMBATI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. THE 7 VERIFIED 2025 KUMBATI IMPACT METRICS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="orange" size="sm" dot>
              {t('Audited Governance', 'Matinud-anong Pag-alagad')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
              {t('7 Flagship 2025 KUMBATI Impact Metrics', '7 ka mga Nag-unang Sukod sa Kalampusan sa KUMBATI 2025')}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t(
                'Direct tangible assistance delivered across the 19 municipalities of Bohol District 3.',
                'Diretsong hinabang ug serbisyo nga naabot sa 19 ka mga lungsod sa Ikatulong Distrito.'
              )}
            </p>
          </div>

          <Link to="/impact" className="shrink-0">
            <Button variant="outline" size="sm" icon={<ChevronRight className="w-3.5 h-3.5" />} iconPosition="right">
              {t('View Detailed Impact Report', 'Tan-awa ang Tibuok Ulat')}
            </Button>
          </Link>
        </div>

        {/* Dynamic Responsive 7 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* District 3 Summary Block as the 8th Tile */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="orange" size="sm">
                  {t('District-wide', 'Tibuok Distrito')}
                </Badge>
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </div>
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-1 tabular-nums">
                19 / 19
              </div>
              <h3 className="text-sm font-medium text-orange-400 mb-1.5">
                {t('Municipalities United', 'Mga Lungsod nga Nahiusa')}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t(
                  'From inland Chocolate Hills in Carmen to coastal havens in Anda and Jagna, every Boholano is served.',
                  'Gikan sa Carmen hangtod sa Anda ug Jagna, ang tanang Boholano giatiman ug gipaluyohan.'
                )}
              </p>
            </div>

            <div className="border-t border-slate-800 pt-3 mt-4">
              <Link
                to="/directory"
                className="text-xs font-medium text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 transition-colors"
              >
                <span>{t('Browse 19 Municipalities', 'Susiha ang 19 ka Lungsod')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED FLAGSHIP PROGRAMS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="orange" size="sm" dot>
            {t('Core Initiatives', 'Mga Nag-unang Proyekto')}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
            {t('Flagship Programs of Team KUMBATI', 'Mga Nag-unang Programa sa Team KUMBATI')}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {t(
              'Explore how you or your family can avail of housing, patient transport, medical clinic, and scholarships.',
              'Hibal-i kung unsaon pag-apil ug pag-avail sa pabalay, sakyanan sa pasyente, tambal, ug scholarship.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-card hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={prog.cover_image_url}
                    alt={prog.title_en}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant={prog.category === 'Health' ? 'red' : 'orange'} size="sm">
                      {prog.category}
                    </Badge>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug mb-2">
                    {t(prog.title_en, prog.title_ceb)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {t(prog.summary_en, prog.summary_ceb)}
                  </p>

                  {/* Requirements Snippet */}
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/60">
                    <div className="text-[11px] font-medium text-slate-700 mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t('Key Requirements', 'Mga Panginahanglanon')}:</span>
                    </div>
                    <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                      {prog.requirements_en.slice(0, 2).map((req, idx) => (
                        <li key={idx} className="truncate">
                          {t(req, prog.requirements_ceb[idx] || req)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-5 pb-5 pt-1">
                <Link
                  to={`/programs#${prog.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition-colors border border-slate-200/60"
                >
                  <span>{t('View Requirements & Guidelines', 'Tan-awa ang mga Kinahanglanon')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/programs">
            <Button variant="primary" size="lg" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
              {t('Explore All 7 Flagship Programs', 'Susiha ang Tanan nga 7 ka Programa')}
            </Button>
          </Link>
        </div>
      </section>

      {/* =====================================================================
          4. ACTION CENTER CTA BANNER (Quiet Terracotta Grounded)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-orange-600 text-white p-8 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-700/60 text-white text-xs font-medium border border-orange-500/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('Digital Constituent Assistance Desk', 'Digital nga Sentro sa Aksyon')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {t(
                  'Need Medical Assistance, Shelter Help, or Have a Concern?',
                  'Nanginahanglan og Hinabang Medikal, Pabalay, o Dunay Sumbong?'
                )}
              </h2>
              <p className="text-sm text-orange-100 leading-relaxed max-w-2xl font-normal">
                {t(
                  'The Action Center routes your query directly to congressional caseworkers. Get an instant reference tracking code (e.g., KMB-2026-XXXXX) to track resolution progress anytime.',
                  'Ang Sentro sa Aksyon modirekta sa imong hangyo ngadto sa buhatan. Makadawat ka og Reference Code aron masubay ang estado sa imong ticket bisan unsang orasa.'
                )}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
              <Link to="/action-center">
                <button className="w-full py-2.5 px-4 rounded-lg bg-white text-orange-800 hover:bg-orange-50 font-medium text-xs sm:text-sm shadow-subtle transition-colors text-center">
                  {t('File an Assistance Request', 'Pagsumite og Hangyo / Sumbong')}
                </button>
              </Link>
              <Link to="/action-center?tab=track">
                <button className="w-full py-2.5 px-4 rounded-lg bg-orange-700/70 hover:bg-orange-700 text-white border border-orange-500/50 font-medium text-xs sm:text-sm transition-colors text-center">
                  {t('Track Existing Code', 'Susiha ang Reference Code')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. INTERACTIVE DISTRICT MAP PREVIEW
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <Badge variant="orange" size="sm" dot>
              {t('Geospatial Directory', 'Mapa sa Distrito')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
              {t('Facilities & Offices Across District 3', 'Mga Pasilidad ug Buhatan sa Distrito 3')}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t(
                'Locate congressional headquarters, Kumbati clinics, PTV dispatch points, and municipal halls.',
                'Pangitaa ang mga opisina sa distrito, klinika, sakyanan sa pasyente, ug mga munisipyo.'
              )}
            </p>
          </div>

          <Link to="/map" className="shrink-0">
            <Button variant="outline" size="sm" icon={<MapPin className="w-4 h-4" />}>
              {t('Open Full Interactive Map', 'Ablihi ang Tibuok Mapa')}
            </Button>
          </Link>
        </div>

        <DistrictLeafletMap height="460px" />
      </section>

      {/* =====================================================================
          6. MULTIMEDIA PHOTO HIGHLIGHTS PREVIEW
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <Badge variant="orange" size="sm" dot>
              {t('Visual Documentation', 'Dokumentasyon')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
              {t('Recent Outreach & Project Highlights', 'Bag-ong Kalihokan ug Proyekto')}
            </h2>
          </div>
          <Link to="/gallery" className="shrink-0">
            <Button variant="outline" size="sm" icon={<ImageIcon className="w-4 h-4" />}>
              {t('View All Albums', 'Tanan nga Album')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAlbums.map((album) => (
            <Link
              key={album.id}
              to={`/gallery?album=${album.id}`}
              className="group block bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-card hover:border-slate-300 transition-colors"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={album.cover_image_url}
                  alt={album.title_en}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="orange" size="sm">
                    {album.category}
                  </Badge>
                </div>
                {album.municipality && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium">
                      {album.municipality}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-[11px] text-slate-400 mb-1">
                  {album.event_date} &bull; {album.media_count || 1} {t('photos', 'litrato')}
                </div>
                <h3 className="text-sm font-medium text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {t(album.title_en, album.title_ceb)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================================
          7. OFFICIAL FACEBOOK CHANNELS STRIP
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span>{t('Stay Updated on Social Media', 'Sunda ang mga Balita')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                {t('Connect with Congw. Alexie Tutor', 'Konektar kang Congw. Alexie Tutor')}
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              {t('4 Verified Official Facebook Pages', '4 ka Opisyal nga Panid sa Facebook')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                title: 'Alexie Besas Tutor',
                tag: 'Official Public Profile',
                url: INITIAL_SITE_SETTINGS.facebook_page_alexie_besas_tutor,
              },
              {
                title: 'Alexie B. Tutor',
                tag: 'Legislative Updates',
                url: INITIAL_SITE_SETTINGS.facebook_page_alexie_b_tutor,
              },
              {
                title: 'Team Kumbati',
                tag: 'Community Outreaches',
                url: INITIAL_SITE_SETTINGS.facebook_page_team_kumbati,
              },
              {
                title: 'PTV Official Page',
                tag: '24/7 Patient Dispatch',
                url: INITIAL_SITE_SETTINGS.facebook_page_ptv_official,
              },
            ].map((fb, idx) => (
              <a
                key={idx}
                href={fb.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-lg bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1.5">
                    <Facebook className="w-4 h-4 text-blue-400" />
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <h4 className="text-xs font-medium text-white group-hover:text-orange-400 transition-colors">
                    {fb.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{fb.tag}</p>
                </div>
                <div className="text-[11px] text-orange-400 font-medium mt-3 flex items-center gap-1">
                  <span>Follow Page</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hotline Modal */}
      <HotlineModal
        isOpen={isHotlineModalOpen}
        onClose={() => setIsHotlineModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
