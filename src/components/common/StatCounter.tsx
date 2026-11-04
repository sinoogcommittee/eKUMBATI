import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Home,
  Ambulance,
  HeartPulse,
  Users,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Activity,
  LucideIcon,
} from 'lucide-react';
import { Badge, getCategoryBadgeVariant } from './Badge';

interface StatCounterProps {
  numericValue: number;
  suffix?: string;
  titleEn: string;
  titleCeb: string;
  descriptionEn?: string;
  descriptionCeb?: string;
  category?: string;
  iconName?: string;
  duration?: number;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Ambulance,
  HeartPulse,
  Users,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Activity,
};

export const StatCounter: React.FC<StatCounterProps> = ({
  numericValue,
  suffix = '+',
  titleEn,
  titleCeb,
  descriptionEn,
  descriptionCeb,
  category = 'Flagship',
  iconName = 'Activity',
  duration = 1200,
  className = '',
}) => {
  const { t } = useLanguage();
  const [displayValue, setDisplayValue] = useState<number>(0);

  const IconComponent = ICON_MAP[iconName] || Activity;
  const categoryVariant = getCategoryBadgeVariant(category);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easedProgress * numericValue));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(numericValue);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [numericValue, duration]);

  return (
    <div
      className={`bg-white rounded-xl p-5 border border-slate-200/90 shadow-card flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Header: Category Badge & Quiet Icon */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant={categoryVariant} size="sm" dot>
            {category}
          </Badge>
          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600">
            <IconComponent className="w-4 h-4" />
          </div>
        </div>

        {/* Counter Display with tabular figures */}
        <div className="flex items-baseline gap-0.5 mt-2">
          <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
            {displayValue.toLocaleString()}
          </span>
          {suffix && (
            <span className="text-xl sm:text-2xl font-medium text-orange-600">
              {suffix}
            </span>
          )}
        </div>

        {/* Localized Title */}
        <h3 className="text-sm font-medium text-slate-800 mt-1 line-clamp-1">
          {t(titleEn, titleCeb)}
        </h3>

        {/* Localized Subtext / Description */}
        {(descriptionEn || descriptionCeb) && (
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
            {t(descriptionEn || '', descriptionCeb || '')}
          </p>
        )}
      </div>

      {/* Quiet Audit Footnote */}
      <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-[11px] text-slate-400">
        <span className="tabular-nums">2025 District Tally</span>
        <span className="text-slate-300">&bull;</span>
        <span className="text-slate-500">Official</span>
      </div>
    </div>
  );
};

export default StatCounter;
