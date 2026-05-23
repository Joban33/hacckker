import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoMark from './LogoMark';

gsap.registerPlugin(ScrollTrigger);

const SYNC_BAR_DELAYS = Array.from({ length: 20 }, (_, index) => ((index * 0.07) % 0.5).toFixed(2));
const VISUALIZER_BARS = Array.from({ length: 60 }, (_, index) => ({
  height: 24 + ((index * 37) % 72),
  delay: ((index * 0.043) % 1).toFixed(2),
  duration: (0.18 + (index % 5) * 0.04).toFixed(2),
}));

export const DistortionChamber: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Native CSS animations handle the movement instead of GSAP to ensure they run constantly
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="protocols"
      className="relative w-full h-screen bg-[#050505] overflow-hidden text-[#a0a0a0] font-mono flex selection:bg-[#d4ff00]/30 selection:text-white"
    >
      <style>{`
        @keyframes glitchImage {
          0%, 100% { transform: translate3d(-14px, -8px, 0) scale(1.04); filter: grayscale(1) contrast(150%) brightness(0.85) hue-rotate(0deg); }
          18% { transform: translate3d(10px, -16px, 0) scale(1.075); filter: grayscale(1) contrast(165%) brightness(1) hue-rotate(-8deg); }
          34% { transform: translate3d(18px, 8px, 0) scale(1.055); filter: grayscale(1) contrast(185%) brightness(0.9) hue-rotate(12deg); }
          36% { transform: translate3d(-22px, 2px, 0) scale(1.09) skewX(1.2deg); filter: grayscale(1) contrast(230%) brightness(1.15) hue-rotate(-18deg); }
          38% { transform: translate3d(12px, -4px, 0) scale(1.06) skewX(-0.8deg); filter: grayscale(1) contrast(170%) brightness(0.95) hue-rotate(18deg); }
          62% { transform: translate3d(-8px, 14px, 0) scale(1.085); filter: grayscale(1) contrast(160%) brightness(0.82) hue-rotate(6deg); }
          78% { transform: translate3d(16px, 2px, 0) scale(1.045); filter: grayscale(1) contrast(180%) brightness(1.05) hue-rotate(-12deg); }
        }
        @keyframes spectralSplitA {
          0%, 100% { transform: translate3d(-26px, -6px, 0) scale(1.06); opacity: 0.1; clip-path: inset(12% 0 58% 0); }
          28% { transform: translate3d(24px, -12px, 0) scale(1.08); opacity: 0.2; clip-path: inset(20% 0 42% 0); }
          54% { transform: translate3d(-18px, 10px, 0) scale(1.1); opacity: 0.14; clip-path: inset(42% 0 22% 0); }
          76% { transform: translate3d(30px, 4px, 0) scale(1.07); opacity: 0.24; clip-path: inset(8% 0 68% 0); }
        }
        @keyframes spectralSplitB {
          0%, 100% { transform: translate3d(24px, 8px, 0) scale(1.05); opacity: 0.09; clip-path: inset(55% 0 16% 0); }
          22% { transform: translate3d(-16px, 14px, 0) scale(1.08); opacity: 0.18; clip-path: inset(36% 0 31% 0); }
          48% { transform: translate3d(28px, -8px, 0) scale(1.07); opacity: 0.12; clip-path: inset(66% 0 8% 0); }
          82% { transform: translate3d(-24px, 0, 0) scale(1.1); opacity: 0.22; clip-path: inset(18% 0 48% 0); }
        }
        @keyframes interferenceSweep {
          0% { transform: translateY(-140%) skewY(-4deg); opacity: 0; }
          18% { opacity: 0.65; }
          50% { opacity: 0.35; }
          100% { transform: translateY(150%) skewY(4deg); opacity: 0; }
        }
        @keyframes distortionBands {
          0%, 100% { transform: translateX(-18px); opacity: 0.3; }
          25% { transform: translateX(24px); opacity: 0.55; }
          50% { transform: translateX(-8px); opacity: 0.22; }
          75% { transform: translateX(34px); opacity: 0.48; }
        }
        @keyframes textGlitch {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(2px); opacity: 0.8; }
        }
        @keyframes streamBar {
          0% { transform: scaleX(0.9); }
          100% { transform: scaleX(1.1); }
        }
        @keyframes floatWave {
          0% { transform: translateY(-2px); }
          100% { transform: translateY(2px); }
        }
        @keyframes audioVisualizer {
          0% { transform: scaleY(0.1); }
          100% { transform: scaleY(1); }
        }
        @keyframes blinkTerminal {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes sliceMove1 {
          0%, 100% { transform: translateX(40px); }
          50% { transform: translateX(50px); }
        }
        @keyframes sliceMove2 {
          0%, 100% { transform: translateX(-20px); }
          50% { transform: translateX(-30px); }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. LEFT SIDEBAR
      ────────────────────────────────────────────────────────────── */}
      <div className="w-[80px] h-full border-r border-white/5 flex flex-col items-center py-8 z-20 shrink-0 bg-black/20 backdrop-blur-sm">
        <LogoMark className="mb-12 h-8 w-8 opacity-70" />
        <div className="flex flex-col items-center space-y-2 mb-12">
          <div className="text-[#d4ff00] font-semibold text-lg leading-none">04</div>
          <div className="text-white/20 text-[10px] leading-none">/07</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-1 h-1 rounded-full bg-white/20" />
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`w-4 h-[1px] ${i === 4 ? 'bg-[#d4ff00] shadow-[0_0_5px_#d4ff00]' : 'bg-white/10'}`} />
          ))}
        </div>
        <div className="text-[8px] tracking-widest uppercase text-white/40 mt-12 rotate-[-90deg] whitespace-nowrap">
          SYSTEM<br/>STATUS<br/><span className="text-white/80">UNSTABLE</span><br/><span className="inline-block w-1 h-1 bg-[#d4ff00] rounded-full mt-2 animate-ping" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA
      ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full relative z-20">
        
        {/* TOP HEADER */}
        <div className="w-full h-[60px] border-b border-white/5 flex items-center justify-between px-8 text-[10px] tracking-widest text-white/40 uppercase shrink-0 bg-black/20 backdrop-blur-sm">
          <div>BLACKSIGNAL PROTOCOL <span className="text-[#d4ff00] ml-4">v.3.7.2</span></div>
          <div className="text-white/20">—— [ 04 ] ——</div>
          <div>DISTORTION CHAMBER <span className="text-[#d4ff00] ml-2">// 04</span></div>
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* CENTER BACKGROUND (The Glitched Face) */}
          <div className="absolute inset-0 flex items-center justify-center z-0 opacity-40">
            {/* CSS Glitch Container */}
            <div className="relative w-[640px] h-[820px] overflow-visible">
              <img src="/base_hacker.png" className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-150 will-change-transform" style={{ animation: 'glitchImage 6.5s ease-in-out infinite' }} />
              <img src="/base_hacker.png" className="absolute inset-0 w-full h-full object-cover grayscale contrast-200 mix-blend-screen pointer-events-none will-change-transform" style={{ animation: 'spectralSplitA 3.4s steps(2, end) infinite', filter: 'sepia(1) saturate(5) hue-rotate(55deg)' }} />
              <img src="/base_hacker.png" className="absolute inset-0 w-full h-full object-cover grayscale contrast-200 mix-blend-screen pointer-events-none will-change-transform" style={{ animation: 'spectralSplitB 4.1s steps(2, end) infinite', filter: 'sepia(1) saturate(5) hue-rotate(-45deg)' }} />
              {/* Fake CSS scanlines & glitch slices */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.8)_3px)] pointer-events-none" />
              <div className="absolute inset-x-[-18%] top-0 h-[180px] bg-[linear-gradient(180deg,transparent,rgba(212,255,0,0.12),rgba(255,255,255,0.08),transparent)] blur-sm mix-blend-screen pointer-events-none" style={{ animation: 'interferenceSweep 4.8s ease-in-out infinite' }} />
              <div className="absolute inset-x-[-12%] top-[18%] h-[36px] bg-white/10 backdrop-blur-md mix-blend-overlay pointer-events-none" style={{ animation: 'distortionBands 1.6s steps(3, end) infinite' }} />
              <div className="absolute inset-x-[-18%] top-[52%] h-[62px] bg-[#d4ff00]/10 blur-md mix-blend-screen pointer-events-none" style={{ animation: 'distortionBands 2.2s steps(4, end) infinite reverse' }} />
              <div className="absolute top-[30%] left-[-10%] right-[10%] h-[20px] bg-white/10 backdrop-blur-sm mix-blend-overlay" style={{ animation: 'sliceMove1 0.1s infinite alternate' }} />
              <div className="absolute top-[45%] left-[-5%] right-[5%] h-[10px] bg-black/50" style={{ animation: 'sliceMove2 0.15s infinite alternate' }} />
              <div className="absolute top-[60%] left-[-20%] right-[20%] h-[40px] bg-white/5 backdrop-blur-md mix-blend-screen" style={{ animation: 'sliceMove1 0.2s infinite alternate' }} />
            </div>
          </div>

          {/* LEFT COLUMN: TITLE & METRICS */}
          <div className="w-[450px] p-8 flex flex-col justify-between z-10 shrink-0">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-[#d4ff00] mb-4 uppercase flex items-center gap-2">
                WARNING: UNSTABLE FREQUENCY
              </p>
              <h2 className="font-lalezar text-[6rem] leading-[0.8] text-white/90 tracking-wider mb-6">
                DISTORTION<br/>CHAMBER
              </h2>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-12">
                THE SIGNAL WAS NEVER LOST.
              </p>

              {/* Boxed Text */}
              <div className="border border-[#d4ff00]/40 p-6 relative bg-black/40 backdrop-blur-md mb-8">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#d4ff00]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#d4ff00]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#d4ff00]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#d4ff00]" />
                
                <div className="text-xl tracking-[0.3em] text-white/90 uppercase text-center" style={{ animation: 'textGlitch 0.1s infinite' }}>
                  YOU WERE EXPECTED.
                </div>
              </div>

              <div className="text-[10px] tracking-[0.3em] text-white/40 text-center space-y-4 uppercase">
                <div>THIS SYSTEM IS OBSERVING.</div>
                <div className="text-white/20">STABILITY COMPROMISED</div>
              </div>
            </div>

            {/* Distortion Metrics Box */}
            <div className="border border-white/5 bg-black/60 backdrop-blur-sm p-6 relative">
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-8">DISTORTION METRICS</div>
              
              <div className="flex gap-8 items-center">
                {/* Radar Graphic */}
                <div className="w-24 h-24 rounded-full border border-white/10 relative flex items-center justify-center opacity-60">
                  <div className="absolute w-[80%] h-[80%] rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite]" />
                  <div className="absolute w-[60%] h-[60%] rounded-full border border-white/5" />
                  <div className="absolute w-[40%] h-[40%] rounded-full border border-white/5" />
                  <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                  <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-white/30 origin-left animate-[spin_4s_linear_infinite]" />
                </div>

                {/* Progress Bars */}
                <div className="flex-1 space-y-4 text-[7px] tracking-widest uppercase text-white/40">
                  <div className="flex items-center justify-between">
                    <span>FREQUENCY DRIFT</span>
                    <div className="w-[80px] h-[1px] bg-white/10 relative"><div className="absolute top-0 left-0 h-full bg-[#d4ff00] w-[72%] origin-left" style={{ animation: 'streamBar 0.3s infinite alternate', animationDelay: '0.1s' }} /></div>
                    <span className="text-[#d4ff00]">72%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SIGNAL NOISE</span>
                    <div className="w-[80px] h-[1px] bg-white/10 relative"><div className="absolute top-0 left-0 h-full bg-[#d4ff00] w-[83%] origin-left" style={{ animation: 'streamBar 0.5s infinite alternate', animationDelay: '0.3s' }} /></div>
                    <span className="text-[#d4ff00]">83%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>DATA CORRUPTION</span>
                    <div className="w-[80px] h-[1px] bg-white/10 relative"><div className="absolute top-0 left-0 h-full bg-[#d4ff00] w-[61%] origin-left" style={{ animation: 'streamBar 0.2s infinite alternate', animationDelay: '0.5s' }} /></div>
                    <span className="text-[#d4ff00]">61%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>REALITY INTERFERENCE</span>
                    <div className="w-[80px] h-[1px] bg-white/10 relative"><div className="absolute top-0 left-0 h-full bg-[#d4ff00] w-[47%] origin-left" style={{ animation: 'streamBar 0.4s infinite alternate', animationDelay: '0.7s' }} /></div>
                    <span className="text-[#d4ff00]">47%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ANALYSIS & VERIFICATION */}
          <div className="absolute right-0 top-0 bottom-0 w-[350px] p-8 flex flex-col gap-8 z-10 shrink-0 bg-gradient-to-l from-black/80 to-transparent">
            
            {/* Interference Analysis */}
            <div>
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-6">INTERFERENCE ANALYSIS</div>
              <div className="space-y-4 text-[9px] tracking-widest uppercase">
                <div className="flex justify-between"><span className="text-white/40">SOURCE:</span><span className="text-[#d4ff00]">UNKNOWN</span></div>
                <div className="flex justify-between"><span className="text-white/40">INTERFERENCE TYPE:</span><span className="text-white/60">MULTI-LAYERED</span></div>
                <div className="flex justify-between"><span className="text-white/40">PATTERN:</span><span className="text-white/60">CHAOTIC</span></div>
                <div className="flex justify-between"><span className="text-white/40">PREDICTABILITY:</span><span className="text-white/60">LOW</span></div>
                <div className="flex justify-between"><span className="text-white/40">THREAT POTENTIAL:</span><span className="text-[#d4ff00]">UNKNOWN</span></div>
              </div>
              
              {/* Mini squiggly graph */}
              <div className="w-full h-12 mt-6 border-b border-white/5 relative opacity-50">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0,20 Q10,5 20,25 T40,15 T60,35 T80,10 T100,20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" style={{ animation: 'floatWave 1s infinite alternate' }} />
                  <path d="M0,25 Q15,35 30,20 T60,25 T90,15 T100,20" fill="none" stroke="rgba(212,255,0,0.5)" strokeWidth="0.5" strokeDasharray="2 2" style={{ animation: 'floatWave 1.5s infinite alternate' }} />
                </svg>
              </div>
            </div>

            {/* System Synchronization */}
            <div className="border border-white/5 bg-black/40 p-6">
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-4">SYSTEM SYNCHRONIZATION</div>
              <div className="text-4xl text-white font-mono tracking-wider mb-4 animate-pulse">47%</div>
              <div className="flex gap-1 h-2">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 ${i < 9 ? 'bg-white/80' : 'bg-white/10'}`} 
                    style={{ animation: 'blinkTerminal 0.5s infinite alternate', animationDelay: `${SYNC_BAR_DELAYS[i]}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Classification */}
            <div className="border border-[#d4ff00]/20 bg-black/40 p-6 relative">
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-2">CLASSIFICATION</div>
              <div className="text-[10px] tracking-widest text-[#d4ff00] uppercase font-bold">ENTITY UNVERIFIED</div>
            </div>

            {/* Recommendation */}
            <div className="mt-auto">
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-2">RECOMMENDATION</div>
              <div className="text-[9px] tracking-widest text-white/60 uppercase leading-relaxed">
                PROCEED WITH EXTREME CAUTION.<br/>
                ALL PERCEPTIONS MAY BE ALTERED.
              </div>
            </div>

          </div>

          {/* BOTTOM LEFT: ANOMALY FEED */}
          <div className="absolute bottom-8 left-8 w-[400px] z-10">
            <div className="text-[8px] tracking-widest text-white/40 uppercase mb-4">ANOMALY FEED</div>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`flex-1 h-[60px] border ${i === 1 ? 'border-[#d4ff00]' : 'border-white/10'} bg-black relative overflow-hidden group`}>
                  <img src="/base_hacker.png" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity grayscale filter blur-[1px]" />
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.8)_3px)] pointer-events-none" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2 text-[6px] tracking-widest text-white/40 uppercase">
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-[#d4ff00] rounded-full animate-pulse" /> FEED LIVE</span>
              <span className="text-[#d4ff00]">{'< • • • >'}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER / AUDIO VISUALIZER BAR */}
        <div className="h-[60px] border-t border-white/5 flex items-center px-8 shrink-0 bg-black/80 backdrop-blur-md z-30">
           <div className="text-[8px] tracking-widest text-white/40 uppercase mr-8 shrink-0">+ DISTORTION LEVEL</div>
           <div className="text-[9px] tracking-widest text-[#d4ff00] uppercase font-bold mr-8 shrink-0">CRITICAL</div>
           
           {/* Visualizer bars */}
           <div className="flex-1 flex items-center gap-[2px] h-4 mx-8">
             {VISUALIZER_BARS.map((bar, i) => (
               <div 
                 key={i} 
                 className={`w-[3px] origin-bottom ${i < 45 ? 'bg-[#d4ff00]' : 'bg-white/10'}`} 
                 style={{ 
                   height: `${bar.height}%`,
                   animation: `audioVisualizer ${bar.duration}s ease-in-out infinite alternate`,
                   animationDelay: `${bar.delay}s`
                 }} 
               />
             ))}
           </div>
           
           <div className="text-[10px] text-white font-mono mr-8 shrink-0">83%</div>
           <div className="text-[8px] tracking-widest text-white/40 uppercase ml-auto shrink-0 flex items-center gap-4">
             CONTINUE DESCENT <span className="text-[#d4ff00]">{'>'}</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default DistortionChamber;
