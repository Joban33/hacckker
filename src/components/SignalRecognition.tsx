import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SignalRecognition: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle pulse and scanline effects
      gsap.to('.scanline-fx', {
        y: '100%',
        duration: 4,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('.pulse-node', {
        opacity: 0.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="identity"
      className="relative w-full h-screen bg-[#050505] overflow-hidden text-[#a0a0a0] font-mono flex selection:bg-[#d4ff00]/30 selection:text-white"
    >
      <style>{`
        @keyframes blinkSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes floatGraph {
          0% { transform: translateY(-3px); }
          100% { transform: translateY(3px); }
        }
        @keyframes streamBar {
          0% { transform: scaleX(0.2); }
          100% { transform: scaleX(1); }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. LEFT SIDEBAR
      ────────────────────────────────────────────────────────────── */}
      <div className="w-[80px] h-full border-r border-white/5 flex flex-col items-center py-8 z-20 shrink-0 bg-black/20 backdrop-blur-sm">
        <div className="text-xl font-light text-white/40 mb-12">*</div>
        <div className="flex flex-col items-center space-y-2 mb-12">
          <div className="text-[#d4ff00] font-semibold text-lg leading-none">02</div>
          <div className="text-white/20 text-[10px] leading-none">/07</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-1 h-1 rounded-full bg-white/20" />
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`w-4 h-[1px] ${i === 1 ? 'bg-[#d4ff00] shadow-[0_0_5px_#d4ff00]' : 'bg-white/10'}`} />
          ))}
        </div>
        <div className="text-[8px] tracking-widest uppercase text-[#d4ff00] mt-12 rotate-[-90deg] whitespace-nowrap">
          SYSTEM<br/>STATUS<br/>ONLINE<br/><span className="inline-block w-1 h-1 bg-[#d4ff00] rounded-full mt-2" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA
      ────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full relative z-20 overflow-hidden">
        
        {/* TOP HEADER */}
        <div className="w-full h-[60px] border-b border-white/5 flex items-center justify-between px-8 text-[10px] tracking-widest text-white/40 uppercase shrink-0 bg-black/20 backdrop-blur-sm">
          <div>BLACKSIGNAL PROTOCOL <span className="text-white/20 ml-4">V.3.7.2</span></div>
          <div className="text-white/20">—— [ 02 ] ——</div>
          <div>SIGNAL RECOGNITION <span className="text-[#d4ff00] ml-2">// 02</span></div>
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT COLUMN: TITLE & LIVE FEED */}
          <div className="w-[380px] p-8 flex flex-col z-30 shrink-0">
            <div className="mb-12 border-b border-white/5 pb-8">
              <p className="text-[10px] tracking-[0.2em] text-white/40 mb-4 uppercase">
                THE SYSTEM WATCHES.
              </p>
              <h2 className="font-lalezar text-[5rem] leading-[0.85] text-white/90 tracking-wider mb-6">
                SIGNAL
                <br />
                RECOGNITION
              </h2>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 leading-loose">
                IDENTITY ANALYSIS IN PROGRESS
              </p>
            </div>

            {/* Live Signal Feed Box */}
            <div className="border border-white/5 bg-black/40 p-4 relative flex flex-col h-[280px]">
              <div className="text-[8px] tracking-widest text-white/30 uppercase mb-4">LIVE SIGNAL FEED</div>
              
              <div className="flex-1 relative border border-white/10 overflow-hidden bg-black mb-4 flex items-center justify-center">
                {/* Simulated Wireframe/Glitch Feed */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.05)_3px)] pointer-events-none z-10" />
                <div className="absolute inset-0 scanline-fx bg-[linear-gradient(transparent_0%,rgba(212,255,0,0.1)_50%,transparent_100%)] h-[10%] opacity-50 z-20" />
                <img src="/base_hacker.png" className="w-full h-full object-cover filter grayscale contrast-125 brightness-50 mix-blend-screen opacity-60" />
                
                {/* Corner reticles */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40" />
              </div>

              <div className="text-[7px] text-white/40 tracking-widest leading-loose">
                <div>{'>'} FACIAL TOPOLOGY: UNSTABLE</div>
                <div>{'>'} BEHAVIORAL PATTERNS: UNKNOWN</div>
              </div>
            </div>
          </div>

          {/* CENTER/RIGHT: SUBJECT DATA & WIREFRAME HEAD */}
          <div 
            className="flex-1 p-8 relative flex border-l border-white/5 bg-[radial-gradient(ellipse_at_right,rgba(255,255,255,0.03)_0%,transparent_70%)] group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            
            {/* Subject Data Panel */}
            <div className="w-[350px] relative z-20">
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-2">SUBJECT:</div>
              <div className="text-xl text-[#d4ff00] font-mono tracking-widest mb-8">ANOMALOUS USER</div>

              <div className="space-y-4 text-[9px] tracking-widest uppercase font-mono">
                <div className="flex"><span className="w-[140px] text-white/40">STATUS:</span><span className="text-white/80">MONITORED</span></div>
                <div className="flex"><span className="w-[140px] text-white/40">LOCATION:</span><span className="text-white/80">UNKNOWN</span></div>
                <div className="flex"><span className="w-[140px] text-white/40">ROLE:</span><span className="text-[#d4ff00]">UNCLASSIFIED</span></div>
                <div className="flex"><span className="w-[140px] text-white/40">THREAT LEVEL:</span><span className="text-white/80">LOW</span></div>
                <div className="flex"><span className="w-[140px] text-white/40">CLEARANCE:</span><span className="text-white/80">RESTRICTED</span></div>
                <div className="flex"><span className="w-[140px] text-white/40">SIGNAL ID:</span><span className="text-white/80">BS-7A21-X9F</span></div>
                <div className="flex"><span className="w-[140px] text-white/40">FIRST DETECTED:</span><span className="text-white/80">10.12.2023</span></div>
                <div className="flex items-center"><span className="w-[140px] text-white/40">LAST SEEN:</span><span className="text-white/80 flex items-center gap-2">ACTIVE <span className="w-1.5 h-1.5 bg-[#d4ff00] rounded-full animate-pulse" /></span></div>
              </div>

              <div className="mt-8 text-[8px] tracking-widest text-white/40 uppercase mb-2">NOTES:</div>
              <div className="border border-white/10 rounded-sm p-4 text-[8px] tracking-[0.2em] text-white/60 leading-relaxed uppercase bg-black/40">
                SIGNAL ORIGIN UNCERTAIN.<br/>
                BEHAVIOR DEVIATES FROM KNOWN PROFILES.
              </div>

              {/* Signal Strength Bar */}
              <div className="mt-12">
                <div className="text-[8px] tracking-widest text-white/40 uppercase mb-4">SIGNAL STRENGTH</div>
                <div className="flex items-center gap-1">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className={`flex-1 h-3 ${i < 24 ? 'bg-[#d4ff00]/80' : 'bg-white/10'}`} />
                  ))}
                  <span className="text-[10px] text-[#d4ff00] ml-4 font-mono">76%</span>
                </div>
              </div>
            </div>

            {/* Huge Wireframe Head */}
            <div className="absolute top-0 right-0 bottom-0 w-[60%] pointer-events-none opacity-40 overflow-hidden">
              {/* Note: since we can't generate a true 3D point cloud head via CSS easily, 
                  we will simulate it using the base image heavily processed to look like a dot matrix/wireframe,
                  layered with grid effects and target UI. */}
              <img 
                src="/base_hacker.png" 
                className={`absolute right-[-10%] top-[10%] h-[90%] w-auto object-cover filter grayscale contrast-[300%] brightness-200 opacity-60 mix-blend-screen transition-transform duration-75 ease-out ${isHovering ? 'scale-[2.5]' : 'scale-100'}`} 
                style={{ 
                  maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)', 
                  WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                }} 
              />
              
              {/* Dot matrix overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:4px_4px] mix-blend-multiply opacity-50" />
              
              {/* Target UI overlays */}
              <div className="absolute top-[40%] right-[30%] border border-white/20 p-1 bg-black/80 flex items-center gap-2">
                 <div className="w-1 h-1 bg-white/60" />
                 <span className="text-[6px] tracking-widest text-white/60 uppercase">EYES: UNKNOWN</span>
              </div>
              <div className="absolute top-[60%] right-[10%] border border-white/20 p-1 bg-black/80 flex items-center gap-2">
                 <span className="text-[6px] tracking-widest text-white/60 uppercase">PATTERN: UNSTABLE</span>
              </div>
              <div className="absolute bottom-[20%] right-[5%] text-right">
                 <div className="text-[6px] tracking-widest text-white/40 uppercase mb-1">CONFIDENCE</div>
                 <div className="text-[10px] tracking-widest text-white font-mono">42%</div>
                 <div className="w-4 h-4 border-b border-r border-white/40 absolute -right-2 -bottom-2" />
              </div>
              
              <div className="absolute top-[10%] right-[5%] text-[7px] text-white/30 tracking-widest">
                IDENTITY SHELL<br/>V2.3
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ROW (Analytics Panels) */}
        <div className="h-[160px] border-t border-white/5 flex shrink-0 bg-black/60 backdrop-blur-md z-30">
          
          {/* Panel 1: System Monitor */}
          <div className="flex-1 border-r border-white/5 p-4 relative flex flex-col justify-between">
            <div className="text-[8px] text-white/40 tracking-widest uppercase">System Monitor</div>
            <div className="flex items-center justify-between">
              <div className="space-y-2 text-[7px] tracking-widest text-white/60 uppercase">
                <div>{'>'} SURVEILLANCE ACTIVE</div>
                <div>{'>'} LOGGING INTERACTIONS</div>
                <div>{'>'} TRACKING MOVEMENTS</div>
                <div>{'>'} BUILDING PROFILE</div>
              </div>
              <div className="w-16 h-16 rounded-full border border-white/10 relative flex items-center justify-center">
                <div className="absolute w-[60%] h-[60%] rounded-full border border-white/5 border-dashed animate-[spin_4s_linear_infinite]" />
                <div className="w-1 h-1 bg-[#d4ff00] rounded-full shadow-[0_0_8px_#d4ff00] animate-pulse" />
              </div>
            </div>
            <div className="text-[7px] text-white/40 tracking-widest uppercase">STATUS: <span className="text-[#d4ff00]">MONITORING</span></div>
          </div>

          {/* Panel 2: Behavioral Traits */}
          <div className="flex-1 border-r border-white/5 p-4 relative flex flex-col justify-between">
            <div className="text-[8px] text-white/40 tracking-widest uppercase">Behavioral Traits</div>
            <div className="space-y-2 text-[7px] tracking-widest text-white/60 uppercase">
              <div className="flex items-center justify-between"><span className="w-24">{'>'} ADAPTABILITY</span><div className="flex gap-0.5"><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 1.5s infinite alternate' }}/><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 1.5s infinite alternate', animationDelay: '0.2s' }}/><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 1.5s infinite alternate', animationDelay: '0.4s' }}/><div className="w-3 h-1 bg-white/10"/><div className="w-3 h-1 bg-white/10"/></div></div>
              <div className="flex items-center justify-between"><span className="w-24">{'>'} RISK TOLERANCE</span><div className="flex gap-0.5"><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 1s infinite alternate' }}/><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 1s infinite alternate', animationDelay: '0.1s' }}/><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 1s infinite alternate', animationDelay: '0.2s' }}/><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 1s infinite alternate', animationDelay: '0.3s' }}/><div className="w-3 h-1 bg-white/10"/></div></div>
              <div className="flex items-center justify-between"><span className="w-24">{'>'} PATTERN DISRUPTION</span><div className="flex gap-0.5"><div className="w-3 h-1 bg-[#d4ff00]/80 animate-pulse"/><div className="w-3 h-1 bg-[#d4ff00]/80 animate-pulse"/><div className="w-3 h-1 bg-[#d4ff00]/80 animate-pulse"/><div className="w-3 h-1 bg-[#d4ff00]/80 animate-pulse"/><div className="w-3 h-1 bg-[#d4ff00]/80 animate-pulse"/></div></div>
              <div className="flex items-center justify-between"><span className="w-24">{'>'} DECISION LATENCY</span><div className="flex gap-0.5"><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 2s infinite alternate' }}/><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 2s infinite alternate', animationDelay: '0.5s' }}/><div className="w-3 h-1 bg-white/10"/><div className="w-3 h-1 bg-white/10"/><div className="w-3 h-1 bg-white/10"/></div></div>
              <div className="flex items-center justify-between"><span className="w-24">{'>'} TRUST INDEX</span><div className="flex gap-0.5"><div className="w-3 h-1 bg-white/40" style={{ animation: 'blinkSlow 3s infinite alternate' }}/><div className="w-3 h-1 bg-white/10"/><div className="w-3 h-1 bg-white/10"/><div className="w-3 h-1 bg-white/10"/><div className="w-3 h-1 bg-white/10"/></div></div>
            </div>
          </div>

          {/* Panel 3: Signal Metrics */}
          <div className="flex-1 border-r border-white/5 p-4 relative flex flex-col justify-between">
            <div className="text-[8px] text-white/40 tracking-widest uppercase">Signal Metrics</div>
            <div className="space-y-1.5 text-[7px] tracking-widest text-white/60 uppercase">
              <div className="flex justify-between"><span>STABILITY</span><span>54%</span></div>
              <div className="flex justify-between"><span>CONSISTENCY</span><span>37%</span></div>
              <div className="flex justify-between"><span>PREDICTABILITY</span><span>22%</span></div>
            </div>
            <div className="h-6 w-full opacity-50 relative mt-2">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,15 L10,5 L20,18 L30,10 L40,15 L50,5 L60,15 L70,10 L80,18 L90,5 L100,15" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" style={{ animation: 'floatGraph 2s ease-in-out infinite alternate' }} />
              </svg>
            </div>
          </div>

          {/* Panel 4: Data Integrity */}
          <div className="flex-1 border-r border-white/5 p-4 relative flex flex-col justify-between">
            <div className="text-[8px] text-white/40 tracking-widest uppercase">Data Integrity</div>
            <div className="space-y-2 text-[7px] tracking-widest text-white/60 uppercase">
              <div className="flex justify-between"><span>PACKETS RECEIVED</span><span>8.7K</span></div>
              <div className="flex justify-between"><span>PACKETS LOST</span><span>1.2K</span></div>
              <div className="flex justify-between"><span>ENCRYPTION</span><span>AES-256</span></div>
            </div>
            <div className="flex justify-between items-center text-[7px] text-white/40 tracking-widest uppercase mt-4 border-t border-white/5 pt-2">
               <span>STATUS: <span className="text-white/80">SECURE</span></span>
               <span className="text-[#d4ff00]">🔒</span>
            </div>
          </div>

          {/* Panel 5: Live Feed Quality */}
          <div className="flex-1 p-4 relative flex flex-col justify-between">
            <div className="text-[8px] text-white/40 tracking-widest uppercase">Live Feed Quality</div>
            <div className="flex-1 my-2 border border-white/5 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.05)_3px)] relative overflow-hidden">
               <div className="absolute inset-0 scanline-fx bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] h-[20%] opacity-50" />
            </div>
            <div className="text-right text-[10px] text-white font-mono">68%</div>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="h-[40px] border-t border-white/5 flex items-center justify-between px-8 text-[8px] tracking-[0.3em] text-white/30 uppercase shrink-0 bg-black/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <div>[</div>
            <div className="flex items-center gap-2"><span className="w-1 h-1 bg-[#d4ff00] rounded-full" /> BLACKSIGNAL</div>
          </div>
          <div className="flex items-center gap-4">
            <div>THE OBSERVER NEVER BLINKS.</div>
            <div>]</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SignalRecognition;
