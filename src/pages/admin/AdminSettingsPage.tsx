import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_SITE_SETTINGS } from '../../lib/constants';
import { SiteSettings } from '../../types/kumbati.types';
import Button from '../../components/common/Button';
import {
  Save,
  CheckCircle2,
  Settings,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  FileText,
  Bell,
  ChevronRight,
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>Portal Configuration</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Site Settings & Social Channels
          </h2>
          <p className="text-xs text-slate-400">
            Edit bilingual headlines, representative bio, contact details, and the official Facebook page.
          </p>
        </div>

        {successNotice && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings Successfully Saved!</span>
          </div>
        )}
      </div>

      {/* News & Public Announcements Quick Control Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-transparent border border-orange-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-kumbati">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">
              Public News, Updates & Emergency Advisories Manager
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Write and publish advisories, PTV emergency notices, and payout schedules to display on the public portal.
            </p>
          </div>
        </div>

        <Link
          to="/admin/news"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors shrink-0 shadow-sm"
        >
          <span>Open News CMS</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Hero Headlines (Bilingual) */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-orange-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-4 h-4" />
            <span>1. Hero Banner Headlines & Subtext (Bilingual)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Hero Headline (English)
              </label>
              <input
                type="text"
                value={settings.hero_headline_en}
                onChange={(e) =>
                  setSettings({ ...settings, hero_headline_en: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Hero Headline (Cebuano / Binisaya)
              </label>
              <input
                type="text"
                value={settings.hero_headline_ceb}
                onChange={(e) =>
                  setSettings({ ...settings, hero_headline_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Hero Subtext (English)
              </label>
              <textarea
                rows={3}
                value={settings.hero_subtext_en}
                onChange={(e) =>
                  setSettings({ ...settings, hero_subtext_en: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Hero Subtext (Cebuano / Binisaya)
              </label>
              <textarea
                rows={3}
                value={settings.hero_subtext_ceb}
                onChange={(e) =>
                  setSettings({ ...settings, hero_subtext_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Representative Profile & Bio */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-orange-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-4 h-4" />
            <span>2. Representative Title & Bio</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Congresswoman Full Name
              </label>
              <input
                type="text"
                value={settings.congresswoman_name}
                onChange={(e) =>
                  setSettings({ ...settings, congresswoman_name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                District Title (English)
              </label>
              <input
                type="text"
                value={settings.district_title_en}
                onChange={(e) =>
                  setSettings({ ...settings, district_title_en: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                District Title (Cebuano)
              </label>
              <input
                type="text"
                value={settings.district_title_ceb}
                onChange={(e) =>
                  setSettings({ ...settings, district_title_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Bio Summary (English)
              </label>
              <textarea
                rows={4}
                value={settings.bio_summary_en}
                onChange={(e) =>
                  setSettings({ ...settings, bio_summary_en: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Bio Summary (Cebuano)
              </label>
              <textarea
                rows={4}
                value={settings.bio_summary_ceb}
                onChange={(e) =>
                  setSettings({ ...settings, bio_summary_ceb: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Official Contact Information */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-orange-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone className="w-4 h-4" />
            <span>3. District Contact Channels</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>Official Email</span>
              </label>
              <input
                type="email"
                value={settings.official_email}
                onChange={(e) =>
                  setSettings({ ...settings, official_email: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>Main Office Phone</span>
              </label>
              <input
                type="text"
                value={settings.main_office_phone}
                onChange={(e) =>
                  setSettings({ ...settings, main_office_phone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Main Office Address</span>
              </label>
              <input
                type="text"
                value={settings.main_office_address}
                onChange={(e) =>
                  setSettings({ ...settings, main_office_address: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Official Social Media Channels (Facebook & Instagram) */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-orange-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Facebook className="w-4 h-4 text-blue-400" />
            <span>4. Official Social Media Channels</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span>Official Page (Cong. Alexie Tutor)</span>
              </label>
              <input
                type="url"
                value={settings.facebook_page_official || settings.facebook_page_alexie_besas_tutor || 'https://www.facebook.com/Cong.AlexieTutor'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    facebook_page_official: e.target.value,
                    facebook_page_alexie_besas_tutor: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                placeholder="https://www.facebook.com/Cong.AlexieTutor"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Official legislative Facebook page.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span>KUMBATI Cares (Outreach)</span>
              </label>
              <input
                type="url"
                value={settings.facebook_page_kumbati_cares || 'https://www.facebook.com/profile.php?id=100063819665430'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    facebook_page_kumbati_cares: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                placeholder="https://www.facebook.com/profile.php?id=100063819665430"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Community & humanitarian outreach channel.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Official Instagram</span>
              </label>
              <input
                type="url"
                value={settings.instagram_official || 'https://www.instagram.com/alexietutor'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    instagram_official: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                placeholder="https://www.instagram.com/alexietutor"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Official Instagram handle (@alexietutor).
              </p>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={saving}
            icon={<Save className="w-5 h-5" />}
          >
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
