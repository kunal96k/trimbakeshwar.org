import React from 'react';

interface TrimbakBrandLogoProps {
  onClick?: () => void;
  className?: string;
  isDarkTheme?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function TrimbakBrandLogo({
  onClick,
  className = '',
  isDarkTheme = true,
  size = 'md',
}: TrimbakBrandLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  }[size];

  const titleSize = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
  }[size];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-hidden cursor-pointer select-none ${className}`}
      title="श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ • TRIMBAKESHWAR"
    >
      <div
        className={`${sizeClasses} rounded-full overflow-hidden border-2 border-[#D4AF37]/80 shadow-md shrink-0 bg-white p-0.5 flex items-center justify-center`}
      >
        <img
          alt="श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ Logo"
          className="w-full h-full object-cover rounded-full"
          src="/assets/purohit-profile.png"
        />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-bold ${titleSize} transition-colors font-heading tracking-wider ${isDarkTheme
              ? 'text-amber-100 group-hover:text-amber-300'
              : 'text-[#5A1717] group-hover:text-[#C56A18]'
            }`}
        >
          TRIMBAKESHWAR
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-devanagari font-medium transition-colors ${isDarkTheme ? 'text-[#D4AF37]' : 'text-[#B88935]'
            }`}
        >
          श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ
        </span>
      </div>
    </button>
  );
}

export default TrimbakBrandLogo;
