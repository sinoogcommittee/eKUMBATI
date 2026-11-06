import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { triggerHaptic } from '../../lib/haptics';

export const BackToTop: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    triggerHaptic('light');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('Scroll back to top of page', 'Balik sa ibabaw sa panid')}
      title={t('Back to Top', 'Balik sa Ibabaw')}
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-30 flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white/95 text-orange-600 border border-orange-200/90 shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-300 hover:bg-orange-50/90 active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer group"
    >
      <ArrowUp className="w-4 h-4 text-orange-600 group-hover:-translate-y-0.5 transition-transform" />
      <span className="text-xs font-black uppercase tracking-wider text-slate-700 group-hover:text-orange-600 hidden xs:inline">
        {t('Top', 'Ibabaw')}
      </span>
    </button>
  );
};

export default BackToTop;
