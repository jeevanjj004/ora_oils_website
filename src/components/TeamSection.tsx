"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { EnvelopeSimple, InstagramLogo } from "@phosphor-icons/react";
import FloatingParticles from "./FloatingParticles";

const MEMBERS = [
  {
    name: "Akhil",
    role: "CEO & Co-Founder",
    email: "mpk458001@gmail.com",
    instagram: "mr_haza_rd_",
    photo: "/images/team/akhil.webp",
    fallbackPhoto: "/images/team/akhil.png",  // Fallback to PNG if WebP fails
  },
  {
    name: "Asif",
    role: "CEO & Co-Founder",
    email: "asifputhenpurackal@gmail.com",
    instagram: "_a.zi_f_",
    photo: "/images/team/ansif.webp",
    fallbackPhoto: "/images/team/ansif.png",  // Fallback to PNG if WebP fails
  },
];

function TeamCard({ member, index }: { member: typeof MEMBERS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState(member.photo);

  // Reset image source when member changes
  useEffect(() => {
    setImgSrc(member.photo);
    setImageLoaded(false);
    setImageError(false);
  }, [member.photo]);

  const handleImageError = () => {
    if (!imageError) {
      setImgSrc(member.fallbackPhoto);
      setImageError(true);
      console.warn(`Failed to load image: ${member.photo}, using fallback`);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <div className="relative bg-gradient-to-br from-[#0A1A12] to-[#06110B] rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--color-soft-gold)]/15 transition-all duration-400 group-hover:border-[var(--color-soft-gold)]/35 h-full">

        {/* Photo area */}
        <div className="relative pt-5 sm:pt-6 md:pt-8 px-3 pb-2 sm:pb-3">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 mx-auto">
            
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#1a2e22] to-[#0a1a10] ring-1 ring-[var(--color-soft-gold)]/20 group-hover:ring-[var(--color-soft-gold)]/40 transition-all duration-400">
              {/* Loading Spinner */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a1a10]">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[var(--color-soft-gold)]/30 border-t-[var(--color-soft-gold)] animate-spin" />
                </div>
              )}
              
              {/* Image */}
              <img
                src={imgSrc}
                alt={member.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
                className={`w-full h-full object-cover object-top transition-all duration-700 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                } group-hover:scale-105`}
              />
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="px-2 pb-4 sm:pb-5 md:pb-6 text-center">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-light text-white">
            {member.name}
          </h3>
          
          <p className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[var(--color-soft-gold)]/60 font-medium mt-0.5 sm:mt-1">
            {member.role}
          </p>
          
          {/* Email */}
          <div className="flex items-center justify-center gap-1 mt-2 sm:mt-3">
            <EnvelopeSimple size={8} weight="fill" className="text-white/40 flex-shrink-0 sm:w-2.5 sm:h-2.5" />
            <a
              href={`mailto:${member.email}`}
              className="text-[7px] sm:text-[8px] md:text-[9px] text-white/40 hover:text-[var(--color-soft-gold)] transition-colors duration-300 truncate max-w-[100px] sm:max-w-[140px]"
              title={member.email}
            >
              {member.email}
            </a>
          </div>
          
          {/* Instagram */}
          <div className="flex items-center justify-center gap-1 mt-1 sm:mt-1.5">
            <InstagramLogo size={8} weight="fill" className="text-white/40 flex-shrink-0 sm:w-2.5 sm:h-2.5" />
            <a
              href={`https://instagram.com/${member.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[7px] sm:text-[8px] md:text-[9px] text-white/40 hover:text-[var(--color-soft-gold)] transition-colors duration-300"
            >
              @{member.instagram}
            </a>
          </div>
        </div>

        {/* Bottom line animation */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-gold)]/40 to-transparent group-hover:w-1/2 transition-all duration-500" />
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="team" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 bg-[#06110B] text-white relative overflow-hidden">

      <FloatingParticles />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-[var(--color-soft-gold)]/5 rounded-full blur-[70px] sm:blur-[90px] md:blur-[110px] lg:blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[120px] sm:w-[180px] md:w-[220px] lg:w-[280px] h-[120px] sm:h-[180px] md:h-[220px] lg:h-[280px] bg-[var(--color-deep-green)]/20 rounded-full blur-[50px] sm:blur-[70px] md:blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[100px] sm:w-[140px] md:w-[180px] lg:w-[240px] h-[100px] sm:h-[140px] md:h-[180px] lg:h-[240px] bg-[var(--color-soft-gold)]/3 rounded-full blur-[50px] sm:blur-[70px] md:blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 space-y-2 sm:space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-[var(--color-soft-gold)] font-medium block"
          >
            The Visionaries
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light"
          >
            Meet the <span className="italic text-[var(--color-soft-gold)]">Founders</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={headerInView ? { width: 40 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px bg-[var(--color-soft-gold)]/40 mx-auto"
          />
        </div>

        {/* Cards - Side by side */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-2xl mx-auto">
          {MEMBERS.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}