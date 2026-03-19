"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A1628]/95 backdrop-blur-md shadow-lg border-b border-[#C9A84C]/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
          <span className="text-white">League</span>
          <span className="text-[#C9A84C]">Med</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide uppercase">About</Link>
          <Link href="/#opportunities" className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide uppercase">Opportunities</Link>
          <Link href="/membership" className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide uppercase">Membership</Link>
          <Link
            href="/membership"
            className="text-sm border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all px-5 py-2 tracking-wide uppercase font-medium"
          >
            Member Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A1628] border-t border-[#C9A84C]/20 px-6 py-4 flex flex-col gap-4">
          <Link href="/about" className="text-sm text-gray-300 hover:text-white uppercase tracking-wide">About</Link>
          <Link href="/#opportunities" className="text-sm text-gray-300 hover:text-white uppercase tracking-wide">Opportunities</Link>
          <Link href="/membership" className="text-sm text-gray-300 hover:text-white uppercase tracking-wide">Membership</Link>
          <Link href="/membership" className="text-sm border border-[#C9A84C] text-[#C9A84C] px-4 py-2 text-center uppercase tracking-wide">Member Login</Link>
        </div>
      )}
    </motion.nav>
  );
}
