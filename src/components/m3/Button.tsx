import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type M3ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text' | 'danger';
export type LegacyButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'emergency' | 'white';

const LEGACY_VARIANT_MAP: Record<LegacyButtonVariant, M3ButtonVariant> = {
  primary: 'filled',
  secondary: 'tonal',
  outline: 'outlined',
  ghost: 'text',
  emergency: 'danger',
  white: 'outlined',
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  variant?: M3ButtonVariant | LegacyButtonVariant;
  size?: 'default' | 'small';
  leadingIcon?: ReactNode;
  loading?: boolean;
  to?: string;
  className?: string;
}

export function Button({
  children,
  variant = 'filled',
  size = 'default',
  leadingIcon,
  loading = false,
  to,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const resolved: M3ButtonVariant =
    variant in LEGACY_VARIANT_MAP
      ? LEGACY_VARIANT_MAP[variant as LegacyButtonVariant]
      : (variant as M3ButtonVariant);

  const classes = [
    'm3-button',
    `m3-button--${resolved}`,
    size === 'small' ? 'm3-button--small' : '',
    loading ? 'is-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="m3-state-layer" aria-hidden="true" />
      {loading ? (
        <span className="m3-spinner" aria-hidden="true" />
      ) : leadingIcon ? (
        <span className="m3-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="m3-button__label">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}

export default Button;
