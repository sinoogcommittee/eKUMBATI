import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

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
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2 min-h-[44px]',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 shadow-card hover:shadow-card-hover border border-orange-600/20',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 shadow-card hover:shadow-card-hover border border-slate-950/20',
    emergency:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-card hover:shadow-card-hover border border-red-700/20',
    outline:
      'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:ring-orange-500 shadow-subtle',
    ghost:
      'text-slate-700 bg-transparent hover:bg-slate-100/80 focus:ring-slate-400',
    white:
      'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 focus:ring-orange-500 shadow-subtle',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
