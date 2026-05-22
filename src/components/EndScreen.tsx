import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const SIMULATED_NODE_DATA = {
  ip: '127.0.0.1',
  city: 'LOCALHOST',
  region: 'SANDBOX',
  country: 'SIMULATED NODE',
  lat: 0,
  lon: 0,
};

export const EndScreen: React.FC = () => {
  const ipData = SIMULATED_NODE_DATA;
  const [stage, setStage] = useState(0); // 0: hidden, 1: gathering, 2: hacked
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Sequence: 0.5s -> stage 1 (Gathering), 3.5s -> stage 2 (Hacked)
      const t1 = setTimeout(() => setStage(1), 500);
      const t2 = setTimeout(() => setStage(2), 3500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isInView]);

  return (
    <section 
      id="end-screen"
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden text-red-500 font-mono flex flex-col items-center justify-center z-50"
    >
      <style>{`
        @keyframes textGlitch {
          0%, 100% { transform: translate(0); text-shadow: 0 0 10px rgba(239,68,68,0.8); }
          20% { transform: translate(-2px, 1px); text-shadow: 0 0 10px rgba(239,68,68,0.8); }
          40% { transform: translate(-1px, -1px); text-shadow: 0 0 10px rgba(239,68,68,0.8); }
          60% { transform: translate(2px, 1px); text-shadow: 0 0 10px rgba(239,68,68,0.8); }
          80% { transform: translate(1px, -1px); text-shadow: 0 0 10px rgba(239,68,68,0.8); }
        }
        @keyframes fastBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin3D {
          0% { transform: rotateX(15deg) rotateY(0deg); }
          100% { transform: rotateX(15deg) rotateY(360deg); }
        }
      `}</style>

      {/* Red ambient background glow */}
      <div className="absolute inset-0 bg-red-900/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-20 w-full h-full">
        
        {/* Stage 1: Gathering Information */}
        {stage === 1 && (
          <div className="flex flex-col items-center justify-center text-red-500 font-mono w-[400px] max-w-[90vw] text-left space-y-4">
            <div className="text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] mb-4 text-center">
              {'>'} ESTABLISHING CONNECTION...
            </div>
            <div className="text-[10px] text-white/60 tracking-widest self-start w-full">
              <div className="mb-2 text-[#d4ff00]">Bypassing perimeter defenses [OK]</div>
              <div className="mb-2 text-[#d4ff00]">Injecting root payload [OK]</div>
              <div className="mb-2 animate-pulse">Extracting local network data...</div>
            </div>
            <div className="w-full h-[1px] bg-red-500/30 my-4" />
            <div className="text-[14px] tracking-widest text-red-500 self-start animate-pulse">
              ANALYZING NODE...
            </div>
          </div>
        )}

        {/* Stage 2: The Reveal Text */}
        {stage === 2 && (
          <div className="transition-opacity duration-500 opacity-100 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            
            <div className="text-[12px] tracking-[0.5em] text-red-500/60 uppercase mb-6 animate-pulse text-center">
              // CONNECTION TRACED
            </div>
            
            <h1 
              className="font-mono font-bold text-4xl sm:text-5xl md:text-7xl leading-tight mb-6 md:mb-10 tracking-[0.1em] text-red-500 uppercase relative inline-block text-center"
              style={{ animation: 'textGlitch 0.2s infinite' }}
            >
              YOU GOT
              <br />
              HACKED
            </h1>
            
            {/* IP Address Box */}
            <div className="border border-red-500/30 bg-black/80 p-5 md:p-8 w-full max-w-[90vw] sm:max-w-[550px] relative mb-8 md:mb-10 mx-auto">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500" />
              
              <div className="text-[9px] md:text-[10px] tracking-widest text-red-500/40 uppercase mb-4 md:mb-6 flex justify-between">
                <span>TARGET IDENTIFIED</span>
                <span className="animate-pulse">🔴 LIVE</span>
              </div>
              
              <div className="space-y-4 text-left font-mono break-all">
                <div>
                  <span className="text-red-500/40 text-[9px] md:text-[10px] block mb-1">IP ADDRESS:</span>
                  <span className="text-lg md:text-2xl text-red-500 tracking-wider shadow-red-500/50 drop-shadow-md">
                    {ipData.ip || 'FETCHING...'}
                  </span>
                </div>
                <div>
                  <span className="text-red-500/40 text-[9px] md:text-[10px] block mb-1">GEO-COORDINATES:</span>
                  <span className="text-xs md:text-sm text-white/60 tracking-widest block mb-1 break-words">
                    LAT: {ipData.lat?.toFixed(4)} // LON: {ipData.lon?.toFixed(4)}
                  </span>
                  <span className="text-red-500/40 text-[9px] md:text-[10px] block mt-3 mb-1">PHYSICAL LOCATION:</span>
                  <span className="text-sm md:text-lg text-white/80 tracking-widest">
                    {ipData.city ? `${ipData.city}, ${ipData.region}, ${ipData.country}` : 'TRIANGULATING...'}
                  </span>
                </div>
                <div className="pt-4 border-t border-red-500/20">
                  <span className="text-red-500/40 text-[9px] md:text-[10px] block mb-1">SYSTEM STATUS:</span>
                  <span className="text-base md:text-lg text-red-500 tracking-widest" style={{ animation: 'fastBlink 0.1s infinite' }}>
                    COMPROMISED
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-white/40 uppercase leading-loose max-w-[90vw] md:max-w-[500px] text-center">
              Your digital footprint has been permanently logged. 
              <br/>
              <span className="text-red-500 mt-2 block">The transaction is irreversible.</span>
            </div>

          </div>
        )}

      </div>

      {/* Decorative Warning Banners */}
      <div className="absolute top-8 left-0 w-full h-[30px] bg-red-600/20 flex items-center overflow-hidden border-y border-red-500/50">
        <div className="whitespace-nowrap animate-[sliceMove1_10s_linear_infinite] text-[12px] font-bold tracking-[0.5em] text-red-500 uppercase flex gap-8">
          <span>WARNING: SYSTEM BREACH</span>
          <span>DATA EXFILTRATION IN PROGRESS</span>
          <span>WARNING: SYSTEM BREACH</span>
          <span>DATA EXFILTRATION IN PROGRESS</span>
          <span>WARNING: SYSTEM BREACH</span>
          <span>DATA EXFILTRATION IN PROGRESS</span>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 w-full h-[30px] bg-red-600/20 flex items-center overflow-hidden border-y border-red-500/50">
        <div className="whitespace-nowrap animate-[sliceMove2_10s_linear_infinite] text-[12px] font-bold tracking-[0.5em] text-red-500 uppercase flex gap-8">
          <span>IDENTITY COMPROMISED</span>
          <span>ALL SECRETS LOGGED</span>
          <span>IDENTITY COMPROMISED</span>
          <span>ALL SECRETS LOGGED</span>
          <span>IDENTITY COMPROMISED</span>
          <span>ALL SECRETS LOGGED</span>
        </div>
      </div>
    </section>
  );
};

export default EndScreen;
