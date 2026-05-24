"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Envelope } from "@phosphor-icons/react";

export default function GulbeeContact() {
  const [showConfirm, setShowConfirm] = useState(false);

  const openEmail = () => {
    // Better email link that works on Android, iOS, and Desktop
    const emailUrl = "mailto:teamgulbee@gmail.com?subject=Website%20Inquiry%20from%20ORA%20Oils&body=Dear%20Gulbee%20Team,%0D%0A%0D%0AI%20recently%20visited%20the%20ORA%20Oils%20website%20and%20appreciated%20the%20overall%20presentation.%0D%0A%0D%0AI%20would%20like%20to%20connect%20with%20you.%0D%0A%0D%0AThank%20you.";
    
    // Try to open with mailto: (works on all devices, opens default email app)
    window.location.href = emailUrl;
    
    // Fallback: if user has Gmail app, this helps on Android
    setTimeout(() => {
      // If mailto didn't work, try Gmail web
      if (document.hidden === undefined) {
        window.open("https://mail.google.com/mail/?view=cm&fs=1&to=teamgulbee@gmail.com&su=Website%20Inquiry%20from%20ORA%20Oils&body=Dear%20Gulbee%20Team,%0D%0A%0D%0AI%20recently%20visited%20the%20ORA%20Oils%20website%20and%20appreciated%20the%20overall%20presentation.%0D%0A%0D%0AI%20would%20like%20to%20connect%20with%20you.%0D%0A%0D%0AThank%20you.", "_blank");
      }
    }, 250);
    
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-[var(--color-soft-gold)]/70 hover:text-[var(--color-soft-gold)] transition-colors duration-300 font-medium text-sm sm:text-base"
      >
        Gulbee Technologies
      </button>

      <AnimatePresence>
        {showConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[350px]"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                
                <div className="bg-gradient-to-r from-[var(--color-deep-green)] to-[#0a1a10] px-5 py-4 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-soft-gold)]/15 border-2 border-[var(--color-soft-gold)]/30 flex items-center justify-center mb-2">
                    <Envelope size={20} className="text-[var(--color-soft-gold)]" />
                  </div>
                  <h3 className="text-white text-lg font-serif font-light">
                    Reach Gulbee Technologies?
                  </h3>
                </div>
                
                <div className="px-5 pb-6 pt-4 text-center">
                  <p className="text-[var(--color-deep-green)]/70 text-sm">
                    Click Continue to email our team.
                  </p>
                  
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={openEmail}
                      className="flex-1 py-2.5 bg-[var(--color-deep-green)] text-white rounded-xl hover:bg-[var(--color-soft-gold)] hover:text-[var(--color-deep-green)] transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                    >
                      Continue <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}