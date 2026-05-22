import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: '00', label: 'CORE_SYS', desc: 'OVERVIEW', target: 'core_sys' },
  { id: '01', label: 'IDENTITY', desc: 'ABOUT ME', target: 'identity' },
  { id: '02', label: 'ARCHIVES', desc: 'PROJECTS', target: 'archives' },
  { id: '03', label: 'PROTOCOLS', desc: 'SKILLS', target: 'protocols' },
  { id: '04', label: 'SYS_LOGS', desc: 'EXPERIENCE', target: 'sys_logs' },
  { id: '05', label: 'TRANSMIT', desc: 'CONTACT', target: 'transmit' },
];

export const Navi: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateNavState = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const viewportAnchor = window.innerHeight * 0.42;

      let nextActiveIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      NAV_ITEMS.forEach((item, index) => {
        const element = document.getElementById(item.target);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportAnchor);

        if (rect.top <= viewportAnchor && distance < closestDistance) {
          closestDistance = distance;
          nextActiveIndex = index;
        }
      });

      setActiveIndex(nextActiveIndex);
      setPageProgress(Math.min(1, Math.max(0, progress)));
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateNavState);
    };

    updateNavState();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  const activeItem = NAV_ITEMS[activeIndex];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 py-3 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between font-geist uppercase tracking-widest text-zinc-400 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
      <style>{`
        @keyframes navSweep {
          0% { transform: translateX(-120%); opacity: 0; }
          18% { opacity: 0.65; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes navPulse {
          0%, 100% { opacity: 0.35; transform: scaleX(0.7); }
          50% { opacity: 1; transform: scaleX(1); }
        }
      `}</style>

      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4ff00]/80 to-transparent" style={{ animation: 'navSweep 4.2s linear infinite' }} />
      <div className="absolute bottom-0 left-0 h-px bg-[#d4ff00] shadow-[0_0_10px_#d4ff00] transition-transform duration-300 ease-out origin-left" style={{ transform: `scaleX(${pageProgress})` }} />
      
      {/* LEFT: Branding */}
      <div className="relative z-10 flex items-center space-x-4 select-none mb-4 md:mb-0">
        <div className="flex items-center justify-center w-8 h-8 border border-white/20 rounded-sm relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
          <div className="absolute inset-x-1 bottom-1 h-px bg-[#d4ff00]" style={{ animation: 'navPulse 1.4s ease-in-out infinite' }} />
          <span className="text-white font-bold text-lg leading-none mt-1 group-hover:scale-110 transition-transform">*</span>
        </div>
        <div>
          <div className="text-white font-semibold tracking-[0.2em] text-[10px] opacity-90">BLACKSIGNAL PROTOCOL</div>
          <div className="flex items-center gap-2 text-[9px] opacity-60 font-mono mt-0.5 tracking-widest">
            <span>v3.7.2 // CV_CORE_INIT</span>
            <span className="hidden sm:inline text-[#d4ff00]">[{activeItem.id}] {activeItem.desc}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Navigation Links */}
      <nav className="relative z-10 flex items-center gap-1 md:gap-2 w-full md:w-auto overflow-x-auto whitespace-nowrap pb-1 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === activeIndex;

          return (
          <motion.a
            key={item.id}
            href={`#${item.target}`}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative px-2 md:px-3 py-2 flex items-center gap-2 border bg-transparent transition-all duration-300 cursor-pointer overflow-hidden group ${
              isActive
                ? 'border-[#d4ff00]/30 bg-[#d4ff00]/[0.06] shadow-[0_0_18px_rgba(212,255,0,0.08)]'
                : 'border-transparent hover:border-white/10 hover:bg-white/[0.03]'
            }`}
          >
            {/* Animated hover background scanline */}
            {(hoveredIndex === item.id || isActive) && (
              <motion.div 
                layoutId="nav-hover"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4ff00]/10 to-transparent z-0"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            )}

            <span className={`text-[9px] font-mono transition-colors z-10 ${isActive ? 'text-[#d4ff00] opacity-100' : 'opacity-50 group-hover:text-[#d4ff00] group-hover:opacity-100'}`}>[{item.id}]</span>
            <div className="flex flex-col z-10 min-w-0">
              <span className={`hidden md:inline font-medium text-[10px] transition-colors ${isActive ? 'text-[#d4ff00]' : 'text-white group-hover:text-[#d4ff00]'}`}>{item.label}</span>
              <span className={`hidden lg:block text-[7px] font-mono leading-none mt-1 transition-opacity ${isActive ? 'text-white/50 opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'}`}>{item.desc}</span>
            </div>
            {isActive && <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-[#d4ff00] shadow-[0_0_8px_#d4ff00]" />}
          </motion.a>
          );
        })}
      </nav>

    </header>
  );
};

export default Navi;
