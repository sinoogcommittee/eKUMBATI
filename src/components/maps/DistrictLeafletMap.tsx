import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapLocation, LocationCategory } from '../../types/kumbati.types';
import { INITIAL_MAP_LOCATIONS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Phone, Clock, MapPin, Filter, Navigation, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';

export type GoogleMapType = 'roadmap' | 'satellite' | 'hybrid' | 'terrain';

export interface DistrictLeafletMapProps {
  locations?: MapLocation[];
  selectedCategory?: LocationCategory | 'all';
  onSelectCategory?: (category: LocationCategory | 'all') => void;
  selectedTown?: string;
  onSelectTown?: (town: string) => void;
  mapType?: GoogleMapType;
  onChangeMapType?: (type: GoogleMapType) => void;
  selectedLocationId?: string | null;
  onSelectLocation?: (location: MapLocation) => void;
  showTopControls?: boolean;
  height?: string;
  className?: string;
}

// Custom Leaflet pin generator using HTML/SVG DivIcon with glowing active state
const createCustomPin = (category: LocationCategory, isSelected: boolean = false) => {
  const colorMap: Record<LocationCategory, string> = {
    office: '#F97316', // Primary Orange
    clinic: '#DC2626', // Red
    ptv_hub: '#EF4444', // Red-Orange
    tambayan: '#8B5CF6', // Purple
    pabahay_site: '#10B981', // Emerald
    municipal_hall: '#3B82F6', // Blue
  };

  const color = colorMap[category] || '#F97316';
  const size = isSelected ? 40 : 32;
  const innerSize = isSelected ? 28 : 24;

  const svgHtml = `
    <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
      <div style="position: absolute; width: ${size}px; height: ${size}px; border-radius: 50%; background-color: ${color}44; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="width: ${innerSize}px; height: ${innerSize}px; border-radius: 50%; background: ${color}; border: ${isSelected ? '3px solid #FFFFFF' : '3px solid white'}; box-shadow: ${isSelected ? '0 0 16px rgba(249, 115, 22, 0.8), 0 4px 10px rgba(0,0,0,0.4)' : '0 4px 8px rgba(0,0,0,0.3)'}; display: flex; align-items: center; justify-content: center; transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'}; transition: transform 0.2s ease;">
        <div style="width: ${isSelected ? '8px' : '6px'}; height: ${isSelected ? '8px' : '6px'}; border-radius: 50%; background: white;"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'kumbati-custom-map-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Map view controller to smoothly flyTo a selected coordinate or town center
const MapViewController: React.FC<{
  target: [number, number] | null;
  zoom?: number;
}> = ({ target, zoom = 14 }) => {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.flyTo(target, zoom, { duration: 0.9 });
    }
  }, [target, zoom, map]);

  return null;
};

// Leaflet resize invalidate handler to ensure zero gray tiles in flexible containers
const MapResizeInvalidator: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

export const DistrictLeafletMap: React.FC<DistrictLeafletMapProps> = ({
  locations = INITIAL_MAP_LOCATIONS,
  selectedCategory: propCategory,
  onSelectCategory,
  selectedTown: propTown,
  onSelectTown,
  mapType: propMapType,
  onChangeMapType,
  selectedLocationId,
  onSelectLocation,
  showTopControls = true,
  height = '100%',
  className = '',
}) => {
  const { t } = useLanguage();

  // Internal states if uncontrolled
  const [internalCategory, setInternalCategory] = useState<LocationCategory | 'all'>('all');
  const [internalTown, setInternalTown] = useState<string>('all');
  const [internalMapType, setInternalMapType] = useState<GoogleMapType>('roadmap');

  const currentCategory = propCategory !== undefined ? propCategory : internalCategory;
  const currentTown = propTown !== undefined ? propTown : internalTown;
  const currentMapType = propMapType !== undefined ? propMapType : internalMapType;

  const handleCategoryChange = (cat: LocationCategory | 'all') => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const handleTownChange = (town: string) => {
    if (onSelectTown) {
      onSelectTown(town);
    } else {
      setInternalTown(town);
    }
  };

  const handleMapTypeChange = (type: GoogleMapType) => {
    if (onChangeMapType) {
      onChangeMapType(type);
    } else {
      setInternalMapType(type);
    }
  };

  // Bohol 3rd District center coordinates
  const districtCenter: [number, number] = [9.76, 124.32];

  const categoryFilters: { value: LocationCategory | 'all'; labelEn: string; labelCeb: string }[] = [
    { value: 'all', labelEn: 'All Facilities', labelCeb: 'Tanan nga Pasilidad' },
    { value: 'office', labelEn: 'Congressional Offices', labelCeb: 'Opisina sa Kongreso' },
    { value: 'clinic', labelEn: 'Kumbati Clinics', labelCeb: 'Kumbati Klinika' },
    { value: 'ptv_hub', labelEn: 'PTV Dispatch Stations', labelCeb: 'Istasyon sa PTV' },
    { value: 'tambayan', labelEn: 'Dialysis Tambayan', labelCeb: 'Tambayan sa Dialysis' },
    { value: 'pabahay_site', labelEn: 'Pabahay Villages', labelCeb: 'Pabahay Balangay' },
    { value: 'municipal_hall', labelEn: 'Municipal Halls', labelCeb: 'Mga Munisipyo' },
  ];

  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchCat = currentCategory === 'all' || loc.category === currentCategory;
      const matchTown = currentTown === 'all' || loc.municipality.toLowerCase() === currentTown.toLowerCase();
      return matchCat && matchTown && loc.is_active;
    });
  }, [locations, currentCategory, currentTown]);

  // Target coordinates for smooth camera panning
  const activeTargetCoords = useMemo<[number, number] | null>(() => {
    if (selectedLocationId) {
      const found = locations.find((l) => l.id === selectedLocationId);
      if (found) return [found.latitude, found.longitude];
    }
    if (currentTown !== 'all') {
      const townLoc = locations.find((l) => l.municipality.toLowerCase() === currentTown.toLowerCase());
      if (townLoc) return [townLoc.latitude, townLoc.longitude];
    }
    return null;
  }, [selectedLocationId, currentTown, locations]);

  // Google Maps Free Tile URL provider
  const googleMapTileUrl = useMemo(() => {
    switch (currentMapType) {
      case 'satellite':
        return 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
      case 'hybrid':
        return 'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
      case 'terrain':
        return 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
      case 'roadmap':
      default:
        return 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    }
  }, [currentMapType]);

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {/* Optional Top Filter Bar (used when standalone, e.g. HomePage) */}
      {showTopControls && (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-3">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 pr-1">
              <Filter className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('Filter', 'Salain')}:</span>
            </div>
            {categoryFilters.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  currentCategory === cat.value
                    ? 'bg-orange-500 text-white shadow-sinoog scale-102'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50/70 hover:border-orange-200'
                }`}
              >
                {t(cat.labelEn, cat.labelCeb)}
              </button>
            ))}
          </div>

          {/* Right Controls: Town Selector + Google Maps Layer Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Town Selector */}
            <select
              value={currentTown}
              onChange={(e) => handleTownChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-sm"
            >
              <option value="all">{t('All 19 Towns', 'Tanan nga 19 ka Lungsod')}</option>
              {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>

            {/* Google Maps Layer Selector */}
            <div className="inline-flex p-0.5 rounded-xl bg-slate-100 border border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => handleMapTypeChange('roadmap')}
                title="Google Maps Roadmap (Streets)"
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentMapType === 'roadmap'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => handleMapTypeChange('satellite')}
                title="Google Satellite Imagery"
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentMapType === 'satellite'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Satellite
              </button>
              <button
                type="button"
                onClick={() => handleMapTypeChange('terrain')}
                title="Google Terrain (Topography)"
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentMapType === 'terrain'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Terrain
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div
        className="w-full flex-1 rounded-3xl overflow-hidden border border-orange-200/70 border-t-white/95 shadow-sinoog relative min-h-0"
        style={height !== '100%' ? { height } : undefined}
      >
        {/* Floating Google Maps Brand Indicator */}
        <div className="absolute top-3 left-3 z-[1000] pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Google Maps</span>
            <span className="text-[10px] text-slate-500 font-medium capitalize">({currentMapType})</span>
          </div>
        </div>

        <MapContainer
          center={districtCenter}
          zoom={10}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          {/* Smooth camera animation on location or town change */}
          <MapViewController target={activeTargetCoords} zoom={selectedLocationId ? 14 : 12} />
          <MapResizeInvalidator />

          {/* Google Maps Free Tiles (Zero Cost, No Billing Required) */}
          <TileLayer
            key={currentMapType}
            attribution='&copy; <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Google Maps</a>'
            url={googleMapTileUrl}
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            maxZoom={20}
          />

          {/* Location Markers */}
          {filteredLocations.map((loc) => {
            const isSelected = selectedLocationId === loc.id;

            return (
              <Marker
                key={loc.id}
                position={[loc.latitude, loc.longitude]}
                icon={createCustomPin(loc.category, isSelected)}
                eventHandlers={{
                  click: () => {
                    onSelectLocation?.(loc);
                  },
                }}
              >
                <Popup className="kumbati-leaflet-popup">
                  <div className="p-1 max-w-xs space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={loc.category === 'clinic' ? 'red' : 'orange'} size="sm">
                        {loc.municipality}
                      </Badge>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {loc.category.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {t(loc.title_en, loc.title_ceb)}
                    </h4>

                    <div className="text-xs text-slate-600 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>

                    {loc.operating_hours && (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{loc.operating_hours}</span>
                      </div>
                    )}

                    {(loc.description_en || loc.description_ceb) && (
                      <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-1.5">
                        {t(loc.description_en || '', loc.description_ceb || '')}
                      </p>
                    )}

                    {/* Actions: Call & Google Maps Navigation */}
                    <div className="pt-2 space-y-1.5">
                      {loc.phone && (
                        <a
                          href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                          className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-2xs"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{loc.phone}</span>
                        </a>
                      )}

                      {/* Google Maps Route Navigation */}
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-2xs"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>{t('Directions in Google Maps', 'Direksyon sa Google Maps')}</span>
                        <ExternalLink className="w-3 h-3 text-blue-200" />
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default DistrictLeafletMap;
