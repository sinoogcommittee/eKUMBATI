import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  INITIAL_SITE_SETTINGS,
  BOHOL_DISTRICT_3_TOWNS,
} from '../../lib/constants';
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const officialSocialChannels = [
    {
      name: 'Cong. Alexie Tutor',
      handle: '@Cong.AlexieTutor',
      role: t('Official Representative Page', 'Opisyal nga Panid sa Magbabalaod'),
      url: INITIAL_SITE_SETTINGS.facebook_page_official || 'https://www.facebook.com/Cong.AlexieTutor',
      icon: Facebook,
      iconColor: 'text-blue-400 bg-blue-600/20 border-blue-500/30',
      hoverColor: 'group-hover:text-blue-400 hover:border-blue-500/50',
    },
    {
      name: 'KUMBATI Cares',
      handle: 'Official Outreach',
      role: t('Community & Constituent Care', 'Serbisyo sa Komunidad ug Katawhan'),
      url: INITIAL_SITE_SETTINGS.facebook_page_kumbati_cares || 'https://www.facebook.com/profile.php?id=100063819665430',
      icon: Facebook,
      iconColor: 'text-blue-400 bg-blue-600/20 border-blue-500/30',
      hoverColor: 'group-hover:text-blue-400 hover:border-blue-500/50',
    },
    {
      name: '@alexietutor',
      handle: 'Official Instagram',
      role: t('Official Instagram Channel', 'Opisyal nga Instagram sa Magbabalaod'),
      url: INITIAL_SITE_SETTINGS.instagram_official || 'https://www.instagram.com/alexietutor',
      icon: Instagram,
      iconColor: 'text-pink-400 bg-pink-600/20 border-pink-500/30',
      hoverColor: 'group-hover:text-pink-400 hover:border-pink-500/50',
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-32 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & District Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/kumbati_logo.webp"
                alt="e-KUMBATI Official Logo"
                className="w-11 h-11 object-contain drop-shadow-md shrink-0"
                width={44}
                height={44}
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  e-KUMBATI
                </span>
                <span className="block text-[11px] text-orange-400 font-bold uppercase tracking-wider">
                  Bohol 3rd District
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t(
                'Official constituent portal of Congresswoman Kristine Alexie Besas Tutor. Delivering life-saving emergency medical transport, free clinic care, dignified shelter, and community empowerment across all 19 towns.',
                'Opisyal nga portal sa katawhan ni Congresswoman Kristine Alexie Besas Tutor. Naghatag og libreng sakyanan sa pasyente, libreng klinika ug tambal, pabalay, ug kalamboan sa 19 ka lungsod.'
              )}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{INITIAL_SITE_SETTINGS.main_office_address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{INITIAL_SITE_SETTINGS.main_office_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a
                  href={`mailto:${INITIAL_SITE_SETTINGS.official_email}`}
                  className="hover:text-orange-400 transition-colors break-all"
                  title="Send email to Congw. Alexie Tutor"
                >
                  {INITIAL_SITE_SETTINGS.official_email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Official Social Media Channels (Facebook & Instagram) */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Facebook className="w-4 h-4 text-blue-400" />
              <span>{t('Official Social Channels', 'Opisyal nga Social Channels')}</span>
            </h4>
            <div className="space-y-2.5">
              {officialSocialChannels.map((social, idx) => {
                const IconComponent = social.icon;

                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block p-3 rounded-2xl bg-slate-900 border border-slate-800 transition-all shadow-xs ${social.hoverColor}`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${social.iconColor}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{social.name}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 pl-9">
                      {social.role}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              {t('Quick Navigation', 'Dali nga Pag-access')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">
                  {t('Home Portal', 'Panid sa Balay')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-orange-400 transition-colors">
                  {t('7 Flagship Programs & Requirements', '7 ka mga Nag-unang Programa')}
                </Link>
              </li>
              <li>
                <Link
                  to="/action-center"
                  className="font-bold text-orange-400 hover:text-orange-300 transition-colors"
                >
                  {t('Action Center (Submit or Track Ticket)', 'Sentro sa Aksyon (Track Ticket)')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-orange-400 transition-colors">
                  {t('News & Public Announcements', 'Mga Balita ug Pahibalo')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-orange-400 transition-colors">
                  {t('Multimedia Photo Gallery', 'Galeriya sa mga Hulagway')}
                </Link>
              </li>
              <li>
                <Link to="/directory" className="hover:text-orange-400 transition-colors">
                  {t('19-Town Municipal Directory & Hotlines', 'Direktoryo sa 19 ka Lungsod')}
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-orange-400 transition-colors">
                  {t('District Geospatial Map', 'Interactive nga Mapa sa Distrito')}
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-orange-400 transition-colors">
                  {t('Flagship Impact Metrics', 'Mga Sukod sa Kalampusan')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors">
                  {t('About Congw. Alexie Tutor', 'Mahitungod kang Congw. Alexie')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: 19 Municipalities of District 3 */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              {t('19 Municipalities Served', '19 ka Lungsod nga Gialagaran')}
            </h4>
            <p className="text-[11px] text-slate-400">
              {t(
                'Covering the vibrant cultural, agricultural, and coastal towns of eastern and central Bohol:',
                'Naglangkob sa mga lungsod sa sidlakan ug sentral Bohol:'
              )}
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto pr-1">
              {BOHOL_DISTRICT_3_TOWNS.map((town) => {
                const slug = town.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={town}
                    to={`/directory?town=${encodeURIComponent(town)}#town-${slug}`}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-orange-500 hover:text-white hover:bg-orange-500/10 transition-all font-medium inline-block active:scale-95 cursor-pointer"
                  >
                    {town}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle Staff Portal Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Office of Congresswoman Alexie Besas Tutor.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1">
              {t('Padayon ang KUMBATI!', 'Padayon ang KUMBATI!')}
              <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <Link
              to="/admin/login"
              className="text-slate-600 hover:text-slate-400 transition-colors text-[11px] underline-offset-2 hover:underline opacity-60 hover:opacity-100"
            >
              {t('Staff Portal', 'Portal sa Kawani')}
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Republic of the Philippines &bull; House of Representatives</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
