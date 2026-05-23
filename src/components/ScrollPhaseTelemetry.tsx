import { useEffect, useMemo, useState } from 'react';

const PHASES = [
  { id: 'core_sys', code: '00', label: 'CORE_SYS' },
  { id: 'identity', code: '01', label: 'IDENTITY' },
  { id: 'archives', code: '02', label: 'ARCHIVES' },
  { id: 'protocols', code: '03', label: 'PROTOCOLS' },
  { id: 'sys_logs', code: '04', label: 'SYS_LOGS' },
  { id: 'transmit', code: '05', label: 'TRANSMIT' },
  { id: 'finale', code: '06', label: 'FINALE' },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const ScrollPhaseTelemetry = () => {
  const [state, setState] = useState({
    progress: 0,
    activeIndex: 0,
    velocity: 0,
  });

  const markers = useMemo(() => PHASES.map((phase, index) => ({
    ...phase,
    top: `${(index / (PHASES.length - 1)) * 100}%`,
  })), []);

  useEffect(() => {
    let frameId = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const update = () => {
      const now = performance.now();
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;
      const velocity = Math.min(1, Math.abs(window.scrollY - lastY) / Math.max(16, now - lastTime) / 3);
      const viewportAnchor = window.innerHeight * 0.45;

      let activeIndex = 0;
      let closest = Number.POSITIVE_INFINITY;

      PHASES.forEach((phase, index) => {
        const element = document.getElementById(phase.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportAnchor);

        if (rect.top <= viewportAnchor && distance < closest) {
          closest = distance;
          activeIndex = index;
        }
      });

      setState({ progress, activeIndex, velocity });
      lastY = window.scrollY;
      lastTime = now;
    };

    const schedule = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const activePhase = PHASES[state.activeIndex];
  const progressPercent = Math.round(state.progress * 100);

  return (
    <div className="pointer-events-none fixed inset-0 z-[45] hidden md:block">
      <div
        className="absolute right-6 top-1/2 h-[46vh] w-px -translate-y-1/2 bg-white/10"
        style={{ boxShadow: `0 0 ${12 + state.velocity * 38}px rgba(212,255,0,${0.12 + state.velocity * 0.22})` }}
      >
        <div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[#d4ff00] shadow-[0_0_12px_#d4ff00] transition-[height] duration-200"
          style={{ height: `${state.progress * 100}%` }}
        />

        {markers.map((marker, index) => {
          const isActive = index === state.activeIndex;

          return (
            <div
              key={marker.id}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: marker.top }}
            >
              <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'bg-[#d4ff00] shadow-[0_0_12px_#d4ff00] scale-[2.1]' : 'bg-white/25'
              }`} />
            </div>
          );
        })}
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 origin-right whitespace-nowrap font-mono text-[8px] tracking-[0.35em] text-[#d4ff00]/80">
        PHASE {activePhase.code} // {activePhase.label} // {progressPercent}%
      </div>

      <div
        className="absolute left-0 right-0 top-[calc(50%-1px)] h-px bg-gradient-to-r from-transparent via-[#d4ff00]/30 to-transparent opacity-0 transition-opacity duration-200"
        style={{
          opacity: state.velocity * 0.9,
          transform: `translateY(${(state.progress - 0.5) * 80}px)`,
        }}
      />
    </div>
  );
};

export default ScrollPhaseTelemetry;
