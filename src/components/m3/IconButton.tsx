import { ButtonHTMLAttributes, ReactNode } from 'react';

export type M3IconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  /** Required: icon-only controls must have an accessible name. Also shown as the tooltip. */
  label: string;
  icon: ReactNode;
  variant?: M3IconButtonVariant;
  selected?: boolean;
}

export function IconButton({
  label,
  icon,
  variant = 'standard',
  selected,
  className = '',
  type = 'button',
  ...props
}: IconButtonProps) {
  const classes = [
    'm3-icon-button',
    `m3-icon-button--${variant}`,
    selected ? 'is-selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...props}
      type={type}
      className={classes}
      aria-label={label}
      title={label}
      aria-pressed={selected}
    >
      <span className="m3-state-layer" aria-hidden="true" />
      <span className="m3-icon-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}

export default IconButton;
