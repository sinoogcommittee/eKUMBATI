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
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-popover">
      <div className="grid grid-cols-3 gap-2">
        {/* Button 1: One-touch Emergency Call to PTV Dispatch */}
        <a
          href="tel:+639178326284"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-red-600 text-white font-medium active:scale-[0.99] transition-colors text-center shadow-subtle"
        >
          <PhoneCall className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-medium leading-tight">
            {t('Call PTV', 'Tawag PTV')}
          </span>
          <span className="text-[10px] text-red-100">24/7 Dispatch</span>
        </a>

        {/* Button 2: Action Center */}
        <Link
          to="/action-center"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-orange-500 text-white font-medium active:scale-[0.99] transition-colors text-center shadow-subtle"
        >
          <ShieldCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-medium leading-tight">
            {t('Action Desk', 'Aksyon Desk')}
          </span>
          <span className="text-[10px] text-orange-100">
            {t('Tracker', 'Tracker')}
          </span>
        </Link>

        {/* Button 3: All 19 Towns & Hotlines Dialog */}
        <button
          onClick={onOpenHotlineModal}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium active:scale-[0.99] transition-colors text-center border border-slate-200/80"
        >
          <MapPin className="w-4 h-4 mb-0.5 text-slate-600" />
          <span className="text-[11px] font-medium leading-tight">
            {t('Hotlines', 'Hotlines')}
          </span>
          <span className="text-[10px] text-slate-500">
            {t('19 Towns', '19 Lungsod')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StickyHotlineBar;
