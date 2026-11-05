import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  BOHOL_DISTRICT_3_TOWNS,
  INITIAL_HOTLINES,
} from '../../lib/constants';
import Badge from '../../components/common/Badge';
import {
  Phone,
  Search,
  MapPin,
  AlertCircle,
  Copy,
  Check,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';

export const DirectoryPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialTownParam = searchParams.get('town') || '';

  const [searchTerm, setSearchTerm] = useState(initialTownParam);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // Filter 19 towns
  const filteredTowns = BOHOL_DISTRICT_3_TOWNS.filter((town) =>
    town.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group hotlines by municipality
  const getTownHotlines = (town: string) => {
    return INITIAL_HOTLINES.filter((h) => {
      const matchTown = h.municipality.toLowerCase() === town.toLowerCase();
      const matchEmergency = !emergencyOnly || h.is_emergency;
      return matchTown && matchEmergency;
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =====================================================================
          1. DIRECTORY HERO BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/80 via-amber-50/20 to-transparent pt-10 pb-12 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Official District Directory', 'Direktoryo sa Distrito')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
              {t('19-Town Municipal Directory & Emergency Hotlines', 'Direktoryo sa 19 ka Lungsod ug mga Hotline')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              {t(
                'Direct contact information for Municipal Halls, MDRRMO rescue responders, Rural Health Units (RHU), and Congressional District offices across Bohol District 3.',
                'Diretsong numero sa telepono sa mga Munisipyo, MDRRMO rescue, Rural Health Units, ug mga buhatan sa kongreso sa 19 ka mga lungsod.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. PRIORITY DISTRICT-WIDE 24/7 HOTLINES CAROUSEL / CARDS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-sinoog-raised border border-red-400/30">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-200 animate-pulse" />
            <h2 className="text-lg font-black uppercase tracking-wider text-white">
              {t('Priority 24/7 Emergency & Dispatch Numbers', 'Dinaliang mga Numero sa Emerhensiya 24/7')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* PTV Dispatch */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                24/7 Patient Transit
              </span>
              <h3 className="text-sm font-black text-white mt-1">PTV Emergency Dispatch</h3>
              <div className="text-base font-extrabold text-white mt-2 mb-3">
                +63 917 832 6284
              </div>
              <a
                href="tel:+639178326284"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-4 rounded-full bg-white text-red-600 font-bold text-xs hover:bg-red-50 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[38px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('Call Now', 'Tawag Na')}</span>
              </a>
            </div>

            {/* Candijay District Headquarters */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                Congressional HQ
              </span>
              <h3 className="text-sm font-black text-white mt-1">Candijay Main Office</h3>
              <div className="text-base font-extrabold text-white mt-2 mb-3">
                (038) 526-0123
              </div>
              <a
                href="tel:0385260123"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-4 rounded-full bg-white text-orange-600 font-bold text-xs hover:bg-orange-50 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[38px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('Call Office', 'Tawag sa Opisina')}</span>
              </a>
            </div>

            {/* Tambayan ni Kumbati */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                Dialysis Haven
              </span>
              <h3 className="text-sm font-black text-white mt-1">Tambayan ni Kumbati</h3>
              <div className="text-base font-extrabold text-white mt-2 mb-3">
                +63 919 443 2199
              </div>
              <a
                href="tel:+639194432199"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-4 rounded-full bg-white text-purple-700 font-bold text-xs hover:bg-purple-50 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[38px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('Call Haven', 'Tawag sa Tambayan')}</span>
              </a>
            </div>

            {/* Kumbati Clinic */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                Free Clinic & Rx
              </span>
              <h3 className="text-sm font-black text-white mt-1">Kumbati Medical Clinic</h3>
              <div className="text-base font-extrabold text-white mt-2 mb-3">
                +63 917 558 2210
              </div>
              <a
                href="tel:+639175582210"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-4 rounded-full bg-white text-emerald-700 font-bold text-xs hover:bg-emerald-50 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[38px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('Call Clinic', 'Tawag sa Klinika')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SEARCH & 19 TOWNS CARDS GRID
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Toggle Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={t('Search municipality (e.g. Carmen, Jagna, Anda)...', 'Pangitaa ang lungsod (e.g. Carmen, Jagna, Anda)...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setEmergencyOnly(!emergencyOnly)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[44px] ${
                emergencyOnly
                  ? 'bg-red-600 text-white shadow-sinoog'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t('Emergency Lines Only', 'Emergency Lines Lamang')}</span>
            </button>
          </div>
        </div>

        {/* 19 Town Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTowns.map((town) => {
            const hotlines = getTownHotlines(town);

            return (
              <div
                key={town}
                className="bg-white/95 rounded-3xl border border-orange-200/70 p-6 sm:p-7 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  {/* Town Header */}
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm shadow-2xs">
                        {town.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900">
                          {town}
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Bohol 3rd District
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/map?town=${encodeURIComponent(town)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 text-xs font-bold text-orange-600 transition-colors"
                      title={t('View on Map', 'Tan-awa sa Mapa')}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t('Map', 'Mapa')}</span>
                    </Link>
                  </div>

                  {/* Registered Directory Lines */}
                  <div className="space-y-3 my-4">
                    {hotlines.length > 0 ? (
                      hotlines.map((h) => (
                        <div
                          key={h.id}
                          className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-100 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">
                              {t(h.office_name_en, h.office_name_ceb)}
                            </span>
                            {h.is_emergency && (
                              <Badge variant="red" size="sm">
                                24/7
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {h.phone_numbers.map((phoneNum, idx) => (
                              <div
                                key={idx}
                                className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-lg text-xs"
                              >
                                <a
                                  href={`tel:${phoneNum.replace(/[^0-9+]/g, '')}`}
                                  className="font-bold text-slate-800 hover:text-orange-600"
                                >
                                  {phoneNum}
                                </a>
                                <button
                                  onClick={() => handleCopy(phoneNum)}
                                  className="p-0.5 text-slate-400 hover:text-slate-700"
                                  title="Copy"
                                >
                                  {copiedNumber === phoneNum ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 text-center">
                        {t(
                          'Direct hotline being updated. Contact District HQ: (038) 526-0123',
                          'Gisusi pa ang linya. Tawag sa District HQ: (038) 526-0123'
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer link to programs */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {t('LGU District 3', 'Munisipyo sa Distrito 3')}
                  </span>
                  <Link
                    to={`/programs`}
                    className="font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-0.5"
                  >
                    <span>{t('View Programs', 'Mga Programa')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DirectoryPage;
