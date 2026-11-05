import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  PhoneCall,
  Menu,
  Languages,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { INITIAL_SITE_SETTINGS } from '../../lib/constants';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenHotlineModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onOpenHotlineModal,
}) => {
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { to: '/', labelEn: 'Home', labelCeb: 'Balay' },
    { to: '/programs', labelEn: 'Programs', labelCeb: 'Programa' },
    { to: '/impact', labelEn: 'Impact', labelCeb: 'Kalampusan' },
    { to: '/news', labelEn: 'News', labelCeb: 'Pahibalo' },
    { to: '/gallery', labelEn: 'Gallery', labelCeb: 'Galeriya' },
    { to: '/directory', labelEn: '19 Towns', labelCeb: '19 Lungsod' },
    { to: '/map', labelEn: 'Map', labelCeb: 'Mapa' },
    { to: '/action-center', labelEn: 'Action Center', labelCeb: 'Aksyon' },
    { to: '/about', labelEn: 'About', labelCeb: 'Mahitungod' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm transition-all w-full max-w-full overflow-hidden">
      {/* Top micro-bar for quick emergency announcement */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 font-semibold w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0">
              24/7 Hotline
            </span>
            <span className="truncate">
              {t(
                'PTV Patient Transport Vehicle Emergency Dispatch: 0917-832-6284',
                'PTV Libreng Sakyanan sa Pasyente 24/7: 0917-832-6284'
              )}
            </span>
          </div>
          <button
            onClick={onOpenHotlineModal}
            className="hidden md:inline-flex items-center gap-1 hover:underline text-white/90 hover:text-white shrink-0 ml-2"
          >
            <span>{t('View All Emergency Lines', 'Tan-awa ang Tanan nga Hotline')}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 lg:gap-3 2xl:gap-4 w-full min-w-0">
        {/* Brand Logo & Representative Tagline */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
          <img
            src="/images/kumbati_logo_sm.webp"
            alt="e-KUMBATI Official Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0"
            width={44}
            height={44}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
              e-KUMBATI
            </span>
            <span className="hidden 2xl:block text-[11px] text-slate-500 font-semibold leading-tight -mt-0.5 truncate max-w-[280px]">
              {INITIAL_SITE_SETTINGS.congresswoman_name} &bull; Bohol 3rd District
            </span>
            <span className="block 2xl:hidden text-[10px] sm:text-[11px] text-slate-500 font-semibold leading-tight -mt-0.5 truncate">
              Bohol 3rd District
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Visible on xl and above) */}
        <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 shrink min-w-0">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-2.5 2xl:px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-orange-600 bg-orange-50 font-black shadow-xs'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/50'
                }`
              }
            >
              {t(item.labelEn, item.labelCeb)}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions: Bilingual Toggle & PTV Call Button */}
        <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5 shrink-0">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 2xl:px-4 py-2 rounded-full border border-orange-200 text-xs font-bold text-orange-950 bg-orange-50/80 hover:bg-orange-100 hover:border-orange-300 shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer min-h-[38px]"
            title="Switch Language (English / Cebuano)"
          >
            <Languages className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="font-black">{lang === 'en' ? 'EN' : 'CEB'}</span>
            <span className="hidden 2xl:inline text-[10px] text-orange-400 font-normal">|</span>
            <span className="hidden 2xl:inline text-[10px] text-slate-500 font-medium">
              {lang === 'en' ? 'English' : 'Binisaya'}
            </span>
          </button>

          {/* Action Center Tracker Shortcut - Shown on 2xl */}
          <Link
            to="/action-center"
            className="hidden 2xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-orange-50/50 hover:border-orange-300 shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[38px] whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
            <span>{t('Track Ticket', 'Susiha ang Ticket')}</span>
          </Link>

          {/* Quick PTV Emergency Dial Button */}
          <button
            onClick={onOpenHotlineModal}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 2xl:px-5 py-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white text-xs font-black shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[38px] cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-bounce shrink-0" />
            <span>{t('Hotlines', 'Mga Hotline')}</span>
          </button>
        </div>

        {/* Tablet & Mobile Controls (Visible below xl) */}
        <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Hotlines Button on Tablet (sm to lg) */}
          <button
            onClick={onOpenHotlineModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-bold shadow-xs hover:shadow-sinoog cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t('Hotlines', 'Mga Hotline')}</span>
          </button>

          {/* Language Toggle on Tablet & Mobile */}
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 rounded-xl border border-orange-200 text-xs font-black text-orange-800 bg-orange-50 hover:bg-orange-100 transition-colors"
            title="Switch Language"
          >
            {lang === 'en' ? 'EN' : 'CEB'}
          </button>

          {/* Hamburger Menu Toggle (Visible on all screens below xl) */}
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
