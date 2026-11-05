import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle, PhoneCall, X } from 'lucide-react';
import { triggerHaptic, HapticType } from '../lib/haptics';

export type ToastType = 'success' | 'info' | 'warning' | 'emergency';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 3500) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const hapticMap: Record<ToastType, HapticType> = {
      success: 'success',
      info: 'light',
      warning: 'warning',
      emergency: 'emergency',
    };
    triggerHaptic(hapticMap[type] || 'light');

    setToasts((prev) => [...prev.slice(-3), { id, message, type, duration }]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Notification Container in Top Layer (Accessible status landmark) */}
      <div
        aria-live="polite"
        role="status"
        className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastCard: React.FC<{ toast: ToastItem; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (toast.duration <= 0) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const config = {
    success: {
      bg: 'bg-emerald-950/95 border-emerald-500/50 text-emerald-100',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
      bar: 'bg-emerald-400',
    },
    info: {
      bg: 'bg-slate-900/95 border-orange-500/50 text-slate-100',
      icon: <Info className="w-5 h-5 text-orange-400 shrink-0" />,
      bar: 'bg-orange-400',
    },
    warning: {
      bg: 'bg-amber-950/95 border-amber-500/50 text-amber-100',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
      bar: 'bg-amber-400',
    },
    emergency: {
      bg: 'bg-red-950/95 border-red-500/60 text-red-100',
      icon: <PhoneCall className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />,
      bar: 'bg-red-400',
    },
  }[toast.type];

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-2xl p-4 shadow-sinoog-raised backdrop-blur-md border ${config.bg} transition-all duration-300 animate-in fade-in slide-in-from-top-2`}
    >
      <div className="flex items-start gap-3">
        {config.icon}
        <p className="text-xs sm:text-sm font-semibold leading-snug flex-1 select-none">
          {toast.message}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Auto-Dismiss Progress Bar Indicator */}
      {toast.duration > 0 && (
        <div
          className={`absolute bottom-0 left-0 h-1 w-full ${config.bar} opacity-75 origin-left animate-toast-progress`}
          style={{ animationDuration: `${toast.duration}ms` }}
        />
      )}
    </div>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
