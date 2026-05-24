"use client";

import { useState, useEffect } from "react";

export default function HeroLoopAnimation() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Load video only after page is fully loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
      {/* Fast loading fallback image - shows instantly */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
      />
      
      {/* Video loads in background, replaces image when ready */}
      {videoLoaded && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fade-in"
          onCanPlay={(e) => e.currentTarget.classList.add('opacity-100')}
        >
          <source src="/images/hero-animation.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}