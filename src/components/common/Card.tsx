import React, { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'filled' | 'elevated' | 'outlined' | 'dark';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: CardVariant;
  /** HTML element to render. Default is "div". Use "article" for self-contained cards, "li" inside lists. */
  as?: 'div' | 'section' | 'article' | 'li';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  as: Tag = 'div',
  hoverable = true,
  className = '',
  ...props
}) => {
  const variantClasses: Record<CardVariant, string> = {
    default: 'sinoog-card',
    filled: 'sinoog-card sinoog-card--filled',
    elevated: 'sinoog-card sinoog-card--elevated',
    outlined: 'sinoog-card border-orange-200/80 bg-white/95 shadow-xs',
    dark: 'sinoog-card sinoog-card--dark',
  };

  const hoverClass = hoverable
    ? 'hover:-translate-y-1 hover:shadow-sinoog-hover transition-all duration-300'
    : '!transform-none hover:!transform-none';

  return (
    <Tag
      className={`${variantClasses[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Card;
