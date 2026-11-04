import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  INITIAL_SITE_SETTINGS,
  BOHOL_DISTRICT_3_TOWNS,
} from '../../lib/constants';
import {
  Facebook,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Shield,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const officialFBPages = [
    {
      name: 'Alexie Besas Tutor',
      desc: t('Official Representative Page', 'Opisyal nga Panid sa Magbabalaod'),
      url: INITIAL_SITE_SETTINGS.facebook_page_alexie_besas_tutor,
    },
    {
      name: 'Alexie B. Tutor',
      desc: t('Public Updates & Constituent News', 'Mga Balita ug Kalambuan'),
      url: INITIAL_SITE_SETTINGS.facebook_page_alexie_b_tutor,
    },
    {
      name: 'Congw. Alexie Tutor Team Kumbati',
      desc: t('Community Outreach & Activities', 'Kalihokan sa Komunidad'),
      url: INITIAL_SITE_SETTINGS.facebook_page_team_kumbati,
    },
    {
      name: 'Cong. Alexie B. Tutor Patient Transport Vehicle Official',
      desc: t('PTV 24/7 Dispatch & Medical Updates', 'Opisyal nga PTV Dispatch'),
      url: INITIAL_SITE_SETTINGS.facebook_page_ptv_official,
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Column 1: Brand & District Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-base shadow-subtle">
                K
              </div>
              <div>
                <span className="text-base font-semibold text-white tracking-tight">
                  e-KUMBATI
                </span>
                <span className="block text-[11px] text-orange-400 font-medium">
                  Bohol 3rd Congressional District
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t(
                'Official constituent portal of Congresswoman Kristine Alexie Besas Tutor. Delivering emergency medical transport, clinic care, socialized shelter, and community empowerment across all 19 towns.',
                'Opisyal nga portal sa katawhan ni Congresswoman Kristine Alexie Besas Tutor. Naghatag og sakyanan sa pasyente, klinika ug tambal, pabalay, ug kalamboan sa 19 ka lungsod.'
              )}
            </p>

            <div className="pt-1 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{INITIAL_SITE_SETTINGS.main_office_address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{INITIAL_SITE_SETTINGS.main_office_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{INITIAL_SITE_SETTINGS.official_email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: 4 Official Facebook Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-normal flex items-center gap-1.5">
              <Facebook className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('Official Facebook Channels', 'Opisyal nga Facebook Pages')}</span>
            </h4>
            <div className="space-y-2">
              {officialFBPages.map((fb, idx) => (
                <a
                  key={idx}
                  href={fb.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-medium text-slate-200 group-hover:text-orange-400">
                    <span className="truncate pr-2">{fb.name}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 text-slate-500 group-hover:text-orange-400" />
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {fb.desc}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-normal">
              {t('Navigation', 'Mga Panid')}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('Home Portal', 'Panid sa Balay')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">
                  {t('7 Flagship Programs', '7 ka mga Nag-unang Programa')}
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-white transition-colors">
                  {t('2025 Verified Impact Metrics', 'Beripikadong Kalampusan 2025')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  {t('Multimedia Photo Gallery', 'Galeriya sa mga Hulagway')}
                </Link>
              </li>
              <li>
                <Link to="/directory" className="hover:text-white transition-colors">
                  {t('19-Town Municipal Directory & Hotlines', 'Direktoryo sa 19 ka Lungsod')}
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors">
                  {t('District Geospatial Map', 'Interactive nga Mapa sa Distrito')}
                </Link>
              </li>
              <li>
                <Link
                  to="/action-center"
                  className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
                >
                  {t('Action Center (Submit or Track Ticket)', 'Sentro sa Aksyon (Track Ticket)')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('About Congw. Alexie Tutor', 'Mahitungod kang Congw. Alexie')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: 19 Municipalities of District 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-normal">
              {t('19 Municipalities Served', '19 ka Lungsod nga Gialagaran')}
            </h4>
            <p className="text-[11px] text-slate-400">
              {t(
                'Covering eastern and central Bohol:',
                'Naglangkob sa sidlakan ug sentral Bohol:'
              )}
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {BOHOL_DISTRICT_3_TOWNS.map((town) => (
                <Link
                  key={town}
                  to={`/directory?town=${encodeURIComponent(town)}`}
                  className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
                >
                  {town}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Staff Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Office of Congresswoman Alexie Besas Tutor.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1">
              {t('Padayon ang KUMBATI', 'Padayon ang KUMBATI')}
              <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              Republic of the Philippines &bull; House of Representatives
            </span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-400 transition-colors text-[11px] font-medium"
            >
              <Shield className="w-3 h-3 text-slate-500" />
              <span>Staff CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
