import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import Navi from './components/Navi';
import InteractiveWaveBackground from './components/InteractiveWaveBackground';
import BackgroundContent from './components/BackgroundContent';
import HoverMaskReveal from './components/HoverMaskReveal';
import SignalRecognition from './components/SignalRecognition';
import MemoryFragments from './components/MemoryFragments';
import DistortionChamber from './components/DistortionChamber';
import SystemDescent from './components/SystemDescent';
import FinalTransaction from './components/FinalTransaction';
import LoadingScreen from './components/LoadingScreen';
import EndScreen from './components/EndScreen';

// --- Placeholder for cursor blob if needed ---
const CursorBlob = () => {
  // A simple cursor blob, assuming it was a separate component or inline
  return (
    <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-[#d4ff00]/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen" />
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div 
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative w-full min-h-screen bg-black overflow-x-hidden text-white selection:bg-[#d4ff00]/30 selection:text-white"
          >
            {/* Global Grain Overlay (z-50) */}
            <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-30">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15]" />
            </div>

            <CursorBlob />
            
            {/* ─────────────────────────────────────────────────────────
                SECTION 1: HERO (Cinematic Portal)
            ───────────────────────────────────────────────────────── */}
            <section id="core_sys" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
              {/* 1. Header Navigation (z-40) */}
              <Navi />

              {/* 2. Interactive SVG Wave Grid Background (z-10) */}
              <InteractiveWaveBackground
                strokeColor="rgba(255, 255, 255, 0.08)"
                backgroundColor="transparent"
                waveSpeed={0.9}
                waveAmplitude={0.6}
                mouseInfluence={1.0}
                seed={0.5}
                resolution={0.7}
              />

              {/* 3. Scrolling Ambient Typography and Dividers (z-20) */}
              <BackgroundContent />

              {/* 4. Hacker Portrait overlapping text (z-30, free-floating, overflow-visible) */}
              <main className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-visible w-full px-4 md:px-0">
                <div className="h-[60vh] sm:h-[80vh] md:h-[88vh] w-full md:w-auto md:aspect-[16/9] pointer-events-auto overflow-visible flex items-center justify-center transform translate-y-[5vh] md:translate-y-[9vh]">
                  <HoverMaskReveal
                    baseImageSrc="/base_hacker.png"
                    hoverImageSrc="/hover_hacker.png"
                  />
                </div>
              </main>

              {/* Grid pattern overlay for ambient terminal aesthetics */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0 opacity-40" />

              {/* Scanline CRT overlay for hacking visual theme */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-50 opacity-15" />
            </section>

            {/* ─────────────────────────────────────────────────────────
                SECTION 2: SIGNAL RECOGNITION (Identity / About)
            ───────────────────────────────────────────────────────── */}
            <div id="identity">
              <SignalRecognition />
            </div>

            {/* ─────────────────────────────────────────────────────────
                SECTION 3: MEMORY FRAGMENTS (Archives / Projects)
            ───────────────────────────────────────────────────────── */}
            <div id="archives">
              <MemoryFragments />
            </div>

            {/* ─────────────────────────────────────────────────────────
                SECTION 4: DISTORTION CHAMBER (Protocols / Skills)
            ───────────────────────────────────────────────────────── */}
            <div id="protocols">
              <DistortionChamber />
            </div>

            {/* ─────────────────────────────────────────────────────────
                SECTION 5: SYSTEM DESCENT (Experience / Logs)
            ───────────────────────────────────────────────────────── */}
            <div id="sys_logs">
              <SystemDescent />
            </div>

            {/* ─────────────────────────────────────────────────────────
                SECTION 6: FINAL TRANSACTION (Contact)
            ───────────────────────────────────────────────────────── */}
            <div id="transmit">
              <FinalTransaction />
            </div>

            {/* ─────────────────────────────────────────────────────────
                SECTION 7: GRAND FINALE (End Screen)
            ───────────────────────────────────────────────────────── */}
            <div id="hacked">
              <EndScreen />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
