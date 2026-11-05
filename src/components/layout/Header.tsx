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
    <header className="sticky top-0 z-40 shadow-md transition-all w-full max-w-full overflow-hidden">
      {/* Top micro-bar for quick emergency announcement - Crisp White Background */}
      <div className="bg-white text-slate-800 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 font-semibold w-full border-b border-orange-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-2 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {/* Desktop / Tablet badge */}
            <span className="hidden sm:inline-flex bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 border border-orange-200">
              24/7 Hotline
            </span>

            {/* Mobile text: "PTV Emergency Dispatch: 0917-832-6284" */}
            <div className="sm:hidden flex items-center gap-1.5 text-[11px] font-bold text-slate-800 whitespace-nowrap">
              <PhoneCall className="w-3 h-3 text-red-600 shrink-0 animate-pulse" />
              <span className="text-slate-800 font-extrabold shrink-0">
                PTV Emergency Dispatch:
              </span>
              <a
                href="tel:09178326284"
                className="font-black text-orange-600 hover:text-orange-700 hover:underline shrink-0"
              >
                0917-832-6284
              </a>
            </div>

            {/* Desktop / Tablet text */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 truncate">
              <span>
                {t(
                  'PTV Patient Transport Vehicle Emergency Dispatch:',
                  'PTV Libreng Sakyanan sa Pasyente 24/7:'
                )}
              </span>
              <a
                href="tel:09178326284"
                className="font-black text-orange-600 hover:text-orange-700 hover:underline shrink-0"
              >
                0917-832-6284
              </a>
            </div>
          </div>

          <button
            onClick={onOpenHotlineModal}
            className="hidden md:inline-flex items-center gap-1 text-slate-600 hover:text-orange-600 hover:underline text-xs font-bold shrink-0 ml-2 transition-colors cursor-pointer"
          >
            <span>{t('View All Emergency Lines', 'Tan-awa ang Tanan nga Hotline')}</span>
            <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
          </button>
        </div>
      </div>

      {/* Main Navbar - Vibrant KUMBATI Orange Background */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 border-b border-orange-700/40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 lg:gap-3 2xl:gap-4 w-full min-w-0">
          {/* Brand Logo & Representative Tagline */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
            <img
              src="/images/kumbati_logo_sm.webp"
              alt="e-KUMBATI Official Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0"
              width={44}
              height={44}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-100 transition-colors leading-tight drop-shadow-xs">
                e-KUMBATI
              </span>
              <span className="hidden 2xl:block text-[11px] text-orange-100/90 font-semibold leading-tight -mt-0.5 truncate max-w-[280px]">
                {INITIAL_SITE_SETTINGS.congresswoman_name} &bull; Bohol 3rd District
              </span>
              <span className="block 2xl:hidden text-[10px] sm:text-[11px] text-orange-100/90 font-semibold leading-tight -mt-0.5 truncate">
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
                      ? 'text-orange-600 bg-white font-black shadow-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                  }`
                }
              >
                {t(item.labelEn, item.labelCeb)}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions: Bilingual Toggle, Ticket Tracker & Hotlines */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5 shrink-0">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 2xl:px-4 py-2 rounded-full border border-white/30 text-xs font-bold text-white bg-white/15 hover:bg-white/25 hover:border-white/50 shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer min-h-[38px] backdrop-blur-xs"
              title="Switch Language (English / Cebuano)"
            >
              <Languages className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span className="font-black text-white">{lang === 'en' ? 'EN' : 'CEB'}</span>
              <span className="hidden 2xl:inline text-[10px] text-orange-200 font-normal">|</span>
              <span className="hidden 2xl:inline text-[10px] text-orange-100/90 font-medium">
                {lang === 'en' ? 'English' : 'Binisaya'}
              </span>
            </button>

            {/* Action Center Tracker Shortcut - Shown on 2xl */}
            <Link
              to="/action-center"
              className="hidden 2xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/30 text-xs font-bold text-white bg-white/15 hover:bg-white/25 hover:border-white/50 shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[38px] whitespace-nowrap backdrop-blur-xs"
            >
              <ShieldCheck className="w-4 h-4 text-amber-200 shrink-0" />
              <span>{t('Track Ticket', 'Susiha ang Ticket')}</span>
            </Link>

            {/* Quick PTV Emergency Dial Button */}
            <button
              onClick={onOpenHotlineModal}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 2xl:px-5 py-2 rounded-full bg-white text-red-600 hover:bg-red-50 text-xs font-black shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[38px] cursor-pointer whitespace-nowrap border border-white/40"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-bounce shrink-0" />
              <span>{t('Hotlines', 'Mga Hotline')}</span>
            </button>
          </div>

          {/* Tablet & Mobile Controls (Visible below xl) */}
          <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Hotlines Button on Tablet (sm to lg) */}
            <button
              onClick={onOpenHotlineModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-red-600 hover:bg-red-50 text-xs font-black shadow-xs cursor-pointer border border-white/40"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>{t('Hotlines', 'Mga Hotline')}</span>
            </button>

            {/* Language Toggle on Tablet & Mobile */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-xl border border-white/30 text-xs font-black text-white bg-white/15 hover:bg-white/25 transition-colors cursor-pointer"
              title="Switch Language"
            >
              {lang === 'en' ? 'EN' : 'CEB'}
            </button>

            {/* Hamburger Menu Toggle (Visible on all screens below xl) */}
            <button
              onClick={onOpenMobileMenu}
              className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors focus:outline-none cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
