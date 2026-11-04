import React, { useState } from 'react';
import { INITIAL_SITE_SETTINGS } from '../../lib/constants';
import { SiteSettings } from '../../types/kumbati.types';
import Button from '../../components/common/Button';
import {
  Save,
  CheckCircle2,
  Settings,
  Facebook,
  Mail,
  MapPin,
  Phone,
  FileText,
} from 'lucide-react';

const LOCAL_STORAGE_SETTINGS_KEY = 'kumbati_site_settings';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_SITE_SETTINGS;
    } catch {
      return INITIAL_SITE_SETTINGS;
    }
  });

  const [saving, setSaving] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings));
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 3000);
    } catch {
      // Ignore
    }

    setSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-800 text-orange-400 text-xs font-medium mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>Portal Configuration</span>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Site Settings & Social Channels
          </h2>
          <p className="text-xs text-slate-400">
            Edit bilingual headlines, representative bio, contact details, and the 4 verified Facebook pages.
          </p>
        </div>

        {successNotice && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings Successfully Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Hero Headlines (Bilingual) */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-xs font-medium text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-4 h-4 text-orange-400" />
            <span>1. Hero Banner Headlines & Subtext (Bilingual)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Hero Headline (English)
              </label>
              <input
                type="text"
                value={settings.hero_headline_en}
                onChange={(e) =>
                  setSettings({ ...settings, hero_headline_en: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Hero Headline (Cebuano / Binisaya)
              </label>
              <input
                type="text"
                value={settings.hero_headline_ceb}
                onChange={(e) =>
                  setSettings({ ...settings, hero_headline_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Hero Subtext (English)
              </label>
              <textarea
                rows={3}
                value={settings.hero_subtext_en}
                onChange={(e) =>
                  setSettings({ ...settings, hero_subtext_en: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Hero Subtext (Cebuano / Binisaya)
              </label>
              <textarea
                rows={3}
                value={settings.hero_subtext_ceb}
                onChange={(e) =>
                  setSettings({ ...settings, hero_subtext_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Representative Profile & Bio */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-xs font-medium text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-4 h-4 text-orange-400" />
            <span>2. Representative Title & Bio</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Congresswoman Full Name
              </label>
              <input
                type="text"
                value={settings.congresswoman_name}
                onChange={(e) =>
                  setSettings({ ...settings, congresswoman_name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                District Title (English)
              </label>
              <input
                type="text"
                value={settings.district_title_en}
                onChange={(e) =>
                  setSettings({ ...settings, district_title_en: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                District Title (Cebuano)
              </label>
              <input
                type="text"
                value={settings.district_title_ceb}
                onChange={(e) =>
                  setSettings({ ...settings, district_title_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Bio Summary (English)
              </label>
              <textarea
                rows={4}
                value={settings.bio_summary_en}
                onChange={(e) =>
                  setSettings({ ...settings, bio_summary_en: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Bio Summary (Cebuano)
              </label>
              <textarea
                rows={4}
                value={settings.bio_summary_ceb}
                onChange={(e) =>
                  setSettings({ ...settings, bio_summary_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Official Contact Information */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-xs font-medium text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone className="w-4 h-4 text-orange-400" />
            <span>3. District Contact Channels</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>Official Email</span>
              </label>
              <input
                type="email"
                value={settings.official_email}
                onChange={(e) =>
                  setSettings({ ...settings, official_email: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>Main Office Phone</span>
              </label>
              <input
                type="text"
                value={settings.main_office_phone}
                onChange={(e) =>
                  setSettings({ ...settings, main_office_phone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Main Office Address</span>
              </label>
              <input
                type="text"
                value={settings.main_office_address}
                onChange={(e) =>
                  setSettings({ ...settings, main_office_address: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: 4 Official Facebook Channels */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-xs font-medium text-slate-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Facebook className="w-4 h-4 text-blue-400" />
            <span>4. The 4 Official Facebook Pages</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Alexie Besas Tutor (Official Representative Page)
              </label>
              <input
                type="url"
                value={settings.facebook_page_alexie_besas_tutor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    facebook_page_alexie_besas_tutor: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Alexie B. Tutor (Public Profile)
              </label>
              <input
                type="url"
                value={settings.facebook_page_alexie_b_tutor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    facebook_page_alexie_b_tutor: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Congw. Alexie Tutor Team Kumbati (Community Outreach)
              </label>
              <input
                type="url"
                value={settings.facebook_page_team_kumbati}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    facebook_page_team_kumbati: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Cong. Alexie B. Tutor Patient Transport Vehicle Official (PTV)
              </label>
              <input
                type="url"
                value={settings.facebook_page_ptv_official}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    facebook_page_ptv_official: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={saving}
            icon={<Save className="w-4 h-4" />}
          >
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
