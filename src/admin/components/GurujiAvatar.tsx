import React from 'react';

interface GurujiAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  showOnlineStatus?: boolean;
  className?: string;
  src?: string;
  alt?: string;
}

export const GurujiAvatar: React.FC<GurujiAvatarProps> = ({
  size = 'md',
  showOnlineStatus = true,
  className = '',
  src,
  alt = 'Pt. Pravin Shambhu Deshmukh (Desai)',
}) => {
  const dim = size === 'sm' ? 32 : size === 'md' ? 42 : 56;
  const imageSource = src || '/assets/guruji.png';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Outer Golden Border Ring */}
      <div
        className="rounded-full p-[2px] shadow-md transition-transform"
        style={{
          width: dim,
          height: dim,
          background: 'linear-gradient(135deg, #F59E0B 0%, #D4AF37 50%, #92400E 100%)',
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2B130E] to-[#140805] overflow-hidden flex items-center justify-center relative shadow-inner">
          <img
            src={imageSource}
            alt={alt}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/guruji.png';
            }}
          />
        </div>
      </div>

      {/* Online indicator */}
      {showOnlineStatus && (
        <span
          className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#120806] ring-1 ring-emerald-400/40"
          title="Online"
        />
      )}
    </div>
  );
};
