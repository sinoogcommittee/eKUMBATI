import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PhoneCall, ShieldCheck, MapPin } from 'lucide-react';
import { triggerHaptic } from '../../lib/haptics';

interface StickyHotlineBarProps {
  onOpenHotlineModal: () => void;
}

export const StickyHotlineBar: React.FC<StickyHotlineBarProps> = ({
  onOpenHotlineModal,
}) => {
  const { t } = useLanguage();

  return (
    <div
      id="sticky-hotline-bar"
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden w-full bg-[#0a0f1d]/75 backdrop-blur-xl border-t border-white/15 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-3 sm:px-6 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] pointer-events-auto"
    >
      <div className="w-full max-w-xl sm:max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
        {/* Button 1: One-touch Emergency Call to PTV Dispatch */}
        <a
          href="tel:+639178326284"
          onClick={() => triggerHaptic('emergency')}
          className="flex flex-col items-center justify-center py-2 sm:py-2.5 px-1.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white font-black shadow-sinoog border border-red-400/30 active:scale-95 transition-all text-center"
        >
          <PhoneCall className="w-4 h-4 mb-0.5 animate-bounce" />
          <span className="text-[10px] sm:text-xs uppercase tracking-wider leading-none">
            {t('Call PTV', 'Tawag PTV')}
          </span>
          <span className="text-[9px] sm:text-[10px] opacity-80 font-normal mt-0.5">24/7</span>
        </a>

        {/* Button 2: Action Center */}
        <Link
          to="/action-center"
          onClick={() => triggerHaptic('light')}
          className="flex flex-col items-center justify-center py-2 sm:py-2.5 px-1.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 text-white font-black shadow-sinoog border border-orange-300/30 active:scale-95 transition-all text-center"
        >
          <ShieldCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] sm:text-xs uppercase tracking-wider leading-none">
            {t('Action Desk', 'Aksyon Desk')}
          </span>
          <span className="text-[9px] sm:text-[10px] opacity-85 font-normal mt-0.5">
            {t('Tracker', 'Tracker')}
          </span>
        </Link>

        {/* Button 3: All 19 Towns & Hotlines Dialog - Light Gray Gradient Button */}
        <button
          onClick={() => {
            triggerHaptic('light');
            onOpenHotlineModal();
          }}
          className="flex flex-col items-center justify-center py-2 sm:py-2.5 px-1.5 rounded-xl bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 hover:from-slate-200 hover:to-slate-400 text-slate-900 font-black shadow-sinoog border border-slate-300/90 border-t-white active:scale-95 transition-all text-center cursor-pointer"
        >
          <MapPin className="w-4 h-4 mb-0.5 text-orange-600 drop-shadow-2xs" />
          <span className="text-[10px] sm:text-xs uppercase tracking-wider leading-none text-slate-900 font-black">
            {t('Hotlines', 'Hotlines')}
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-600 font-bold mt-0.5">
            {t('19 Towns', '19 Lungsod')}
          </span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default StickyHotlineBar;
