import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HoverMaskRevealProps {
  baseImageSrc?: string;
  hoverImageSrc?: string;
  className?: string;
}

export const HoverMaskReveal: React.FC<HoverMaskRevealProps> = ({
  baseImageSrc = '/base_hacker.png',
  hoverImageSrc = '/hover_hacker.png',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for raw cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configuration for premium, smooth easing
  const springConfig = { stiffness: 120, damping: 22, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Animate the mask circle radius from 0 to 220px and opacity from 0 to 1 on hover
  const maskRadius = useMotionValue(0);
  const maskOpacity = useMotionValue(0);
  const smoothRadius = useSpring(maskRadius, springConfig);
  const smoothOpacity = useSpring(maskOpacity, springConfig);

  useEffect(() => {
    maskRadius.set(isHovered ? 200 : 0);
    maskOpacity.set(isHovered ? 1 : 0);
  }, [isHovered, maskRadius, maskOpacity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate coordinates relative to the container element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Convert raw coords into CSS radial-gradient for a smooth, fluid spotlight mask.
  const maskImage = useTransform(
    [smoothX, smoothY, smoothRadius],
    ([x, y, r]) => `radial-gradient(circle ${r}px at ${x}px ${y}px, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)`
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-visible flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* 
        Shared scaling container: scales base and hover images in perfect unison (max 1.02).
        This guarantees perfect silhouette alignment and zero offset distortion during scaling.
      */}
      <motion.div
        animate={{ scale: isHovered ? 1.02 : 1.0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="relative w-full h-full flex items-center justify-center overflow-visible"
      >
        {/* Base layer: grayscale / dark hacker silhouette */}
        <img
          src={baseImageSrc}
          alt="Hacker Portrait Base"
          className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none z-10"
          draggable="false"
        />

        {/* Hover layer: glowing matrix / color hacker portrait with soft mask and opacity fade */}
        <motion.div
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={{ 
            WebkitMaskImage: maskImage, 
            maskImage: maskImage, 
            opacity: smoothOpacity
          }}
        >
          <img
            src={hoverImageSrc}
            alt="Hacker Portrait Hover Reveal"
            className="w-full h-full object-contain object-bottom pointer-events-none"
            draggable="false"
          />
        </motion.div>
      </motion.div>

    </div>
  );
};

export default HoverMaskReveal;
