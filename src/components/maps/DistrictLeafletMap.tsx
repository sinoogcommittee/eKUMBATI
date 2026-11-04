import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapLocation, LocationCategory } from '../../types/kumbati.types';
import { INITIAL_MAP_LOCATIONS, BOHOL_DISTRICT_3_TOWNS } from '../../lib/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Phone, Clock, MapPin, Filter } from 'lucide-react';
import { Badge } from '../common/Badge';

interface DistrictLeafletMapProps {
  locations?: MapLocation[];
  initialCategory?: LocationCategory | 'all';
  initialTown?: string;
  height?: string;
}

// Custom Leaflet pin generator using HTML/SVG DivIcon
const createCustomPin = (category: LocationCategory) => {
  const colorMap: Record<LocationCategory, string> = {
    office: '#F97316', // Primary Orange
    clinic: '#DC2626', // Red
    ptv_hub: '#EF4444', // Red-Orange
    tambayan: '#8B5CF6', // Purple
    pabahay_site: '#10B981', // Emerald
    municipal_hall: '#3B82F6', // Blue
  };

  const color = colorMap[category] || '#F97316';

  const svgHtml = `
    <div style="width: 24px; height: 24px; border-radius: 50%; background: ${color}; border: 2px solid white; box-shadow: 0 2px 4px rgba(15,23,42,0.25); display: flex; align-items: center; justify-content: center;">
      <div style="width: 6px; height: 6px; border-radius: 50%; background: white;"></div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'kumbati-custom-map-pin',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export const DistrictLeafletMap: React.FC<DistrictLeafletMapProps> = ({
  locations = INITIAL_MAP_LOCATIONS,
  initialCategory = 'all',
  initialTown,
  height = '540px',
}) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>(initialCategory);
  const [selectedTown, setSelectedTown] = useState<string>(initialTown || 'all');

  // Bohol 3rd District approximate center
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
      const matchCat = selectedCategory === 'all' || loc.category === selectedCategory;
      const matchTown = selectedTown === 'all' || loc.municipality === selectedTown;
      return matchCat && matchTown && loc.is_active;
    });
  }, [locations, selectedCategory, selectedTown]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Filter Bar with Category Pills & Town Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 shrink-0 pr-1">
            <Filter className="w-3.5 h-3.5 text-orange-600" />
            <span>{t('Filter', 'Salain')}:</span>
          </div>
          {categoryFilters.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {t(cat.labelEn, cat.labelCeb)}
            </button>
          ))}
        </div>

        {/* Town Selector */}
        <div className="shrink-0">
          <select
            value={selectedTown}
            onChange={(e) => setSelectedTown(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="all">{t('All 19 Towns', 'Tanan nga 19 ka Lungsod')}</option>
            {BOHOL_DISTRICT_3_TOWNS.map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Container */}
      <div
        className="w-full rounded-xl overflow-hidden border border-slate-200/80 shadow-card relative"
        style={{ height }}
      >
        <MapContainer
          center={districtCenter}
          zoom={10}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          {/* CartoDB Positron high-clarity tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Location Markers */}
          {filteredLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={createCustomPin(loc.category)}
            >
              <Popup className="kumbati-leaflet-popup">
                <div className="p-1 max-w-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={loc.category === 'clinic' ? 'red' : 'orange'} size="sm">
                      {loc.municipality}
                    </Badge>
                    <span className="text-[10px] capitalize font-medium text-slate-400">
                      {loc.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
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

                  {loc.phone && (
                    <div className="pt-2">
                      <a
                        href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span className="tabular-nums">{loc.phone}</span>
                      </a>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DistrictLeafletMap;
