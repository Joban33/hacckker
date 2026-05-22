import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STEPS = [
  'DETECTING SIGNAL',
  'VERIFYING FREQUENCY',
  'ESTABLISHING LINK',
  'DECRYPTING PROTOCOL',
  'ACCESSING SYSTEM'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [packets, setPackets] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 4000; // 4 seconds total
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);
      setPackets(Math.floor(newProgress * 84.51)); // Fake packet count
      
      // Update step index based on progress
      if (newProgress < 20) setCurrentStepIndex(0);
      else if (newProgress < 40) setCurrentStepIndex(1);
      else if (newProgress < 60) setCurrentStepIndex(2);
      else if (newProgress < 80) setCurrentStepIndex(3);
      else setCurrentStepIndex(4);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 800); // Wait a moment at 100% before completing
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#050505] text-[#a0a0a0] font-mono flex flex-col items-center justify-center overflow-hidden selection:bg-[#d4ff00]/30 selection:text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND GRID & EFFECTS
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        {/* Faint crosshair grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        {/* Center vertical flare */}
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute w-[200px] h-[600px] bg-white blur-[150px] opacity-10" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CORNER HUD
      ────────────────────────────────────────────────────────────── */}
      {/* Top Left */}
      <div className="hidden md:flex absolute top-8 left-8 gap-4 text-[9px] tracking-widest uppercase opacity-50">
        <div className="w-2 h-2 border-t border-l border-white/40 absolute -top-2 -left-2" />
        <span>BLACKSIGNAL PROTOCOL</span>
        <span>v3.7</span>
      </div>

      {/* Top Right */}
      <div className="hidden md:flex absolute top-8 right-8 items-center gap-2 text-[9px] tracking-widest uppercase opacity-50">
        <div className="w-2 h-2 border-t border-r border-white/40 absolute -top-2 -right-2" />
        <span className="w-1.5 h-1.5 bg-[#d4ff00] rounded-full animate-pulse" />
        <span>CONNECTING TO UNKNOWN NETWORK</span>
      </div>

      {/* Bottom Left */}
      <div className="hidden md:flex absolute bottom-8 left-8 items-center gap-2 text-[9px] tracking-widest uppercase opacity-50">
        <div className="w-2 h-2 border-b border-l border-white/40 absolute -bottom-2 -left-2" />
        <span>SYSTEM MONITORING</span>
        <span className="w-1.5 h-1.5 bg-[#d4ff00] rounded-full" />
        <span className="text-[#d4ff00]">ONLINE</span>
      </div>

      {/* Bottom Right */}
      <div className="hidden md:flex absolute bottom-8 right-8 items-center gap-2 text-[9px] tracking-widest uppercase opacity-50">
        <div className="w-2 h-2 border-b border-r border-white/40 absolute -bottom-2 -right-2" />
        <span>ALL SYSTEMS</span>
        <span className="w-1.5 h-1.5 bg-[#d4ff00] rounded-full" />
        <span className="text-[#d4ff00]">NOMINAL</span>
      </div>

      {/* Side Numbers */}
      <div className="hidden md:flex absolute left-8 top-1/3 flex-col gap-6 text-[8px] tracking-widest opacity-30">
        <span>23</span><span>10</span><span>00</span><span>8</span><span>7</span>
      </div>
      
      {/* Right Side Signal Strength */}
      <div className="hidden md:flex absolute right-8 top-1/3 flex-col items-end gap-2 text-[8px] tracking-widest opacity-40 uppercase">
        <span className="mb-2 text-right">SIGNAL<br/>STRENGTH</span>
        {[...Array(6)].map((_, i) => (
           <div key={i} className={`h-1 w-6 ${i < 3 ? 'bg-[#d4ff00]' : 'bg-white/20'}`} />
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CENTER CONTENT
      ────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-8">
        


        {/* INITIALIZING SYSTEM TEXT */}
        <div className="flex flex-col items-center mb-10 md:mb-16">
          <div className="flex items-center gap-2 md:gap-3 text-[#d4ff00] text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-medium mb-4 text-center">
            <span className="w-2 h-2 bg-[#d4ff00] rounded-full animate-ping flex-shrink-0" />
            INITIALIZING SYSTEM
          </div>
          <div className="w-[80vw] md:w-[300px] h-[1px] bg-white/20" />
        </div>

        {/* PROGRESS STEPS TIMELINE */}
        <div className="w-full flex justify-between items-center mb-10 md:mb-16 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />
          {/* Active connecting line */}
          <div 
            className="absolute top-1/2 left-0 h-[1px] bg-[#d4ff00] -translate-y-1/2 z-0 transition-all duration-300" 
            style={{ width: `${(currentStepIndex / 4) * 100}%` }}
          />
          
          {STEPS.map((step, index) => {
            const isActive = index <= currentStepIndex;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div className={`hidden md:block text-[8px] tracking-widest uppercase mb-4 absolute bottom-full whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-[#d4ff00]' : 'text-white/20'}`}>
                  {step}
                </div>
                <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border transition-all duration-300 flex items-center justify-center ${isActive ? 'border-[#d4ff00] bg-black shadow-[0_0_10px_#d4ff00]' : 'border-white/20 bg-black'}`}>
                  {isActive && <div className="w-1 h-1 bg-[#d4ff00] rounded-full" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* STATUS BOX */}
        <div className="w-full max-w-2xl border border-white/5 bg-white/[0.02] p-4 md:p-6 relative flex flex-col mb-10 md:mb-16">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
          
          <div className="text-[7px] md:text-[8px] tracking-widest text-white/30 uppercase mb-2 md:mb-4">STATUS</div>
          <div className="text-white tracking-[0.1em] md:tracking-[0.2em] uppercase text-xs md:text-sm mb-4">UNIDENTIFIED SIGNAL DETECTED</div>
          
          <div className="flex justify-between items-end">
            <div className="text-[8px] md:text-[10px] tracking-widest text-[#d4ff00] uppercase">
              RETRIEVING DATA PACKETS... {packets}
            </div>
            <div className="text-white/60 font-mono text-xs md:text-sm tracking-widest">
              {Math.floor(progress)}%
            </div>
          </div>
        </div>

        {/* BOTTOM CENTER SYMBOL */}
        <div className="w-12 h-12 border border-white/10 relative flex items-center justify-center group cursor-pointer hover:border-[#d4ff00] transition-colors">
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/30" />
          <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/30" />
          <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/30" />
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/30" />
          <span className="text-white/60 text-xl font-light group-hover:text-[#d4ff00] transition-colors">*</span>
        </div>

      </div>

    </motion.div>
  );
};

export default LoadingScreen;
