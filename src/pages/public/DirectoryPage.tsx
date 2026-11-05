import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  BOHOL_DISTRICT_3_TOWNS,
  INITIAL_HOTLINES,
} from '../../lib/constants';
import Badge from '../../components/common/Badge';
import { Card, SearchBar, Chip } from '../../components/m3';
import { useToast } from '../../context/ToastContext';
import { triggerHaptic } from '../../lib/haptics';
import {
  Phone,
  PhoneCall,
  MapPin,
  AlertCircle,
  Copy,
  Check,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Building2,
  Ambulance,
  Heart,
  Stethoscope,
} from 'lucide-react';

export const DirectoryPage: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const initialTownParam = searchParams.get('town') || '';

  const [searchTerm, setSearchTerm] = useState(initialTownParam);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [activeTown, setActiveTown] = useState<string | null>(initialTownParam || null);

  useEffect(() => {
    const townParam = searchParams.get('town');
    if (townParam) {
      setSearchTerm(townParam);
      setActiveTown(townParam);
      const slug = townParam.toLowerCase().replace(/\s+/g, '-');
      setTimeout(() => {
        const el = document.getElementById(`town-${slug}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }
  }, [searchParams]);

  // Clean phone number for click-to-call tel: links
  const getTelHref = (phone: string) => {
    const cleaned = phone.replace(/[^0-9+]/g, '');
    return `tel:${cleaned}`;
  };

  const handleCopy = (num: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    showToast(t(`Copied ${num} to clipboard!`, `Nahi-kopya ang ${num}!`), 'success');
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const handleQuickJump = (town: string) => {
    triggerHaptic('light');
    setActiveTown(town);
    // If a search query is active and excludes this town, clear it so the target card is rendered
    if (searchTerm.trim() && !town.toLowerCase().includes(searchTerm.toLowerCase().trim())) {
      setSearchTerm('');
    }
    const slug = town.toLowerCase().replace(/\s+/g, '-');
    setTimeout(() => {
      const el = document.getElementById(`town-${slug}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Filter 19 towns dynamically in real-time
  const filteredTowns = BOHOL_DISTRICT_3_TOWNS.filter((town) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      town.toLowerCase().includes(searchTerm.toLowerCase().trim());
    return matchesSearch;
  });

  // Group hotlines by municipality
  const getTownHotlines = (town: string) => {
    return INITIAL_HOTLINES.filter((h) => {
      const matchTown = h.municipality.toLowerCase() === town.toLowerCase();
      const matchEmergency = !emergencyOnly || h.is_emergency;
      return matchTown && matchEmergency;
    });
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-32 sm:pb-36">
      {/* =====================================================================
          1. DIRECTORY HERO BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/90 via-amber-50/30 to-transparent pt-10 pb-12 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Official District Directory', 'Direktoryo sa Distrito')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-3 leading-tight">
              {t('19-Town Municipal Directory & Emergency Hotlines', 'Direktoryo sa 19 ka Lungsod ug mga Hotline')}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-3 sm:mt-4 leading-relaxed font-medium">
              {t(
                'Direct click-to-call contact information for Municipal Halls, MDRRMO rescue units, Rural Health Units (RHU), local police stations, and Congressional District offices across all 19 towns of Bohol District 3.',
                'Diretsong tawag sa mga Munisipyo, MDRRMO rescue, Rural Health Units, estasyon sa kapulisan, ug mga buhatan sa kongreso sa 19 ka mga lungsod sa Ikatulong Distrito sa Bohol.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. STREAMLINED PRIORITY 24/7 EMERGENCY & DISPATCH BANNER (COMPACT 2x2)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white rounded-3xl p-5 sm:p-7 shadow-sinoog-raised border border-red-400/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Banner Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 relative z-10 border-b border-white/15 pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-200 animate-pulse" />
              <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                {t('Priority 24/7 Emergency & Dispatch Hotlines', 'Dinaliang mga Hotline sa Emerhensiya 24/7')}
              </h2>
            </div>
            <span className="text-xs text-amber-100 font-semibold">
              {t('Tap any phone button to call instantly', 'Pindota ang buton aron makatawag dayon')}
            </span>
          </div>

          {/* Streamlined Compact 2x2 Grid (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
            {/* 1. PTV Dispatch */}
            <div className="bg-white/12 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xs flex flex-col justify-between hover:bg-white/18 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 flex items-center gap-1">
                    <Ambulance className="w-3.5 h-3.5" />
                    <span>24/7 Patient Transit</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-800/80 text-white text-[9px] font-extrabold uppercase">
                    Urgent
                  </span>
                </div>
                <h3 className="text-sm font-black text-white leading-tight">
                  PTV Emergency Dispatch
                </h3>
                <div className="text-sm sm:text-base font-black text-white mt-1 mb-3 font-mono">
                  0917-832-6284
                </div>
              </div>
              <a
                href={getTelHref('+639178326284')}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-white text-red-600 font-black text-xs hover:bg-red-50 shadow-sinoog hover:shadow-sinoog-hover active:scale-98 transition-all min-h-[40px]"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                <span>{t('Call PTV Dispatch', 'Tawag sa PTV')}</span>
              </a>
            </div>

            {/* 2. Candijay District HQ */}
            <div className="bg-white/12 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xs flex flex-col justify-between hover:bg-white/18 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>District Headquarters</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-800/80 text-white text-[9px] font-extrabold uppercase">
                    Official
                  </span>
                </div>
                <h3 className="text-sm font-black text-white leading-tight">
                  Candijay Main Office
                </h3>
                <div className="text-sm sm:text-base font-black text-white mt-1 mb-3 font-mono">
                  (038) 526-0123
                </div>
              </div>
              <a
                href={getTelHref('(038) 526-0123')}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-white text-orange-600 font-black text-xs hover:bg-orange-50 shadow-sinoog hover:shadow-sinoog-hover active:scale-98 transition-all min-h-[40px]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t('Call Main Office', 'Tawag sa Opisina')}</span>
              </a>
            </div>

            {/* 3. Tambayan ni Kumbati */}
            <div className="bg-white/12 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xs flex flex-col justify-between hover:bg-white/18 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Dialysis Haven</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-900/80 text-white text-[9px] font-extrabold uppercase">
                    Tagbilaran
                  </span>
                </div>
                <h3 className="text-sm font-black text-white leading-tight">
                  Tambayan ni Kumbati
                </h3>
                <div className="text-sm sm:text-base font-black text-white mt-1 mb-3 font-mono">
                  0919-443-2199
                </div>
              </div>
              <a
                href={getTelHref('+639194432199')}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-white text-purple-700 font-black text-xs hover:bg-purple-50 shadow-sinoog hover:shadow-sinoog-hover active:scale-98 transition-all min-h-[40px]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t('Call Haven', 'Tawag sa Tambayan')}</span>
              </a>
            </div>

            {/* 4. Kumbati Medical Clinic */}
            <div className="bg-white/12 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xs flex flex-col justify-between hover:bg-white/18 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Free Consultations</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-white text-[9px] font-extrabold uppercase">
                    Free Clinic
                  </span>
                </div>
                <h3 className="text-sm font-black text-white leading-tight">
                  Kumbati Medical Clinic
                </h3>
                <div className="text-sm sm:text-base font-black text-white mt-1 mb-3 font-mono">
                  0917-558-2210
                </div>
              </div>
              <a
                href={getTelHref('+639175582210')}
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-white text-emerald-700 font-black text-xs hover:bg-emerald-50 shadow-sinoog hover:shadow-sinoog-hover active:scale-98 transition-all min-h-[40px]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t('Call Clinic', 'Tawag sa Klinika')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SEARCH, EMERGENCY FILTER & 19-TOWN QUICK-JUMP PILL GRID
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border border-orange-200/80 shadow-sinoog backdrop-blur-md space-y-4">
          {/* Top Row: Search Input & Emergency Lines Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <search className="flex-1 max-w-lg">
              <SearchBar
                label={t('Search municipality', 'Pangitaa ang lungsod')}
                placeholder={t(
                  'Search any of the 19 towns (e.g. Carmen, Jagna, Anda, Candijay)...',
                  'Pangitaa ang bisan kinsa sa 19 ka lungsod (e.g. Carmen, Jagna, Anda)...'
                )}
                value={searchTerm}
                onValueChange={(val) => {
                  setSearchTerm(val);
                  if (!val.trim()) setActiveTown(null);
                }}
              />
            </search>

            <div className="flex items-center gap-3 shrink-0">
              <Chip
                variant="filter"
                selected={emergencyOnly}
                onClick={() => setEmergencyOnly(!emergencyOnly)}
                leadingIcon={<ShieldAlert className="w-4 h-4 text-red-600" />}
              >
                {t('Emergency Lines Only', 'Emergency Lines Lamang')}
              </Chip>
            </div>
          </div>

          {/* Quick-Jump Municipal Pill Grid (All 19 Towns) */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>{t('Quick Jump to Municipality (19 Towns)', 'Diretsong Pili sa Lungsod (19 ka Lungsod)')}:</span>
              </span>

              <span className="text-xs text-slate-500 font-semibold">
                {filteredTowns.length} / 19 {t('Towns', 'ka Lungsod')}
              </span>
            </div>

            {/* 19 Town Pills: Responsive Wrapped Grid */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              {BOHOL_DISTRICT_3_TOWNS.map((town) => {
                const isSelected = activeTown?.toLowerCase() === town.toLowerCase();

                return (
                  <button
                    key={town}
                    type="button"
                    onClick={() => handleQuickJump(town)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs min-h-[34px] ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-sinoog font-black ring-2 ring-orange-300'
                        : 'bg-slate-50 hover:bg-orange-50/80 text-slate-700 hover:text-orange-700 border border-slate-200/80 hover:border-orange-300'
                    }`}
                  >
                    <span>{town}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Search Result Bar & Reset Filter Action */}
          {searchTerm.trim() && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span>{t('Matching', 'Nakit-an')}:</span>
                <span className="font-bold text-orange-600">
                  {filteredTowns.length} {t('of 19 municipalities', 'sa 19 ka mga lungsod')}
                </span>
                <span className="italic text-slate-500">&ldquo;{searchTerm.trim()}&rdquo;</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setActiveTown(null);
                }}
                className="inline-flex items-center gap-1 font-bold text-orange-600 hover:text-orange-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('Clear Search', 'I-reset ang Pangita')}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          4. 19-TOWN MUNICIPAL DIRECTORY CARDS GRID
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTowns.length === 0 ? (
          <div className="p-10 sm:p-14 text-center bg-white rounded-3xl border border-orange-100 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {t('No municipality matched your search', 'Walay lungsod nga nitukma sa imong gipangita')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              {t(
                'Please check the town spelling or select from the quick-jump pills above.',
                'Palihug susiha ang spelling o pilia ang usa sa 19 ka lungsod sa ibabaw.'
              )}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveTown(null);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 shadow-sinoog cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('Show All 19 Towns', 'Ipakita ang Tanan nga 19 ka Lungsod')}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTowns.map((town) => {
              const hotlines = getTownHotlines(town);
              const slug = town.toLowerCase().replace(/\s+/g, '-');
              const isTownActive = activeTown?.toLowerCase() === town.toLowerCase();

              return (
                <Card
                  key={town}
                  id={`town-${slug}`}
                  as="article"
                  variant="filled"
                  className={`p-6 sm:p-7 flex flex-col justify-between scroll-mt-32 rounded-3xl border border-orange-200/80 border-t-white bg-gradient-to-b from-white via-white/98 to-amber-50/20 shadow-sinoog hover:shadow-sinoog-hover transition-all duration-300 ${
                    isTownActive ? 'ring-2 ring-orange-500 shadow-sinoog-raised' : ''
                  }`}
                >
                  <div>
                    {/* Town Header Card: Icon, Name, and Interactive Map Deep Link */}
                    <div className="flex items-center justify-between mb-4 border-b border-orange-100/70 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-black text-base shadow-sinoog">
                          {town.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-900 leading-tight">
                            {town}
                          </h3>
                          <span className="text-[11px] text-slate-500 font-semibold">
                            Bohol 3rd District
                          </span>
                        </div>
                      </div>

                      {/* Direct Click-through to Interactive District Map focused on this town */}
                      <Link
                        to={`/map?town=${encodeURIComponent(town)}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-500 text-xs font-bold text-orange-700 hover:text-white transition-all shadow-2xs hover:shadow-xs group/map"
                        title={t(`View ${town} on Interactive Map`, `Tan-awa ang ${town} sa Mapa`)}
                      >
                        <MapPin className="w-3.5 h-3.5 text-orange-600 group-hover/map:text-white transition-colors" />
                        <span>{t('Map', 'Mapa')}</span>
                        <ExternalLink className="w-3 h-3 text-orange-400 group-hover/map:text-white transition-colors" />
                      </Link>
                    </div>

                    {/* Registered Hotline Lines for this Municipality */}
                    <div className="space-y-3 my-3">
                      {hotlines.length > 0 ? (
                        hotlines.map((h) => (
                          <div
                            key={h.id}
                            className="p-3.5 rounded-2xl bg-white border border-orange-200/80 border-t-white shadow-sinoog-inner space-y-2"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-extrabold text-slate-900 leading-snug">
                                {t(h.office_name_en, h.office_name_ceb)}
                              </span>
                              {h.is_emergency && (
                                <Badge variant="red" size="sm">
                                  24/7
                                </Badge>
                              )}
                            </div>

                            {/* Click-to-Call Phone Numbers List */}
                            <div className="flex flex-col gap-1.5 pt-1">
                              {h.phone_numbers.map((phoneNum, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between gap-2 p-1.5 px-2.5 rounded-xl bg-orange-50/50 hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-colors"
                                >
                                  {/* Direct tel: Hyperlink */}
                                  <a
                                    href={getTelHref(phoneNum)}
                                    className="font-bold text-xs text-orange-900 hover:text-orange-600 inline-flex items-center gap-1.5 font-mono"
                                    title={t(`Call ${phoneNum}`, `Tawagan ang ${phoneNum}`)}
                                  >
                                    <Phone className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                    <span>{phoneNum}</span>
                                  </a>

                                  {/* Copy Button */}
                                  <button
                                    type="button"
                                    onClick={(e) => handleCopy(phoneNum, e)}
                                    className="p-1 rounded-md text-slate-400 hover:text-orange-600 hover:bg-white transition-all cursor-pointer relative"
                                    title={copiedNumber === phoneNum ? t('Copied!', 'Nahi-kopya!') : t('Copy Number', 'Kopyaha ang numero')}
                                    aria-label={`Copy ${phoneNum}`}
                                  >
                                    {copiedNumber === phoneNum ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 text-center space-y-1">
                          <p className="font-semibold text-slate-700">
                            {t('Direct lines active via District HQ', 'Gikonektar sa District HQ')}
                          </p>
                          <a
                            href={getTelHref('(038) 526-0123')}
                            className="inline-flex items-center gap-1 text-orange-600 font-bold hover:underline font-mono"
                          >
                            <Phone className="w-3 h-3" />
                            <span>(038) 526-0123</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Quick Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {t('19 Towns of Bohol 3', '19 ka Lungsod sa Bohol 3')}
                    </span>
                    <Link
                      to={`/action-center?town=${encodeURIComponent(town)}`}
                      className="font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-0.5"
                    >
                      <span>{t('Action Desk', 'Sentro sa Aksyon')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default DirectoryPage;
