import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: '00', label: 'CORE_SYS', desc: 'OVERVIEW' },
  { id: '01', label: 'IDENTITY', desc: 'ABOUT ME' },
  { id: '02', label: 'ARCHIVES', desc: 'PROJECTS' },
  { id: '03', label: 'PROTOCOLS', desc: 'SKILLS' },
  { id: '04', label: 'SYS_LOGS', desc: 'EXPERIENCE' },
  { id: '05', label: 'TRANSMIT', desc: 'CONTACT' },
];

export const Navi: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 py-3 px-6 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between font-geist uppercase tracking-widest text-zinc-400">
      
      {/* LEFT: Branding */}
      <div className="flex items-center space-x-4 select-none mb-4 md:mb-0">
        <div className="flex items-center justify-center w-8 h-8 border border-white/20 rounded-sm relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
          <span className="text-white font-bold text-lg leading-none mt-1 group-hover:scale-110 transition-transform">*</span>
        </div>
        <div>
          <div className="text-white font-semibold tracking-[0.2em] text-[10px] opacity-90">BLACKSIGNAL PROTOCOL</div>
          <div className="text-[9px] opacity-50 font-mono mt-0.5 tracking-widest">v3.7.2 // CV_CORE_INIT</div>
        </div>
      </div>

      {/* RIGHT: Navigation Links */}
      <nav className="flex flex-wrap items-center gap-1 md:gap-2">
        {NAV_ITEMS.map((item) => (
          <motion.a
            key={item.id}
            href={`#${item.label.toLowerCase()}`}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative px-3 py-2 flex items-center gap-2 border border-transparent hover:border-white/10 bg-transparent hover:bg-white/[0.03] transition-all duration-300 cursor-pointer overflow-hidden group"
          >
            {/* Animated hover background scanline */}
            {hoveredIndex === item.id && (
              <motion.div 
                layoutId="nav-hover"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-0"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            )}

            <span className="text-[9px] opacity-50 font-mono group-hover:text-[#d4ff00] group-hover:opacity-100 transition-colors z-10">[{item.id}]</span>
            <div className="flex flex-col z-10">
              <span className="text-white font-medium text-[10px] group-hover:text-[#d4ff00] transition-colors">{item.label}</span>
            </div>
          </motion.a>
        ))}
      </nav>

    </header>
  );
};

export default Navi;
