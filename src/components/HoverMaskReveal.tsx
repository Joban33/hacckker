import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

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
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);
  
  // Animate the circular mask radius from 0 to 200px and opacity from 0 to 1 on hover
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

  // Circular fluid mask: a stable round core with small circular edge pockets.
  const maskImage = useTransform(
    [smoothX, smoothY, smoothRadius, velocityX, velocityY],
    (latest) => {
      const [x, y, r, vx, vy] = latest as number[];
      const velocity = Math.min(1, Math.hypot(vx, vy) / 900);
      const angle = Math.atan2(vy || 0.001, vx || 0.001);
      const drift = 16 + velocity * 28;
      const orbitA = angle + Math.PI * 0.45;
      const orbitB = angle - Math.PI * 0.62;
      const orbitC = angle + Math.PI * 1.12;
      const pocketA = {
        x: x + Math.cos(orbitA) * drift,
        y: y + Math.sin(orbitA) * drift,
      };
      const pocketB = {
        x: x + Math.cos(orbitB) * drift * 0.78,
        y: y + Math.sin(orbitB) * drift * 0.78,
      };
      const pocketC = {
        x: x + Math.cos(orbitC) * drift * 0.58,
        y: y + Math.sin(orbitC) * drift * 0.58,
      };

      return [
        `radial-gradient(circle ${r}px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 42%, rgba(0,0,0,0.78) 62%, rgba(0,0,0,0) 82%)`,
        `radial-gradient(circle ${r * 0.26}px at ${pocketA.x}px ${pocketA.y}px, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.34) 48%, rgba(0,0,0,0) 78%)`,
        `radial-gradient(circle ${r * 0.2}px at ${pocketB.x}px ${pocketB.y}px, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.28) 52%, rgba(0,0,0,0) 80%)`,
        `radial-gradient(circle ${r * 0.16}px at ${pocketC.x}px ${pocketC.y}px, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0) 76%)`,
      ].join(', ');
    }
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
            style={{
              transform: 'translate3d(-0.82%, 0.29%, 0) scale3d(0.982, 0.994, 1)',
              transformOrigin: 'center bottom',
            }}
            draggable="false"
          />
        </motion.div>
      </motion.div>

    </div>
  );
};

export default HoverMaskReveal;
