import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmarkText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmarkText = true,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-9 w-auto',
    md: 'h-11 sm:h-12 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
    xl: 'h-28 sm:h-36 md:h-44 w-auto',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {!imgError ? (
        <img
          src="/zenx-logo.svg"
          alt="ZenX Solutions Logo"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`${sizeClasses} object-contain shrink-0`}
          width={152}
          height={142}
        />
      ) : (
        <div
          className={`${sizeClasses} aspect-[380/355] flex items-center justify-center border border-[#ece1df]/30 bg-[#000612] text-[#ece1df] font-display font-extrabold px-2`}
          aria-label="ZenX Solutions Emblem"
        >
          ZX
        </div>
      )}
      {showWordmarkText && (
        <span className="font-display font-bold tracking-tight text-[#ece1df] text-lg sm:text-xl whitespace-nowrap">
          ZenX Solutions
        </span>
      )}
    </div>
  );
};
