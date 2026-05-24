"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const MENU_ITEMS = [
  { name: "Home",    href: "#home" },
  { name: "About",   href: "#about" },
  { name: "Why ORA", href: "#why-ora" },
  { name: "Pricing", href: "#pricing" },
  { name: "Team",    href: "#team" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-4 px-4 sm:px-6 md:px-12 ${
          isScrolled ? "glass-navbar py-3 sm:py-4" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Fixed: Only one ORA text */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-white text-xl sm:text-2xl md:text-3xl font-serif tracking-[0.2em] sm:tracking-[0.3em] hover:text-[var(--color-soft-gold)] transition-colors duration-300 relative group font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            ORA
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-soft-gold)] transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-white/90 hover:text-[var(--color-soft-gold)] text-[10px] lg:text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 relative py-2 group drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-soft-gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={() => {
                const fn = (window as unknown as Record<string, unknown>).__oraOpenOrder;
                if (typeof fn === "function") (fn as () => void)();
              }}
              className="px-4 lg:px-5 py-1.5 lg:py-2 bg-[var(--color-soft-gold)] text-[var(--color-deep-green)] hover:bg-white hover:text-[var(--color-deep-green)] text-[10px] lg:text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-500 rounded-sm shadow-md"
            >
              Order
            </button>
          </div>

          {/* Mobile toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-[var(--color-soft-gold)] transition-colors duration-300 focus:outline-none drop-shadow-md rounded-full active:scale-95 transition-transform"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-30 bg-[var(--color-deep-green)]/98 backdrop-blur-xl md:hidden flex flex-col justify-center items-center px-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white rounded-full active:scale-95 transition-all"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center gap-6 w-full max-w-xs">
              {MENU_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/90 hover:text-[var(--color-soft-gold)] text-lg uppercase tracking-[0.25em] font-light py-3 w-full text-center"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: MENU_ITEMS.length * 0.07, duration: 0.5 }}
                onClick={() => {
                  setIsOpen(false);
                  const fn = (window as unknown as Record<string, unknown>).__oraOpenOrder;
                  if (typeof fn === "function") (fn as () => void)();
                }}
                className="mt-6 px-8 py-3 bg-[var(--color-soft-gold)] text-[var(--color-deep-green)] hover:bg-white text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-500 rounded-full shadow-lg w-full max-w-[200px]"
              >
                Order Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}