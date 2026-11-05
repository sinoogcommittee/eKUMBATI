import { InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'size'> {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  fieldClassName?: string;
}

export function SearchBar({
  label,
  value,
  onValueChange,
  fieldClassName = '',
  className = '',
  ...props
}: SearchBarProps) {
  return (
    <div className={['m3-search', fieldClassName].filter(Boolean).join(' ')}>
      <Search className="m3-search__icon" size={20} aria-hidden="true" />
      <input
        {...props}
        type="search"
        aria-label={label}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className={['m3-search__input', className].filter(Boolean).join(' ')}
      />
      {value ? (
        <IconButton
          className="m3-search__clear"
          label="Clear search"
          icon={<X size={18} />}
          onClick={() => onValueChange('')}
        />
      ) : null}
    </div>
  );
}

export default SearchBar;
