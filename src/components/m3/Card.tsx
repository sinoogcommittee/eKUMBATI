import { HTMLAttributes, ReactNode } from 'react';

export type M3CardVariant = 'filled' | 'elevated' | 'outlined';

export type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  variant?: M3CardVariant;
  /** Element to render. Use 'article' for self-contained items, 'li' inside lists, 'section' for regions. */
  as?: 'div' | 'section' | 'article' | 'li';
};

export function Card({
  children,
  variant = 'filled',
  as: Tag = 'div',
  className = '',
  ...props
}: CardProps) {
  const classes = ['m3-card', `m3-card--${variant}`, className].filter(Boolean).join(' ');
  return (
    <Tag {...props} className={classes}>
      {children}
    </Tag>
  );
}

export default Card;
