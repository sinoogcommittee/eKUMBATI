import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_MAP_LOCATIONS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { LocationCategory } from '../../types/kumbati.types';
import DistrictLeafletMap from '../../components/maps/DistrictLeafletMap';
import Badge from '../../components/common/Badge';
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
} from 'lucide-react';

export const MapPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialTownParam = searchParams.get('town') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>('all');
  const [selectedTown, setSelectedTown] = useState<string>(initialTownParam);

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
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* =====================================================================
          1. MAP HERO BANNER
         ===================================================================== */}
      <section className="bg-white border-b border-slate-200/80 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="orange" size="sm" dot>
              {t('Geospatial District Facilities', 'Mapa sa mga Pasilidad')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mt-2">
              {t('Interactive District 3 Map & Facility Finder', 'Interactive nga Mapa sa Distrito 3')}
            </h1>
            <p className="text-base text-slate-600 mt-3 leading-relaxed font-normal">
              {t(
                'Explore the geographical distribution of district offices, Kumbati clinics, PTV 24/7 stations, dialysis haven, and municipal halls across all 19 towns.',
                'Susiha ang nahimutangan sa mga opisina sa kongreso, klinika, sakyanan sa pasyente, tambayan sa dialysis, ug mga munisipyo sa tibuok distrito.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. EMERGENCY DISPATCH ADVISORY
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-card">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
            <div className="text-xs sm:text-sm font-normal">
              <span className="font-medium text-white">
                {t('PTV Emergency Dispatch Notice', 'Pahibalo sa PTV Dispatch')}:{' '}
              </span>
              <span className="text-slate-300">
                {t(
                  'During medical emergencies, call the 24/7 hotline directly (+63 917 832 6284) rather than traveling to a station.',
                  'Panahon sa emerhensiya, tawag dayon sa hotline (+63 917 832 6284) aron daling ma-dispatch ang ambulansya.'
                )}
              </span>
            </div>
          </div>
          <a
            href="tel:+639178326284"
            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-xs shrink-0 text-center transition-colors shadow-subtle"
          >
            {t('Call 0917-832-6284', 'Tawag 0917-832-6284')}
          </a>
        </div>
      </section>

      {/* =====================================================================
          3. FULL LEAFLET MAP VIEWPORT
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DistrictLeafletMap
          height="560px"
          initialTown={selectedTown}
          initialCategory={selectedCategory}
        />
      </section>

      {/* =====================================================================
          4. FACILITY DIRECTORY CARDS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
              {t('Catalog of District Locations', 'Listahan sa mga Lokasyon')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {filteredList.length} {t('registered physical facilities', 'mga pasilidad')}
            </p>
          </div>

          {/* Quick Town Filter for Directory Cards */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={selectedTown}
              onChange={(e) => setSelectedTown(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
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
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-6">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 border ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white border-slate-900 shadow-subtle'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t(cat.labelEn, cat.labelCeb)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((loc) => {
            const IconComponent = getCategoryIcon(loc.category);

            return (
              <div
                key={loc.id}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-card hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={loc.category === 'clinic' ? 'red' : 'orange'} size="sm">
                      {loc.municipality}
                    </Badge>
                    <div className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200/60 text-slate-600 flex items-center justify-center">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2">
                    {t(loc.title_en, loc.title_ceb)}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-3 font-normal">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
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
                    <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2.5 font-normal">
                      {t(loc.description_en || '', loc.description_ceb || '')}
                    </p>
                  )}
                </div>

                {loc.phone && (
                  <div className="pt-3 mt-1">
                    <a
                      href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium text-xs transition-colors border border-slate-200"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span className="tabular-nums">{loc.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MapPage;
