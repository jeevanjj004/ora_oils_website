"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { InstagramLogo, ArrowUpRight } from "@phosphor-icons/react";

const HANDLE = "thoma__sz";
const URL    = `https://instagram.com/${HANDLE}`;

export default function InstagramSection() {
  const ref       = useRef(null);
  const isInView  = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section id="instagram" className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-[var(--color-warm-cream)] relative overflow-hidden">

      {/* Background decoration - Mobile optimized */}
      <div className="absolute top-0 right-0 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-[var(--color-soft-gold)]/6 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-2xl mx-auto text-center relative z-10 space-y-6 sm:space-y-8 px-4 sm:px-0">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-2 sm:space-y-3"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--color-soft-gold)] font-medium block">
            Follow Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--color-deep-green)] font-light">
            ORA on <span className="italic">Instagram</span>
          </h2>
        </motion.div>

        {/* Instagram Button - Mobile optimized */}
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          href={URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-3 sm:gap-4 px-5 sm:px-6 md:px-8 py-4 sm:py-5 border border-[var(--color-deep-green)]/20 rounded-sm bg-white hover:bg-[var(--color-deep-green)] text-[var(--color-deep-green)] hover:text-white transition-all duration-500 group shadow-[0_10px_40px_rgba(13,34,20,0.06)] hover:shadow-[0_20px_60px_rgba(13,34,20,0.18)] w-full sm:w-auto"
        >
          <InstagramLogo
            size={24}
            weight="fill"
            className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:w-7 sm:h-7"
          />
          <div className="text-left">
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-light opacity-60 group-hover:opacity-80">
              Find us on Instagram
            </p>
            <p className="text-sm sm:text-base font-serif font-light tracking-wide">@{HANDLE}</p>
          </div>
          <ArrowUpRight
            size={14}
            className="ml-1 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 sm:w-4 sm:h-4"
          />
        </motion.a>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs sm:text-sm text-[var(--color-natural-brown)]/60 font-light max-w-xs sm:max-w-none mx-auto"
        >
          Behind-the-scenes, product stories & pure moments.
        </motion.p>

      </div>
    </section>
  );
}