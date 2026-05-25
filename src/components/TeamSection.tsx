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
    fallbackPhoto: "/images/team/akhil.png",
  },
  {
    name: "Asif",
    role: "CEO & Co-Founder",
    email: "asifputhenpurackal@gmail.com",
    instagram: "_a.zi_f_",
    photo: "/images/team/ansif.webp",
    fallbackPhoto: "/images/team/ansif.png",
  },
];

function TeamCard({
  member,
  index,
}: {
  member: (typeof MEMBERS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState(member.photo);

  useEffect(() => {
    setImgSrc(member.photo);
    setImageLoaded(false);
    setImageError(false);
  }, [member.photo]);

  const handleImageError = () => {
    if (!imageError) {
      setImgSrc(member.fallbackPhoto);
      setImageError(true);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group h-full"
    >
      <div className="relative flex h-full flex-col rounded-2xl border border-[var(--color-soft-gold)]/15 bg-gradient-to-br from-[#0A1A12] to-[#06110B] overflow-hidden transition-all duration-500 hover:border-[var(--color-soft-gold)]/35">

        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(201,168,106,0.08),transparent_60%)]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-6 sm:py-7 h-full">

          {/* Image */}
          <div className="relative mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-[#102018] ring-2 ring-[var(--color-soft-gold)]/20 group-hover:ring-[var(--color-soft-gold)]/40 transition-all duration-500">

              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a1a10]">
                  <div className="w-5 h-5 rounded-full border-2 border-[var(--color-soft-gold)]/30 border-t-[var(--color-soft-gold)] animate-spin" />
                </div>
              )}

              <img
                src={imgSrc}
                alt={member.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
                className={`w-full h-full object-cover object-top transition-all duration-700 ${
                  imageLoaded
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-110"
                }`}
              />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-light text-white">
            {member.name}
          </h3>

          {/* Role */}
          <p className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-[var(--color-soft-gold)]/65 font-medium">
            {member.role}
          </p>

          {/* Divider */}
          <div className="w-10 h-px bg-[var(--color-soft-gold)]/25 my-4" />

          {/* Contact Section */}
          <div className="flex flex-col gap-3 w-full">

            {/* Email */}
            <a
              href={`mailto:${member.email}`}
              className="flex items-center justify-center gap-2 text-white/55 hover:text-[var(--color-soft-gold)] transition-all duration-300"
            >
              <EnvelopeSimple
                size={15}
                weight="regular"
                className="shrink-0"
              />

              <span className="text-[10px] sm:text-[11px] break-all leading-none">
                {member.email}
              </span>
            </a>

            {/* Instagram */}
            <a
              href={`https://instagram.com/${member.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white/55 hover:text-[var(--color-soft-gold)] transition-all duration-300"
            >
              <InstagramLogo
                size={15}
                weight="regular"
                className="shrink-0"
              />

              <span className="text-[10px] sm:text-[11px] leading-none">
                @{member.instagram}
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Hover Line */}
        <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-soft-gold)]/60 to-transparent transition-all duration-500 group-hover:w-3/5" />
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const headerRef = useRef(null);

  const headerInView = useInView(headerRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#06110B] px-4 sm:px-6 py-14 sm:py-18 md:py-22 lg:py-28 text-white"
    >
      <FloatingParticles />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-soft-gold)]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="block text-[9px] sm:text-[10px] uppercase tracking-[0.38em] text-[var(--color-soft-gold)] font-medium"
          >
            The Visionaries
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight"
          >
            Meet the{" "}
            <span className="italic text-[var(--color-soft-gold)]">
              Founders
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={headerInView ? { width: 70 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px bg-[var(--color-soft-gold)]/40 mx-auto mt-5"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto">
          {MEMBERS.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}