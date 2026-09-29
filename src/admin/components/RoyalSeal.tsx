import React from 'react';

interface RoyalSealProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RoyalSeal: React.FC<RoyalSealProps> = ({ size = 'md', className = '' }) => {
  const dimension = size === 'sm' ? 36 : size === 'md' ? 48 : 72;

  return (
    <div
      className={`relative rounded-2xl flex items-center justify-center p-0.5 shadow-lg select-none ${className}`}
      style={{
        width: dimension,
        height: dimension,
        background: 'linear-gradient(135deg, #F59E0B 0%, #D4AF37 40%, #78350F 100%)',
        boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
      }}
    >
      <div className="w-full h-full rounded-[14px] bg-[#160B08] flex items-center justify-center p-1.5 relative overflow-hidden border border-amber-400/40">
        {/* Sacred radiant halo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.25)_0%,_transparent_75%)] pointer-events-none" />

        {/* Lord Shiva Trishul & Royal Vatan Seal Vector */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-amber-300 relative z-10 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer ornamental circle with notches */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          <circle cx="50" cy="50" r="39" stroke="url(#goldGradientLight)" strokeWidth="1" opacity="0.6" />

          {/* Trishul Central Spike */}
          <path
            d="M50 14 L50 78 M48 14 L52 14 M50 12 L50 16"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Trishul Prongs (Left & Right curves) */}
          <path
            d="M32 30 C32 46, 46 52, 50 54 C54 52, 68 46, 68 30"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Sharp tips */}
          <polygon points="50,10 46,18 54,18" fill="url(#goldGradientLight)" />
          <polygon points="32,26 28,34 35,34" fill="url(#goldGradientLight)" />
          <polygon points="68,26 65,34 72,34" fill="url(#goldGradientLight)" />

          {/* Damru Motif on shaft */}
          <path
            d="M42 58 L58 58 L42 66 L58 66 Z"
            fill="url(#goldGradient)"
            stroke="url(#goldGradientLight)"
            strokeWidth="0.8"
          />
          <circle cx="50" cy="62" r="1.5" fill="#160B08" />

          {/* Sacred Bilva Leaf Wings at base */}
          <path
            d="M50 74 C43 70 38 78 45 82 C48 80 50 76 50 74 Z"
            fill="url(#goldGradientLight)"
            opacity="0.8"
          />
          <path
            d="M50 74 C57 70 62 78 55 82 C52 80 50 76 50 74 Z"
            fill="url(#goldGradientLight)"
            opacity="0.8"
          />

          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="goldGradientLight" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FEF3C7" />
              <stop offset="1" stopColor="#FBBF24" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
