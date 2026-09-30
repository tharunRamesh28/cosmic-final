import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { CursorGrid } from './CursorGrid';
import heroVideo from '../assets/hero-product-scroll.mp4';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
  isDarkTheme?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onExploreWork,
  isDarkTheme = false,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Setup video metadata & pause autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.pause();

    const handleLoaded = () => {
      video.currentTime = 0.001;
    };

    const handleEnded = () => {
      // Pin to final frame, do not loop or reset to start
      if (video.duration) {
        video.currentTime = Math.max(0, video.duration - 0.05);
      }
    };

    if (video.readyState >= 1) {
      handleLoaded();
    } else {
      video.addEventListener('loadedmetadata', handleLoaded);
    }
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // WebGL GPU Shader for 100% Background Removal (Zero CPU overhead, 60fps/120fps):
  // Eliminates both light-grey and white checkerboard squares entirely, leaving ONLY the device.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Initialize WebGL with alpha enabled
    const gl = (canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false })) as WebGLRenderingContext | null;

    if (!gl) {
      // Fallback to 2D context if WebGL is unavailable
      const ctx = canvas.getContext('2d');
      const fallbackRender = () => {
        if (video.readyState >= 2 && video.videoWidth > 0) {
          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0);
          }
        }
      };
      video.addEventListener('seeked', fallbackRender);
      video.addEventListener('timeupdate', fallbackRender);
      return () => {
        video.removeEventListener('seeked', fallbackRender);
        video.removeEventListener('timeupdate', fallbackRender);
      };
    }

    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        // Flip Y for WebGL texture orientation
        v_texCoord = vec2(a_texCoord.x, 1.0 - a_texCoord.y);
      }
    `;

    // Precision fragment shader:
    // Identifies checkerboard / bright neutral background pixels (both white and light-grey squares)
    // and keys them out completely to transparent (alpha = 0.0) with a smooth edge transition.
    const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;

      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        
        // Measure color neutrality and brightness
        float maxVal = max(color.r, max(color.g, color.b));
        float minVal = min(color.r, min(color.g, color.b));
        float delta = maxVal - minVal;
        float brightness = (color.r + color.g + color.b) / 3.0;

        // Background checkerboard squares are neutral grey (delta < 0.06) and bright (brightness > 0.82)
        if (delta < 0.07 && brightness > 0.81) {
          // Smooth edge falloff
          if (brightness > 0.90) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          } else {
            float alpha = (0.90 - brightness) / 0.09;
            gl_FragColor = vec4(color.rgb, clamp(alpha, 0.0, 1.0) * color.a);
          }
        } else {
          gl_FragColor = color;
        }
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Quad geometry
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let renderScheduled = false;

    const renderGL = () => {
      renderScheduled = false;
      if (!video || video.readyState < 2 || video.videoWidth === 0) return;

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const triggerRender = () => {
      if (!renderScheduled) {
        renderScheduled = true;
        requestAnimationFrame(renderGL);
      }
    };

    video.addEventListener('seeked', triggerRender);
    video.addEventListener('timeupdate', triggerRender);
    video.addEventListener('loadeddata', triggerRender);

    triggerRender();

    return () => {
      video.removeEventListener('seeked', triggerRender);
      video.removeEventListener('timeupdate', triggerRender);
      video.removeEventListener('loadeddata', triggerRender);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(texCoordBuffer);
        gl.deleteTexture(texture);
      }
    };
  }, []);

  // Ref-based smooth scroll synchronization architecture:
  // scrollProgress -> targetTime -> requestAnimationFrame -> video.currentTime
  // Prevents React re-renders on scroll and avoids seeking stutter with threshold checks
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number | null = null;
    let targetTime = 0;
    let lastRenderedTime = -1;
    let isSeeking = false;

    // Fast-seek listener to unblock pipeline
    const handleSeeked = () => {
      isSeeking = false;
    };
    video.addEventListener('seeked', handleSeeked);

    // Single rAF update loop
    const updateVideoFrame = () => {
      animationFrameId = null;

      if (!video || !video.duration || isNaN(video.duration)) {
        return;
      }

      // Small threshold (0.018s ~ 1 frame at 60fps) prevents decoding stutter on negligible scroll changes
      const diff = Math.abs(video.currentTime - targetTime);
      if (diff > 0.018 && !isSeeking) {
        isSeeking = true;
        try {
          if ('fastSeek' in video) {
            (video as any).fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        } catch {
          video.currentTime = targetTime;
        }
      }

      // Smoothly update top text fade & translation without triggering React re-renders on every pixel
      if (Math.abs(targetTime - lastRenderedTime) > 0.01) {
        lastRenderedTime = targetTime;
        const rawProgress = targetTime / Math.max(0.001, video.duration - 0.05);
        const progress = Math.max(0, Math.min(1, rawProgress));
        setScrollProgress(progress);
      }
    };

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const totalScrollableDistance = trackRef.current.offsetHeight - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      if (video.duration && !isNaN(video.duration)) {
        const finalTime = Math.max(0, video.duration - 0.05);
        if (clampedProgress >= 0.995) {
          targetTime = finalTime;
        } else {
          targetTime = Math.max(0.001, clampedProgress * finalTime);
        }

        // Schedule single rAF update if none pending
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(updateVideoFrame);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('seeked', handleSeeked);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // 1. HERO CONTENT FADE TIMING:
  // Continuously reduce text intensity (opacity) starting from the beginning of scroll
  // Reaches opacity 0 by 55% scroll, completely hidden thereafter
  const heroOpacity = Math.max(0, 1 - scrollProgress / 0.55);
  const heroTranslateY = -((1 - heroOpacity) * 40);
  const isHeroVisible = heroOpacity > 0;

  // 2. VIDEO POSITION & MOVEMENT TIMING:
  // - Starts slightly lower down near the buttons with comfortable clearance
  // - Smoothly moves up into center stage as user scrolls
  // - Reaches full center stage by 60% scroll and remains centered through 100%
  const moveUpRatio = Math.min(1, Math.max(0, scrollProgress / 0.60));
  // Initial position is +45px (lower down near buttons), gliding up to -140px (centered)
  const videoTranslateY = 45 - (moveUpRatio * 185);

  const engineeringDisciplines = [
    'CAD',
    'Embedded Systems',
    'IoT',
    'Full-Stack Software',
    'Cloud',
    'AI',
    'TinyML',
  ];

  return (
    <div
      ref={trackRef}
      id="hero-scroll-track"
      className="relative w-full text-[#191c1b] selection:bg-[#c8f179] selection:text-[#000000]"
      style={{
        // 280vh provides optimal scroll travel for the 10s video scrubbing and smooth transition
        height: '280vh',
      }}
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="tech-grid absolute inset-0 opacity-40" />
        <CursorGrid color="0, 0, 0" maxOpacity={0.25} />
      </div>

      {/* Sticky Full-Viewport Stage: Positioned higher up with clean responsive padding */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-12 pb-4 z-10 overflow-visible">

        {/*
          TOP HERO CONTENT:
          - Intensity reduces continuously from the start of scroll
          - Fully hidden once it reaches 0 opacity
        */}
        <div
          className="w-full max-w-[1240px] mx-auto text-center flex flex-col items-center justify-start z-20 shrink-0 transition-opacity duration-75 ease-out"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px)`,
            visibility: isHeroVisible ? 'visible' : 'hidden',
            pointerEvents: heroOpacity > 0.15 ? 'auto' : 'none',
          }}
        >
          {/* Eyebrow Status Badge */}
          <div className="inline-flex items-center gap-2 border border-[#c4c7c7] px-3.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-xs shadow-xs mb-2 md:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#c8f179] animate-pulse shadow-[0_0_8px_#c8f179]" />
            <span className="font-mono-tech text-[10px] sm:text-[11px] md:text-xs text-[#444748] uppercase tracking-wider font-semibold">
              End-to-End Product Engineering Studio
            </span>
          </div>

          {/* Main Headline: MAKE YOUR IDEA above INTO A PRODUCT. */}
          <h1
            id="hero-title"
            className="font-display-tech text-3xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.08] font-bold text-[#000000] tracking-tight max-w-5xl"
          >
            <div>MAKE YOUR IDEA</div>
            <div className="mt-1">
              INTO A{' '}
              <span className="text-[#476800] bg-[#daf396] px-3.5 py-0.5 rounded-sm inline-block font-extrabold shadow-2xs">
                PRODUCT.
              </span>
            </div>
          </h1>

          {/* Core Message */}
          <p className="font-display-tech text-xs sm:text-sm md:text-base text-[#444748] max-w-2xl mt-2 leading-relaxed font-normal">
            We don&apos;t just build projects or ordinary websites. We engineer complete technology systems and products from concept to mass production.
          </p>

          {/* Engineering Disciplines */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 max-w-3xl">
            {engineeringDisciplines.map((item) => (
              <span
                key={item}
                className="font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffffff] border border-[#c4c7c7]/70 text-[#2e312f] shadow-2xs font-medium flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-[#476800]" />
                {item}
              </span>
            ))}
          </div>

          {/* Centered Single Action Button: Start a Project (in the middle, explore work removed) */}
          <div
            className="flex items-center justify-center"
            style={{ marginTop: 'calc(0.875rem + 3cm)' }}
          >
            <button
              onClick={onStartProject}
              id="hero-start-project-btn"
              className="cosmic-project-btn"
            >
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Start a Project</span>
            </button>
          </div>
        </div>

        {/*
          HARDWARE-ACCELERATED TRANSPARENT FOREGROUND VIDEO (WEBGL SHADER):
          - WebGL shader strips both white and light-grey faux checkerboard tiles on GPU (zero CPU lag)
          - Transparent canvas blends directly into the #f9faf7 background and subtle grid
          - Zero seek decoding stutter, smooth 60fps/120fps scrubbing
          - Fully responsive and NEVER clipped at top, bottom, or sides
        */}
        <div className="relative w-full max-w-[1100px] mx-auto flex-1 flex items-center justify-center bg-transparent z-10 min-h-0 overflow-visible">
          {/* Hidden video element feeding frames directly to the WebGL GPU shader */}
          <video
            ref={videoRef}
            src={heroVideo}
            muted
            playsInline
            preload="auto"
            className="hidden"
          />

          <div
            className="relative w-full flex items-center justify-center bg-transparent will-change-transform"
            style={{
              transform: `translate3d(0, ${videoTranslateY}px, 0)`,
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-auto max-h-[60vh] sm:max-h-[66vh] md:max-h-[70vh] object-contain select-none pointer-events-none bg-transparent"
              style={{
                aspectRatio: '848 / 478',
                backgroundColor: 'transparent',
              }}
            />
          </div>
        </div>

        {/* Subtle Scroll Cue at the bottom */}
        <div
          className="w-full text-center flex items-center justify-center gap-2 font-mono-tech text-[10px] text-[#444748] tracking-widest uppercase transition-opacity duration-300 pointer-events-none py-1"
          style={{
            opacity: scrollProgress < 0.08 ? 1 : 0,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#476800] animate-bounce" />
          <span>Scroll to explore product engineering</span>
        </div>

      </div>
    </div>
  );
};
