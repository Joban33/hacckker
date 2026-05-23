import React from 'react';

type LogoMarkProps = {
  className?: string;
  imageClassName?: string;
};

export const LogoMark: React.FC<LogoMarkProps> = ({
  className = '',
  imageClassName = '',
}) => (
  <span className={`relative inline-flex items-center justify-center ${className}`} aria-hidden="true">
    <img
      src="/blacksignal-photo.png"
      alt=""
      draggable="false"
      className={`h-full w-full object-contain invert brightness-125 contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.22)] ${imageClassName}`}
    />
  </span>
);

export default LogoMark;
