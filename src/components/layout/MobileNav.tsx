import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  const navItems = [
    { to: '/', labelEn: 'Home', labelCeb: 'Balay', icon: Home },
    { to: '/programs', labelEn: '7 Flagship Programs', labelCeb: '7 ka Programa', icon: Layers },
    { to: '/impact', labelEn: '2025 Impact Metrics', labelCeb: 'Kalampusan', icon: BarChart3 },
    { to: '/gallery', labelEn: 'Photo Gallery', labelCeb: 'Galeriya', icon: Image },
    { to: '/directory', labelEn: '19 Towns Directory', labelCeb: '19 ka Lungsod', icon: MapPin },
    { to: '/map', labelEn: 'Interactive Map', labelCeb: 'Mapa sa Distrito', icon: Map },
    { to: '/action-center', labelEn: 'Action Center & Tracker', labelCeb: 'Sentro sa Aksyon', icon: FileText },
    { to: '/about', labelEn: 'About Congw. Alexie', labelCeb: 'Mahitungod', icon: Info },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-xs sm:max-w-sm bg-[#FFFDF9] h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-orange-100"
          >
            {/* Top Bar: Brand & Close */}
            <div>
              <div className="p-5 flex items-center justify-between border-b border-orange-100 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
                    K
                  </div>
                  <div>
                    <span className="text-base font-black text-slate-900 block leading-tight">
                      e-KUMBATI
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Bohol 3rd District
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switch Bar */}
              <div className="p-4 bg-orange-50/60 border-b border-orange-100">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-orange-600" />
                  <span>{t('Select Portal Language', 'Pilia ang Pinulongan')}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setLang('en')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      lang === 'en'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-orange-200 hover:bg-orange-100/50'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang('ceb')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      lang === 'ceb'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-orange-200 hover:bg-orange-100/50'
                    }`}
                  >
                    Binisaya (Cebuano)
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                          isActive
                            ? 'bg-orange-500 text-white shadow-sm font-black'
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
            <div className="p-4 border-t border-orange-100 bg-white space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenHotlineModal();
                }}
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>{t('PTV 24/7 Hotline: 0917-832-6284', 'PTV 24/7 Hotline: 0917-832-6284')}</span>
              </button>

              <Link
                to="/action-center"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-900 hover:bg-orange-100 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>{t('Action Center & Ticket Tracker', 'Sentro sa Aksyon ug Tracker')}</span>
              </Link>

              <div className="text-center pt-1 text-[10px] text-slate-400">
                {INITIAL_SITE_SETTINGS.congresswoman_name} &bull; Bohol District 3
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
