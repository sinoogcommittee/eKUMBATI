import React, { useState } from 'react';
import {
  INITIAL_HOTLINES,
  INITIAL_MAP_LOCATIONS,
  BOHOL_DISTRICT_3_TOWNS,
} from '../../lib/constants';
import {
  HotlineEntry,
  MapLocation,
  LocationCategory,
} from '../../types/kumbati.types';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import {
  Phone,
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

const LOCAL_STORAGE_HOTLINES_KEY = 'kumbati_hotlines_directory';
const LOCAL_STORAGE_LOCATIONS_KEY = 'kumbati_map_locations';

export const AdminLocationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hotlines' | 'map'>('hotlines');

  // Hotlines State
  const [hotlines, setHotlines] = useState<HotlineEntry[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HOTLINES_KEY);
      return stored ? JSON.parse(stored) : INITIAL_HOTLINES;
    } catch {
      return INITIAL_HOTLINES;
    }
  });

  // Map Locations State
  const [locations, setLocations] = useState<MapLocation[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_LOCATIONS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_MAP_LOCATIONS;
    } catch {
      return INITIAL_MAP_LOCATIONS;
    }
  });

  const [notice, setNotice] = useState<string | null>(null);

  // Modal State for Hotline
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);
  const [editingHotline, setEditingHotline] = useState<HotlineEntry | null>(null);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  // Modal State for Map Pin
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<MapLocation | null>(null);

  const showSuccess = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  // --- Hotlines Handlers ---
  const handleOpenCreateHotline = () => {
    setEditingHotline({
      id: `hotline-${Date.now()}`,
      municipality: 'Candijay',
      office_name_en: 'New Municipal Office Line',
      office_name_ceb: 'Bag-ong Linya sa Opisina',
      contact_person: 'Officer in Charge',
      phone_numbers: ['0917-xxx-xxxx'],
      is_emergency: false,
      display_order: hotlines.length + 1,
    });
    setNewPhoneNumber('');
    setIsHotlineModalOpen(true);
  };

  const handleSaveHotline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotline) return;

    const exists = hotlines.some((h) => h.id === editingHotline.id);
    const updated = exists
      ? hotlines.map((h) => (h.id === editingHotline.id ? editingHotline : h))
      : [editingHotline, ...hotlines];

    setHotlines(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_HOTLINES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setIsHotlineModalOpen(false);
    setEditingHotline(null);
    showSuccess('Hotline directory entry saved!');
  };

  const handleDeleteHotline = (id: string) => {
    if (confirm('Delete this hotline entry?')) {
      const updated = hotlines.filter((h) => h.id !== id);
      setHotlines(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_HOTLINES_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      showSuccess('Hotline deleted.');
    }
  };

  // --- Location Handlers ---
  const handleOpenCreateLocation = () => {
    setEditingLocation({
      id: `loc-${Date.now()}`,
      title_en: 'New District 3 Facility',
      title_ceb: 'Bag-ong Pasilidad sa Distrito',
      category: 'office',
      municipality: 'Candijay',
      address: 'Poblacion, Candijay, Bohol',
      latitude: 9.84,
      longitude: 124.53,
      phone: '(038) 526-0123',
      operating_hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
      description_en: 'Constituent service facility.',
      description_ceb: 'Pasilidad sa serbisyo.',
      is_active: true,
    });
    setIsLocationModalOpen(true);
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLocation) return;

    const exists = locations.some((l) => l.id === editingLocation.id);
    const updated = exists
      ? locations.map((l) => (l.id === editingLocation.id ? editingLocation : l))
      : [editingLocation, ...locations];

    setLocations(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_LOCATIONS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setIsLocationModalOpen(false);
    setEditingLocation(null);
    showSuccess('Map pin location saved!');
  };

  const handleDeleteLocation = (id: string) => {
    if (confirm('Delete this map location pin?')) {
      const updated = locations.filter((l) => l.id !== id);
      setLocations(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_LOCATIONS_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      showSuccess('Map pin deleted.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-800 text-orange-400 text-xs font-medium mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Geospatial & Contacts Directory</span>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Hotlines & Map Locations Manager
          </h2>
          <p className="text-xs text-slate-400">
            Configure phone lines for all 19 municipalities and manage GPS pins rendered on the Leaflet map.
          </p>
        </div>

        {notice && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notice}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => setActiveTab('hotlines')}
          className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'hotlines'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Hotlines Directory ({hotlines.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'map'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Map Facility GPS Pins ({locations.length})</span>
        </button>
      </div>

      {/* TAB 1: HOTLINES DIRECTORY */}
      {activeTab === 'hotlines' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-slate-400">
              Registered Emergency & Municipal Numbers
            </h3>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreateHotline}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Hotline Entry
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotlines.map((h) => (
              <div
                key={h.id}
                className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={h.is_emergency ? 'red' : 'orange'} size="sm">
                      {h.municipality}
                    </Badge>
                    {h.is_emergency && (
                      <span className="text-[10px] font-medium text-red-400">
                        24/7 Priority
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-white leading-snug">
                    {h.office_name_en}
                  </h4>
                  {h.contact_person && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Contact: {h.contact_person}
                    </p>
                  )}

                  <div className="space-y-1 pt-2">
                    {h.phone_numbers.map((num, idx) => (
                      <div
                        key={idx}
                        className="text-xs font-mono font-medium text-orange-400 bg-slate-950 px-2.5 py-1 rounded-md tabular-nums"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setEditingHotline({ ...h });
                      setNewPhoneNumber('');
                      setIsHotlineModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteHotline(h.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-500 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MAP LOCATIONS GPS PINS */}
      {activeTab === 'map' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-slate-400">
              District 3 Facilities Plotted on Map
            </h3>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreateLocation}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Map Pin Location
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={loc.category === 'clinic' ? 'red' : 'orange'} size="sm">
                      {loc.municipality}
                    </Badge>
                    <span className="text-[10px] font-mono text-slate-400 capitalize">
                      {loc.category.replace('_', ' ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white leading-snug">
                    {loc.title_en}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{loc.address}</p>

                  <div className="pt-2 text-[11px] font-mono text-orange-400 bg-slate-950 p-2 rounded-lg border border-slate-800 tabular-nums">
                    GPS: {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setEditingLocation({ ...loc });
                      setIsLocationModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Location"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteLocation(loc.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-500 hover:text-red-400 transition-colors"
                    title="Delete Location"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Hotline Modal */}
      {isHotlineModalOpen && editingHotline && (
        <Modal
          isOpen={isHotlineModalOpen}
          onClose={() => setIsHotlineModalOpen(false)}
          maxWidth="md"
          title="Configure Hotline Directory Entry"
          subtitle="Manage direct phone numbers for municipalities and rescue units"
        >
          <form onSubmit={handleSaveHotline} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Office Name (English) *
              </label>
              <input
                type="text"
                required
                value={editingHotline.office_name_en}
                onChange={(e) =>
                  setEditingHotline({
                    ...editingHotline,
                    office_name_en: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Municipality
                </label>
                <select
                  value={editingHotline.municipality}
                  onChange={(e) =>
                    setEditingHotline({
                      ...editingHotline,
                      municipality: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white cursor-pointer"
                >
                  <option value="District-wide">District-wide</option>
                  {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={editingHotline.contact_person || ''}
                  onChange={(e) =>
                    setEditingHotline({
                      ...editingHotline,
                      contact_person: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Phone Numbers List */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Phone Numbers ({editingHotline.phone_numbers.length})
              </label>
              <div className="space-y-1.5">
                {editingHotline.phone_numbers.map((phone, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono tabular-nums"
                  >
                    <span>{phone}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingHotline({
                          ...editingHotline,
                          phone_numbers: editingHotline.phone_numbers.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Number */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="+63 917 xxx xxxx"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newPhoneNumber.trim()) {
                      setEditingHotline({
                        ...editingHotline,
                        phone_numbers: [...editingHotline.phone_numbers, newPhoneNumber.trim()],
                      });
                      setNewPhoneNumber('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingHotline.is_emergency}
                  onChange={(e) =>
                    setEditingHotline({
                      ...editingHotline,
                      is_emergency: e.target.checked,
                    })
                  }
                  className="rounded text-orange-500 focus:ring-orange-500"
                />
                <span>Designate as Priority 24/7 Emergency Line</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsHotlineModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <Button type="submit" variant="primary" size="md">
                Save Hotline
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Location Modal */}
      {isLocationModalOpen && editingLocation && (
        <Modal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          maxWidth="lg"
          title="Configure Map Facility Location"
          subtitle="Set GPS coordinates and operational details for Leaflet pins"
        >
          <form onSubmit={handleSaveLocation} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Facility Title (English) *
              </label>
              <input
                type="text"
                required
                value={editingLocation.title_en}
                onChange={(e) =>
                  setEditingLocation({
                    ...editingLocation,
                    title_en: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={editingLocation.category}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      category: e.target.value as LocationCategory,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white cursor-pointer"
                >
                  <option value="office">Congressional Office</option>
                  <option value="clinic">Kumbati Clinic</option>
                  <option value="ptv_hub">PTV Hub</option>
                  <option value="tambayan">Dialysis Tambayan</option>
                  <option value="pabahay_site">Pabahay Site</option>
                  <option value="municipal_hall">Municipal Hall</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Municipality
                </label>
                <select
                  value={editingLocation.municipality}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      municipality: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white cursor-pointer"
                >
                  <option value="District-wide">District-wide</option>
                  {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* GPS Latitude and Longitude */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  GPS Latitude (e.g. 9.8406) *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={editingLocation.latitude}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      latitude: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  GPS Longitude (e.g. 124.5367) *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={editingLocation.longitude}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      longitude: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                value={editingLocation.address}
                onChange={(e) =>
                  setEditingLocation({
                    ...editingLocation,
                    address: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={editingLocation.phone || ''}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={editingLocation.operating_hours || ''}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      operating_hours: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <Button type="submit" variant="primary" size="md">
                Save Map Location
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminLocationsPage;
