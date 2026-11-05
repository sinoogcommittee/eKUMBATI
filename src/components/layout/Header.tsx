import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  PhoneCall,
  Menu,
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Auto-hide top micro utility strip on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', labelEn: 'Home', labelCeb: 'Balay' },
    { to: '/programs', labelEn: 'Programs', labelCeb: 'Programa' },
    { to: '/action-center', labelEn: 'Action Center', labelCeb: 'Aksyon' },
    { to: '/news', labelEn: 'News', labelCeb: 'Pahibalo' },
    { to: '/gallery', labelEn: 'Gallery', labelCeb: 'Galeriya' },
    { to: '/directory', labelEn: '19 Towns', labelCeb: '19 Lungsod' },
    { to: '/map', labelEn: 'Map', labelCeb: 'Mapa' },
    { to: '/impact', labelEn: 'Impact', labelCeb: 'Kalampusan' },
    { to: '/about', labelEn: 'About', labelCeb: 'Mahitungod' },
  ];

  return (
    <>
      {/* Skip to Main Content Link for Keyboard and Assistive Tech Navigation (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-white focus:text-orange-600 focus:font-black focus:text-xs focus:rounded-xl focus:shadow-2xl focus:border focus:border-orange-300 focus:ring-4 focus:ring-orange-500/30 transition-all outline-none"
      >
        {t('Skip to main content', 'Laktaw ngadto sa kinauyokang unod')}
      </a>

      <header className="sticky top-0 z-40 shadow-md transition-all w-full max-w-full overflow-hidden">
      {/* Top micro-bar for quick emergency announcement - Auto-hides on scroll */}
      <div
        className={`bg-white text-slate-800 text-[11px] sm:text-xs font-semibold w-full border-b border-orange-200/80 shadow-2xs transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled
            ? 'max-h-0 opacity-0 -translate-y-2 py-0 border-b-0'
            : 'max-h-14 opacity-100 translate-y-0 py-1.5 px-3 sm:px-4'
        }`}
      >
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
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-1 shadow-md border-2 border-white/95 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 ring-2 ring-black/5">
              <img
                src="/images/kumbati_logo_sm.webp"
                alt="e-KUMBATI Official Logo"
                className="w-full h-full object-contain"
                width={44}
                height={44}
              />
            </div>
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
            {/* Language Toggle Button: Explicit EN | BIN Pill */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center p-1 rounded-full bg-white/20 hover:bg-white/25 border border-white/35 backdrop-blur-xs transition-all cursor-pointer shadow-xs min-h-[38px]"
              title={t('Switch Language between English and Binisaya', 'Ilisi ang Pinulongan ngadto sa English / Binisaya')}
              aria-label="Toggle language between English and Binisaya"
            >
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-black transition-all ${
                  lang === 'en'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                EN
              </span>
              <span className="text-white/40 text-xs font-bold mx-0.5">|</span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-black transition-all ${
                  lang === 'ceb'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                BIN
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

            {/* Explicit EN | BIN Pill on Tablet & Mobile */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center p-0.5 rounded-full bg-white/20 hover:bg-white/25 border border-white/35 transition-all cursor-pointer shadow-xs"
              title={t('Switch Language between English and Binisaya', 'Ilisi ang Pinulongan ngadto sa English / Binisaya')}
              aria-label="Toggle language between English and Binisaya"
            >
              <span
                className={`px-2 py-1 rounded-full text-[10px] font-black transition-all ${
                  lang === 'en'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                EN
              </span>
              <span className="text-white/40 text-[10px] font-bold mx-0.5">|</span>
              <span
                className={`px-2 py-1 rounded-full text-[10px] font-black transition-all ${
                  lang === 'ceb'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                BIN
              </span>
            </button>

            {/* Hamburger Menu Toggle (Visible on all screens below xl) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenMobileMenu();
              }}
              className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors focus:outline-none cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  </>
  );
};

export default Header;
