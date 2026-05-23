import React, { useEffect, useRef, useState } from 'react';

interface HoverMaskRevealProps {
  baseImage?: string;
  revealImage?: string;
  baseImageSrc?: string;
  hoverImageSrc?: string;
  strength?: number;
  radius?: number;
  tail?: number;
  fluidity?: number;
  className?: string;
}

type TextureSet = {
  base: WebGLTexture;
  reveal: WebGLTexture;
  mask: WebGLTexture;
};

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform sampler2D u_base;
  uniform sampler2D u_reveal;
  uniform sampler2D u_mask;
  uniform float u_time;
  uniform float u_strength;
  uniform float u_fluidity;
  varying vec2 v_uv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 liquid = vec2(
      fbm(v_uv * (7.5 + u_fluidity * 5.0) + vec2(u_time * 0.18, 0.0)),
      fbm(v_uv * (8.5 + u_fluidity * 4.0) + vec2(0.0, -u_time * 0.16))
    ) - 0.5;

    vec2 maskUv = v_uv + liquid * 0.028 * u_fluidity;
    float rawMask = texture2D(u_mask, maskUv).r;
    float mask = smoothstep(0.12, 0.58, rawMask);
    float edge = smoothstep(0.12, 0.48, rawMask) - smoothstep(0.5, 0.82, rawMask);
    vec4 baseColor = texture2D(u_base, v_uv);
    vec4 revealColor = texture2D(u_reveal, v_uv);

    float edgeShade = edge * 0.04 * u_strength;
    vec3 color = mix(baseColor.rgb, revealColor.rgb - edgeShade, mask);
    float alpha = max(baseColor.a, revealColor.a * mask);

    gl_FragColor = vec4(color, alpha);
  }
