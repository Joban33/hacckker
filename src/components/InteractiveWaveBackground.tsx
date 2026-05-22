import React, { useEffect, useRef } from 'react';

// Seeded 2D Simplex Noise Generator
function createNoise2D(seed = 0.5) {
  const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  const G22 = (3.0 - Math.sqrt(3.0)) / 3.0;
  
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  
  const random = (x: number) => {
    const n = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453;
    return n - Math.floor(n);
  };
  
  for (let i = 255; i > 0; i--) {
    const r = Math.floor((i + 1) * random(i));
    const temp = p[i];
    p[i] = p[r];
    p[r] = temp;
  }
  
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  
  const grad3 = new Float64Array([
    1, 1, -1, 1, 1, -1, -1, -1,
    1, 0, -1, 0, 1, 0, -1, 0,
    0, 1, 0, -1, 0, 1, 0, -1
  ]);
  
  return function noise2D(xin: number, yin: number) {
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s) | 0;
    const j = Math.floor(yin + s) | 0;
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    
    let i1, j1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }
    
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + G22;
    const y2 = y0 - 1.0 + G22;
    
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = permMod12[ii + perm[jj]];
    const gi1 = permMod12[ii + i1 + perm[jj + j1]];
    const gi2 = permMod12[ii + 1 + perm[jj + 1]];
    
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    let n0 = 0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * (grad3[gi0 * 2] * x0 + grad3[gi0 * 2 + 1] * y0);
    }
    
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    let n1 = 0;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * (grad3[gi1 * 2] * x1 + grad3[gi1 * 2 + 1] * y1);
    }
    
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    let n2 = 0;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * (grad3[gi2 * 2] * x2 + grad3[gi2 * 2 + 1] * y2);
    }
    
    return 70.0 * (n0 + n1 + n2);
  };
}

interface WavePoint {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}

interface InteractiveWaveBackgroundProps {
  strokeColor?: string;
  backgroundColor?: string;
  waveSpeed?: number;
  waveAmplitude?: number;
  mouseInfluence?: number;
  lineSpacing?: number;
  seed?: number;
  resolution?: number;
  preview?: boolean;
}

