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
import HotlineModal from '../../components/common/HotlineModal';
import {
  ShieldCheck,
  ChevronRight,
  FileText,
  Heart,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);

  const featuredPrograms = INITIAL_PROGRAMS.slice(0, 3);
  const recentAlbums = INITIAL_ALBUMS.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-32 sm:pb-36 w-full max-w-full overflow-x-hidden">
      {/* =====================================================================
          1. HERO SECTION
         ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-amber-50/20 to-[#FFFDF9] pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-orange-100/60">
        {/* Subtle Decorative Ambient Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-orange-200/30 via-amber-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            {/* Left Column: Copy & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-orange-200 text-orange-800 text-xs font-bold shadow-2xs">
                <span>
                  {t(
                    'Official Constituent Portal • 3rd District of Bohol',
                    'Opisyal nga Portal sa Katawhan • Ikatulong Distrito sa Bohol'
                  )}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] text-balance">
                {t(INITIAL_SITE_SETTINGS.hero_headline_en, INITIAL_SITE_SETTINGS.hero_headline_ceb)}
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t(INITIAL_SITE_SETTINGS.hero_subtext_en, INITIAL_SITE_SETTINGS.hero_subtext_ceb)}
              </p>

              {/* Action Buttons: 2 focused, high-contrast CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <Link to="/action-center" className="w-full sm:w-auto shrink-0">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3 text-xs sm:text-sm whitespace-nowrap min-h-[46px] shadow-sinoog"
                  >
                    {t('Apply for Assistance / Track Ticket', 'Pag-apply og Hinabang / Susiha ang Ticket')}
                  </Button>
                </Link>

                <a href="#flagship-programs" className="w-full sm:w-auto shrink-0">
                  <Button
                    variant="outline"
                    size="md"
                    icon={<Layers className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3 text-xs sm:text-sm whitespace-nowrap min-h-[46px] bg-white/90"
                  >
                    {t('Explore 7 Flagship Programs', 'Susiha ang 7 ka Programa')}
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Representative Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative Frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-3xl rotate-2 shadow-sinoog -z-10 opacity-75" />

                <div className="bg-gradient-to-b from-white via-white/98 to-amber-50/25 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-orange-200/80 border-t-white shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                  <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 shadow-sinoog-inner border border-orange-100/60 border-t-white">
                    <img
                      src="/images/cong_alexie.webp"
                      alt={INITIAL_SITE_SETTINGS.congresswoman_name}
                      width={448}
                      height={320}
                      {...({ fetchpriority: 'high' } as any)}
                      decoding="async"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-4 text-white">
                      <div className="text-xs font-black uppercase tracking-wider text-orange-400">
                        {t('19th Congress of the Philippines', 'Ika-19 nga Kongreso sa Pilipinas')}
                      </div>
                      <div className="text-xl font-black">
                        {INITIAL_SITE_SETTINGS.congresswoman_name}
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        {t(INITIAL_SITE_SETTINGS.district_title_en, INITIAL_SITE_SETTINGS.district_title_ceb)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-orange-100/70 pt-3 text-xs">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-1.5 font-bold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <span>{t('Read Full Biography & Bills', 'Basaha ang Tibuok Kasaysayan')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <span className="text-[11px] font-bold text-slate-400">
                      Team KUMBATI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. FEATURED FLAGSHIP PROGRAMS OF TEAM KUMBATI (Immediate Utility)
         ===================================================================== */}
      <section id="flagship-programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <Badge variant="orange" size="sm" dot>
            {t('Core Initiatives', 'Mga Nag-unang Proyekto')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 text-balance">
            {t('Flagship Programs of Team KUMBATI', 'Mga Nag-unang Programa sa Team KUMBATI')}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t(
              'Explore how you or your family can avail of housing, patient transport, medical clinic, and scholarships.',
              'Hibal-i kung unsaon pag-apil ug pag-avail sa pabalay, sakyanan sa pasyente, tambal, ug scholarship.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredPrograms.map((prog) => {
            const reqCount = prog.requirements_en?.length || 4;

            return (
              <div
                key={prog.id}
                className="bg-gradient-to-b from-white via-white/98 to-amber-50/25 rounded-3xl border border-orange-200/80 border-t-white overflow-hidden shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md group"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-orange-100/60">
                    <img
                      src={prog.cover_image_url}
                      alt={prog.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant={prog.category === 'Health' ? 'red' : 'orange'} size="sm">
                        {prog.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-lg font-black text-slate-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors">
                      {t(prog.title_en, prog.title_ceb)}
                    </h3>

                    {/* Requirements Count Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50/90 border border-orange-200/80 text-[11px] font-bold text-orange-800 shadow-2xs mb-3">
                      <FileText className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>
                        {t(
                          `📋 ${reqCount} Simple Requirements`,
                          `📋 ${prog.requirements_ceb?.length || reqCount} ka mga Panginahanglanon`
                        )}
                      </span>
                    </div>

                    {/* Clamped Description for Scannability */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {t(prog.summary_en, prog.summary_ceb)}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-6 pb-6 pt-1">
                  <Link
                    to={`/programs#${prog.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-5 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[44px]"
                  >
                    <span>{t('View Requirements & Apply →', 'Tan-awa ang Kinahanglanon ug Pag-apply →')}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/programs">
            <Button variant="primary" size="lg" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
              {t('Explore All 7 Flagship Programs', 'Susiha ang Tanan nga 7 ka Programa')}
            </Button>
          </Link>
        </div>
      </section>

      {/* =====================================================================
          3. ACTION CENTER CTA BANNER (CONSTITUENT DESK)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white p-8 sm:p-12 overflow-hidden shadow-sinoog-raised border border-orange-400/40">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('Digital Constituent Assistance Desk', 'Digital nga Sentro sa Aksyon')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-balance">
                {t(
                  'Need Medical Assistance, Shelter Help, or Have a Concern?',
                  'Nanginahanglan og Hinabang Medikal, Pabalay, o Dunay Sumbong?'
                )}
              </h2>
              <p className="text-sm sm:text-base text-orange-50 leading-relaxed max-w-2xl">
                {t(
                  'The Action Center routes your query directly to congressional caseworkers. Get an instant reference tracking code (e.g., KMB-2027-XXXXX) to track resolution progress anytime.',
                  'Ang Sentro sa Aksyon modirekta sa imong hangyo ngadto sa buhatan. Makadawat ka og Reference Code aron masubay ang estado sa imong ticket bisan unsang orasa.'
                )}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link to="/action-center" className="w-full">
                <button className="w-full py-3.5 px-6 rounded-full bg-white text-orange-700 hover:bg-orange-50 font-black text-sm shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center min-h-[48px] flex items-center justify-center cursor-pointer">
                  {t('File an Assistance Request', 'Pagsumite og Hangyo / Sumbong')}
                </button>
              </Link>
              <Link to="/action-center?tab=track" className="w-full">
                <button className="w-full py-3.5 px-6 rounded-full bg-slate-900/50 hover:bg-slate-900/80 text-white border-2 border-white/40 font-bold text-sm shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center min-h-[48px] flex items-center justify-center backdrop-blur-sm cursor-pointer">
                  {t('Track Existing Code', 'Susiha ang Reference Code')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. MULTIMEDIA PHOTO HIGHLIGHTS PREVIEW (RECENT OUTREACH)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <Badge variant="orange" size="sm" dot>
              {t('Visual Documentation', 'Dokumentasyon')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mt-2 text-balance">
              {t('Recent Outreach & Project Highlights', 'Bag-ong Kalihokan ug Proyekto')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl">
              {t(
                'Transparent photo documentation of project turnovers, medical missions, and constituent outreach across Bohol District 3.',
                'Dokumentasyon sa mga turnover sa proyekto, medikal nga misyon, ug serbisyo sa katawhan sa Ikatulong Distrito.'
              )}
            </p>
          </div>
          <div className="shrink-0 pt-1 sm:pt-0">
            <Link to="/gallery" className="inline-block">
              <Button variant="ghost" size="sm" icon={<ImageIcon className="w-4 h-4" />}>
                {t('View All Albums', 'Tanan nga Album')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentAlbums.map((album) => (
            <Link
              key={album.id}
              to={`/gallery?album=${album.id}`}
              className="group block bg-gradient-to-b from-white via-white/98 to-amber-50/25 rounded-3xl border border-orange-200/80 border-t-white overflow-hidden shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100 border-b border-orange-100/60">
                <img
                  src={album.cover_image_url}
                  alt={album.title_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="orange" size="sm">
                    {album.category}
                  </Badge>
                </div>
                {album.municipality && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                      {album.municipality}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-orange-200/70 border-t-white shadow-sinoog-inner text-[11px] font-bold text-slate-500 mb-2.5">
                  <ImageIcon className="w-3.5 h-3.5 text-orange-500" />
                  <span>{album.event_date} &bull; {album.media_count || 1} {t('photos', 'litrato')}</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {t(album.title_en, album.title_ceb)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. THE 7 FLAGSHIP IMPACT METRICS OF TEAM KUMBATI (Proof & Transparency)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 mb-2">
              <span>{t('Audit-Verified Governance', 'Matinud-anong Pag-alagad')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight text-balance">
              {t('7 Flagship Impact Metrics of Team KUMBATI', '7 ka mga Nag-unang Sukod sa Kalampusan sa Team KUMBATI')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t(
                'Direct tangible assistance delivered across the 19 municipalities of Bohol District 3.',
                'Diretsong hinabang ug serbisyo nga naabot sa 19 ka mga lungsod sa Ikatulong Distrito.'
              )}
            </p>
          </div>

          <Link to="/impact" className="shrink-0 self-start sm:self-auto">
            <Button variant="outline" size="sm" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
              {t('View Detailed Impact Report', 'Tan-awa ang Tibuok Ulat')}
            </Button>
          </Link>
        </div>

        {/* Dynamic Responsive 7 Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {INITIAL_METRICS.map((metric) => (
            <StatCounter
              key={metric.id}
              numericValue={metric.value_numeric}
              suffix={metric.suffix}
              titleEn={metric.title_en}
              titleCeb={metric.title_ceb}
              category={metric.category}
              iconName={metric.icon_name}
              showDetails={false}
            />
          ))}

          {/* District 3 Summary Block as the 8th Tile - Unified Clean White Surface */}
          <div className="group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-7 border border-orange-200/80 border-t-white shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md bg-gradient-to-b from-white via-white/98 to-amber-50/25">
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-28 sm:h-28 bg-gradient-to-bl from-orange-100/40 via-amber-50/20 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div>
              <div className="flex items-center justify-between gap-1 mb-2.5 sm:mb-4 relative z-10">
                <Badge
                  variant="orange"
                  size="sm"
                  dot
                  className="text-[10px] sm:text-[11px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 shrink truncate max-w-[110px] sm:max-w-none font-bold"
                >
                  {t('100% COVERAGE', '100% SERBISYO')}
                </Badge>
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border border-orange-200/80 border-t-white flex items-center justify-center text-red-500 shadow-sinoog-inner group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-sinoog transition-all duration-300 shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 group-hover:fill-white transition-colors" />
                </div>
              </div>
              <div className="flex items-baseline gap-0.5 sm:gap-1 mb-1 sm:mb-2 relative z-10">
                <span className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-sans">
                  19 / 19
                </span>
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight sm:leading-snug mb-1 sm:mb-2 relative z-10 break-words">
                {t('Municipalities Served', 'Mga Lungsod nga Naalagaran')}
              </h3>
            </div>

            <div className="border-t border-orange-100/70 pt-2 sm:pt-3 mt-2 sm:mt-4 relative z-10">
              <Link
                to="/directory"
                className="text-[11px] sm:text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 sm:gap-1.5 transition-colors"
              >
                <span className="truncate">{t('Browse 19 Municipalities', 'Susiha ang 19 ka Lungsod')}</span>
                <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </Link>
            </div>
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
