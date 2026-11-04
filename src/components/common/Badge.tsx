import React, { ReactNode } from 'react';
import { SubmissionStatus, ProgramCategory } from '../../types/kumbati.types';

export type BadgeVariant = 'orange' | 'emerald' | 'amber' | 'red' | 'blue' | 'slate' | 'purple';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'orange',
  size = 'md',
  dot = false,
  children,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantClasses: Record<BadgeVariant, { container: string; dot: string }> = {
    orange: {
      container: 'bg-orange-50 text-orange-700 border-orange-200/70',
      dot: 'bg-orange-500',
    },
    emerald: {
      container: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
      dot: 'bg-emerald-500',
    },
    amber: {
      container: 'bg-amber-50 text-amber-700 border-amber-200/70',
      dot: 'bg-amber-500',
    },
    red: {
      container: 'bg-red-50 text-red-700 border-red-200/70',
      dot: 'bg-red-500',
    },
    blue: {
      container: 'bg-blue-50 text-blue-700 border-blue-200/70',
      dot: 'bg-blue-500',
    },
    slate: {
      container: 'bg-slate-100 text-slate-700 border-slate-200/70',
      dot: 'bg-slate-500',
    },
    purple: {
      container: 'bg-purple-50 text-purple-700 border-purple-200/70',
      dot: 'bg-purple-500',
    },
  };

  const currentVariant = variantClasses[variant] || variantClasses.orange;

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-wider rounded-lg border ${sizeClasses[size]} ${currentVariant.container} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${currentVariant.dot}`} />}
      <span>{children}</span>
    </span>
  );
};

/**
 * Maps constituent submission status to an appropriate UI badge variant
 */
export function getStatusBadgeVariant(status: SubmissionStatus): BadgeVariant {
  switch (status) {
    case 'resolved':
      return 'emerald';
    case 'action_taken':
      return 'blue';
    case 'in_review':
      return 'amber';
    case 'pending':
      return 'orange';
    case 'closed':
    default:
      return 'slate';
  }
}

/**
 * Maps program category to an appropriate UI badge variant
 */
export function getCategoryBadgeVariant(category: ProgramCategory | string): BadgeVariant {
  switch (category) {
    case 'Health':
      return 'red';
    case 'Housing':
      return 'orange';
    case 'Education':
      return 'blue';
    case 'Livelihood':
      return 'emerald';
    case 'Community':
    case 'Infrastructure':
      return 'purple';
    default:
      return 'slate';
  }
}

export default Badge;
