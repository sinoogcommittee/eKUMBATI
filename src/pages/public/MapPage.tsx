import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_MAP_LOCATIONS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { LocationCategory, MapLocation } from '../../types/kumbati.types';
import DistrictLeafletMap from '../../components/maps/DistrictLeafletMap';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import {
  MapPin,
  Phone,
  Clock,
  Filter,
  AlertCircle,
  Building,
  HeartPulse,
  Home,
  Ambulance,
  Building2,
  Navigation,
  ExternalLink,
  Map as MapIcon,
} from 'lucide-react';

export const MapPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialTownParam = searchParams.get('town') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>('all');
  const [selectedTown, setSelectedTown] = useState<string>(initialTownParam);
  const [previewLocation, setPreviewLocation] = useState<MapLocation | null>(null);

  const filteredList = INITIAL_MAP_LOCATIONS.filter((loc) => {
    const matchCategory = selectedCategory === 'all' || loc.category === selectedCategory;
    const matchTown = selectedTown === 'all' || loc.municipality.toLowerCase() === selectedTown.toLowerCase();
    return matchCategory && matchTown && loc.is_active;
  });

  const getCategoryIcon = (category: LocationCategory) => {
    switch (category) {
      case 'clinic':
        return HeartPulse;
      case 'ptv_hub':
        return Ambulance;
      case 'tambayan':
        return HeartPulse;
      case 'pabahay_site':
        return Home;
      case 'municipal_hall':
        return Building2;
      case 'office':
      default:
        return Building;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =====================================================================
          1. MAP HERO BANNER
         ===================================================================== */}
      <section className="bg-gradient-to-b from-orange-50/80 via-amber-50/20 to-transparent pt-10 pb-8 border-b border-orange-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('Google Maps Geospatial District Facilities', 'Google Maps sa mga Pasilidad sa Distrito')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
              {t('Interactive District 3 Map & Facility Finder', 'Interactive nga Mapa sa Distrito 3')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              {t(
                'Explore the geographical distribution of district offices, Kumbati clinics, PTV 24/7 stations, dialysis haven, and municipal halls powered by Google Maps with free turn-by-turn navigation.',
                'Susiha ang nahimutangan sa mga opisina sa kongreso, klinika, sakyanan sa pasyente, tambayan sa dialysis, ug mga munisipyo pinaagi sa Google Maps nga may libreng direksyon sa biyahe.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. EMERGENCY DISPATCH ADVISORY
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sinoog-raised border border-red-400/30">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-200 shrink-0 animate-pulse" />
            <div className="text-xs sm:text-sm">
              <span className="font-black uppercase tracking-wider">
                {t('PTV Emergency Dispatch Notice', 'Pahibalo sa PTV Dispatch')}:{' '}
              </span>
              <span>
                {t(
                  'During medical emergencies, call the 24/7 hotline directly (+63 917 832 6284) rather than traveling to a station.',
                  'Panahon sa emerhensiya, tawag dayon sa hotline (+63 917 832 6284) aron daling ma-dispatch ang ambulansya.'
                )}
              </span>
            </div>
          </div>
          <a
            href="tel:+639178326284"
            className="px-5 py-2.5 rounded-full bg-white text-red-600 font-black text-xs shrink-0 text-center hover:bg-red-50 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[40px] flex items-center justify-center"
          >
            {t('Call 0917-832-6284', 'Tawag 0917-832-6284')}
          </a>
        </div>
      </section>

      {/* =====================================================================
          3. FULL GOOGLE MAPS LEAFLET VIEWPORT
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <MapIcon className="w-3.5 h-3.5 text-orange-600" />
            <span>{t('Powered by Google Maps (Roadmap, Satellite & Terrain)', 'Gipadagan sa Google Maps (Kalsada, Satelayt ug Terrain)')}</span>
          </span>
          <span className="text-[11px] text-slate-400">
            {t('Free & Open Navigation', 'Libreng Direksyon')}
          </span>
        </div>

        <DistrictLeafletMap
          height="580px"
          initialTown={selectedTown}
          initialCategory={selectedCategory}
        />
      </section>

      {/* =====================================================================
          4. FACILITY DIRECTORY CARDS WITH GOOGLE MAPS DIRECTIONS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {t('Catalog of District Locations', 'Listahan sa mga Lokasyon')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {filteredList.length} {t('registered physical facilities with verified GPS coordinates', 'mga pasilidad nga may kumpirmadong GPS')}
            </p>
          </div>

          {/* Quick Town Filter for Directory Cards */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-orange-600 shrink-0" />
            <select
              value={selectedTown}
              onChange={(e) => setSelectedTown(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            >
              <option value="all">{t('All Municipalities', 'Tanan nga Lungsod')}</option>
              {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills for Catalog */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {[
            { value: 'all', labelEn: 'All Types', labelCeb: 'Tanan' },
            { value: 'office', labelEn: 'Offices', labelCeb: 'Opisina' },
            { value: 'clinic', labelEn: 'Clinics', labelCeb: 'Klinika' },
            { value: 'ptv_hub', labelEn: 'PTV Hubs', labelCeb: 'PTV' },
            { value: 'tambayan', labelEn: 'Tambayan', labelCeb: 'Tambayan' },
            { value: 'pabahay_site', labelEn: 'Pabahay', labelCeb: 'Pabahay' },
            { value: 'municipal_hall', labelEn: 'Municipal Halls', labelCeb: 'Munisipyo' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value as LocationCategory | 'all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sinoog font-black'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50/50 shadow-2xs'
              }`}
            >
              {t(cat.labelEn, cat.labelCeb)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((loc) => {
            const IconComponent = getCategoryIcon(loc.category);

            return (
              <div
                key={loc.id}
                className="bg-white/95 rounded-3xl border border-orange-200/70 p-6 sm:p-7 shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={loc.category === 'clinic' ? 'red' : 'orange'} size="sm">
                      {loc.municipality}
                    </Badge>
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shadow-2xs">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 leading-snug mb-2">
                    {t(loc.title_en, loc.title_ceb)}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>

                    {loc.operating_hours && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{loc.operating_hours}</span>
                      </div>
                    )}
                  </div>

                  {(loc.description_en || loc.description_ceb) && (
                    <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                      {t(loc.description_en || '', loc.description_ceb || '')}
                    </p>
                  )}
                </div>

                {/* Card Actions: Phone + Google Maps Navigation */}
                <div className="pt-4 mt-2 space-y-2 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    {loc.phone ? (
                      <a
                        href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-full bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-700 font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[40px]"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{t('Call', 'Tawag')}</span>
                      </a>
                    ) : (
                      <div />
                    )}

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[40px]"
                      title="Open Google Maps Turn-by-Turn Directions"
                    >
                      <Navigation className="w-3.5 h-3.5 text-blue-600 hover:text-white" />
                      <span>{t('Google Maps', 'Direksyon')}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPreviewLocation(loc)}
                    className="w-full text-center text-[11px] font-bold text-slate-500 hover:text-orange-600 transition-colors py-1 cursor-pointer"
                  >
                    {t('Preview Google Maps Satellite View', 'I-preview sa Google Maps')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          5. GOOGLE MAPS EMBED PREVIEW MODAL (FREE, ZERO API KEY REQUIRED)
         ===================================================================== */}
      {previewLocation && (
        <Modal
          isOpen={!!previewLocation}
          onClose={() => setPreviewLocation(null)}
          title={t(previewLocation.title_en, previewLocation.title_ceb)}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold text-orange-600">{previewLocation.municipality}</span>
              <span>GPS: {previewLocation.latitude.toFixed(4)}, {previewLocation.longitude.toFixed(4)}</span>
            </div>

            {/* Free Google Maps Embed Iframe */}
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe
                title={previewLocation.title_en}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${previewLocation.latitude},${previewLocation.longitude}&t=m&z=15&output=embed&iwloc=near`}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {previewLocation.address}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${previewLocation.latitude},${previewLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('Open Full Google Maps App', 'Ablihi sa Google Maps App')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {previewLocation.phone && (
                <a
                  href={`tel:${previewLocation.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{previewLocation.phone}</span>
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MapPage;