export const InteractiveWaveBackground: React.FC<InteractiveWaveBackgroundProps> = ({
  strokeColor = '#1ac91d',
  backgroundColor = 'transparent',
  waveSpeed = 0.9,
  waveAmplitude = 0.6,
  mouseInfluence = 1.0,
  lineSpacing = 0.8,
  seed = 0.5,
  resolution = 0.7,
  preview = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isIntersectingRef = useRef(true);
  
  // Mouse position tracking
  const mouseState = useRef({
    x: -200,
    y: -200,
    lx: -200,
    ly: -200,
    sx: -200,
    sy: -200,
    v: 0,
    vs: 0,
    a: 0,
    set: false
  });
  
  const pathsRef = useRef<SVGPathElement[]>([]);
  const pointsRef = useRef<WavePoint[][]>([]);
  const noise2DRef = useRef<(xin: number, yin: number) => number>(createNoise2D(seed));
  const rafIdRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  // Re-initialize noise when seed changes
  useEffect(() => {
    noise2DRef.current = createNoise2D(seed);
  }, [seed]);

  // Set up resize observer and intersection observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      
      if (width === sizeRef.current.width && height === sizeRef.current.height) return;
      sizeRef.current = { width, height };

      // Initialize grid
      const colSpacing = 8 + (1 - lineSpacing) * 159;
      const rowSpacing = 4 + (1 - resolution) * 20;

      const expandedW = width + 200;
      const expandedH = height + 30;

      const cols = Math.ceil(expandedW / colSpacing);
      const rows = Math.ceil(expandedH / rowSpacing);

      const xOffset = (width - colSpacing * cols) / 2;
      const yOffset = (height - rowSpacing * rows) / 2;

      // Clear existing paths from SVG
      const svg = svgRef.current;
      if (svg) {
        svg.innerHTML = '';
      }
      pathsRef.current = [];
      pointsRef.current = [];

      for (let c = 0; c < cols; c++) {
        const columnPoints: WavePoint[] = [];
        for (let r = 0; r < rows; r++) {
          columnPoints.push({
            x: xOffset + colSpacing * c,
            y: yOffset + rowSpacing * r,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }
          });
        }
        pointsRef.current.push(columnPoints);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', strokeColor);
        path.setAttribute('stroke-width', '1');
        
        if (svg) {
          svg.appendChild(path);
        }
        pathsRef.current.push(path);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersectingRef.current = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    // Track mouse events globally
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const m = mouseState.current;
      m.x = e.clientX - rect.left;
      m.y = e.clientY - rect.top;

      if (!m.set) {
        m.sx = m.x;
        m.sy = m.y;
        m.lx = m.x;
        m.ly = m.y;
        m.set = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const m = mouseState.current;
        m.x = touch.clientX - rect.left;
        m.y = touch.clientY - rect.top;

        if (!m.set) {
          m.sx = m.x;
          m.sy = m.y;
          m.lx = m.x;
          m.ly = m.y;
          m.set = true;
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
    };
  }, [lineSpacing, resolution, strokeColor]);

  // Main animation frame loop
  useEffect(() => {
    const animate = (time: number) => {
      if (!isIntersectingRef.current && !preview) {
        rafIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const points = pointsRef.current;
      const paths = pathsRef.current;
      const m = mouseState.current;
      const noise = noise2DRef.current;

      // Smooth mouse coordinate tracking
      m.sx += (m.x - m.sx) * 0.1;
      m.sy += (m.y - m.sy) * 0.1;

      // Mouse velocity
      const dx = m.x - m.lx;
      const dy = m.y - m.ly;
      const vel = Math.hypot(dx, dy);
      m.v = vel;
      m.vs += (vel - m.vs) * 0.1;
      m.vs = Math.min(100, m.vs);
      m.lx = m.x;
      m.ly = m.y;

      const p = Math.max(175, m.vs); // Radius of influence expands with speed
      const speedTerm = waveSpeed * 0.002;
      const ampTerm = waveAmplitude;
      const influenceFactor = mouseInfluence * 0.0007;

      for (let c = 0; c < points.length; c++) {
        const col = points[c];
        const path = paths[c];
        if (!col || col.length < 2 || !path) continue;

        for (let r = 0; r < col.length; r++) {
          const pt = col[r];
          
          // Noise-based default wave movement
          const noiseVal = noise(pt.x * 0.003, pt.y * 0.002) * 8;
          const phase = noiseVal + time * speedTerm;
          pt.wave.x = Math.cos(phase) * 12 * ampTerm;
          pt.wave.y = Math.sin(phase) * 6 * ampTerm;

          // Mouse influence warp
          const distToMouseX = pt.x - m.sx;
          const distToMouseY = pt.y - m.sy;
          const dist = Math.hypot(distToMouseX, distToMouseY);

          if (dist < p) {
            const factor = 1.0 - dist / p;
            const force = Math.cos(dist * 0.001) * factor * p * m.vs * influenceFactor;
            const angle = Math.atan2(distToMouseY, distToMouseX);
            pt.cursor.vx += Math.cos(angle) * force;
            pt.cursor.vy += Math.sin(angle) * force;
          }

          // Spring physics back to original grid line
          pt.cursor.vx += -pt.cursor.x * 0.01;
          pt.cursor.vy += -pt.cursor.y * 0.01;
          pt.cursor.vx *= 0.95;
          pt.cursor.vy *= 0.95;
          pt.cursor.x += pt.cursor.vx;
          pt.cursor.y += pt.cursor.vy;

          // Clamp max warp displacement
          pt.cursor.x = Math.max(-50, Math.min(50, pt.cursor.x));
          pt.cursor.y = Math.max(-50, Math.min(50, pt.cursor.y));
        }

        // Draw SVG path representation
        const pathStr: string[] = [];
        // First point doesn't get cursor influence to pin line bounds nicely
        const p0 = col[0];
        pathStr.push(`M ${p0.x + p0.wave.x} ${p0.y + p0.wave.y}`);
        
        for (let r = 1; r < col.length; r++) {
          const pt = col[r];
          pathStr.push(`L ${pt.x + pt.wave.x + pt.cursor.x} ${pt.y + pt.wave.y + pt.cursor.y}`);
        }
        path.setAttribute('d', pathStr.join(''));
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [waveSpeed, waveAmplitude, mouseInfluence, preview]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor,
        position: 'absolute',
        zIndex: 10,
        inset: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none' // Don't block hover events of components on top
      }}
      className="select-none"
    >
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
};
export default InteractiveWaveBackground;
