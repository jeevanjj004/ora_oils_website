"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 240;
const FPS = 30;

export default function HeroLoopAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Preload frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkLoadComplete = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
      setLoadingProgress(progress);

      if (loadedCount === FRAME_COUNT) {
        setImages(loadedImages);
        setTimeout(() => {
          setIsLoaded(true);
        }, 800);
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/images/hero-loop/frame-${i.toString().padStart(3, "0")}.webp`;
      img.onload = checkLoadComplete;
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        checkLoadComplete();
      };
      loadedImages.push(img);
    }
  }, []);

  // Frame rendering
  useEffect(() => {
    if (images.length !== FRAME_COUNT || !isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let currentFrame = 0;
    const frameInterval = 1000 / FPS;
    let accumulator = 0;
    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      if (!canvas) return;
      
      // Get the parent section dimensions
      const parent = canvas.parentElement;
      if (!parent) return;
      
      // Set canvas size to exactly match parent
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Force a render after resize
      if (images[currentFrame]) {
        renderFrame(currentFrame);
      }
    };

    const renderFrame = (frameIndex: number) => {
      const img = images[frameIndex % FRAME_COUNT];
      if (!img || !img.complete || !canvas || !ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      if (canvasWidth === 0 || canvasHeight === 0) return;

      const imgWidth = img.width;
      const imgHeight = img.height;
      
      // Calculate aspect ratios
      const canvasAspect = canvasWidth / canvasHeight;
      const imgAspect = imgWidth / imgHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      // Cover behavior - fill entire canvas
      if (canvasAspect > imgAspect) {
        drawHeight = canvasWidth / imgAspect;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgAspect;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };

    const updateLoop = (now: number) => {
      const elapsed = now - lastTime;
      lastTime = now;
      
      accumulator += elapsed;

      while (accumulator >= frameInterval) {
        currentFrame = (currentFrame + 1) % FRAME_COUNT;
        accumulator -= frameInterval;
      }

      renderFrame(currentFrame);
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    // Initial resize
    setTimeout(() => resizeCanvas(), 100);
    
    // Use ResizeObserver for better responsiveness
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, [images, isLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden select-none">
      
      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-deep-green)] text-white px-4"
          >
            <div className="flex flex-col items-center max-w-sm w-full">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 text-[var(--color-warm-cream)] font-light"
              >
                O R A
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[var(--color-soft-gold)] mb-8 sm:mb-12 font-light text-center"
              >
                Pure Coconut. Pure Care.
              </motion.p>
              
              <div className="w-full max-w-[280px] sm:max-w-sm h-[1px] bg-white/10 relative overflow-hidden mb-3">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-[var(--color-soft-gold)] shadow-[0_0_8px_var(--color-soft-gold)]"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
              
              <div className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase font-light text-white/40">
                Preloading Experience {loadingProgress}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ 
          willChange: "transform",
          transform: "translateZ(0)",
          objectFit: "cover"
        }}
      />

      {/* Vignette Overlay - Lighter on mobile */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)"
        }}
      />

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-green)]/40 via-black/5 to-transparent pointer-events-none" />
    </div>
  );
}