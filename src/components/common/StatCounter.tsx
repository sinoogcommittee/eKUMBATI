import React, { useEffect, useState, useRef } from 'react';
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
  CheckCircle2,
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
  showDetails?: boolean;
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
  duration = 1500,
  className = '',
  showDetails = true,
}) => {
  const { t } = useLanguage();
  const [displayValue, setDisplayValue] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const IconComponent = ICON_MAP[iconName] || Activity;
  const categoryVariant = getCategoryBadgeVariant(category);

  useEffect(() => {
    // Check operating system reduced motion accessibility preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(numericValue);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    let hasStarted = false;

    const startCountAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;

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
    };

    // IntersectionObserver triggers count-up only when visible in the viewport
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            startCountAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
        }
      };
    } else {
      startCountAnimation();
      return () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [numericValue, duration]);

  return (
    <div
      ref={containerRef}
      className={`group relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-7 border border-orange-200/80 border-t-white shadow-sinoog hover:shadow-sinoog-hover hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-md bg-gradient-to-b from-white via-white/98 to-amber-50/25 ${className}`}
    >
      {/* Decorative Warm Gradient Ambient Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-28 sm:h-28 bg-gradient-to-bl from-orange-100/40 via-amber-50/20 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

      <div>
        {/* Header: Category Badge & Elevated Icon Box */}
        <div className="flex items-center justify-between gap-1 mb-2.5 sm:mb-4 relative z-10">
          <Badge
            variant={categoryVariant}
            size="sm"
            dot
            className="text-[10px] sm:text-[11px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 shrink truncate max-w-[85px] sm:max-w-none"
          >
            {category}
          </Badge>
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border border-orange-200/80 border-t-white flex items-center justify-center text-orange-600 shadow-sinoog-inner group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-sinoog transition-all duration-300 shrink-0">
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Big Tabular Counter */}
        <div className="flex items-baseline gap-0.5 sm:gap-1 mb-1 sm:mb-2 relative z-10">
          <span className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-sans">
            {displayValue.toLocaleString()}
          </span>
          {suffix && (
            <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-orange-600">
              {suffix}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-base lg:text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight sm:leading-snug mb-1 sm:mb-2 relative z-10 break-words">
          {t(titleEn, titleCeb)}
        </h3>
      </div>

      {/* Description / Subtext & Inner Milestone Box */}
      {showDetails && (descriptionEn || descriptionCeb) && (
        <div className="border-t border-orange-100/70 pt-2 sm:pt-3 mt-2 sm:mt-3 relative z-10">
          <p className="text-[11px] sm:text-xs text-slate-500 leading-snug sm:leading-relaxed line-clamp-2 mb-2 sm:mb-2.5">
            {t(descriptionEn || '', descriptionCeb || '')}
          </p>
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl bg-white/95 border border-emerald-200/80 border-t-white shadow-sinoog-inner text-[9px] sm:text-[11px] font-bold text-emerald-700 max-w-full">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-emerald-600" />
            <span className="truncate">{t('Verified Term Milestone', 'Beripikadong Talaan sa Termino')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCounter;
