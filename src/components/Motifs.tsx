import React from 'react';

export function TrishulIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Central prong */}
      <path d="M24 4V44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 4L22 10H26L24 4Z" fill="currentColor" />
      
      {/* Left prong */}
      <path d="M14 10C14 18 19 22 24 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 10L12 14H16L14 10Z" fill="currentColor" />
      
      {/* Right prong */}
      <path d="M34 10C34 18 29 22 24 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 10L32 14H36L34 10Z" fill="currentColor" />
      
      {/* Damru center */}
      <path d="M19 29L29 35V29L19 35V29Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="24" cy="32" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function OmSymbol({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M33.2 26.6c-.8-.5-1.8-.8-2.9-.8-2.6 0-4.8 1.8-5.3 4.4-.2.9-.8 1.5-1.7 1.5-.9 0-1.7-.7-1.7-1.6 0-4.3 3.6-7.8 8.1-7.8 2.2 0 4.2.9 5.7 2.4 1.5 1.5 2.3 3.5 2.3 5.7 0 2.8-1.4 5.3-3.6 6.8 3.2 1.4 5.4 4.6 5.4 8.3 0 5-4.1 9.1-9.2 9.1-4.2 0-7.8-2.8-8.9-6.8-.2-.9.3-1.8 1.2-2 .9-.2 1.8.3 2 1.2.8 2.9 3.4 4.8 6.4 4.8 3.5 0 6.4-2.8 6.4-6.3 0-3.5-2.8-6.3-6.4-6.3h-1.8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h1.8c2.8 0 5.2-1.9 5.8-4.6.4-1.8-.1-3.6-1.4-4.8zM41.5 29.5c2.4 2.8 6.1 4.6 10.2 4.6 1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8c-3.3 0-6.2-1.4-8.2-3.7-.6-.7-1.6-.8-2.3-.2-.7.6-.8 1.6-.2 2.3zM45.5 16.5c-3.5 0-6.7 1.4-9 3.8-.6.7-.6 1.7.1 2.3.6.6 1.7.6 2.3-.1 1.8-1.9 4.3-3 7-3 4.7 0 8.7 3.5 9.3 8.2.1 1 .9 1.7 1.9 1.6 1-.1 1.7-.9 1.6-1.9-.7-6-5.8-10.4-11.8-10.4zM47.2 11.5c1.4 0 2.5-1.1 2.5-2.5S48.6 6.5 47.2 6.5 44.7 7.6 44.7 9s1.1 2.5 2.5 2.5z" />
    </svg>
  );
}

export function JyotirlingaFlame({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 3C16 3 9 11 9 18C9 23 12.1 27 16 27C19.9 27 23 23 23 18C23 11 16 3 16 3Z"
        fill="url(#flame_grad)"
      />
      <path
        d="M16 11C16 11 12 15 12 19C12 21.5 13.8 23.5 16 23.5C18.2 23.5 20 21.5 20 19C20 15 16 11 16 11Z"
        fill="#FFECB3"
      />
      <defs>
        <linearGradient id="flame_grad" x1="16" y1="3" x2="16" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC107" />
          <stop offset="0.6" stopColor="#C56A18" />
          <stop offset="1" stopColor="#5A1717" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BilvaPatraIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Central leaf */}
      <path d="M18 4C13 10 15 17 18 20C21 17 23 10 18 4Z" fill="currentColor" />
      {/* Left leaf */}
      <path d="M7 16C12 14 17 18 18 21C15 23 9 22 7 16Z" fill="currentColor" />
      {/* Right leaf */}
      <path d="M29 16C24 14 19 18 18 21C21 23 27 22 29 16Z" fill="currentColor" />
      {/* Stem */}
      <path d="M18 20V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DiyaFlameIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Diya Base */}
      <path
        d="M6 24C6 31 12 34 20 34C28 34 34 31 34 24C34 22 30 22 20 22C10 22 6 22 6 24Z"
        fill="#B88935"
        stroke="#8A5A14"
        strokeWidth="1.5"
      />
      {/* Spout tip */}
      <path d="M20 22C20 22 25 18 27 15" stroke="#C56A18" strokeWidth="1.5" />
      {/* Flame */}
      <path
        d="M20 7C17 12 15 15 15 18C15 21 17.5 23 20 23C22.5 23 25 21 25 18C25 15 23 12 20 7Z"
        fill="#FFB300"
      />
      <circle cx="20" cy="18" r="2.5" fill="#FFF9C4" />
      {/* Stand base */}
      <path d="M15 34H25V37H15V34Z" fill="#8A5A14" />
    </svg>
  );
}

