"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Leaf, Drop, ShieldCheck, Wind, Sparkle, Crown,
  Phone, Envelope, ArrowRight, CaretRight,
} from "@phosphor-icons/react";
import { products } from "@/components/products";
import GulbeeContact from "@/components/GulbeeContact";
import Navbar            from "@/components/Navbar";
import HeroLoopAnimation from "@/components/HeroLoopAnimation";
import FloatingParticles from "@/components/FloatingParticles";
import ScrollReveal      from "@/components/ScrollReveal";
import OrderChatbot from "@/components/OrderChatbot";
import TeamSection       from "@/components/TeamSection";
import InstagramSection  from "@/components/InstagramSection";
import { sendEmail }     from "@/components/EmailService";

const WA_NUMBER = "919037315809";

const openOrder = () => {
  const fn = (window as unknown as Record<string, unknown>).__oraOpenOrder;
  if (typeof fn === "function") (fn as () => void)();
};

const FADE_UP = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};
const STAGGER = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [rotateIndex, setRotateIndex] = useState(1);

  // Scroll progress useEffect
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotation useEffect for pricing carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setRotateIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((p) => ({ ...p, [e.target.id]: e.target.value }));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await sendEmail(formData);
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] overflow-x-hidden selection:bg-[var(--color-soft-gold)] selection:text-[var(--color-deep-green)] text-[var(--color-deep-green)] font-sans">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="scroll-progress fixed top-0 left-0 right-0 h-1 z-50"
        style={{ scaleX: scrollProgress / 100, transformOrigin: "0%" }}
      />
      
      <Navbar />
      <OrderChatbot />

           {/* ══════════════════════════════════════
          1. HERO - PERFECTLY BALANCED (Mobile + Desktop)
      ══════════════════════════════════════ */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        <HeroLoopAnimation />

        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 text-center text-white">
          <motion.div 
            variants={STAGGER} 
            initial="hidden" 
            animate="visible" 
            className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8"
          >

            {/* Badge */}
            <motion.div 
              variants={FADE_UP} 
              className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--color-soft-gold)]/30 rounded-full bg-white/5 backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-soft-gold)] animate-pulse" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.3em] text-[var(--color-soft-gold)] font-light whitespace-nowrap">
                Cold-Pressed Organic Coconut Oil
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={FADE_UP} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif tracking-wide leading-[1.1] font-light"
            >
              Nature&apos;s <br />
              <span className="italic text-[var(--color-soft-gold)] font-light">Finest Drop.</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={FADE_UP} 
              className="text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide text-white/75 max-w-2xl mx-auto leading-relaxed px-2"
            >
              Cold-pressed, chemical-free coconut oil — crafted with purity and tradition from the heart of Kerala.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              variants={FADE_UP} 
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
            >
              <button
                onClick={openOrder}
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-[var(--color-soft-gold)] text-[var(--color-deep-green)] text-xs sm:text-sm uppercase tracking-[0.25em] font-medium rounded-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500"
              >
                Order Now
              </button>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 border border-white/20 text-white text-xs sm:text-sm uppercase tracking-[0.25em] font-light rounded-sm hover:border-[var(--color-soft-gold)] hover:bg-[var(--color-soft-gold)]/10 transition-all duration-500 backdrop-blur-sm text-center"
              >
                Discover ORA
              </a>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.6 }} 
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer text-white/50 hover:text-white transition-colors"
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.25em] mb-1 sm:mb-2 font-light">Explore</span>
          <div className="w-[1px] h-6 sm:h-7 md:h-8 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 32, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} 
              className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-soft-gold)]" 
            />
          </div>
        </motion.div>
      </section>















      {/* ══════════════════════════════════════
          2. ABOUT - RESPONSIVE (Mobile good, Desktop optimized)
      ══════════════════════════════════════ */}
      <section id="about" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[var(--color-warm-cream)] relative overflow-hidden">
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ x: [0, 50, -25, 0], y: [0, -40, 25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-5 w-40 sm:w-52 md:w-64 lg:w-80 h-40 sm:h-52 md:h-64 lg:h-80 bg-[var(--color-soft-gold)]/8 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -50, 25, 0], y: [0, 40, -25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-5 w-48 sm:w-60 md:w-72 lg:w-96 h-48 sm:h-60 md:h-72 lg:h-96 bg-[var(--color-deep-green)]/8 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] pointer-events-none"
        />

        {/* Container - Desktop wider, mobile contained */}
        <div className="max-w-sm sm:max-w-xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto flex flex-row items-center justify-between gap-3 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 relative z-10">
          
          {/* LEFT: Image Card - Responsive sizing */}
          <div className="w-[42%] sm:w-[40%] flex justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[320px] xl:max-w-[380px] 2xl:max-w-[420px] group"
            >
              {/* Outer Glow Ring */}
              <motion.div
                animate={{ scale: [1, 1.03, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-2 sm:-inset-3 lg:-inset-4 rounded-2xl bg-gradient-to-r from-[var(--color-soft-gold)]/20 via-[var(--color-soft-gold)]/10 to-transparent blur-xl lg:blur-2xl pointer-events-none"
              />
              
              {/* Rotating Border Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1.5 sm:-inset-2 lg:-inset-2.5 rounded-xl pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, transparent, var(--color-soft-gold), transparent, var(--color-soft-gold), transparent)",
                  padding: "1.5px",
                }}
              >
                <div className="w-full h-full rounded-xl bg-transparent" />
              </motion.div>

              {/* 3D Tilt Card */}
              <motion.div
                whileHover={{ rotateY: 8, rotateX: 3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-md lg:shadow-lg"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.05 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-br from-[var(--color-deep-green)] via-[var(--color-soft-gold)]/15 to-transparent z-10"
                  />
                  
                  <motion.img
                    src="/images/product_giftset.png"
                    alt="ORA Coconut Oil"
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  
                  <motion.div
                    initial={{ x: "-100%", y: "-100%" }}
                    whileHover={{ x: "100%", y: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent z-20 skew-x-12 pointer-events-none"
                  />
                  
                  {/* Corner Decorations */}
                  <div className="absolute top-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-t border-l border-[var(--color-soft-gold)]/40 z-20" />
                  <div className="absolute top-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-t border-r border-[var(--color-soft-gold)]/40 z-20" />
                  <div className="absolute bottom-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-b border-l border-[var(--color-soft-gold)]/40 z-20" />
                  <div className="absolute bottom-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-b border-r border-[var(--color-soft-gold)]/40 z-20" />
                </div>
                
                {/* Bottom Info Bar */}
                <motion.div
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-deep-green)]/90 to-transparent p-1.5 sm:p-2 lg:p-2.5 z-30"
                >
                  <p className="text-white text-center text-[6px] sm:text-[7px] lg:text-[8px] font-light tracking-wider">
                    ✦ Cold-Pressed with Tradition ✦
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Floating Badges */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 lg:-top-2 lg:-left-2 z-40"
              >
                <div className="bg-[var(--color-soft-gold)] text-[var(--color-deep-green)] px-1 sm:px-1.5 lg:px-2 py-0.5 rounded-full text-[5px] sm:text-[6px] lg:text-[7px] font-bold tracking-wider shadow-md whitespace-nowrap">
                  ✦ SINCE 2026 ✦
                </div>
              </motion.div>
              
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 lg:-bottom-2 lg:-right-2 z-40"
              >
               
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: Content - Desktop fonts larger, mobile stays same */}
          <div className="w-[54%] sm:w-[56%]">
            
            {/* Title Section - Desktop larger */}
            <div className="mb-2 sm:mb-3 lg:mb-4">
              <span className="text-[8px] sm:text-[9px] lg:text-[11px] uppercase tracking-[0.3em] text-[var(--color-soft-gold)] font-medium">
                THE ORIGIN STORY
              </span>
              <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl font-serif text-[var(--color-deep-green)] font-light mt-1 leading-tight">
                Crafted with <br />
                <span className="italic text-[var(--color-soft-gold)]">Purity & Tradition.</span>
              </h2>
            </div>

            {/* Description Text - Desktop larger */}
            <div className="space-y-1.5 sm:space-y-2 text-[9px] sm:text-[10px] lg:text-sm xl:text-base text-[var(--color-deep-green)]/70 font-light leading-relaxed mb-3 sm:mb-4 lg:mb-5">
              <p>
                ORA Coconut Oil is crafted from premium, hand-selected organic coconuts using traditional cold-pressed methods — preserving absolute purity, tropical aroma, and vital nutrition.
              </p>
              <p>
                From tree to bottle, zero heat and zero chemicals. A pure, multi-purpose essence for cooking, skincare, and wellness.
              </p>
            </div>

            {/* Stats - 3 items responsive */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 pt-2 sm:pt-3 border-t border-[var(--color-soft-gold)]/15 mb-3 sm:mb-4 lg:mb-5">
              {[
                { val: "100%", label: "Cold-Pressed" },
                { val: "Zero", label: "Chemicals" },
                { val: "Pure", label: "Tropical Aroma" }
              ].map((item, i) => (
                <div key={item.label} className="text-center">
                  <h4 className="text-sm sm:text-base lg:text-xl xl:text-2xl font-serif text-[var(--color-deep-green)] font-semibold">{item.val}</h4>
                  <p className="text-[7px] sm:text-[8px] lg:text-[10px] xl:text-xs uppercase tracking-wider text-[var(--color-natural-brown)]">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Quote - Responsive */}
            <div className="pt-2 border-t border-[var(--color-soft-gold)]/15">
              <div className="flex items-start gap-1 sm:gap-1.5 lg:gap-2">
                <span className="text-[var(--color-soft-gold)] text-[9px] sm:text-[10px] lg:text-sm">✦</span>
                <p className="text-[8px] sm:text-[9px] lg:text-xs xl:text-sm text-[var(--color-deep-green)]/60 font-light italic leading-relaxed">
                  "From two friends in Anakkara with a dream, to a brand built on trust — Akhil and Asif left secure jobs to create something of their own. Today, ORA stands as proof that small-town courage can grow into something meaningful."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>










      {/* ══════════════════════════════════════
          3. WHY ORA - PERFECTLY BALANCED (Mobile + Desktop)
      ══════════════════════════════════════ */}
      <section id="why-ora" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-5 sm:px-6 lg:px-8 xl:px-12 bg-[#09150E] text-white relative overflow-hidden">
        <FloatingParticles />
        
        {/* Animated Background Orbs - Responsive sizing */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[650px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] bg-[var(--color-soft-gold)]/5 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] pointer-events-none"
        />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-[200px] sm:w-[280px] md:w-[350px] lg:w-[450px] h-[200px] sm:h-[280px] md:h-[350px] lg:h-[450px] bg-[var(--color-deep-green)]/30 rounded-full blur-[70px] sm:blur-[90px] lg:blur-[110px] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto relative z-20">
          
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
            <ScrollReveal direction="up">
              <motion.span 
                className="inline-block text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.35em] text-[var(--color-soft-gold)] font-light px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[var(--color-soft-gold)]/20 bg-white/5 backdrop-blur-sm"
              >
                Why Choose Us
              </motion.span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.05}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light px-2">
                The <span className="italic text-[var(--color-soft-gold)]">Essence</span> of ORA
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={0.1}>
              <div className="w-10 sm:w-12 lg:w-14 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-gold)] to-transparent mx-auto" />
            </ScrollReveal>
          </div>

          {/* Cards Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-10 px-0">
            {[
              { title: "100% Organic", desc: "Certified organic from sustainable Kerala farms.", icon: Leaf, tag: "Certified Purity" },
              { title: "Cold Pressed", desc: "No heat — every nutrient and enzyme fully preserved.", icon: Drop, tag: "Nutrients Preserved" },
              { title: "Chemical Free", desc: "Zero preservatives, paraben, or mineral oils. Ever.", icon: ShieldCheck, tag: "Zero Additives" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 p-5 sm:p-6 lg:p-7 xl:p-8 overflow-hidden transition-all duration-500 group-hover:border-[var(--color-soft-gold)]/30 group-hover:shadow-2xl">
                  
                  {/* Icon Container - Responsive */}
                  <div className="relative mb-5 sm:mb-6 lg:mb-7 xl:mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-2 rounded-full border border-[var(--color-soft-gold)]/30"
                    />
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--color-soft-gold)]/20 to-transparent flex items-center justify-center border border-[var(--color-soft-gold)]/40"
                    >
                      <feature.icon size={24} weight="light" className="text-[var(--color-soft-gold)] sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9" />
                    </motion.div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-serif font-light mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  
                  {/* Divider */}
                  <div className="w-8 sm:w-10 lg:w-12 h-px bg-[var(--color-soft-gold)]/30 mb-3 sm:mb-4" />
                  
                  {/* Description */}
                  <p className="text-[11px] sm:text-xs md:text-sm font-light leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">
                    {feature.desc}
                  </p>
                  
                  {/* Tag */}
                  <div className="mt-4 sm:mt-5 lg:mt-6 flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--color-soft-gold)]/20 flex items-center justify-center">
                      <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-[var(--color-soft-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[7px] sm:text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-wider text-white/40">
                      {feature.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-10 sm:mt-14 md:mt-16 lg:mt-20"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full border border-[var(--color-soft-gold)]/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 group cursor-pointer"
              onClick={openOrder}
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-soft-gold)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5 bg-[var(--color-soft-gold)]" />
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.2em] text-[var(--color-soft-gold)] font-light group-hover:tracking-[0.25em] transition-all duration-300">
                Experience the Difference
              </span>
              <ArrowRight size={12} className="text-[var(--color-soft-gold)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      
      {/* ══════════════════════════════════════
          5. PRICING — PREMIUM SMOOTH CYCLIC 3D CAROUSEL
      ══════════════════════════════════════ */}
      <section id="pricing" className="py-16 sm:py-20 md:py-28 lg:py-40 px-4 sm:px-6 bg-[var(--color-warm-cream)] relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-warm-cream)] via-white to-[var(--color-warm-cream)]" />

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.13, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-[var(--color-soft-gold)] rounded-full blur-[100px] sm:blur-[120px] md:blur-[140px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4 sm:space-y-5">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--color-soft-gold)] font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[var(--color-soft-gold)]/20 bg-white/60 backdrop-blur-sm"
            >
              The Collection
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-deep-green)] font-light px-2"
            >
              Choose Your{" "}
              <span className="italic text-[var(--color-soft-gold)]">ORA</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="w-10 sm:w-12 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-gold)] to-transparent mx-auto"
            />
          </div>

          {/* CAROUSEL - Mobile Optimized */}
          <div
            className="relative h-[580px] sm:h-[650px] md:h-[720px] lg:h-[780px] flex items-center justify-center overflow-visible"
            style={{ perspective: "1800px", transformStyle: "preserve-3d" }}
          >
            {products.map((product, index) => {
              const angle = ((index - rotateIndex + products.length) % products.length) * 120;
              const radians = (angle * Math.PI) / 180;
              const radius = 260;
              const x = Math.sin(radians) * radius;
              const z = Math.cos(radians) * radius;
              const isCenter = angle === 0;

              return (
                <motion.div
                  key={product.name}
                  className="absolute left-1/2 top-1/2"
                  animate={{
                    x: x - (isCenter ? 160 : 120),
                    y: isCenter ? -220 : -170,
                    scale: isCenter ? 1 : 0.72,
                    opacity: isCenter ? 1 : 0.4,
                    rotateY: -angle,
                    zIndex: isCenter ? 50 : Math.round(z),
                    filter: isCenter ? "blur(0px)" : "blur(0.5px)",
                  }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: isCenter ? "320px" : "240px", transformStyle: "preserve-3d" }}
                >
                  {isCenter ? (
                    <div
                      className="rounded-2xl overflow-hidden border-2 border-[var(--color-soft-gold)] bg-gradient-to-br from-[var(--color-deep-green)] to-[#0a1a10]"
                      style={{ boxShadow: "0 35px 100px rgba(0,0,0,0.35),0 0 50px rgba(212,175,55,0.18)" }}
                    >
                      <div className="p-5 sm:p-6 md:p-7">
                        <div className="flex justify-center mb-3">
                          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[var(--color-soft-gold)] text-[var(--color-deep-green)] text-[9px] sm:text-[10px] uppercase tracking-wider font-bold shadow-lg">
                            ⚡ {product.badge}
                          </span>
                        </div>

                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="h-40 sm:h-44 md:h-48 lg:h-56 mx-auto object-contain"
                          animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div className="text-center mt-3 sm:mt-4">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-light">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm text-[var(--color-soft-gold)]/70">
                            {product.size}
                          </p>

                          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-soft-gold)]">
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs sm:text-sm text-white/40 line-through">
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                          {product.saving && (
                            <p className="text-emerald-400 text-[10px] sm:text-xs mt-1 font-medium">
                              Save {product.saving}
                            </p>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          onClick={openOrder}
                          className="w-full mt-5 sm:mt-6 py-2.5 sm:py-3 rounded-full bg-[var(--color-soft-gold)] text-[var(--color-deep-green)] uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold hover:bg-white transition-all duration-300"
                        >
                          Order Now →
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-[var(--color-soft-gold)]/20 shadow-xl p-4 sm:p-5">
                      <div className="mb-2">
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[9px] uppercase rounded-full font-medium bg-[var(--color-soft-gold)]/10 text-[var(--color-soft-gold)]">
                          {product.badge}
                        </span>
                      </div>
                      <img src={product.image} alt={product.name} className="h-28 sm:h-32 md:h-36 mx-auto object-contain" />
                      <div className="text-center mt-2 sm:mt-3">
                        <h3 className="text-base sm:text-lg font-serif text-[var(--color-deep-green)]">
                          {product.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs opacity-50">{product.size}</p>
                        <p className="text-xl sm:text-2xl mt-2 font-serif font-bold text-[var(--color-deep-green)]">
                          {product.price}
                        </p>
                        {product.saving && (
                          <p className="text-emerald-500 text-[9px] sm:text-[10px] mt-1 font-medium">
                            Save {product.saving}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {[0, 1, 2].map((i) => (
              <motion.button
                key={i}
                onClick={() => setRotateIndex(i)}
                className={`rounded-full transition-all duration-500 ${
                  rotateIndex === i
                    ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[var(--color-soft-gold)]"
                    : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[var(--color-soft-gold)]/30"
                }`}
                animate={rotateIndex === i ? { scale: [1, 1.2, 1] } : {}}
              />
            ))}
          </div>

          <p className="text-center text-[9px] sm:text-[10px] text-[var(--color-deep-green)]/30 mt-3 sm:mt-4 font-light tracking-wider">
            ✦ Premium Orbit Carousel ✦
          </p>
        </div>
      </section>
      
      {/* ══════════════════════════════════════
          6. TEAM
      ══════════════════════════════════════ */}
      <TeamSection />

      {/* ══════════════════════════════════════
          7. INSTAGRAM
      ══════════════════════════════════════ */}
      <InstagramSection />

               {/* ══════════════════════════════════════
          8. CONTACT - SIDE BY SIDE ON ALL DEVICES
      ══════════════════════════════════════ */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-5 sm:px-6 lg:px-8 bg-[#040c07] text-white relative overflow-hidden">
        <FloatingParticles />

        {/* Background glow - Responsive */}
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-[var(--color-soft-gold)]/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] lg:blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16">
          
          {/* Main Content Row - ALWAYS SIDE BY SIDE (never stacked) */}
          <div className="flex flex-row flex-wrap items-start justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
            
            {/* Left Column - Contact Info (45% width on mobile, 40% on desktop) */}
            <div className="w-[45%] sm:w-[45%] md:w-[42%] lg:w-[40%] space-y-5 sm:space-y-6 md:space-y-8">
              
              {/* Header */}
              <ScrollReveal direction="left">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.3em] text-[var(--color-soft-gold)] font-light">
                    Connect With Us
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light leading-tight">
                    Reach the <br />
                    <span className="italic text-[var(--color-soft-gold)]">ORA Concierge.</span>
                  </h2>
                  <p className="text-[10px] sm:text-xs md:text-sm font-light text-white/55 leading-relaxed">
                    Orders, wholesale inquiries, or a simple hello — we're always here.
                  </p>
                </div>
              </ScrollReveal>
              
              {/* Contact Methods */}
              <ScrollReveal direction="up" delay={0.1}>
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-[var(--color-soft-gold)]/15">
                  {[
                    { icon: Phone, label: "Phone", value: "+91 79942 93712", href: "tel:+917994293712" },
                    { icon: Envelope, label: "Email", value: "oracoconut@gmail.com", href: "mailto:oracoconut@gmail.com" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-2 sm:gap-3 group">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0 bg-white/5 border-[var(--color-soft-gold)]/10 text-[var(--color-soft-gold)]">
                        <Icon size={12} weight="light" className="sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div>
                        <p className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-widest text-white/35 font-light">{label}</p>
                        <a href={href} className="text-[10px] sm:text-xs md:text-sm font-light hover:text-[var(--color-soft-gold)] transition-colors duration-300 break-all">
                          {value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              
              {/* Address */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="pt-2 sm:pt-3 border-t border-white/[0.06] space-y-1.5">
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[var(--color-soft-gold)]/50 font-light block">
                    Manufactured & Marketed By
                  </span>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-white/45 font-light leading-relaxed">
                    12/267 ORA Coconut Oil, 6th Mile,<br />
                    Chakkupallam, Kumily Munnar Road,<br />
                    Idukki — PIN: 685509
                  </p>
                  <p className="text-[7px] sm:text-[8px] md:text-[9px] text-white/25 font-light tracking-wider">
                    FSSAI: 21326178000353
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column - Contact Form (50% width on mobile, 55% on desktop) */}
            <ScrollReveal direction="right" className="w-[50%] sm:w-[50%] md:w-[53%] lg:w-[55%]">
              <div className="glass-card p-4 sm:p-5 md:p-6 rounded-xl border border-[var(--color-soft-gold)]/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-white font-light mb-4 sm:mb-5 md:mb-6">
                  Send a Message
                </h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                  {/* Name & Email Row - Stays side by side on mobile */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    {[
                      { id: "name", label: "Name", type: "text", ph: "John Doe" },
                      { id: "email", label: "Email", type: "email", ph: "john@example.com" }
                    ].map((f) => (
                      <div key={f.id} className="space-y-1">
                        <label htmlFor={f.id} className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/40 font-light">
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          required
                          value={(formData as Record<string, string>)[f.id]}
                          onChange={handleFormChange}
                          placeholder={f.ph}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs font-light text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--color-soft-gold)] transition-colors duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Subject */}
                  <div className="space-y-1">
                    <label htmlFor="subject" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/40 font-light">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleFormChange}
                      placeholder="Inquiry, Collaboration..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs font-light text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--color-soft-gold)] transition-colors duration-300"
                    />
                  </div>
                  
                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/40 font-light">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Your message here..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs font-light text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--color-soft-gold)] transition-colors duration-300 resize-none"
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full py-2 sm:py-2.5 md:py-3 bg-[var(--color-soft-gold)] text-[var(--color-deep-green)] text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium rounded-lg hover:bg-white hover:shadow-[0_0_20px_var(--color-soft-gold)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formStatus === "sending" ? "Sending..." : "Send Message"}
                  </button>
                  
                  {/* Status Messages */}
                  {formStatus === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-[var(--color-soft-gold)] text-[10px] sm:text-xs font-light"
                    >
                      ✦ Message sent. We'll get back to you soon.
                    </motion.p>
                  )}
                  {formStatus === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-red-400 text-[10px] sm:text-xs font-light"
                    >
                      Something went wrong. Please try again or call us directly.
                    </motion.p>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Google Map - Full width */}
          <ScrollReveal direction="up">
            <div className="rounded-xl overflow-hidden border border-[var(--color-soft-gold)]/10 shadow-2xl">
              <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-white/[0.02] border-b border-[var(--color-soft-gold)]/10 flex items-center gap-1.5 sm:gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--color-soft-gold)]" />
                <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/35 font-light">
                  Our Location — Idukki, Kerala
                </span>
              </div>
              <iframe
                title="ORA Oils — Idukki"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62915.90046839407!2d77.07832317910156!3d9.930087699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07923bd4fc1f7f%3A0x39a0da4f04ef4f3b!2sKumily%2C%20Kerala%20685509!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0, filter: "invert(88%) hue-rotate(175deg) saturate(0.55) brightness(0.88)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[160px] sm:min-h-[180px] md:min-h-[200px] lg:min-h-[240px]"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
      



            {/* ══════════════════════════════════════
          9. FOOTER - SIDE BY SIDE ON ALL DEVICES
      ══════════════════════════════════════ */}
      <footer className="py-8 sm:py-10 md:py-12 lg:py-16 px-5 sm:px-6 lg:px-8 bg-[#020704] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Row - ALWAYS SIDE BY SIDE (never stacked) */}
          <div className="flex flex-row flex-wrap items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            
            {/* Logo Section - Left side */}
            <div className="text-left space-y-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.3em] text-white font-light">O R A</h3>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.25em] text-[var(--color-soft-gold)]/70 font-light">Nature's Finest Drop</p>
            </div>
            
            {/* Navigation Links - Center */}
            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6 gap-y-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-light">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Why ORA", "#why-ora"],
                ["Pricing", "#pricing"],
                ["Team", "#team"],
                ["Contact", "#contact"]
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (href === "#home") window.scrollTo({ top: 0, behavior: "smooth" });
                    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-white/50 hover:text-[var(--color-soft-gold)] transition-colors duration-300 whitespace-nowrap"
                >
                  {label}
                </a>
              ))}
            </div>
            
            {/* Legal & Social - Right side */}
            <div className="text-right space-y-1 sm:space-y-2">
              <div className="flex flex-wrap justify-end gap-2 sm:gap-3 md:gap-4 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-white/40 font-light">
                <a href="https://instagram.com/thoma__sz" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-soft-gold)] transition-colors duration-300">Instagram</a>
                <span className="text-white/20">/</span>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: We respect your privacy. Your data is never shared with third parties."); }} className="hover:text-[var(--color-soft-gold)] transition-colors duration-300">Privacy</a>
                <span className="text-white/20">/</span>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions: By using our website, you agree to our terms. For bulk orders, please contact us directly."); }} className="hover:text-[var(--color-soft-gold)] transition-colors duration-300">Terms</a>
              </div>
              
              <div className="text-[9px] sm:text-[10px] md:text-xs text-white/30 font-light tracking-wider">
                Website by <GulbeeContact />
              </div>
            </div>
          </div>
          
          {/* Copyright - Full width bottom */}
          <div className="text-center mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 md:pt-6 border-t border-white/10">
            <p className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/25 font-light">
              © 2026 ORA. Handcrafted with Absolute Purity. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}