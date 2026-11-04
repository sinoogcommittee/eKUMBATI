import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PhoneCall, ShieldCheck, MapPin } from 'lucide-react';

interface StickyHotlineBarProps {
  onOpenHotlineModal: () => void;
}

export const StickyHotlineBar: React.FC<StickyHotlineBarProps> = ({
  onOpenHotlineModal,
}) => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t border-orange-200/80 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Button 1: One-touch Emergency Call to PTV Dispatch */}
        <a
          href="tel:+639178326284"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-black shadow-sm active:scale-95 transition-all text-center"
        >
          <PhoneCall className="w-4 h-4 mb-0.5 animate-bounce" />
          <span className="text-[10px] uppercase tracking-wider leading-none">
            {t('Call PTV', 'Tawag PTV')}
          </span>
          <span className="text-[9px] opacity-80 font-normal">24/7</span>
        </a>

        {/* Button 2: Action Center */}
        <Link
          to="/action-center"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-orange-500 text-white font-black shadow-sm active:scale-95 transition-all text-center"
        >
          <ShieldCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider leading-none">
            {t('Action Desk', 'Aksyon Desk')}
          </span>
          <span className="text-[9px] opacity-85 font-normal">
            {t('Tracker', 'Tracker')}
          </span>
        </Link>

        {/* Button 3: All 19 Towns & Hotlines Dialog */}
        <button
          onClick={onOpenHotlineModal}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold active:scale-95 transition-all text-center"
        >
          <MapPin className="w-4 h-4 mb-0.5 text-orange-600" />
          <span className="text-[10px] uppercase tracking-wider leading-none">
            {t('Hotlines', 'Hotlines')}
          </span>
          <span className="text-[9px] text-slate-500 font-normal">
            {t('19 Towns', '19 Lungsod')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StickyHotlineBar;
