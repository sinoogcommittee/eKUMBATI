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
    { to: '/about', labelEn: 'About', labelCeb: 'Mahitungod' },
    { to: '/programs', labelEn: 'Programs', labelCeb: 'Mga Programa' },
    { to: '/impact', labelEn: 'Impact', labelCeb: 'Kalampusan' },
    { to: '/gallery', labelEn: 'Gallery', labelCeb: 'Galeriya' },
    { to: '/directory', labelEn: '19 Towns', labelCeb: '19 ka Lungsod' },
    { to: '/map', labelEn: 'District Map', labelCeb: 'Mapa sa Distrito' },
    { to: '/action-center', labelEn: 'Action Center', labelCeb: 'Sentro sa Aksyon' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-subtle">
      {/* Top micro-bar for quick emergency announcement */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded text-[10px] font-medium tracking-normal">
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
            className="hidden md:inline-flex items-center gap-1 hover:text-white text-slate-400 shrink-0 ml-4 transition-colors"
          >
            <span>{t('View All Emergency Lines', 'Tan-awa ang Tanan nga Hotline')}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Representative Tagline */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-orange-500 border border-slate-800 flex items-center justify-center font-bold text-lg shadow-subtle">
            K
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-slate-900">
              e-KUMBATI
            </span>
            <span className="text-[11px] text-slate-500 font-normal leading-tight">
              {INITIAL_SITE_SETTINGS.congresswoman_name} &bull; Bohol 3rd District
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-orange-600 bg-orange-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`
              }
            >
              {t(item.labelEn, item.labelCeb)}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions: Bilingual Toggle, Tracker Shortcut, & PTV Button */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-subtle"
            title="Switch Language (English / Cebuano)"
          >
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-900">{lang === 'en' ? 'EN' : 'CEB'}</span>
            <span className="text-slate-300">|</span>
            <span className="text-[11px] text-slate-500">
              {lang === 'en' ? 'English' : 'Binisaya'}
            </span>
          </button>

          {/* Action Center Tracker Shortcut */}
          <Link
            to="/action-center"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-subtle"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('Track Ticket', 'Susiha ang Ticket')}</span>
          </Link>

          {/* Quick PTV Emergency Dial Button */}
          <button
            onClick={onOpenHotlineModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow-subtle transition-colors active:scale-[0.99]"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t('Hotlines', 'Mga Hotline')}</span>
          </button>
        </div>

        {/* Mobile Hamburger & Language Bar */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-2 py-1 rounded-md border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
          >
            {lang === 'en' ? 'EN' : 'CEB'}
          </button>
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
