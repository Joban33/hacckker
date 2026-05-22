import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SystemDescent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Native CSS animations handle the movement instead of GSAP to ensure they run constantly
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="sys_logs"
      className="relative w-full h-screen bg-[#050505] overflow-hidden text-[#a0a0a0] font-mono flex selection:bg-[#d4ff00]/30 selection:text-white"
    >
      <style>{`
        @keyframes floatTerminal {
          0% { transform: translateZ(50px) translateY(0px) rotateY(-12deg); }
          100% { transform: translateZ(100px) translateY(-10px) rotateY(-10deg); }
        }
        @keyframes floatTerminalRight {
          0% { transform: translateZ(-200px) translateY(0px) rotateY(12deg); }
          100% { transform: translateZ(-150px) translateY(10px) rotateY(10deg); }
        }
        @keyframes floatTerminalCenter {
          0% { transform: translateZ(200px) translateY(0px) scale(1); }
          50% { transform: translateZ(210px) translateY(-5px) scale(1.02); }
          100% { transform: translateZ(200px) translateY(0px) scale(1); }
        }
        @keyframes gridScroll {
          0% { background-position: 0px 0px; }
          100% { background-position: 0px 40px; }
        }
        @keyframes gridScrollUp {
          0% { background-position: 0px 0px; }
          100% { background-position: 0px -40px; }
        }
        @keyframes drawLine {
          0% { stroke-dashoffset: 150; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes textGlitchRed {
          0%, 100% { transform: translateX(0); opacity: 1; color: #ef4444; }
          50% { transform: translateX(2px); opacity: 0.8; color: #b91c1c; }
        }
        @keyframes blinkTerminal {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. DEEP 3D BACKGROUND ATMOSPHERE
      ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden" style={{ perspective: '1000px' }}>
        {/* Converging grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 transform rotate-X-60 scale-150 origin-bottom" style={{ transform: 'rotateX(60deg) scale(2.5) translateY(20%)', animation: 'gridScroll 1s linear infinite' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 transform rotate-X-[120deg] scale-150 origin-top" style={{ transform: 'rotateX(120deg) scale(2.5) translateY(-20%)', animation: 'gridScrollUp 1s linear infinite' }} />
        
        {/* Center glowing void */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white rounded-full blur-[100px] opacity-[0.15]" />
        
        {/* Silhouette figure walking into the void */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-80">
          <img src="/base_hacker.png" className="w-[40px] h-[100px] object-cover object-top filter grayscale contrast-200 brightness-0" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LEFT SIDEBAR
      ────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex w-[80px] h-full border-r border-white/5 flex-col items-center py-8 z-20 shrink-0 bg-black/20 backdrop-blur-sm">
        <div className="text-xl font-light text-white/40 mb-12">*</div>
        <div className="flex flex-col items-center space-y-2 mb-12">
          <div className="text-[#d4ff00] font-semibold text-lg leading-none">03</div>
          <div className="text-white/20 text-[10px] leading-none">/07</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-1 h-1 rounded-full bg-white/20" />
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`w-4 h-[1px] ${i === 2 ? 'bg-[#d4ff00] shadow-[0_0_5px_#d4ff00]' : 'bg-white/10'}`} />
          ))}
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
        <div className="w-full h-auto min-h-[60px] py-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 px-4 md:px-8 text-[8px] md:text-[10px] tracking-widest text-white/40 uppercase shrink-0 bg-black/20 backdrop-blur-sm">
          <div>BLACKSIGNAL PROTOCOL <span className="text-white/20 ml-2 md:ml-4">V.3.7.2</span></div>
          <div className="text-white/20 hidden sm:block">—— [ 03 ] ——</div>
          <div>SYSTEM DESCENT <span className="text-white/20 ml-2">// 03</span></div>
        </div>

        {/* MAIN 3D HUD LAYOUT */}
        <div className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col justify-start p-4 md:p-8 space-y-8 md:space-y-0" style={{ perspective: '1200px' }}>
          
          {/* Top Info Bar */}
          <div className="flex flex-col xl:flex-row justify-between items-start gap-8 xl:gap-0 z-30">
            <div>
              <p className="text-[8px] md:text-[10px] tracking-[0.2em] text-white/40 mb-2 md:mb-4 uppercase">
                DESCENDING THROUGH THE ARCHITECTURE.
              </p>
              <h2 className="font-mono font-bold text-5xl md:text-[5rem] leading-[0.85] text-white/90 tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                SYSTEM
                <br />
                DESCENT
              </h2>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 leading-loose">
                EXPLORING THE DEPTHS OF THE UNKNOWN.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full">
              <div className="space-y-2 text-[8px] tracking-widest uppercase w-full md:w-auto">
                <div className="flex justify-between w-full md:w-[200px]"><span className="text-white/40">DESCENT ID:</span><span className="text-white/80">DS-0934-A</span></div>
                <div className="flex justify-between w-[200px]"><span className="text-white/40">ENTRY POINT:</span><span className="text-white/80">SURFACE INTERFACE</span></div>
                <div className="flex justify-between w-[200px]"><span className="text-white/40">CURRENT LAYER:</span><span className="text-[#d4ff00]">LAYER 04 / 07</span></div>
                <div className="flex justify-between w-[200px]"><span className="text-white/40">ARCHITECTURE:</span><span className="text-white/80">DISTRIBUTED</span></div>
                <div className="flex justify-between w-[200px]"><span className="text-white/40">STABILITY:</span><span className="text-white/80">UNSTABLE</span></div>
                <div className="flex justify-between w-[200px]"><span className="text-white/40">LATENCY:</span><span className="text-white/80">87.36 MS</span></div>
                <div className="flex justify-between w-full md:w-[200px]"><span className="text-white/40">THREAT LEVEL:</span><span className="text-white/80">ELEVATED</span></div>
                <div className="flex justify-between w-full md:w-[200px] items-center"><span className="text-white/40">SIGNAL CLARITY:</span><div className="flex-1 mx-2 h-1 bg-white/10"><div className="w-[48%] h-full bg-white/40" style={{ animation: 'blinkTerminal 2s infinite' }}/></div><span className="text-white/80">48%</span></div>
              </div>

              {/* Descent Progress Graph */}
              <div className="border border-white/5 bg-black/40 p-4 w-full md:w-[300px]">
                <div className="text-[8px] tracking-widest text-white/40 uppercase mb-4">DESCENT PROGRESS</div>
                <div className="h-[60px] flex items-end gap-[2px] opacity-70">
                  {/* Fake jagged line chart */}
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,30 L10,25 L20,35 L30,20 L40,10 L50,15 L60,5 L70,25 L80,10 L90,20 L100,5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeDasharray="150" style={{ animation: 'drawLine 4s linear infinite' }} />
                    {/* Points */}
                    <circle cx="10" cy="25" r="1" fill="white" className="animate-ping" />
                    <circle cx="20" cy="35" r="1" fill="white" />
                    <circle cx="30" cy="20" r="1" fill="white" />
                    <circle cx="40" cy="10" r="1" fill="white" />
                    <circle cx="50" cy="15" r="1" fill="white" />
                    <circle cx="60" cy="5" r="1" fill="white" />
                    <circle cx="70" cy="25" r="1" fill="white" />
                    <circle cx="80" cy="10" r="1" fill="white" />
                    <circle cx="90" cy="20" r="1" fill="white" />
                  </svg>
                </div>
                <div className="flex justify-between text-[7px] text-white/30 tracking-widest mt-2 border-t border-white/5 pt-2">
                  <span>DEPTH</span>
                  <span>43%</span>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING 3D TERMINAL PANELS */}
          <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-center">
            
            {/* Terminal 1 (Left) */}
            <div className="absolute left-[15%] top-[40%] w-[250px] border border-white/10 bg-black/60 backdrop-blur-sm p-4 shadow-[0_0_20px_rgba(0,0,0,0.8)]" style={{ animation: 'floatTerminal 5s ease-in-out infinite alternate', transformStyle: 'preserve-3d' }}>
              <div className="flex justify-between text-[7px] text-[#d4ff00] mb-2 tracking-widest">
                <span>LAYER_01 // SURFACE</span>
                <span>[OK]</span>
              </div>
              <div className="text-[6px] leading-relaxed text-white/40 mb-2">
                {'>'} SYSTEM INITIALIZED.<br/>
                {'>'} ESTABLISHING HANDSHAKE... SUCCESS.<br/>
                {'>'} BYPASSING OUTER FIREWALL.<br/>
                {'>'} PROTOCOL ACCEPTED.
              </div>
            </div>

            {/* Terminal 2 (Right deep) */}
            <div className="absolute right-[20%] top-[30%] w-[200px] border border-white/10 bg-black/60 p-3 opacity-60" style={{ animation: 'floatTerminalRight 6s ease-in-out infinite alternate', animationDelay: '1s', transformStyle: 'preserve-3d' }}>
              <div className="flex justify-between text-[7px] text-white/60 mb-2 tracking-widest border-b border-white/5 pb-1">
                <span>LAYER_02 // PERIMETER</span>
                <span>[OK]</span>
              </div>
              <div className="text-[5px] leading-relaxed text-white/30">
                Data streams analyzed. No immediate threats detected. Proceeding to inner sub-structures.
              </div>
            </div>

            {/* Terminal 3 (Left deep) */}
            <div className="absolute left-[25%] bottom-[30%] w-[280px] border border-white/10 bg-black/60 p-4" style={{ animation: 'floatTerminal 7s ease-in-out infinite alternate', animationDelay: '2s', transformStyle: 'preserve-3d' }}>
              <div className="flex justify-between text-[7px] text-white/60 mb-2 tracking-widest">
                <span>LAYER_03 // SUBSTRUCTURE</span>
                <span>[OK]</span>
              </div>
              <div className="text-[6px] leading-relaxed text-white/40">
                {'>'} ENCRYPTED NODES DISCOVERED.<br/>
                {'>'} COMMENCING BRUTE FORCE ALGORITHMS.<br/>
                {'>'} 14,092 KEYS ATTEMPTED.<br/>
                {'>'} ACCESS GRANTED.
              </div>
              <div className="mt-2 text-[7px] text-[#d4ff00]">
                [03] STREAM ACTIVE
              </div>
            </div>

             {/* Terminal 4 (Center blocked) */}
             <div className="absolute left-1/2 -translate-x-1/2 bottom-[15%] w-[300px] border border-red-500/30 bg-black/80 p-4 text-center" style={{ animation: 'floatTerminalCenter 3s infinite', transformStyle: 'preserve-3d' }}>
              <div className="text-[7px] text-white/60 mb-2 tracking-widest">LAYER_07 // ORIGIN</div>
              <div className="text-[10px] text-red-500 tracking-widest mb-4" style={{ animation: 'textGlitchRed 0.2s infinite' }}>ACCESS DENIED<br/><span className="text-[6px] text-red-500/50">INSUFFICIENT CLEARANCE</span></div>
              <div className="w-8 h-8 mx-auto border border-red-500/50 rounded-md flex items-center justify-center text-red-500 mb-2 animate-pulse">
                🔒
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW (Status Panels) */}
        <div className="h-auto md:h-[140px] border-t border-white/5 flex flex-col md:flex-row px-4 md:px-8 shrink-0 bg-black/60 backdrop-blur-md z-30">
          
          {/* Panel 1: Layer Map */}
          <div className="flex-[1.5] border-r border-white/5 py-4 pr-6 relative">
             <div className="text-[8px] text-white/40 tracking-widest uppercase mb-6">Layer Map</div>
             <div className="flex items-center justify-between px-4">
               {[1, 2, 3, 4, 5, 6, 7].map((layer, i) => (
                 <div key={layer} className="relative flex items-center">
                   <div className="flex flex-col items-center gap-2">
                     <span className="text-[7px] text-white/40">0{layer}</span>
                     {layer === 4 ? (
                       <div className="w-4 h-4 rounded-full border border-[#d4ff00] flex items-center justify-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
                       </div>
                     ) : (
                       <div className={`w-1.5 h-1.5 rounded-full ${layer < 4 ? 'bg-white/40' : 'bg-white/10'}`} />
                     )}
                   </div>
                   {i < 6 && (
                     <div className={`w-8 h-[1px] absolute top-[22px] left-[10px] ${layer < 4 ? 'bg-white/40' : 'bg-white/10'}`} />
                   )}
                 </div>
               ))}
             </div>
          </div>

          {/* Panel 2: System Log */}
          <div className="flex-[2] md:border-r border-white/5 py-4 md:px-6 relative border-b md:border-b-0">
             <div className="text-[8px] text-white/40 tracking-widest uppercase mb-3">System Log</div>
             <div className="space-y-2 text-[8px] tracking-widest">
                <div className="flex justify-between"><span className="text-white/40">{'>'} INITIALIZING DESCENT SEQUENCE...</span><span className="text-white/60">COMPLETE</span></div>
                <div className="flex justify-between"><span className="text-white/40">{'>'} BYPASSING SECURITY PROTOCOLS...</span><span className="text-white/60">COMPLETE</span></div>
                <div className="flex justify-between"><span className="text-white/40">{'>'} CONNECTING TO INTERMEDIATE NODES...</span><span className="text-white/60">COMPLETE</span></div>
                <div className="flex justify-between"><span className="text-[#d4ff00]/60">{'>'} STABILITY FLUCTUATIONS DETECTED...</span><span className="text-[#d4ff00] animate-pulse">WARNING</span></div>
                <div className="flex justify-between"><span className="text-white/40">{'>'} PROCEED WITH CAUTION <span style={{ animation: 'blinkTerminal 1s step-end infinite' }}>_</span></span><span></span></div>
             </div>
          </div>

          {/* Panel 3: Active Anomalies */}
          <div className="flex-[1.5] py-4 pl-6 relative flex justify-between">
            <div>
              <div className="text-[8px] text-white/40 tracking-widest uppercase mb-3">Active Anomalies</div>
              <ul className="space-y-2 text-[7px] text-white/60 tracking-widest list-disc pl-4">
                <li>SIGNAL FRAGMENTATION</li>
                <li>ARCHITECTURAL DRIFT</li>
                <li>DATA ECHOES</li>
                <li>UNKNOWN ENTITIES</li>
              </ul>
            </div>
            <div className="flex items-center justify-center pr-4">
              {/* Eclipse Anomaly Graphic */}
              <div className="w-16 h-16 rounded-full border border-white/10 relative flex items-center justify-center bg-black shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-[spin_10s_linear_infinite]">
                <div className="absolute w-[80%] h-[80%] rounded-full border-t border-l border-white/30 rotate-45" />
                <div className="absolute w-full h-full rounded-full border border-white/5 animate-[spin_4s_linear_infinite_reverse]" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="h-auto min-h-[40px] py-4 md:py-0 border-t border-white/5 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 gap-4 md:gap-0 text-[7px] md:text-[8px] tracking-[0.2em] md:tracking-[0.3em] text-white/30 uppercase shrink-0 bg-black/80 backdrop-blur-md z-30 text-center">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">[</div>
            <div>BLACKSIGNAL PROTOCOL // END OF TRANSMISSION</div>
          </div>
          <div className="flex items-center gap-4">
            <div>THE SIGNAL REMAINS UNSEEN.</div>
            <div>]</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemDescent;