`;

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  image.src = src;
});

const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const createProgram = (gl: WebGLRenderingContext) => {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
};

const createTexture = (gl: WebGLRenderingContext) => {
  const texture = gl.createTexture();
  if (!texture) return null;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  return texture;
};

const drawResponsiveHeroImage = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) => {
  context.clearRect(0, 0, width, height);

  const isPhonePortrait = width / height < 0.75;
  const scale = isPhonePortrait
    ? Math.max(width / image.naturalWidth, height / image.naturalHeight)
    : Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const drawX = (width - drawWidth) * 0.5;
  const drawY = isPhonePortrait ? 0 : height - drawHeight;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
};

const createPaintCanvas = () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: false });

  return { canvas, context };
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const HoverMaskReveal: React.FC<HoverMaskRevealProps> = ({
  baseImage,
  revealImage,
  baseImageSrc = '/base_hacker.png',
  hoverImageSrc = '/hover_hacker.png',
  strength = 0.85,
  radius = 135,
  tail = 0.91,
  fluidity = 0.9,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef(createPaintCanvas());
  const baseRef = useRef(createPaintCanvas());
  const revealRef = useRef(createPaintCanvas());
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.48, px: 0.5, py: 0.48, active: false, moved: false });
  const reducedMotionRef = useRef(false);
  const [fallback, setFallback] = useState(false);

  const resolvedBaseImage = baseImage || baseImageSrc;
  const resolvedRevealImage = revealImage || hoverImageSrc;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = media.matches;

    const updateMotionPreference = () => {
      reducedMotionRef.current = media.matches;
    };

    media.addEventListener('change', updateMotionPreference);
    return () => media.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const maskContext = maskRef.current.context;
    const baseContext = baseRef.current.context;
    const revealContext = revealRef.current.context;

    if (!canvas || !container || !maskContext || !baseContext || !revealContext) {
      setFallback(true);
      return;
    }

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!gl) {
      setFallback(true);
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      setFallback(true);
      return;
    }

    const buffer = gl.createBuffer();
    const textures: TextureSet | null = (() => {
      const baseTexture = createTexture(gl);
      const revealTexture = createTexture(gl);
      const maskTexture = createTexture(gl);

      if (!baseTexture || !revealTexture || !maskTexture) return null;
      return { base: baseTexture, reveal: revealTexture, mask: maskTexture };
    })();

    if (!buffer || !textures) {
      setFallback(true);
      return;
    }

    let disposed = false;
    let width = 0;
    let height = 0;
    let baseImageElement: HTMLImageElement | null = null;
    let revealImageElement: HTMLImageElement | null = null;

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const baseLocation = gl.getUniformLocation(program, 'u_base');
    const revealLocation = gl.getUniformLocation(program, 'u_reveal');
    const maskLocation = gl.getUniformLocation(program, 'u_mask');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const strengthLocation = gl.getUniformLocation(program, 'u_strength');
    const fluidityLocation = gl.getUniformLocation(program, 'u_fluidity');

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const uploadTexture = (texture: WebGLTexture, source: TexImageSource) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    };

    const paintSplat = (x: number, y: number, size: number, alpha: number) => {
      const pixelX = x * width;
      const pixelY = y * height;
      const scaledSize = size * Math.min(width, height) / 900;

      maskContext.globalCompositeOperation = 'lighter';

      for (let index = 0; index < 4; index += 1) {
        const wobble = index === 0 ? 0 : scaledSize * (0.12 + index * 0.055);
        const angle = (performance.now() * 0.002 + index * 2.18) % (Math.PI * 2);
        const cx = pixelX + Math.cos(angle) * wobble * fluidity;
        const cy = pixelY + Math.sin(angle) * wobble * fluidity;
        const blobSize = scaledSize * (index === 0 ? 1 : 0.42 - index * 0.055);
        const gradient = maskContext.createRadialGradient(cx, cy, 0, cx, cy, blobSize);

        gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
        gradient.addColorStop(0.38, `rgba(255,255,255,${alpha * 0.72})`);
        gradient.addColorStop(0.72, `rgba(255,255,255,${alpha * 0.18})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        maskContext.fillStyle = gradient;
        maskContext.beginPath();
        maskContext.arc(cx, cy, blobSize, 0, Math.PI * 2);
        maskContext.fill();
      }

      maskContext.globalCompositeOperation = 'source-over';
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);

      width = Math.max(2, Math.floor(rect.width * dpr));
      height = Math.max(2, Math.floor(rect.height * dpr));

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      [maskRef.current.canvas, baseRef.current.canvas, revealRef.current.canvas].forEach((paintCanvas) => {
        paintCanvas.width = width;
        paintCanvas.height = height;
      });

      maskContext.setTransform(1, 0, 0, 1, 0, 0);
      maskContext.fillStyle = 'black';
      maskContext.fillRect(0, 0, width, height);

      if (baseImageElement && revealImageElement) {
        drawResponsiveHeroImage(baseContext, baseImageElement, width, height);
        drawResponsiveHeroImage(revealContext, revealImageElement, width, height);
        uploadTexture(textures.base, baseRef.current.canvas);
        uploadTexture(textures.reveal, revealRef.current.canvas);
        uploadTexture(textures.mask, maskRef.current.canvas);
      }

      gl.viewport(0, 0, width, height);
    };

    const render = (time: number) => {
      if (disposed) return;

      const decay = reducedMotionRef.current ? 1 : clamp(1 - tail, 0.025, 0.22);
      maskContext.globalCompositeOperation = 'source-over';
      maskContext.fillStyle = `rgba(0,0,0,${decay})`;
      maskContext.fillRect(0, 0, width, height);

      if (reducedMotionRef.current) {
        paintSplat(0.5, 0.48, radius * 1.1, 0.78);
      } else if (pointerRef.current.active || pointerRef.current.moved) {
        const current = pointerRef.current;
        const distance = Math.hypot(current.x - current.px, current.y - current.py);
        const steps = Math.max(1, Math.ceil(distance * 70));

        for (let index = 0; index < steps; index += 1) {
          const amount = steps === 1 ? 1 : index / (steps - 1);
          const x = current.px + (current.x - current.px) * amount;
          const y = current.py + (current.y - current.py) * amount;
          const velocityBoost = clamp(distance * 24, 0, 0.65);

          paintSplat(x, y, radius * (1 + velocityBoost), 0.5 + velocityBoost * 0.35);
        }

        current.px = current.x;
        current.py = current.y;
      }

      uploadTexture(textures.mask, maskRef.current.canvas);

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures.base);
      gl.uniform1i(baseLocation, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures.reveal);
      gl.uniform1i(revealLocation, 1);

      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, textures.mask);
      gl.uniform1i(maskLocation, 2);

      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform1f(strengthLocation, strength);
      gl.uniform1f(fluidityLocation, reducedMotionRef.current ? 0.12 : fluidity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = window.requestAnimationFrame(render);
    };

    const setup = async () => {
      try {
        const [loadedBase, loadedReveal] = await Promise.all([
          loadImage(resolvedBaseImage),
          loadImage(resolvedRevealImage),
        ]);

        if (disposed) return;

        baseImageElement = loadedBase;
        revealImageElement = loadedReveal;
        resize();
        setFallback(false);
        rafRef.current = window.requestAnimationFrame(render);
      } catch (error) {
        console.error(error);
        setFallback(true);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    void setup();

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.cancelAnimationFrame(rafRef.current);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(textures.base);
      gl.deleteTexture(textures.reveal);
      gl.deleteTexture(textures.mask);
      gl.deleteProgram(program);
    };
  }, [resolvedBaseImage, resolvedRevealImage, radius, strength, tail, fluidity]);

  const updatePointer = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((clientY - rect.top) / rect.height, 0, 1);

    pointerRef.current.active = true;
    pointerRef.current.moved = true;
    pointerRef.current.x = x;
    pointerRef.current.y = y;
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={(event) => updatePointer(event.clientX, event.clientY)}
      onPointerMove={(event) => updatePointer(event.clientX, event.clientY)}
      onPointerLeave={() => {
        pointerRef.current.active = false;
      }}
      className={`relative w-full h-full overflow-visible select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {fallback && (
        <>
          <img
            src={resolvedBaseImage}
            alt="Hacker Portrait Base"
            className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none"
            draggable="false"
          />
          <img
            src={resolvedRevealImage}
            alt="Hacker Portrait Hover Reveal"
            className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
            draggable="false"
          />
        </>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-label="Interactive hacker portrait reveal"
      />
    </div>
  );
};

export default HoverMaskReveal;
