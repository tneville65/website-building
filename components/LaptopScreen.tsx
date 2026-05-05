"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LaptopScreen() {
  const [phase, setPhase] = useState<"idle" | "clicking" | "revealed">("idle");

  useEffect(() => {
    // Auto-animate on mount
    const t1 = setTimeout(() => setPhase("clicking"), 1200);
    const t2 = setTimeout(() => setPhase("revealed"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#080D18] overflow-hidden">
      {/* Nav bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm font-bold text-white">League</span>
          <span className="font-serif text-sm font-bold text-[#C9A84C]">Med</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-[10px] uppercase tracking-widest hidden sm:block">About</span>
          <span className="text-gray-600 text-[10px] uppercase tracking-widest hidden sm:block">Opportunities</span>
          <div className="border border-[#C9A84C]/40 px-3 py-1">
            <span className="text-[#C9A84C] text-[10px] uppercase tracking-widest">Member Login</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center relative px-8">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Join button — pre-click state */}
              <motion.button
                className="relative border border-[#C9A84C]/50 px-10 py-4 text-[#C9A84C] text-xs uppercase tracking-widest overflow-hidden"
                animate={{ boxShadow: ['0 0 0px rgba(201,168,76,0)', '0 0 20px rgba(201,168,76,0.3)', '0 0 0px rgba(201,168,76,0)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Request Access
              </motion.button>
              <p className="text-gray-600 text-[10px] mt-4 uppercase tracking-widest">Membership by invitation only</p>
            </motion.div>
          )}

          {phase === "clicking" && (
            <motion.div
              key="clicking"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Button click effect */}
              <motion.button
                className="relative bg-[#C9A84C] text-[#080D18] px-10 py-4 text-xs uppercase tracking-widest font-bold"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 0.95, 1.02, 1] }}
                transition={{ duration: 0.4 }}
              >
                Request Access
              </motion.button>
              {/* Click ripple */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="rounded-full border border-[#C9A84C]/60"
                  initial={{ width: 80, height: 80 }}
                  animate={{ width: 200, height: 200, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          )}

          {phase === "revealed" && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-lg"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] mb-4"
              >
                Application Received
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight"
              >
                Welcome to the network.
              </motion.h3>
              <div className="w-12 h-px bg-[#C9A84C]/40 mx-auto mb-4" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-xs leading-relaxed mb-6"
              >
                Your application is under review. Access to curated healthcare investment opportunities is granted upon approval.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-6"
              >
                {['Direct Deal Flow', 'Curated Access', 'Institutional Lens'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.15 }}
                    className="text-[#C9A84C]/60 text-[9px] uppercase tracking-widest hidden sm:block"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="px-6 py-2 border-t border-white/5 flex items-center justify-between">
        <span className="text-gray-700 text-[9px] uppercase tracking-widest">leaguemed.com</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/60" />
          <span className="text-gray-700 text-[9px]">Secure</span>
        </div>
      </div>
    </div>
  );
}
