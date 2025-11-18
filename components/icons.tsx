import React from 'react';

interface IconProps {
  className?: string;
}

export const BellIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const BarChartIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.566,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

export const WrenchIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);

export const PaintBrushIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z" />
        <path d="M9 8c-2 3-4 3.5-7 4l8 8c.5-3 1-5 4-7" />
        <path d="M14.5 17.5 4.5 7.5" />
    </svg>
);

export const GearIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M12 2v2" /> <path d="M12 22v-2" />
        <path d="m17 20.66-1-1.73" /> <path d="m8 4.07 1 1.73" />
        <path d="m5 7-1.73-1" /> <path d="m20.66 17-1.73-1" />
        <path d="M2 12h2" /> <path d="M22 12h-2" />
        <path d="m6 18.93 1-1.73" /> <path d="m17 4.07-1 1.73" />
        <path d="M4.07 17l1.73-1" /> <path d="M20.07 8l-1.73 1" />
    </svg>
);

export const HammerIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m15 12-8.373 8.373a1 1 0 1 1-1.414-1.414L12.586 12l.414-.414.414.414Z" />
        <path d="M2 21h3v-3" />
        <path d="m18 15 2-2a1 1 0 0 0 0-1.414l-4-4a1 1 0 0 0-1.414 0l-2 2" />
        <path d="m15 12-2.293 2.293a1 1 0 0 1-1.414 0l-1-1a1 1 0 0 1 0-1.414L12.586 9.586" />
    </svg>
);

export const SignOutIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const KeyMakerIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="8" cy="15" r="4" />
    <line x1="10.88" y1="12.12" x2="18" y2="5" />
    <line x1="15" y1="8" x2="18" y2="5" />
    <line x1="13" y1="10" x2="16" y2="7" />
  </svg>
);

export const PropertyInspectionIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.25 10.25a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z" />
    <path d="M10.25 15.25 4.75 20.75" />
    <path d="m8.25 6.25 4 4" />
  </svg>
);

export const CleaningIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3.5 11l7.071 7.071a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414L6 8" />
    <path d="M12 20l4-4" />
    <path d="M18.5 2.5l-2.012 2.012a2.33 2.33 0 0 1-3.295 0L12 3.5" />
    <path d="m15 6.5 1-1" />
  </svg>
);

export const PestControlIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h.01" />
    <path d="M19.13 4.14a8.1 8.1 0 0 0-14.26 0" />
    <path d="M5 10s2 2 7 0" />
    <path d="M12 14c-4 0-4 3-4 3h8s0-3-4-3Z" />
    <path d="M4 17h16" />
    <path d="m10 7 4 6" />
    <path d="m14 7-4 6" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);


export const CategoryIcons: Record<string, React.FC<IconProps>> = {
  'Water Filter Upgrade/Change': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  'Plumber': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18.8 3.2a2.3 2.3 0 0 0-3.2 0l-4.3 4.3c-.4.4-.7 1-.8 1.5l-1.5 6.1c-.2.7.4 1.4 1.2 1.2l6.1-1.5c.5-.1 1.1-.4 1.5-.8l4.3-4.3c.9-.9.9-2.3 0-3.2l-2.3-2.3z"/>
      <path d="M5.4 15.6a2.3 2.3 0 0 0-3.2 0l-1 1a2.3 2.3 0 0 0 0 3.2l2.3 2.3c.9.9 2.3.9 3.2 0l1-1a2.3 2.3 0 0 0 0-3.2l-.1-.1"/>
      <path d="m11 8 6 6"/>
    </svg>
  ),
  'Electrician': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z" />
    </svg>
  ),
  'Fridge Repair': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v4" />
      <path d="M12 20v2" />
      <path d="M5 12H2" />
      <path d="M22 12h-3" />
      <path d="M18.36 18.36l-2.12-2.12" />
      <path d="M7.76 7.76L5.64 5.64" />
      <path d="M18.36 5.64l-2.12 2.12" />
      <path d="M7.76 16.24l-2.12 2.12" />
      <path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  'Washing Machine Repair': ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v4" />
      <path d="M12 20v2" />
      <path d="M5 12H2" />
      <path d="M22 12h-3" />
      <path d="M18.36 18.36l-2.12-2.12" />
      <path d="M7.76 7.76L5.64 5.64" />
      <path d="M18.36 5.64l-2.12 2.12" />
      <path d="M7.76 16.24l-2.12 2.12" />
      <path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  'Key Maker': KeyMakerIcon,
  'Property Inspection': PropertyInspectionIcon,
  'Carpenter': HammerIcon,
  'Full House Deep Cleaning': CleaningIcon,
  'Pest Control': PestControlIcon,
};
