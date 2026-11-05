import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Download, X, Smartphone, CheckCircle2, Share, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PwaInstallPrompt: React.FC = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone PWA mode
    const checkStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (checkStandalone) {
      setIsStandalone(true);
      return;
    }

    // Check if dismissed recently (within 7 days)
    const dismissedUntil = localStorage.getItem('kumbati_pwa_dismissed_until');
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    // Check for iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/crios|fxios|optios|edgios/.test(userAgent);

    if (isIosDevice && isSafari) {
      setIsIOS(true);
      // Give the user 2.5 seconds to orient themselves on first visit
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // Standard Chromium / Android / Edge PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show install prompt modal after short delay
      setTimeout(() => {
        setIsOpen(true);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // When app is installed, dismiss permanently
    const handleAppInstalled = () => {
      setIsOpen(false);
      setDeferredPrompt(null);
      localStorage.setItem('kumbati_pwa_installed', 'true');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIosInstructions(true);
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsOpen(false);
        setDeferredPrompt(null);
        localStorage.setItem('kumbati_pwa_installed', 'true');
      }
    } catch (err) {
      console.warn('PWA installation prompt error:', err);
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    // Dismiss for 7 days
    const nextPromptDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('kumbati_pwa_dismissed_until', nextPromptDate.toString());
  };

  // Do not render if standalone
  if (isStandalone || !isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1200] flex items-end sm:items-center justify-center p-3 sm:p-4 pointer-events-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs pointer-events-auto cursor-pointer"
          onClick={handleDismiss}
          aria-hidden="true"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-md bg-white/98 backdrop-blur-md rounded-3xl border border-orange-200/90 shadow-2xl p-5 sm:p-6 pointer-events-auto overflow-hidden text-center z-10"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle Ambient Decorative Gradient Top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />

          {/* Close Button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close install prompt"
          >
            <X className="w-5 h-5" />
          </button>

          {/* App Logo - High Definition White Medallion Disc */}
          <div className="relative mx-auto mt-2 mb-3.5 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-2 shadow-lg border-2 border-orange-300 flex items-center justify-center ring-4 ring-orange-100/80">
            <img
              src="/pwa-192x192.png"
              alt="e-Kumbati Official App Logo"
              className="w-full h-full object-contain"
              width={96}
              height={96}
            />
          </div>

          {/* Title & Official Subtitle */}
          <div className="space-y-1 mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              e-Kumbati
            </h2>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-bold">
              <span>{t('Official Web App • Bohol 3rd District', 'Opisiyal nga Web App • Bohol 3rd District')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 max-w-xs mx-auto">
              {t(
                'Install the official app on your device for fast access, 24/7 PTV dispatch, and instant ticket tracking.',
                'I-install ang opisyal nga app sa imong cellphone alang sa dinaliang serbisyo, 24/7 PTV dispatch, ug ticket tracking.'
              )}
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="bg-slate-50/80 rounded-2xl p-3 sm:p-3.5 border border-slate-100 text-left space-y-2 mb-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('Instant loading & offline-ready', 'Paspas nga pag-abli bisan hinay ang signal')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('One-tap 24/7 PTV emergency dispatch', 'Usa ka tap alang sa 24/7 PTV ambulansya')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('Track Action Center tickets anytime', 'Subaya ang imong hinabang bisan unsang orasa')}</span>
            </div>
          </div>

          {/* iOS Safari Guided Steps */}
          {showIosInstructions && (
            <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 text-left text-xs text-amber-900 space-y-2 mb-4 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>{t('Steps for iPhone / iPad (Safari):', 'Mga lakang alang sa iPhone / iPad:')}</span>
              </div>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                <li className="flex items-center gap-1.5">
                  <span>1. {t('Tap the', 'Pindota ang')}</span>
                  <span className="inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 bg-white rounded border border-slate-200">
                    <Share className="w-3 h-3 text-blue-600" /> {t('Share', 'Share')}
                  </span>
                  <span>{t('button at the bottom', 'button sa ubos')}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span>2. {t('Scroll down and tap', 'I-scroll ug pilia ang')}</span>
                  <span className="inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 bg-white rounded border border-slate-200">
                    <PlusSquare className="w-3 h-3 text-slate-800" /> {t('Add to Home Screen', 'Add to Home Screen')}
                  </span>
                </li>
                <li>3. {t('Tap "Add" in the top-right corner.', 'Pindota ang "Add" sa ibabaw nga tuo.')}</li>
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-sinoog hover:shadow-sinoog-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 animate-bounce" />
              <span>
                {isIOS
                  ? showIosInstructions
                    ? t('Got it!', 'Nasabtan!')
                    : t('How to Install on iPhone', 'Unsaon pag-install sa iPhone')
                  : t('Install e-Kumbati Now', 'I-install ang e-Kumbati Karon')}
              </span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {t('Maybe Later', 'Sa Sunod Na')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PwaInstallPrompt;
