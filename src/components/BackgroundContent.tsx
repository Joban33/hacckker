import React from 'react';

// Duplicate the reel enough times so translateX(-50%) lands on an identical copy
const WORDS = ['G.O.D', 'ANOMALOUS USER', 'DB COOKER'];
const REEL = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

export const BackgroundContent: React.FC = () => {
  return (
    // Full-viewport canvas — both layers positioned absolutely inside
    <div className="absolute inset-0 z-[35] hidden pointer-events-none select-none overflow-hidden md:block">

      {/* ───────────────────────────────────────────────────────────────
          LAYER 1 — Static faded background text
          "I USUALLY SIMPLY COOK"
          • Anchored to upper-third of viewport (~forehead level)
          • Static — zero movement
          • Low opacity, thin, atmospheric, distant
      ─────────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-0 w-full flex items-center justify-center"
        style={{ top: '50%' }}
      >
        <p
          className="
            font-mono
            text-[4vw] sm:text-[3.5vw] md:text-[2.6vw]
            leading-none
            tracking-[0.4em]
            text-[#d4ff00]
            opacity-80
            whitespace-nowrap
            text-center
          "
        >
          I USUALLY SIMPLY COOK
        </p>
      </div>

      {/* ───────────────────────────────────────────────────────────────
          LAYER 2 — Giant slow horizontal marquee
          "G.O.D • HACCKEER • DB COOKER"
          • Anchored to lower-third of viewport (~chest / torso level)
          • Continuous slow marquee scroll — 55 s per loop
          • Oversized, bold, dominant, overflows viewport edges
      ─────────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-0 w-full overflow-visible"
        style={{ top: '58%' }}
      >
        <div
          className="animate-marquee-slow"
          style={{ width: 'max-content' }}
        >
          {REEL.map((word, idx) => (
            <React.Fragment key={idx}>
              <span
                className="
                  font-geist
                  font-black
                  text-[13vw] sm:text-[12vw] md:text-[11vw]
                  leading-[0.82]
                  tracking-[0.08em]
                  text-white
                  opacity-100
                  uppercase
                  px-[1.3vw]
                "
              >
                {word}
              </span>
              {/* Matrix green bullet separator */}
              <span
                className="
                  inline-flex items-center
                  text-[7vw]
                  leading-none
                  text-zinc-800
                  opacity-50
                  px-[1vw]
                "
                aria-hidden="true"
              >
                •
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BackgroundContent;