export function TripundraMark({ className = 'w-16 h-6' }: { className?: string }) {
  return (
    <div className={`flex flex-col justify-center items-center gap-[3px] ${className}`}>
      <div className="w-full h-[3px] bg-[#EDE3D1]/80 rounded-full"></div>
      <div className="relative w-full h-[3px] bg-[#EDE3D1]/80 rounded-full flex items-center justify-center">
        <div className="absolute w-2 h-2 rounded-full bg-[#5A1717] ring-1 ring-[#C56A18]"></div>
      </div>
      <div className="w-full h-[3px] bg-[#EDE3D1]/80 rounded-full"></div>
    </div>
  );
}

export function SacredMandala({ className = 'w-32 h-32' }: { className?: string }) {
  return (
    <img
      src="/assets/hindu-chkra.png"
      alt="Sacred Hindu Chakra"
      className={`object-contain pointer-events-none select-none ${className}`}
      loading="lazy"
    />
  );
}

export function KalashMotif({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Coconut on top */}
      <circle cx="20" cy="11" r="5" fill="#8A5A14" />
      <path d="M15 12L20 4L25 12" stroke="#B88935" strokeWidth="1.5" />
      {/* Mango leaves */}
      <path d="M12 14C15 11 17 12 18 15" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 14C25 11 23 12 22 15" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pot neck */}
      <rect x="15" y="15" width="10" height="3" rx="1.5" fill="#B88935" />
      {/* Pot belly */}
      <ellipse cx="20" cy="26" rx="9" ry="8" fill="#B88935" stroke="#8A5A14" strokeWidth="1.5" />
      <path d="M13 25C13 25 17 28 27 25" stroke="#C56A18" strokeWidth="1.5" />
      <circle cx="20" cy="25" r="1.5" fill="#5A1717" />
    </svg>
  );
}

// 1. Hindu Mandir / Shikhara Icon (replaces 🛕)
export function TempleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Saffron Flag (Dhwaja) on top */}
      <path d="M12 2V5M12 2L15.5 3.5L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Kalash on spire */}
      <circle cx="12" cy="5.5" r="1" fill="currentColor" />
      {/* Temple Shikhara (curved tower) */}
      <path d="M12 6.5C10 9 8.5 11 8 13.5H16C15.5 11 14 9 12 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
      {/* Shikhara horizontal ridges (Bhumi tiers) */}
      <path d="M9.5 10H14.5M8.5 12H15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Temple Base / Mandapa with pillars */}
      <path d="M6 13.5H18V15H6V13.5Z" fill="currentColor" />
      <path d="M7 15V20M10 15V20M14 15V20M17 15V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Sanctum archway (Garbhagriha door) */}
      <path d="M10.5 20V17.5C10.5 16.7 11.2 16 12 16C12.8 16 13.5 16.7 13.5 17.5V20" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.25" />
      {/* Steps platform */}
      <path d="M4 20H20V21.5H4V20Z" fill="currentColor" />
    </svg>
  );
}

// 2. Pranam / Anjali Mudra Folded Hands (replaces 🙏)
export function PranamHandsIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3.5C11.5 5 10 9 9.5 12.5C9 15 9 17.5 9.5 20.5H11.5L12 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.5C12.5 5 14 9 14.5 12.5C15 15 15 17.5 14.5 20.5H12.5L12 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 3.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="7" r="0.75" fill="currentColor" />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" />
    </svg>
  );
}

// 3. Sacred Lotus / Kamal (replaces 🪷, 🌺)
export function LotusIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Central petal */}
      <path d="M12 4C10.5 7.5 10.5 11 12 14C13.5 11 13.5 7.5 12 4Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Inner left petal */}
      <path d="M11 7C8.5 9 8 12.5 11 15C11.5 13 11.5 10 11 7Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Inner right petal */}
      <path d="M13 7C15.5 9 16 12.5 13 15C12.5 13 12.5 10 13 7Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Outer left petal */}
      <path d="M9 11C6 12.5 5.5 15.5 8.5 17C10 16 10.5 14 9 11Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Outer right petal */}
      <path d="M15 11C18 12.5 18.5 15.5 15.5 17C14 16 13.5 14 15 11Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Lotus base calyx / water ripple */}
      <path d="M6 18.5C9 19.5 15 19.5 18 18.5M8 20.5C10.5 21.2 13.5 21.2 16 20.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// 4. Rudraksha Japa Mala (replaces 📿)
