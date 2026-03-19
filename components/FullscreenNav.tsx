"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Opportunities", href: "/#opportunities" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/membership" },
];

export default function FullscreenNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
          scrolled && !open ? "bg-[#0A1628]/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <Link href="/" onClick={() => setOpen(false)} className="font-serif text-2xl font-bold z-50 relative">
          <span className="text-white">League</span>
          <span className={open ? "text-white" : "text-[#C9A84C]"}>Med</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 z-50 relative">
          {!open && (
            <Link href="/membership" className="text-xs border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all px-6 py-2.5 uppercase tracking-widest font-medium">
              Member Login
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-50 flex flex-col justify-center items-end gap-1.5 w-8 h-8 group"
          aria-label="Menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
            className="block h-px bg-white origin-center"
            style={{ width: "100%" }}
          />
          <motion.span
            animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className="block h-px bg-white"
            style={{ width: "70%" }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
            className="block h-px bg-white origin-center"
            style={{ width: "50%" }}
          />
        </button>
      </motion.header>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 40px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#060E1A] flex flex-col justify-center px-12 md:px-24"
          >
            {/* Decorative gold line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: "easeInOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-6 py-4 border-b border-white/5 hover:border-[#C9A84C]/20 transition-all duration-300"
                  >
                    <span className="text-[#C9A84C]/40 text-sm font-mono w-8">0{i + 1}</span>
                    <span className="font-serif text-5xl md:text-7xl font-bold text-white group-hover:text-[#C9A84C] transition-colors duration-300 leading-tight">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 left-12 md:left-24 flex items-center gap-8"
            >
              <span className="text-gray-600 text-xs uppercase tracking-widest">Membership by invitation only</span>
              <Link
                href="/membership"
                onClick={() => setOpen(false)}
                className="text-xs border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all px-6 py-2.5 uppercase tracking-widest"
              >
                Request Access
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
