"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroLoopAnimation() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoReady(true);
      setTimeout(() => setShowPreloader(false), 500);
    };

    video.addEventListener('canplaythrough', handleCanPlay);
    video.load();

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
      
      {/* Minimal Preloader Screen - Just ORA Text */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-deep-green)] to-[#06110B] text-white"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-[0.4em] text-[var(--color-warm-cream)] font-light"
            >
              O R A
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[var(--color-soft-gold)] mt-4 font-light"
            >
              Pure Coconut. Pure Care.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: showPreloader ? 0 : 1 }}
      >
        <source src="/images/hero-animation.mp4" type="video/mp4" />
      </video>

      {/* Fallback image while video loads */}
      {!isVideoReady && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
        />
      )}

      {/* Overlays */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-green)]/40 via-black/5 to-transparent pointer-events-none" />
    </div>
  );
}