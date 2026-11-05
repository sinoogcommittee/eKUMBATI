import React, { useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  PhoneCall,
  ShieldCheck,
  Languages,
  Home,
  Info,
  Layers,
  BarChart3,
  Image,
  MapPin,
  Map,
  FileText,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { INITIAL_SITE_SETTINGS } from '../../lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHotlineModal: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  onOpenHotlineModal,
}) => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  // Deterministic close function that always releases body scroll lock
  const handleClose = useCallback(() => {
    document.body.style.overflow = '';
    onClose();
  }, [onClose]);

  // Automatically close sidebar ONLY when location.pathname actually changes while open
  const prevPathnameRef = React.useRef(location.pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      prevPathnameRef.current = location.pathname;
      if (isOpen) {
        handleClose();
      }
    }
  }, [location.pathname, isOpen, handleClose]);

  // Lock body scroll and listen for Escape key when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const navItems = [
    { to: '/', labelEn: 'Home', labelCeb: 'Balay', icon: Home },
    { to: '/programs', labelEn: '7 Flagship Programs', labelCeb: '7 ka Programa', icon: Layers },
    { to: '/action-center', labelEn: 'Action Center & Tracker', labelCeb: 'Sentro sa Aksyon', icon: FileText },
    { to: '/news', labelEn: 'News & Announcements', labelCeb: 'Mga Pahibalo', icon: Bell },
    { to: '/gallery', labelEn: 'Photo Gallery', labelCeb: 'Galeriya', icon: Image },
    { to: '/directory', labelEn: '19 Towns Directory', labelCeb: '19 ka Lungsod', icon: MapPin },
    { to: '/map', labelEn: 'Interactive Map', labelCeb: 'Mapa sa Distrito', icon: Map },
    { to: '/impact', labelEn: 'Flagship Impact Metrics', labelCeb: 'Mga Sukod sa Kalampusan', icon: BarChart3 },
    { to: '/about', labelEn: 'About Congw. Alexie', labelCeb: 'Mahitungod', icon: Info },
  ];

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-300 ${
        isOpen ? 'visible' : 'invisible pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Semi-transparent Backdrop: Clicking outside closes the drawer immediately */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out cursor-pointer ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel: 100% Fail-Safe GPU Accelerated CSS Transition */}
      <aside
        className={`fixed top-0 bottom-0 right-0 w-full max-w-xs sm:max-w-sm bg-[#FFFDF9] h-full shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain z-[70] border-l border-orange-100 transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t('Mobile Navigation Menu', 'Menu sa Nabigasyon')}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Brand Logo & Interactive Close Button (X) */}
        <div>
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-orange-100 bg-white">
            <Link
              to="/"
              onClick={handleClose}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-full bg-white p-0.5 shadow-sm border border-orange-200 flex items-center justify-center shrink-0">
                <img
                  src="/images/kumbati_logo_sm.webp"
                  alt="e-KUMBATI Official Logo"
                  className="w-full h-full object-contain"
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <span className="text-base font-black text-slate-900 block leading-tight group-hover:text-orange-600 transition-colors">
                  e-KUMBATI
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Bohol 3rd District
                </span>
              </div>
            </Link>

            {/* Dedicated Explicit Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="p-2 -mr-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close menu"
              title={t('Close Menu', 'Isira ang Menu')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Bilingual Language Switcher */}
          <div className="p-4 bg-orange-50/60 border-b border-orange-100">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('Select Portal Language', 'Pilia ang Pinulongan')}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  lang === 'en'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-orange-200 hover:bg-orange-100/50'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('ceb')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  lang === 'ceb'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-orange-200 hover:bg-orange-100/50'
                }`}
              >
                Binisaya (Cebuano)
              </button>
            </div>
          </div>

          {/* Navigation Menu Items: Automatically close drawer and navigate */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-sm font-black'
                        : 'text-slate-700 hover:bg-orange-50 hover:text-orange-600'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{t(item.labelEn, item.labelCeb)}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: PTV Emergency & Action Center */}
        <div className="p-4 pb-8 sm:pb-6 border-t border-orange-100 bg-white space-y-2.5">
          <button
            type="button"
            onClick={() => {
              handleClose();
              onOpenHotlineModal();
            }}
            className="w-full py-3 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sinoog hover:shadow-sinoog-hover active:scale-98 transition-all cursor-pointer min-h-[44px]"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>{t('PTV 24/7 Hotline: 0917-832-6284', 'PTV 24/7 Hotline: 0917-832-6284')}</span>
          </button>

          <Link
            to="/action-center"
            onClick={handleClose}
            className="w-full py-2.5 px-4 rounded-full bg-orange-50 border border-orange-200 text-orange-900 hover:bg-orange-100 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
          >
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>{t('Action Center & Ticket Tracker', 'Sentro sa Aksyon ug Tracker')}</span>
          </Link>

          <div className="text-center pt-1 text-[10px] text-slate-400">
            {INITIAL_SITE_SETTINGS.congresswoman_name} &bull; Bohol District 3
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MobileNav;
