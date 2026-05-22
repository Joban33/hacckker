import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NODE_BARS = Array.from({ length: 15 }, (_, index) => ({
  delay: ((index * 0.09) % 1).toFixed(2),
}));

const INTEGRITY_BARS = Array.from({ length: 40 }, (_, index) => ({
  opacity: 0.5 + ((index * 17) % 50) / 100,
  delay: ((index * 0.11) % 2).toFixed(2),
}));

export const FinalTransaction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Native CSS animations handle the movement instead of GSAP to ensure they run constantly
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="transmit"
      className="relative w-full h-screen bg-[#050505] overflow-hidden text-[#a0a0a0] font-mono flex selection:bg-[#d4ff00]/30 selection:text-white"
    >
      <style>{`
        @keyframes pulseHeight {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1); }
        }
        @keyframes float3D {
          0% { transform: rotateX(60deg) translateZ(-10px) rotateZ(0deg); }
          100% { transform: rotateX(55deg) translateZ(10px) rotateZ(5deg); }
        }
        @keyframes glitchText {
          0%, 100% { opacity: 1; transform: translateX(0); }
          5% { opacity: 0.8; transform: translateX(-2px); }
          10% { opacity: 0.9; transform: translateX(2px); }
          15% { opacity: 1; transform: translateX(0); }
        }
        @keyframes blinkTerminal {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. LEFT SIDEBAR
      ────────────────────────────────────────────────────────────── */}
      <div className="w-[80px] h-full border-r border-white/5 flex flex-col items-center py-8 z-20 shrink-0 bg-black/20 backdrop-blur-sm">
        <div className="text-xl font-light text-white/40 mb-12">*</div>
        <div className="flex flex-col items-center space-y-2 mb-12">
          <div className="text-[#d4ff00] font-semibold text-lg leading-none">07</div>
          <div className="text-white/20 text-[10px] leading-none">/07</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-1 h-1 rounded-full bg-white/20" />
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`w-4 h-[1px] ${i === 8 ? 'bg-[#d4ff00] shadow-[0_0_5px_#d4ff00]' : 'bg-white/10'}`} />
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
          <div className="text-white/20">—— [ 07 ] ——</div>
          <div>FINAL TRANSACTION <span className="text-[#d4ff00] ml-2">// 07</span></div>
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT COLUMN: TITLE & TRANSACTION ID */}
          <div className="w-[380px] border-r border-white/5 p-8 flex flex-col z-30 shrink-0">
            <div className="mb-12">
              <p className="text-[10px] tracking-[0.2em] text-[#d4ff00] mb-4 uppercase">
                TRANSACTION PROTOCOL INITIATED.
              </p>
              <h2 className="font-lalezar text-[5rem] leading-[0.85] text-white/90 tracking-wider mb-6">
                FINAL
                <br />
                TRANSACTION
              </h2>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 leading-loose">
                THE SIGNAL HAS BEEN SEALED.<br />
                THE EXCHANGE IS COMPLETE.
              </p>
            </div>

            {/* Transaction ID Box */}
            <div className="border border-white/10 p-6 relative flex flex-col flex-1 max-h-[300px]">
              <div className="text-[9px] tracking-widest text-white/30 uppercase mb-8">TRANSACTION ID</div>
              
              <div className="text-2xl text-[#d4ff00] font-mono mb-12 tracking-wider inline-block" style={{ animation: 'glitchText 5s infinite' }}>
                TXN-BS-7A21-X9F
              </div>

              <div className="flex justify-between mb-12">
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest mb-2">INITIATED</div>
                  <div className="text-[10px] text-white/80">12.12.2023 - 21:47:36</div>
                </div>
                <div>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest mb-2">CONFIRMED</div>
                  <div className="text-[10px] text-white/80">12.12.2023 - 21:49:03</div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[10px] tracking-widest uppercase">
                <span className="text-white/40">STATUS: <span className="text-[#d4ff00] ml-2">COMPLETED</span></span>
                <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-white/60">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: GLOBE */}
          <div className="flex-1 border-r border-white/5 p-8 relative flex flex-col">
            <div className="text-[9px] tracking-widest text-white/40 uppercase mb-4">// SECURE TRANSACTION CHANNEL</div>
            
            <div className="flex-1 relative flex items-center justify-center">
              {/* Globe Graphic */}
              <div className="w-[400px] h-[400px] relative flex items-center justify-center">
                {/* Outer dashed rings */}
                <div className="absolute inset-0 rounded-full border border-white/10 border-dashed animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-[90%] h-[90%] rounded-full border border-[#d4ff00]/20 border-dotted animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute w-[80%] h-[80%] rounded-full border border-white/5 animate-[spin_50s_linear_infinite]" />
                
                {/* Hexagon core */}
                <svg className="absolute w-[60%] h-[60%] opacity-40 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
                  <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="white" strokeWidth="0.5" />
                  <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" fill="none" stroke="white" strokeWidth="0.5" />
                  <line x1="10" y1="25" x2="90" y2="75" stroke="white" strokeWidth="0.5" />
                  <line x1="10" y1="75" x2="90" y2="25" stroke="white" strokeWidth="0.5" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="0.5" />
                </svg>

                {/* Glowing Center */}
                <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.8)] z-10" />

                {/* Simulated Globe Lines (Latitude/Longitude curves) */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100">
                  <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="white" strokeWidth="0.2" />
                  <ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke="white" strokeWidth="0.2" />
                  <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="white" strokeWidth="0.2" />
                  <ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke="white" strokeWidth="0.2" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.2" />
                </svg>
              </div>

              {/* Source Node (Left) */}
              <div className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col gap-2">
                <div className="text-[7px] text-white/40 tracking-widest uppercase">SOURCE NODE</div>
                <div className="text-[12px] text-white/80 tracking-widest">NODE 7A21</div>
                <div className="text-[8px] text-[#d4ff00] tracking-widest">ENCRYPTED</div>
                <div className="flex items-end gap-1 mt-2 h-4">
                  {NODE_BARS.map((bar, i) => (
                    <div 
                      key={i} 
                      className={`w-0.5 origin-bottom ${i < 13 ? 'bg-[#d4ff00]/80' : 'bg-white/10'}`} 
                      style={{ 
                        height: '100%', 
                        animation: 'pulseHeight 0.4s ease-in-out infinite alternate', 
                        animationDelay: `${bar.delay}s`
                      }} 
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[6px] text-white/30 tracking-widest mt-1"><span>SIGNAL STRENGTH</span><span>92%</span></div>
              </div>

              {/* Target Node (Right) */}
              <div className="absolute right-[10%] top-1/2 -translate-y-1/2 flex flex-col gap-2 text-right">
                <div className="text-[7px] text-white/40 tracking-widest uppercase">TARGET NODE</div>
                <div className="text-[12px] text-white/80 tracking-widest">NODE C04F</div>
                <div className="text-[8px] text-[#d4ff00] tracking-widest">ENCRYPTED</div>
                <div className="flex items-end justify-end gap-1 mt-2 h-4">
                  {NODE_BARS.map((bar, i) => (
                    <div 
                      key={i} 
                      className={`w-0.5 origin-bottom ${i < 12 ? 'bg-[#d4ff00]/80' : 'bg-white/10'}`} 
                      style={{ 
                        height: '100%', 
                        animation: 'pulseHeight 0.4s ease-in-out infinite alternate', 
                        animationDelay: `${bar.delay}s`
                      }} 
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[6px] text-white/30 tracking-widest mt-1"><span>SIGNAL STRENGTH</span><span>89%</span></div>
              </div>

            </div>

            {/* Transmission Integrity Box */}
            <div className="border border-white/5 bg-black/40 p-4 absolute bottom-8 left-1/2 -translate-x-1/2 w-[60%]">
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-4">TRANSMISSION INTEGRITY</div>
              <div className="flex items-center gap-1 mb-2 h-3">
                 {INTEGRITY_BARS.map((bar, i) => (
                    <div 
                      key={i} 
                      className="flex-1 h-full bg-[#d4ff00]/80" 
                      style={{ 
                        opacity: bar.opacity,
                        animation: 'blinkTerminal 2s infinite alternate',
                        animationDelay: `${bar.delay}s`
                      }} 
                    />
                 ))}
                 <span className="text-[10px] text-white ml-2 animate-pulse">100%</span>
              </div>
              <div className="text-[8px] tracking-[0.2em] text-white/40 uppercase">ALL PACKETS VERIFIED AND DELIVERED.</div>
            </div>

          </div>

          {/* RIGHT COLUMN: RECEIPTS & VERIFICATION */}
          <div className="w-[350px] p-8 flex flex-col gap-8 shrink-0">
            
            {/* Transaction Status */}
            <div>
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-4">TRANSACTION STATUS</div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border border-white/10 relative flex items-center justify-center">
                  <div className="absolute w-[90%] h-[90%] rounded-full border border-white/5 border-dashed animate-[spin_10s_linear_infinite]" />
                  <div className="w-8 h-8 rounded-full border border-[#d4ff00] flex items-center justify-center text-[#d4ff00]">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                <div>
                  <div className="text-[#d4ff00] tracking-widest mb-1 text-sm">SUCCESS</div>
                  <div className="text-[7px] text-white/40 tracking-widest uppercase leading-relaxed">
                    TRANSACTION<br/>COMPLETED<br/>SUCCESSFULLY.
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Receipt */}
            <div className="border-t border-b border-white/5 py-6">
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-6">DIGITAL RECEIPT</div>
              <div className="space-y-3 text-[9px] tracking-widest uppercase font-mono">
                <div className="flex justify-between"><span className="text-white/50">AMOUNT TRANSFERRED</span><span className="text-white/80">1.0000 BSN</span></div>
                <div className="flex justify-between"><span className="text-white/50">NETWORK FEE</span><span className="text-white/80">0.0032 BSN</span></div>
                <div className="flex justify-between pt-2 border-t border-white/5"><span className="text-[#d4ff00]">TOTAL</span><span className="text-[#d4ff00]">1.0032 BSN</span></div>
                
                <div className="h-4" /> {/* Spacer */}

                <div className="flex justify-between"><span className="text-white/50">LEDGER POSITION</span><span className="text-white/80">#88,742,391</span></div>
                <div className="flex justify-between"><span className="text-white/50">CONFIRMATIONS</span><span className="text-white/80">12 / 12</span></div>
                <div className="flex justify-between"><span className="text-white/50">BLOCK HASH</span><span className="text-white/80">9F7A....3C2D9B</span></div>
                <div className="flex justify-between"><span className="text-white/50">RECEIPT HASH</span><span className="text-white/80">B21F....7A98E3</span></div>
              </div>
            </div>

            {/* Destination Verification (Fingerprint) */}
            <div className="flex-1 flex flex-col">
              <div className="text-[8px] tracking-widest text-white/40 uppercase mb-4">DESTINATION VERIFICATION</div>
              <div className="flex items-center gap-6">
                <div className="w-24 h-32 border border-white/10 relative flex items-center justify-center bg-black overflow-hidden">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#d4ff00]" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#d4ff00]" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#d4ff00]" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#d4ff00]" />
                  
                  {/* Fingerprint graphic (SVG) */}
                  <svg className="w-[80%] h-[80%] opacity-40 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <path d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10" />
                    <path d="M12 6a6 6 0 0 0-6 6c0 3.3 2.7 6 6 6s6-2.7 6-6" />
                    <path d="M12 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2s2-.9 2-2" />
                    <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4" />
                    <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  </svg>
                  
                  {/* Scanline */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#d4ff00] shadow-[0_0_10px_#d4ff00] opacity-50 animate-[scan_2s_linear_infinite]" />
                </div>

                <div className="space-y-4 text-[9px] tracking-widest uppercase">
                  <div>
                    <div className="text-white/40 mb-1">IDENTITY</div>
                    <div className="text-[#d4ff00]">VERIFIED</div>
                  </div>
                  <div>
                    <div className="text-white/40 mb-1">CLEARANCE LEVEL</div>
                    <div className="text-[#d4ff00]">GRANTED</div>
                  </div>
                  <div>
                    <div className="text-white/40 mb-1">ACCESS</div>
                    <div className="text-[#d4ff00]">AUTHORIZED</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ROW (Analytics Panels) */}
        <div className="h-[220px] border-t border-white/5 flex px-8 shrink-0 bg-black/40 backdrop-blur-sm z-30">
          
          {/* Panel 1: Map */}
          <div className="flex-[1.5] border-r border-white/5 py-4 pr-6 relative">
             <div className="text-[8px] text-white/40 tracking-widest uppercase mb-4">Transaction Route</div>
             <div className="w-full h-[120px] relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]">
                {/* Simulated Map points and arcs */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                  <circle cx="40" cy="50" r="2" fill="white" className="opacity-50" />
                  <circle cx="80" cy="30" r="2" fill="white" className="opacity-50" />
                  <circle cx="150" cy="70" r="3" fill="#d4ff00" className="animate-pulse" />
                  <path d="M40,50 Q60,20 80,30 T150,70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
                  <path d="M40,50 Q60,20 80,30 T150,70" fill="none" stroke="#d4ff00" strokeWidth="0.5" className="animate-[dash_3s_linear_infinite]" />
                </svg>
             </div>
             <div className="flex justify-between text-[7px] text-white/40 tracking-widest uppercase mt-4">
               <span>01 <br/>INITIATED</span>
               <span>02 <br/>ENCRYPTED</span>
               <span>03 <br/>ROUTED</span>
               <span>04 <br/>VERIFIED</span>
               <span className="text-[#d4ff00]">05 <br/>DELIVERED</span>
             </div>
          </div>

          {/* Panel 2: Encryption Overview */}
          <div className="flex-[1.5] border-r border-white/5 py-4 px-6 relative flex gap-8 items-center">
            <div className="w-1/2">
               <div className="text-[8px] text-white/40 tracking-widest uppercase mb-4">Encryption Overview</div>
               {/* 3D Stacked Planes */}
               <div className="relative w-[120px] h-[100px]" style={{ perspective: '500px' }}>
                 <div className="absolute inset-0" style={{ animation: 'float3D 4s ease-in-out infinite alternate', transformStyle: 'preserve-3d' }}>
                   {[0, 1, 2, 3].map((i) => (
                     <div 
                       key={i}
                       className="absolute w-full h-[60px] border border-[#d4ff00]/40 bg-black/40"
                       style={{ 
                         transform: `translateZ(${i * -20}px)`,
                         opacity: 1 - (i * 0.2)
                       }}
                     />
                   ))}
                   <div className="absolute inset-0 flex items-center justify-center transform translateZ(10px)">
                     <div className="w-8 h-8 rounded-md border border-white/40 flex items-center justify-center text-[#d4ff00] animate-pulse">
                       🔒
                     </div>
                   </div>
                 </div>
               </div>
            </div>
            <div className="w-1/2 space-y-4 text-[8px] tracking-widest uppercase text-white/40">
              <div>
                <div className="mb-1">ENCRYPTION TYPE</div>
                <div className="text-white/80">QUANTUM-256</div>
              </div>
              <div>
                <div className="mb-1">PROTOCOL</div>
                <div className="text-white/80">BS PROTOCOL 3.7</div>
              </div>
              <div>
                <div className="mb-1">ALGORITHM</div>
                <div className="text-white/80">Q-CHA/7A</div>
              </div>
              <div>
                <div className="mb-1">KEY STATUS</div>
                <div className="text-[#d4ff00]">DESTROYED</div>
              </div>
              <div>
                <div className="mb-1">SESSION TIME</div>
                <div className="text-[#d4ff00]">00:01:27</div>
              </div>
            </div>
          </div>

          {/* Panel 3: Transaction Summary */}
          <div className="flex-[1.5] border-r border-white/5 py-4 px-6 relative">
             <div className="text-[8px] text-white/40 tracking-widest uppercase mb-6">Transaction Summary</div>
             <div className="space-y-4 text-[8px] tracking-widest uppercase">
                <div className="flex justify-between"><span className="text-white/40">DATA PACKETS</span><span className="text-[#d4ff00]">8,451</span></div>
                <div className="flex justify-between"><span className="text-white/40">PACKETS DELIVERED</span><span className="text-[#d4ff00]">8,451</span></div>
                <div className="flex justify-between"><span className="text-white/40">PACKETS LOST</span><span className="text-[#d4ff00]">0</span></div>
                <div className="flex justify-between"><span className="text-white/40">ROUTE EFFICIENCY</span><span className="text-[#d4ff00]">100%</span></div>
                <div className="flex justify-between"><span className="text-white/40">ENCRYPTION STRENGTH</span><span className="text-[#d4ff00]">256-BIT</span></div>
                <div className="flex justify-between"><span className="text-white/40">ANONYMITY LEVEL</span><span className="text-[#d4ff00]">MAXIMUM</span></div>
                <div className="flex justify-between"><span className="text-white/40">TRACE RESISTANCE</span><span className="text-[#d4ff00]">ACTIVE</span></div>
                <div className="flex justify-between"><span className="text-white/40">SIGNAL IMPACT</span><span className="text-[#d4ff00]">MINIMAL</span></div>
             </div>
          </div>

          {/* Panel 4: System Log */}
          <div className="flex-[2] py-4 pl-6 relative">
            <div className="text-[8px] text-white/40 tracking-widest uppercase mb-6 flex justify-between">
              <span>System Log</span>
              <span className="text-[#d4ff00] animate-pulse">LIVE UPDATE</span>
            </div>
            <div className="space-y-4 text-[8px] tracking-widest uppercase">
                <div className="flex justify-between"><span className="text-white/40">{'>'} INITIALIZING TRANSACTION PROTOCOL</span><span className="text-white/20">21:47:36</span></div>
                <div className="flex justify-between"><span className="text-white/40">{'>'} CONNECTING TO SECURE NODES</span><span className="text-white/20">21:47:38</span></div>
                <div className="flex justify-between"><span className="text-white/40">{'>'} ENCRYPTING PAYLOAD</span><span className="text-white/20">21:47:41</span></div>
                <div className="flex justify-between"><span className="text-white/40">{'>'} ROUTING THROUGH SECURE CHANNEL</span><span className="text-white/20">21:47:52</span></div>
                <div className="flex justify-between"><span className="text-white/40">{'>'} VERIFYING INTEGRITY</span><span className="text-white/20">21:48:58</span></div>
                <div className="flex justify-between"><span className="text-white/40">{'>'} FINALIZING TRANSACTION</span><span className="text-white/20">21:49:03</span></div>
                <div className="flex justify-between"><span className="text-[#d4ff00]">{'>'} TRANSACTION COMPLETED <span style={{ animation: 'blinkTerminal 1s step-end infinite' }}>_</span></span><span className="text-[#d4ff00]">21:49:03</span></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalTransaction;
