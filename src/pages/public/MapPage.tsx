import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { INITIAL_MAP_LOCATIONS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { LocationCategory, MapLocation } from '../../types/kumbati.types';
import DistrictLeafletMap, { GoogleMapType } from '../../components/maps/DistrictLeafletMap';
import Badge from '../../components/common/Badge';
import {
  MapPin,
  Phone,
  Clock,
  Filter,
  HeartPulse,
  Home,
  Ambulance,
  Building2,
  Navigation,
  ExternalLink,
  Map as MapIcon,
  Search,
  X,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const MapPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTownParam = searchParams.get('town') || 'all';
  const initialCategoryParam = (searchParams.get('category') as LocationCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>(initialCategoryParam);
  const [selectedTown, setSelectedTown] = useState<string>(initialTownParam);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapType, setMapType] = useState<GoogleMapType>('roadmap');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  // Sync state if URL query param changes
  useEffect(() => {
    const town = searchParams.get('town');
    if (town) {
      setSelectedTown(town);
    }
  }, [searchParams]);

  // Select initial location if town parameter is present
  useEffect(() => {
    if (selectedTown !== 'all') {
      const match = INITIAL_MAP_LOCATIONS.find(
        (l) => l.municipality.toLowerCase() === selectedTown.toLowerCase()
      );
      if (match) {
        setSelectedLocation(match);
      }
    }
  }, [selectedTown]);

  const categoryFilters: { value: LocationCategory | 'all'; labelEn: string; labelCeb: string }[] = [
    { value: 'all', labelEn: 'All Facilities', labelCeb: 'Tanan nga Pasilidad' },
    { value: 'office', labelEn: 'Congressional Offices', labelCeb: 'Opisina sa Kongreso' },
    { value: 'clinic', labelEn: 'Kumbati Clinics', labelCeb: 'Kumbati Klinika' },
    { value: 'ptv_hub', labelEn: 'PTV Dispatch', labelCeb: 'Istasyon sa PTV' },
    { value: 'tambayan', labelEn: 'Dialysis Tambayan', labelCeb: 'Tambayan sa Dialysis' },
    { value: 'pabahay_site', labelEn: 'Pabahay Sites', labelCeb: 'Pabahay' },
    { value: 'municipal_hall', labelEn: 'Municipal Halls', labelCeb: 'Mga Munisipyo' },
  ];

  const filteredList = useMemo(() => {
    return INITIAL_MAP_LOCATIONS.filter((loc) => {
      const matchCategory = selectedCategory === 'all' || loc.category === selectedCategory;
      const matchTown = selectedTown === 'all' || loc.municipality.toLowerCase() === selectedTown.toLowerCase();
      const matchSearch =
        searchQuery.trim() === '' ||
        loc.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.title_ceb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.municipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchTown && matchSearch && loc.is_active;
    });
  }, [selectedCategory, selectedTown, searchQuery]);

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
        return Building2;
    }
  };

  const getCategoryColor = (category: LocationCategory) => {
    switch (category) {
      case 'clinic':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'ptv_hub':
        return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'tambayan':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'pabahay_site':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'municipal_hall':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'office':
      default:
        return 'bg-orange-50 text-orange-600 border-orange-200';
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedTown('all');
    setSearchQuery('');
    setSelectedLocation(null);
    setSearchParams({});
  };

  return (
    <div className="w-full max-w-full overflow-hidden p-3 sm:p-4 lg:p-6 flex flex-col h-auto lg:h-[calc(100vh-108px)] lg:max-h-[960px]">
      {/* =====================================================================
          1. UNIFIED TOP CONTROL & FILTER STRIP (ONE SCREEN VIEW HEADER)
         ===================================================================== */}
      <div className="bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-orange-200/80 border-t-white p-3.5 sm:p-4 shadow-sinoog flex flex-col gap-3 shrink-0">
        {/* Row 1: Brand, Status, Emergency Dial & Map Layers */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Portal Title & Active Count */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-sinoog shrink-0">
              <MapIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-none">
                  {t('District 3 Geospatial Facilities', 'Mapa sa mga Pasilidad sa Distrito 3')}
                </h1>
                <Badge variant="orange" size="sm">
                  {filteredList.length} {t('Facilities', 'Pasilidad')}
                </Badge>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {t(
                  '19 Municipalities • Free Google Maps Navigation',
                  '19 ka Lungsod • Libreng Direksyon sa Google Maps'
                )}
              </span>
            </div>
          </div>

          {/* Quick Emergency Dispatch Action & Google Layer Selector */}
          <div className="flex items-center gap-2 ml-auto">
            {/* PTV Emergency Call Button */}
            <a
              href="tel:+639178326284"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
              title="PTV 24/7 Dispatch Dispatch Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce shrink-0" />
              <span className="hidden sm:inline">PTV 24/7:</span>
              <span>0917-832-6284</span>
            </a>

            {/* Google Map Type Switcher */}
            <div className="inline-flex p-0.5 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setMapType('roadmap')}
                title="Google Maps Roadmap (Streets)"
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mapType === 'roadmap'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Roadmap
              </button>
              <button
                type="button"
                onClick={() => setMapType('satellite')}
                title="Google Satellite Imagery"
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mapType === 'satellite'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Satellite
              </button>
              <button
                type="button"
                onClick={() => setMapType('terrain')}
                title="Google Terrain (Topography)"
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mapType === 'terrain'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Terrain
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Search, Category Pills & Town Dropdown */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
          {/* Category Filter Pills (Scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('Filter', 'Salain')}:</span>
            </div>
            {categoryFilters.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sinoog font-black'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50/70 hover:border-orange-300'
                }`}
              >
                {t(cat.labelEn, cat.labelCeb)}
              </button>
            ))}
          </div>

          {/* Search & Town Dropdown Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('Search facility...', 'Pangitaa ang pasilidad...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Town Selector */}
            <select
              value={selectedTown}
              onChange={(e) => setSelectedTown(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-2xs"
            >
              <option value="all">{t('All 19 Towns', 'Tanan nga 19 ka Lungsod')}</option>
              {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>

            {/* Clear All Filters Button */}
            {(selectedCategory !== 'all' || selectedTown !== 'all' || searchQuery.trim() !== '') && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:text-orange-600 hover:border-orange-200 transition-colors"
                title={t('Reset Filters', 'I-reset')}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MAIN SPLIT SCREEN: DETAILS SIDEBAR + INTERACTIVE MAP (ONE SCREEN VIEW)
         ===================================================================== */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 min-h-0 overflow-hidden mt-3">
        {/* ===================================================================
            LEFT COLUMN: DETAILS SIDEBAR (SCROLLABLE FEED & SELECTED SPOTLIGHT)
           =================================================================== */}
        <div className="lg:col-span-5 xl:col-span-4 h-full flex flex-col min-h-0 bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-orange-200/80 border-t-white shadow-sinoog overflow-hidden">
          {/* Details Sidebar Header */}
          <div className="px-4 sm:px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-orange-50/40 shrink-0">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-600" />
              <h2 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                {selectedLocation
                  ? t('Facility Details', 'Detalye sa Pasilidad')
                  : t('Facility Directory', 'Listahan sa Pasilidad')}
              </h2>
            </div>

            {selectedLocation ? (
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-[11px] font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{t('View All', 'Tan-awa Tanan')}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-[11px] text-slate-500 font-semibold">
                {filteredList.length} {t('results', 'resulta')}
              </span>
            )}
          </div>

          {/* Scrollable Details Feed */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 min-h-0">
            {/* ACTIVE SELECTED FACILITY SPOTLIGHT CARD */}
            {selectedLocation && (
              <div className="bg-gradient-to-b from-orange-50/80 via-white to-amber-50/30 rounded-2xl p-4 sm:p-5 border-2 border-orange-400/80 shadow-sinoog space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant={selectedLocation.category === 'clinic' ? 'red' : 'orange'} size="sm">
                      {selectedLocation.municipality}
                    </Badge>
                    <span className="text-[10px] uppercase font-bold text-slate-500 px-2 py-0.5 bg-white rounded-md border border-slate-200 shadow-2xs">
                      {selectedLocation.category.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>GPS Active</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {t(selectedLocation.title_en, selectedLocation.title_ceb)}
                  </h3>
                  <div className="flex items-start gap-1.5 text-xs text-slate-600 mt-2">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{selectedLocation.address}</span>
                  </div>
                  {selectedLocation.operating_hours && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{selectedLocation.operating_hours}</span>
                    </div>
                  )}
                </div>

                {(selectedLocation.description_en || selectedLocation.description_ceb) && (
                  <p className="text-xs text-slate-600 leading-relaxed border-t border-orange-100/80 pt-2.5">
                    {t(selectedLocation.description_en || '', selectedLocation.description_ceb || '')}
                  </p>
                )}

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {selectedLocation.phone && (
                    <a
                      href={`tel:${selectedLocation.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all text-center min-h-[38px]"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedLocation.phone}</span>
                    </a>
                  )}

                  {/* Google Maps Turn-by-Turn Directions */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.latitude},${selectedLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all text-center min-h-[38px]"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t('Directions (Google Maps)', 'Direksyon sa Mapa')}</span>
                    <ExternalLink className="w-3 h-3 text-blue-200" />
                  </a>
                </div>
              </div>
            )}

            {/* DIVIDER WHEN SPOTLIGHT IS ACTIVE */}
            {selectedLocation && (
              <div className="flex items-center gap-2 pt-1 pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t('Other District Locations', 'Ubang mga Pasilidad')}
                </span>
                <span className="flex-1 h-px bg-slate-100" />
              </div>
            )}

            {/* EMPTY STATE */}
            {filteredList.length === 0 && (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <MapPin className="w-10 h-10 mx-auto text-slate-300 animate-bounce" />
                <div className="text-sm font-bold text-slate-600">
                  {t('No facilities match your filter', 'Walay pasilidad nga nakit-an')}
                </div>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {t('Try changing the municipality or category pill filter above.', 'Sulayi pag-ilis ang lungsod o kategoriya.')}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-bold text-xs hover:bg-orange-100 transition-colors"
                >
                  {t('Reset All Filters', 'I-reset ang Salain')}
                </button>
              </div>
            )}

            {/* ALL FILTERED FACILITY CARDS */}
            {filteredList.map((loc) => {
              const IconComponent = getCategoryIcon(loc.category);
              const colorClasses = getCategoryColor(loc.category);
              const isSelected = selectedLocation?.id === loc.id;

              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`group p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 relative ${
                    isSelected
                      ? 'bg-orange-50/60 border-orange-400 shadow-sinoog'
                      : 'bg-white hover:bg-orange-50/30 border-slate-200/80 hover:border-orange-200 shadow-2xs hover:shadow-sinoog hover:-translate-y-0.5'
                  }`}
                >
                  {/* Category Pin Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${colorClasses}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                        {loc.municipality}
                      </span>
                      {loc.phone && (
                        <span className="text-[10px] text-slate-500 font-medium truncate max-w-[120px]">
                          {loc.phone}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug truncate">
                      {t(loc.title_en, loc.title_ceb)}
                    </h4>

                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {loc.address}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold">
                      <span className="capitalize">{loc.category.replace('_', ' ')}</span>
                      <span className="text-orange-600 font-bold inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>{t('View on Map', 'Tan-awa sa Mapa')}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN: INTERACTIVE GOOGLE MAPS VIEWPORT
           =================================================================== */}
        <div className="lg:col-span-7 xl:col-span-8 h-[440px] lg:h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-orange-200/80 border-t-white shadow-sinoog relative min-h-0">
          <DistrictLeafletMap
            locations={INITIAL_MAP_LOCATIONS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedTown={selectedTown}
            onSelectTown={setSelectedTown}
            mapType={mapType}
            onChangeMapType={setMapType}
            selectedLocationId={selectedLocation?.id || null}
            onSelectLocation={setSelectedLocation}
            showTopControls={false}
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
