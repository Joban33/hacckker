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
      src="/blacksignal-logo.png"
      alt=""
      draggable="false"
      className={`h-full w-full object-contain drop-shadow-[0_0_8px_rgba(212,255,0,0.45)] ${imageClassName}`}
    />
  </span>
);

export default LogoMark;