export function RudrakshaMalaIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="10" rx="7.5" ry="6.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1.5 2.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.8" fill="currentColor" />
      <path d="M12 18.8V22M10.5 22H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 19.5L10 22M13 19.5L14 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// 5. Nag Devta / Sheshnag Cobra Hood (replaces 🐍)
export function NagDevtaIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C8.5 3 6.5 6 7 9.5C7.5 12 10 13.5 11 15V19C11 20 10.5 21 9.5 21C8.5 21 8 20 8 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3C15.5 3 17.5 6 17 9.5C16.5 12 14 13.5 13 15V19C13 20.5 14.5 21.5 16 21C17.5 20.5 18 19 18 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 7C10.5 6 13.5 6 14 7M12 5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

// 6. Vedic Shastra Scroll / Grantha (replaces 📜, 📖)
export function VedicScrollIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19 5H6C4.9 5 4 5.9 4 7V17C4 18.1 4.9 19 6 19H18C19.1 19 20 18.1 20 17V6C20 5.4 19.6 5 19 5Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M4 7C4 5.9 4.9 5 6 5C7.1 5 8 5.9 8 7V19M18 5V19" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 9H16M10 12H16M10 15H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// 7. Hindu Panchang Calendar (replaces 📅, 🗓️)
export function PanchangIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
      <path d="M7 3V6M17 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 9H20.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

// 8. Sacred Vivah Gathbandhan / Knot (replaces 💍)
export function VivahKnotIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 14.5L10 20M12 14.5L14 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 9. Brahmagiri Peaks (replaces 🏔️)
export function BrahmagiriIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L19 18H5L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
      <path d="M6 13L2 19H8" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M17 11L22 19H16" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 9V13C12 14.5 11 16 12 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

// 10. Sacred Godavari Waters (replaces 🌊, 💧)
export function GodavariWaveIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10C5.5 8.5 8 11.5 10.5 10C13 8.5 15.5 11.5 18 10C19.5 9 20.5 9.5 21 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 14C5.5 12.5 8 15.5 10.5 14C13 12.5 15.5 15.5 18 14C19.5 13 20.5 13.5 21 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 18C5.5 16.5 8 19.5 10.5 18C13 16.5 15.5 19.5 18 18C19.5 17 20.5 17.5 21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 11. Temple Bell / Ghanta (replaces 🔔)
export function TempleBellIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 5.5C8.5 5.5 7 9 6.5 14H17.5C17 9 15.5 5.5 12 5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
      <path d="M5 14C5 15.5 7 16.5 12 16.5C17 16.5 19 15.5 19 14H5Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
      <circle cx="12" cy="18.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 12. Divya Jyoti / Sacred Sparkle (replaces ✨, ✦, ✧)
export function DivyaSparkleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
    </svg>
  );
}

// 13. Shankha / Sacred Conch Shell (replaces 🐚)
export function ShankhaIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19C4.5 17.5 4 14.5 5.5 11C7 7.5 11 4 15 4C18 4 19.5 6 19.5 8C19.5 12 13 17 9 19H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 6C13.5 8 14 11 11.5 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="15.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

// 14. Ratna Mukut / Sacred Golden Crown of Trimbakeshwar (replaces 👑)
export function MukutIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 18H20V20C20 20.5 19.5 21 19 21H5C4.5 21 4 20.5 4 20V18Z" fill="currentColor" />
      <path
        d="M4 18L5.5 11L9 14.5L12 6L15 14.5L18.5 11L20 18H4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="5.5" cy="10" r="1" fill="currentColor" />
      <circle cx="18.5" cy="10" r="1" fill="currentColor" />
      <path d="M12 11L13.5 13L12 15L10.5 13L12 11Z" fill="currentColor" />
    </svg>
  );
}

// 15. Amrit Kumbha / Sacred Kalash (replaces 🪐, 🏺)
export function KumbhaIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10 5 10 7 12 8C14 7 14 5 12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 6C10 6.5 11.5 7.5 12 8C12.5 7.5 14 6.5 16 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="8" y="8" width="8" height="2" rx="1" fill="currentColor" />
      <path d="M9 10C6 12 5 15.5 7 18.5C8 20 10 21 12 21C14 21 16 20 17 18.5C19 15.5 18 12 15 10H9Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 15C10 16.5 14 16.5 16 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// 16. Saffron Dhwaja / Temple Flag (replaces 🚩)
export function DhwajaIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 4L19 9L14 11.5L19 14L6 18V4Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

