import React, { useRef, useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoMark from './LogoMark';

gsap.registerPlugin(ScrollTrigger);

const TEMPORAL_DISTRIBUTION = [
  36, 54, 30, 62, 46, 28, 40, 59, 35, 68,
  74, 82, 78, 86, 72, 80, 66, 58, 43, 37,
  32, 44, 51, 47, 55, 69, 77, 83, 64, 73,
  52, 61, 45, 72, 90, 88, 91, 87, 89, 92,
];

const ZOOM_RAIL_TICKS = Array.from({ length: 17 }, (_, index) => index);

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const formatPercent = (value: number) => `${Math.round(value)}%`;

export const MemoryFragments: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.5);
  const [telemetry, setTelemetry] = useState({
    integrity: 68,
    resonance: 42,
    corruptionPhase: 0,
    recoveredFragments: 12847,
  });

  const barProfiles = useMemo(
    () => TEMPORAL_DISTRIBUTION.map((height, index) => ({
      height,
      delay: ((index * 0.07) % 0.7).toFixed(2),
      duration: (1.3 + (index % 5) * 0.16).toFixed(2),
      active: index > 25 && index < 35,
    })),
    []
  );

  const railActiveIndex = Math.round(scrollProgress * (ZOOM_RAIL_TICKS.length - 1));
  const zoomReadout = `${(1 + scrollProgress * 4).toFixed(1)}x`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Very slow drift for the constellation nodes
      gsap.to('.constellation-node', {
        y: 'random(-30, 30)',
        x: 'random(-30, 30)',
        rotation: 'random(-5, 5)',
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;

      setTelemetry({
        integrity: 68 + Math.sin(elapsed * 0.7) * 3 + Math.sin(elapsed * 0.18) * 1.5,
        resonance: 42 + Math.cos(elapsed * 0.55) * 4 + Math.sin(elapsed * 0.25) * 1.2,
        corruptionPhase: elapsed,
        recoveredFragments: 12847 + Math.floor((elapsed % 11) * 3),
      });
    }, 900);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateRailProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));

      setScrollProgress(progress);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateRailProgress);
    };

    updateRailProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="archives"
      className="relative w-full h-screen bg-[#050505] overflow-hidden text-[#a0a0a0] font-mono flex selection:bg-[#d4ff00]/30 selection:text-white"
    >
      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulseHeight {
          0% { transform: scaleY(0.72); opacity: 0.45; }
          45% { transform: scaleY(1); opacity: 0.78; }
          100% { transform: scaleY(0.84); opacity: 0.58; }
        }
        @keyframes floatPath {
          0% { transform: translateY(-3px); }
          100% { transform: translateY(3px); }
        }
        @keyframes archiveTrace {
          0% { stroke-dashoffset: 110; opacity: 0.2; }
          45% { opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 0.35; }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND ATMOSPHERE
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
        {/* Subtle noise */}
        <div className="hud-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LEFT SIDEBAR (Navigation Depth)
      ────────────────────────────────────────────────────────────── */}
      <div className="w-[80px] h-full border-r border-white/5 flex flex-col items-center py-8 z-20 shrink-0 bg-black/20 backdrop-blur-sm">
        <LogoMark className="mb-12 h-8 w-8 opacity-70" />
        <div className="flex flex-col items-center space-y-2 mb-12">
          <div className="text-[#d4ff00] font-semibold text-lg leading-none tabular-nums">05</div>
          <div className="text-white/20 text-[10px] leading-none">/07</div>
        </div>
        <div className="flex-1 relative w-full flex items-center justify-center overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[220px] w-px -translate-x-1/2 -translate-y-1/2 bg-white/5" />
          <div
            className="absolute left-1/2 z-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4ff00]/40 bg-[#d4ff00]/10 shadow-[0_0_24px_rgba(212,255,0,0.18)] transition-[top,opacity] duration-300 ease-out"
            style={{ top: `${24 + scrollProgress * 52}%` }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[220px] w-12 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
            style={{ transform: `translate(-50%, -50%) translateY(${(0.5 - scrollProgress) * 34}px)` }}
          >
            {ZOOM_RAIL_TICKS.map((tick) => {
              const distance = Math.abs(tick - railActiveIndex);
              const isActive = distance === 0;
              const isNear = distance <= 2;
              const width = isActive ? 28 : isNear ? 20 - distance * 3 : 11;
              const opacity = isActive ? 1 : isNear ? 0.65 : 0.22;

              return (
                <div
                  key={tick}
                  className={`absolute left-1/2 h-px -translate-x-1/2 rounded-full transition-all duration-200 ease-out ${
                    isActive ? 'bg-[#d4ff00] shadow-[0_0_8px_#d4ff00]' : 'bg-white/30'
                  }`}
                  style={{
                    top: `${(tick / (ZOOM_RAIL_TICKS.length - 1)) * 100}%`,
                    width,
                    opacity,
                    transform: `translateX(-50%) scaleY(${isActive ? 2 : 1})`,
                  }}
                />
              );
            })}
          </div>
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full border border-[#d4ff00]/60 bg-black px-2 py-1 text-[8px] font-semibold leading-none tracking-widest text-[#d4ff00] shadow-[0_0_14px_rgba(212,255,0,0.28)] transition-[top,transform] duration-300 ease-out"
            style={{ top: `${24 + scrollProgress * 52}%` }}
          >
            {zoomReadout}
          </div>
        </div>
        <div className="text-[8px] tracking-widest uppercase text-[#d4ff00] mt-12 rotate-[-90deg] whitespace-nowrap">
          SYSTEM<br/>STATUS<br/>ONLINE<br/><span className="inline-block w-1 h-1 bg-[#d4ff00] rounded-full mt-2" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT AREA
      ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full relative z-20">
        
        {/* TOP HEADER */}
        <div className="w-full h-[60px] border-b border-white/5 flex items-center justify-between px-8 text-[10px] tracking-widest text-white/40 uppercase shrink-0 bg-black/20 backdrop-blur-sm">
          <div>BLACKSIGNAL PROTOCOL <span className="text-white/20 ml-4">V.3.7.2</span></div>
          <div className="text-white/20">—— [ 05 ] ——</div>
          <div>MEMORY FRAGMENTS <span className="text-[#d4ff00] ml-2">// 05</span></div>
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* LEFT COLUMN: TITLE & OVERVIEW */}
          <div className="w-[380px] border-r border-white/5 p-8 flex flex-col justify-between bg-black/40 backdrop-blur-sm z-30 shrink-0">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-[#d4ff00] mb-4 uppercase">
                SHARDS OF WHAT REMAINS.
              </p>
              <h2 className="font-lalezar text-[5rem] leading-[0.85] text-white/90 tracking-wider mb-6">
                MEMORY
                <br />
                FRAGMENTS
              </h2>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 leading-loose">
                THE PAST IS NOT GONE.<br />
                IT IS ARCHIVED.
              </p>
            </div>

            {/* Archive Overview Box */}
            <div className="border border-white/10 p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
              
              <div className="text-[9px] tracking-widest text-white/30 uppercase mb-8">ARCHIVE OVERVIEW</div>
              
              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest mb-1">TOTAL FRAGMENTS</div>
                  <div className="text-2xl text-[#d4ff00] font-mono">{telemetry.recoveredFragments.toLocaleString()}</div>
                </div>
                {/* Minimal Radar/Target graphic */}
                <div className="w-16 h-16 rounded-full border border-white/10 relative flex items-center justify-center">
                  <div className="absolute w-12 h-12 rounded-full border border-white/5" />
                  <div className="absolute w-8 h-8 rounded-full border border-white/5" />
                  <div className="absolute w-4 h-4 rounded-full border border-[#d4ff00]/30" />
                  <div className="w-1 h-1 bg-[#d4ff00] rounded-full animate-pulse shadow-[0_0_8px_#d4ff00]" />
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(212,255,0,0.1)_90deg,transparent_90deg)] animate-[spin_4s_linear_infinite]" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[8px] text-white/50 tracking-widest mb-1">
                    <span>CORRUPTED</span>
                    <span>17%</span>
                  </div>
                  <div className="w-full h-[2px] bg-white/5"><div className="w-[17%] h-full bg-white/30" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[8px] text-[#d4ff00] tracking-widest mb-1">
                    <span>RECOVERABLE</span>
                    <span>83%</span>
                  </div>
                  <div className="w-full h-[2px] bg-white/5"><div className="w-[83%] h-full bg-[#d4ff00]/60" /></div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-4 leading-loose border-l-2 border-[#d4ff00]/50 pl-4">
                EVERY FRAGMENT HOLDS A TRUTH<br />
                THE SYSTEM TRIED TO FORGET.
              </div>
              <div className="border border-white/5 bg-white/[0.02] px-4 py-3 flex justify-between items-center text-[8px] tracking-widest uppercase">
                <span className="text-white/30">ARCHIVE ACCESS</span>
                <span className="text-[#d4ff00] flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  PERMISSION: OBSERVER
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE CONSTELLATION MAP */}
          <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]">
            {/* Center glowing star */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#d4ff00] rounded-full shadow-[0_0_20px_4px_rgba(212,255,0,0.5)] z-0" />
            
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0">
              <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="#d4ff00" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="70%" y2="25%" stroke="#d4ff00" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="30%" y2="65%" stroke="#d4ff00" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="75%" y2="60%" stroke="#d4ff00" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="70%" y1="25%" x2="85%" y2="20%" stroke="white" strokeWidth="1" opacity="0.3" />
              <line x1="25%" y1="30%" x2="15%" y2="40%" stroke="white" strokeWidth="1" opacity="0.3" />
            </svg>

            {/* FRAGMENT NODES (Floating Image Cards) */}
            {/* Node 1 (Top Left) */}
            <div className="constellation-node absolute top-[15%] left-[15%] border border-white/10 bg-black/60 p-2 w-[180px] z-10 hover:border-red-500/80 transition-colors group">
              <div className="text-[7px] text-white/40 tracking-widest mb-2 flex justify-between">
                <span className="group-hover:text-red-500 transition-colors">TARGET_00321</span>
                <span className="w-1.5 h-1.5 border border-white/30 group-hover:bg-red-500 group-hover:border-red-500 transition-colors" />
              </div>
              <div className="w-full h-[100px] bg-white/5 relative overflow-hidden mb-2">
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-red-500/30 z-0 tracking-widest group-hover:text-red-500/60 transition-colors font-lalezar">TARGET</div>
                <img src="/base_hacker.png" className="absolute inset-0 z-10 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity sepia hue-rotate-[-50deg] saturate-[3] group-hover:contrast-150" />
                <div className="absolute inset-0 z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none" />
                {/* Crosshair Overlay */}
                <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 border border-red-500 rounded-full animate-ping" />
                  <div className="absolute w-16 h-[1px] bg-red-500" />
                  <div className="absolute w-[1px] h-16 bg-red-500" />
                </div>
              </div>
              <div className="flex justify-between items-center text-[7px] text-white/30 tracking-widest">
                <span>THREAT: HIGH</span>
                <div className="w-10 h-[1px] bg-red-500/40 group-hover:bg-red-500" />
              </div>
            </div>

            {/* Node 2 (Top Right) */}
            <div className="constellation-node absolute top-[10%] left-[60%] border border-white/10 bg-black/60 p-2 w-[160px] z-10 hover:border-red-500/80 transition-colors group">
              <div className="text-[7px] text-white/40 tracking-widest mb-2 flex justify-between">
                <span className="group-hover:text-red-500 transition-colors">TARGET_00877</span>
                <span className="w-1.5 h-1.5 border border-white/30 group-hover:bg-red-500 group-hover:border-red-500 transition-colors" />
              </div>
              <div className="w-full h-[120px] bg-white/5 relative overflow-hidden mb-2">
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-red-500/30 z-0 tracking-widest group-hover:text-red-500/60 transition-colors font-lalezar rotate-90">TARGET</div>
                <img src="/base_hacker.png" className="absolute inset-0 z-10 w-full h-full object-cover opacity-50 group-hover:opacity-90 transition-opacity sepia hue-rotate-[-50deg] saturate-[3] contrast-125" />
                <div className="absolute inset-0 z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none" />
                <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 border-2 border-red-500 rotate-45" />
                </div>
              </div>
              <div className="flex justify-between items-center text-[7px] text-white/30 tracking-widest">
                <span>LOCK: ENGAGED</span>
                <div className="w-10 h-[1px] bg-red-500/40 group-hover:bg-red-500" />
              </div>
            </div>

            {/* Node 3 (Bottom Left) */}
            <div className="constellation-node absolute top-[55%] left-[20%] border border-white/10 bg-black/60 p-2 w-[150px] z-10 hover:border-red-500/80 transition-colors group">
              <div className="text-[7px] text-white/40 tracking-widest mb-2 flex justify-between">
                <span className="group-hover:text-red-500 transition-colors">TARGET_00091</span>
                <span className="w-1.5 h-1.5 border border-white/30 group-hover:bg-red-500 group-hover:border-red-500 transition-colors" />
              </div>
              <div className="w-full h-[140px] bg-white/5 relative overflow-hidden mb-2">
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-red-500/30 z-0 tracking-widest group-hover:text-red-500/60 transition-colors font-lalezar -rotate-90">TARGET</div>
                <img src="/base_hacker.png" className="absolute inset-0 z-10 w-full h-full object-cover opacity-40 group-hover:opacity-90 transition-opacity sepia hue-rotate-[-50deg] saturate-[4] invert" />
                <div className="absolute inset-0 z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none" />
              </div>
              <div className="flex justify-between items-center text-[7px] text-white/30 tracking-widest">
                <span>THREAT: EXTREME</span>
                <div className="w-10 h-[1px] bg-red-500/40 group-hover:bg-red-500" />
              </div>
            </div>

            {/* Node 4 (Bottom Right) */}
            <div className="constellation-node absolute top-[50%] left-[68%] border border-[#d4ff00]/20 bg-black/60 p-2 w-[190px] z-10 hover:border-[#d4ff00]/50 transition-colors group shadow-[0_0_15px_rgba(212,255,0,0.05)]">
              <div className="text-[7px] text-[#d4ff00] tracking-widest mb-2 flex justify-between">
                <span>FRAGMENT_01566</span>
                <span className="w-1.5 h-1.5 bg-[#d4ff00]/50 animate-pulse" />
              </div>
              <div className="w-full h-[110px] bg-white/5 relative overflow-hidden mb-2">
                {/* Circular eclipse graphic */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80">
                  <div className="w-16 h-16 rounded-full border border-white/20 bg-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]" />
              </div>
              <div className="flex justify-between items-center text-[7px] text-[#d4ff00]/70 tracking-widest">
                <span>STABILITY: 98%</span>
                <div className="w-10 h-[1px] bg-[#d4ff00]" />
              </div>
            </div>

            {/* Distant faint node */}
             <div className="constellation-node absolute top-[20%] left-[82%] border border-white/5 bg-black/40 p-1 w-[100px] z-0 opacity-40">
              <div className="w-full h-[60px] bg-white/5 relative overflow-hidden">
                <img src="/base_hacker.png" className="w-full h-full object-cover blur-sm grayscale" />
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ROW (Analytics Panels) */}
        <div className="h-[140px] border-t border-white/5 flex px-8 shrink-0 bg-black/40 backdrop-blur-sm z-30">
          
          {/* Panel 1: Fragment Integrity */}
          <div className="flex-1 border-r border-white/5 py-4 pr-6 relative overflow-hidden">
             <div className="text-[8px] text-white/40 tracking-widest uppercase mb-4">Fragment Integrity</div>
             <div className="flex items-end justify-between h-[60px] relative">
               <svg className="absolute top-0 left-0 w-full h-full opacity-80" viewBox="0 0 220 56" preserveAspectRatio="none">
                 <path
                   d="M0,30 L35,30 L45,24 L52,42 L60,12 L68,34 L82,30 L112,30 L124,26 L132,36 L142,30 L220,30"
                   fill="none"
                   stroke="rgba(212,255,0,0.78)"
                   strokeWidth="1.6"
                   strokeLinecap="square"
                   strokeLinejoin="miter"
                   strokeDasharray="110"
                   style={{
                     animation: 'archiveTrace 4.8s ease-in-out infinite',
                     filter: 'drop-shadow(0px 0px 4px #d4ff00)',
                   }}
                 />
                 <path
                   d="M0,34 L55,34 L63,30 L71,38 L85,32 L118,32 L134,28 L148,33 L220,33"
                   fill="none"
                   stroke="rgba(255,255,255,0.22)"
                   strokeWidth="1"
                   strokeDasharray="80"
                   style={{ animation: 'archiveTrace 6.4s ease-in-out infinite reverse' }}
                 />
               </svg>
               <div className="text-right z-10 ml-auto bg-black/40 p-2 backdrop-blur-sm rounded">
                 <div className="text-2xl text-[#d4ff00] font-mono leading-none tabular-nums">{formatPercent(telemetry.integrity)}</div>
                 <div className="text-[7px] text-white/30 tracking-widest mt-1">OVERALL</div>
               </div>
             </div>
          </div>

          {/* Panel 2: Temporal Distribution */}
          <div className="flex-1 border-r border-white/5 py-4 px-6 relative">
             <div className="text-[8px] text-white/40 tracking-widest uppercase mb-4">Temporal Distribution</div>
             <div className="flex items-end gap-[2px] h-[40px] opacity-60">
                {barProfiles.map((bar, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 bar-chart-bar origin-bottom ${bar.active ? 'bg-red-500' : 'bg-white/30'}`} 
                    style={{ 
                      height: `${bar.height}%`,
                      animation: `pulseHeight ${bar.duration}s ease-in-out infinite`,
                      animationDelay: `${bar.delay}s`
                    }} 
                  />
                ))}
             </div>
             <div className="flex justify-between text-[6px] text-white/30 tracking-widest mt-2">
               <span>2019</span><span>2021</span><span>2023</span><span>2024</span>
             </div>
          </div>

          {/* Panel 3: Corruption Map */}
          <div className="flex-1 border-r border-white/5 py-4 px-6 relative overflow-hidden flex items-center justify-center">
             <div className="absolute top-4 left-6 text-[8px] text-white/40 tracking-widest uppercase">Corruption Map</div>
             {/* Animated 3D Wireframe */}
             <div className="w-full h-[60px] mt-4 relative">
               <svg className="w-full h-full opacity-60" viewBox="0 0 100 40" preserveAspectRatio="none">
                 <path className="wireframe-path" d="M0,20 L20,10 L40,30 L60,15 L80,25 L100,10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" style={{ animation: 'floatPath 3.8s ease-in-out infinite alternate', animationDelay: '0s' }} />
                 <path className="wireframe-path" d="M0,25 L20,15 L40,35 L60,20 L80,30 L100,15" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" style={{ animation: 'floatPath 4.4s ease-in-out infinite alternate', animationDelay: '0.2s' }} />
                 <path className="wireframe-path" d="M0,30 L20,20 L40,40 L60,25 L80,35 L100,20" fill="none" stroke="rgba(212,255,0,0.5)" strokeWidth="0.5" style={{ animation: 'floatPath 5s ease-in-out infinite alternate', animationDelay: '0.4s' }} />
                 {/* Connecting vertical lines */}
                 <path d="M20,10 L20,20 M40,30 L40,40 M60,15 L60,25 M80,25 L80,35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
               </svg>
               <div
                 className="absolute w-2 h-2 bg-[#d4ff00] rounded-full shadow-[0_0_10px_#d4ff00] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                 style={{
                   left: `${50 + Math.sin(telemetry.corruptionPhase * 0.55) * 9}%`,
                   top: `${50 + Math.cos(telemetry.corruptionPhase * 0.42) * 12}%`,
                 }}
               />
             </div>
          </div>

          {/* Panel 4: Signal Resonance */}
          <div className="flex-1 py-4 pl-6 relative">
             <div className="text-[8px] text-white/40 tracking-widest uppercase mb-4">Signal Resonance</div>
             <div className="flex justify-between items-center">
               {/* Radar Animation */}
               <div className="w-12 h-12 rounded-full border border-white/20 relative flex items-center justify-center overflow-hidden bg-black/40">
                 {/* Inner rings */}
                 <div className="absolute w-[60%] h-[60%] rounded-full border border-white/10" />
                 <div className="absolute w-[20%] h-[20%] rounded-full bg-[#d4ff00]/20" />
                 {/* Sweeping radar cone */}
                 <div className="absolute inset-0 radar-sweep bg-[conic-gradient(from_0deg,transparent_70%,rgba(212,255,0,0.4)_100%)] rounded-full animate-[spin_2s_linear_infinite]" />
                 <div className="w-1 h-1 bg-[#d4ff00] rounded-full z-10" />
               </div>
               
               <div className="text-right">
                 <div className="text-2xl text-[#d4ff00] font-mono leading-none mb-1 tabular-nums">{formatPercent(telemetry.resonance)}</div>
                 <div className="text-[6px] text-white/30 tracking-widest">RESONANCE<br/>STRENGTH</div>
               </div>
             </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="h-[40px] border-t border-white/5 flex items-center justify-between px-8 text-[8px] tracking-[0.3em] text-white/30 uppercase shrink-0 bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div>[</div>
            <div>BLACKSIGNAL PROTOCOL // MEMORY ARCHIVE INTERFACE</div>
          </div>
          <div className="flex items-center gap-4">
            <div>NOT ALL MEMORIES WERE MEANT TO BE FOUND.</div>
            <div>]</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoryFragments;
