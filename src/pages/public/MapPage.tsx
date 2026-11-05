import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  List,
  Search,
  X,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Compass,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const MapPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parameters
  const initialTownParam = searchParams.get('town') || 'all';
  const initialCategoryParam = (searchParams.get('category') as LocationCategory) || 'all';
  const initialViewParam = searchParams.get('view') === 'list' ? 'list' : 'map';

  // View state: 'map' or 'list'
  const [viewMode, setViewMode] = useState<'map' | 'list'>(initialViewParam);
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>(initialCategoryParam);
  const [selectedTown, setSelectedTown] = useState<string>(initialTownParam);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapType, setMapType] = useState<GoogleMapType>('roadmap');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);

  const mapSectionRef = useRef<HTMLDivElement>(null);

  // Sync state if URL query param changes
  useEffect(() => {
    const town = searchParams.get('town');
    if (town) {
      setSelectedTown(town);
    }
    const view = searchParams.get('view');
    if (view === 'list' || view === 'map') {
      setViewMode(view);
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
    { value: 'ptv_hub', labelEn: 'PTV Dispatch Hubs', labelCeb: 'Istasyon sa PTV' },
    { value: 'tambayan', labelEn: 'Dialysis Tambayan', labelCeb: 'Tambayan sa Dialysis' },
    { value: 'pabahay_site', labelEn: 'Pabahay Communities', labelCeb: 'Pabahay Balangay' },
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

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count += 1;
    if (selectedTown !== 'all') count += 1;
    if (searchQuery.trim() !== '') count += 1;
    return count;
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
        return 'bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-xs border-rose-300/40';
      case 'ptv_hub':
        return 'bg-gradient-to-tr from-red-600 via-orange-600 to-amber-500 text-white shadow-xs border-red-300/40';
      case 'tambayan':
        return 'bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-xs border-purple-300/40';
      case 'pabahay_site':
        return 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-xs border-emerald-300/40';
      case 'municipal_hall':
        return 'bg-gradient-to-tr from-blue-500 to-cyan-600 text-white shadow-xs border-blue-300/40';
      case 'office':
      default:
        return 'bg-gradient-to-tr from-orange-500 to-amber-600 text-white shadow-xs border-orange-300/40';
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedTown('all');
    setSearchQuery('');
    setSelectedLocation(null);
    setSearchParams({});
  };

  // Switch to Map View and center/open popup on marker
  const handleSelectLocationFromList = (loc: MapLocation) => {
    setSelectedLocation(loc);
    setViewMode('map');
    // Smooth scroll up to map on mobile
    if (window.innerWidth < 1024 && mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col space-y-4 pb-32 sm:pb-36">
      {/* =====================================================================
          1. UNIFIED CONTROL HEADER WITH MAP VS. LIST VIEW TOGGLE
         ===================================================================== */}
      <div className="bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-orange-200/80 border-t-white p-3 sm:p-5 shadow-sinoog flex flex-col gap-3 shrink-0">
        {/* Row 1: Brand Title, View Toggle, Filter Drawer Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          {/* Title & Count Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-sinoog shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base lg:text-lg font-black text-slate-900 tracking-tight leading-none truncate">
                  {t('District 3 Geospatial Facilities', 'Mapa sa mga Pasilidad sa Distrito 3')}
                </h1>
                <Badge variant="orange" size="sm">
                  {filteredList.length} {t('Facilities', 'Pasilidad')}
                </Badge>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1 truncate">
                {t(
                  '19 Municipalities • Verified Coordinates • Google Maps GPS Routing',
                  '19 ka Lungsod • Koordinato • Direksyon sa Google Maps'
                )}
              </p>
            </div>
          </div>

          {/* Action Tools: In one line -> Map View, Directory & Filter (Zero-Overflow Guaranteed) */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end flex-nowrap shrink-0">
            {/* VIEW TOGGLE: MAP VIEW VS. FACILITY DIRECTORY */}
            <div className="inline-flex p-0.5 sm:p-1 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-2xs shrink-0 flex-1 sm:flex-initial max-w-[240px] sm:max-w-none">
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex-1 sm:flex-initial ${
                  viewMode === 'map'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sinoog scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{t('Map View', 'Mapa')}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex-1 sm:flex-initial ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sinoog scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5 shrink-0" />
                <span>{t('Directory', 'Direktoryo')}</span>
              </button>
            </div>

            {/* Collapsible Filter Toolbar Toggle */}
            <button
              type="button"
              onClick={() => setIsFilterPanelOpen((prev) => !prev)}
              className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer shadow-2xs shrink-0 ${
                isFilterPanelOpen || activeFilterCount > 0
                  ? 'bg-orange-50 border-orange-300 text-orange-700 font-black'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={t('Filter Facilities', 'Salain ang mga Pasilidad')}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span className="font-bold">{t('Filter', 'Salain')}</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {activeFilterCount}
                </span>
              )}
              {isFilterPanelOpen ? (
                <ChevronUp className="w-3 h-3 shrink-0" />
              ) : (
                <ChevronDown className="w-3 h-3 shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Filter & Map Styling Toolbar */}
        <div
          className={`flex flex-col gap-3 pt-3 border-t border-slate-100 transition-all duration-300 overflow-hidden ${
            isFilterPanelOpen ? 'max-h-[600px] opacity-100' : 'hidden md:flex'
          }`}
        >
          {/* Row 2: Search, Town Selector, Map Type Switcher & Reset */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('Search by office name, town, or address...', 'Pangitaa sa ngalan, lungsod, o adres...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* Town Selector */}
              <select
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-2xs shrink-0"
              >
                <option value="all">{t('All 19 Municipalities', 'Tanan nga 19 ka Lungsod')}</option>
                {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>

              {/* Google Map Layer Selector (Visible in Map View) */}
              <div className="inline-flex p-0.5 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs shrink-0">
                <button
                  type="button"
                  onClick={() => setMapType('roadmap')}
                  title="Google Maps Roadmap (Streets)"
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mapType === 'terrain'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Terrain
                </button>
              </div>

              {/* Reset Filters Button */}
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-2 rounded-xl border border-orange-200 bg-orange-50 text-xs font-bold text-orange-600 hover:bg-orange-100 transition-colors inline-flex items-center gap-1 shrink-0"
                  title={t('Reset Filters', 'I-reset')}
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t('Reset', 'I-reset')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 3: Category Filter Pills (Scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-w-0 pt-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('Category', 'Kategoriya')}:</span>
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
        </div>
      </div>

      {/* =====================================================================
          2. MAP VIEW MODE (INTERACTIVE LEAFLET + FLOATING SPOTLIGHT)
         ===================================================================== */}
      {viewMode === 'map' && (
        <div
          ref={mapSectionRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[650px] lg:h-[720px] min-h-[500px]"
        >
          {/* LEFT SIDEBAR: FACILITY DIRECTORY & SELECTED SPOTLIGHT */}
          <div className="lg:col-span-5 xl:col-span-4 h-full flex flex-col min-h-0 bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-orange-200/80 border-t-white shadow-sinoog overflow-hidden">
            {/* Sidebar Header */}
            <div className="px-4 sm:px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-orange-50/40 shrink-0">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-orange-600" />
                <h2 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                  {selectedLocation
                    ? t('Selected Facility', 'Gipili nga Pasilidad')
                    : t('Directory Quick Jump', 'Listahan sa Pasilidad')}
                </h2>
              </div>

              {selectedLocation ? (
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-[11px] font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{t('Clear Selection', 'I-clear')}</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[11px] text-slate-500 font-semibold">
                  {filteredList.length} {t('pins on map', 'timaan sa mapa')}
                </span>
              )}
            </div>

            {/* Scrollable Feed */}
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
                      <span>GPS Pin Active</span>
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
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all text-center min-h-[42px]"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{selectedLocation.phone}</span>
                      </a>
                    )}

                    {/* Touch-Friendly Google Maps Turn-by-Turn Directions */}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.latitude},${selectedLocation.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all text-center min-h-[42px]"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{t('Get Directions', 'Direksyon')}</span>
                      <ExternalLink className="w-3 h-3 text-blue-200" />
                    </a>
                  </div>
                </div>
              )}

              {/* DIVIDER WHEN SPOTLIGHT IS ACTIVE */}
              {selectedLocation && (
                <div className="flex items-center gap-2 pt-1 pb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {t('All District Facilities', 'Tanan nga Pasilidad')}
                  </span>
                  <span className="flex-1 h-px bg-slate-100" />
                </div>
              )}

              {/* EMPTY STATE */}
              {filteredList.length === 0 && (
                <div className="py-12 text-center text-slate-400 space-y-3">
                  <MapPin className="w-10 h-10 mx-auto text-slate-300 animate-bounce" />
                  <div className="text-sm font-bold text-slate-600">
                    {t('No facilities match your search', 'Walay pasilidad nga nakit-an')}
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-bold text-xs hover:bg-orange-100 transition-colors cursor-pointer"
                  >
                    {t('Reset All Filters', 'I-reset ang Salain')}
                  </button>
                </div>
              )}

              {/* FILTERED FACILITY CARDS WITH AUTHENTIC KUMBATI CARD ARCHITECTURE */}
              {filteredList.map((loc) => {
                const IconComponent = getCategoryIcon(loc.category);
                const colorClasses = getCategoryColor(loc.category);
                const isSelected = selectedLocation?.id === loc.id;

                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`group p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-b from-orange-50/95 via-white to-amber-50/40 border-2 border-orange-500 shadow-sinoog-raised ring-2 ring-orange-400/25 scale-[1.01]'
                        : 'bg-gradient-to-b from-white via-white/98 to-amber-50/20 border border-orange-200/80 border-t-white shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-300 hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Top Accent Ribbon for selected card */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />
                    )}

                    {/* Card Header Strip: Municipality Badge & Phone / Category */}
                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/80 px-2.5 py-0.5 rounded-full border border-orange-200/80 shadow-2xs">
                          <MapPin className="w-2.5 h-2.5 text-orange-600 shrink-0" />
                          <span>{loc.municipality}</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded-full bg-slate-100/90 border border-slate-200/70 capitalize">
                          {loc.category.replace('_', ' ')}
                        </span>
                      </div>

                      {loc.phone && (
                        <span className="text-[10px] text-slate-500 font-semibold font-mono truncate max-w-[130px] flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-orange-500 shrink-0" />
                          <span>{loc.phone}</span>
                        </span>
                      )}
                    </div>

                    {/* Card Body: Vibrant Category Icon Pod + Facility Details */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 shadow-sinoog ${colorClasses}`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                          {t(loc.title_en, loc.title_ceb)}
                        </h4>

                        <p className="text-[11px] text-slate-500 flex items-start gap-1 mt-1 line-clamp-1">
                          <MapPin className="w-3 h-3 text-orange-400 shrink-0 mt-0.5" />
                          <span>{loc.address}</span>
                        </p>
                      </div>
                    </div>

                    {/* Card Action Strip & Pin Trigger */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-orange-100/80 text-[11px]">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span>{isSelected ? t('Active on Map', 'Aktibo sa Mapa') : 'Verified GPS'}</span>
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-2xs ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sinoog font-black'
                            : 'bg-orange-50/90 group-hover:bg-orange-500 text-orange-700 group-hover:text-white border border-orange-200/80 group-hover:border-orange-500'
                        }`}
                      >
                        <span>{isSelected ? t('Pin Active', 'Aktibo') : t('Focus Pin', 'I-focus sa Mapa')}</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: FULL INTERACTIVE LEAFLET MAP VIEWPORT */}
          <div className="lg:col-span-7 xl:col-span-8 h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-orange-200/80 border-t-white shadow-sinoog relative min-h-0">
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
      )}

      {/* =====================================================================
          3. FACILITY DIRECTORY LIST VIEW MODE (RICH SEARCHABLE DIRECTORY)
         ===================================================================== */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {/* Header Summary Strip */}
          <div className="flex items-center justify-between bg-white/95 rounded-2xl p-4 border border-orange-200/80 shadow-2xs">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900">
                {t('District 3 Facility Directory & Coordinates', 'Direktoryo sa mga Pasilidad sa Distrito 3')}
              </h2>
              <p className="text-xs text-slate-500">
                {t(
                  'Complete list of verified congressional offices, medical clinics, and municipal halls.',
                  'Tibuok listahan sa mga opisina sa kongreso, klinika, ug munisipyo nga may GPS coordinates.'
                )}
              </p>
            </div>
            <div className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
              {filteredList.length} {t('Facilities', 'Pasilidad')}
            </div>
          </div>

          {/* EMPTY STATE */}
          {filteredList.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 space-y-3 border border-orange-200/80 shadow-2xs">
              <MapPin className="w-12 h-12 mx-auto text-slate-300 animate-bounce" />
              <div className="text-base font-bold text-slate-700">
                {t('No facilities match your search query or filters', 'Walay pasilidad nga nakit-an sa imong gipangita')}
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {t('Please try searching for another town name or clear the active category filter.', 'Sulayi pagpangita og laing lungsod o i-reset ang filter.')}
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs shadow-sinoog cursor-pointer"
              >
                {t('Reset All Filters', 'I-reset ang Tanan')}
              </button>
            </div>
          )}

          {/* 3-COLUMN RESPONSIVE FACILITY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredList.map((loc) => {
              const IconComponent = getCategoryIcon(loc.category);
              const colorClasses = getCategoryColor(loc.category);

              return (
                <div
                  key={loc.id}
                  className="bg-gradient-to-b from-white via-white/98 to-amber-50/20 rounded-2xl sm:rounded-3xl border border-orange-200/80 border-t-white p-5 shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-orange-700 bg-orange-100/80 px-2.5 py-1 rounded-full border border-orange-200/80 shadow-2xs">
                        <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                        <span>{loc.municipality}</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 capitalize">
                        {loc.category.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Facility Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-sinoog ${colorClasses}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug line-clamp-2">
                          {t(loc.title_en, loc.title_ceb)}
                        </h3>
                        <div className="flex items-start gap-1.5 text-xs text-slate-600 mt-1.5">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{loc.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    {loc.operating_hours && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 mb-3">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{loc.operating_hours}</span>
                      </div>
                    )}

                    {/* Description */}
                    {(loc.description_en || loc.description_ceb) && (
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {t(loc.description_en || '', loc.description_ceb || '')}
                      </p>
                    )}
                  </div>

                  {/* Actions Footer: View on Map + Google Maps Directions + Call */}
                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {/* View on Map Button (Syncs with Map View) */}
                      <button
                        type="button"
                        onClick={() => handleSelectLocationFromList(loc)}
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs border border-orange-200/90 transition-all cursor-pointer min-h-[42px]"
                      >
                        <MapIcon className="w-3.5 h-3.5 text-orange-600" />
                        <span>{t('View on Map', 'Sa Mapa')}</span>
                      </button>

                      {/* Google Maps Directions */}
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs min-h-[42px]"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{t('Directions', 'Direksyon')}</span>
                        <ExternalLink className="w-3 h-3 text-blue-200" />
                      </a>
                    </div>

                    {/* Phone Call Link if available */}
                    {loc.phone && (
                      <a
                        href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-orange-600" />
                        <span>{loc.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
