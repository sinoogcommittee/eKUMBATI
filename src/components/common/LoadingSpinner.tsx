import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  fullScreen = false,
}) => {
  const sizeMap = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <div className="relative" aria-hidden="true">
        {/* Outer glowing pulsing ring with motion dampening */}
        <div
          className={`${sizeMap[size]} rounded-full border-orange-200 border-t-orange-600 animate-spin motion-reduce:animate-none motion-reduce:border-orange-500`}
        />
        {/* Inner center dot */}
        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-orange-500 animate-ping motion-reduce:animate-none opacity-75" />
      </div>
      {text ? (
        <p className="text-xs sm:text-sm font-semibold text-slate-600 tracking-wide">
          {text}
        </p>
      ) : (
        <span className="sr-only">Loading...</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center p-8">
        {spinnerContent}
      </div>
    );
  }

  return <div className="py-6 flex items-center justify-center">{spinnerContent}</div>;
};

export default LoadingSpinner;
