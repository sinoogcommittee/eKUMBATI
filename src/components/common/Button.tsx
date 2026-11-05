import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'emergency' | 'outline' | 'ghost' | 'white';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes implementing Sinoog 2027 M3 styling: Pill shape, elevation, and state layer
  const baseClasses =
    'm3-button relative inline-flex items-center justify-center font-bold rounded-full overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer tracking-wide select-none';

  // Sizing from Sinoog 2027 touch-target scales (40px, 48px, 52px)
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-4 py-2 gap-1.5 min-h-[40px]',
    md: 'text-xs sm:text-sm px-6 py-2.5 gap-2 min-h-[48px]',
    lg: 'text-sm sm:text-base px-8 py-3.5 gap-2.5 min-h-[52px]',
  };

  // Variants adapted with Sinoog 2027 pop shadow and multi-stop gradient styling
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 border border-orange-400 text-white shadow-sinoog hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-xs focus:ring-orange-500',
    secondary:
      'bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-slate-900',
    emergency:
      'bg-gradient-to-r from-red-600 to-red-700 border border-red-400 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-red-500',
    outline:
      'bg-white text-orange-600 border-2 border-orange-200/90 hover:border-orange-500 hover:bg-orange-50/70 shadow-xs hover:shadow-sinoog-hover hover:-translate-y-0.5 active:translate-y-0 focus:ring-orange-500',
    ghost:
      'bg-orange-50/70 text-orange-900 border border-orange-100 hover:bg-orange-100/80 hover:border-orange-200 focus:ring-orange-500',
    white:
      'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 shadow-xs hover:shadow-sinoog hover:-translate-y-0.5 active:translate-y-0 focus:ring-orange-500',
  };

  return (
    <button
      className={twMerge(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {/* State layer overlay */}
      <span
        className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 active:opacity-20 transition-opacity pointer-events-none"
        aria-hidden="true"
      />

      {loading ? (
        <span className="relative z-10 inline-flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{children}</span>
        </span>
      ) : (
        <span className="relative z-10 inline-flex items-center gap-2">
          {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
        </span>
      )}
    </button>
  );
};

export default Button;
