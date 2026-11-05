import { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  label: ReactNode;
  error?: boolean;
  fieldClassName?: string;
}

export function Checkbox({
  label,
  error = false,
  fieldClassName = '',
  className = '',
  ...props
}: CheckboxProps) {
  const classes = ['m3-check', error ? 'is-error' : '', props.disabled ? 'is-disabled' : '', fieldClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        {...props}
        type="checkbox"
        className={['m3-check__input', className].filter(Boolean).join(' ')}
      />
      <span className="m3-check__box" aria-hidden="true" />
      <span className="m3-check__label">{label}</span>
    </label>
  );
}

export default Checkbox;
