"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

export default function AthletesPage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(201,168,76,0.08),transparent)]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-8"
          >
            The KeyArx Group — Athlete Strategy
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0]"
            >
              What's your
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] text-[#C9A84C]"
            >
              money really doing?
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-4"
          >
            Most athletes leave <span className="text-white font-semibold">$20–30 million</span> on the table.
            Not because they made bad decisions —
            because nobody showed them a better structure.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-[#C9A84C] text-lg font-semibold mb-12"
          >
            We fix that.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#number"
              className="bg-[#C9A84C] hover:bg-[#E2C47A] text-black font-bold px-10 py-4 uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_50px_rgba(201,168,76,0.5)]"
            >
              See Your Number
            </Link>
            <Link
              href="#strategy"
              className="border border-white/20 hover:border-white/50 text-white px-10 py-4 uppercase tracking-widest text-sm transition-all"
            >
              How It Works
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-10 bg-gradient-to-b from-[#C9A84C] to-transparent origin-top"
          />
        </motion.div>
      </section>

      {/* THE NUMBER */}
      <section id="number" className="py-32 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-20">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-6">The Difference</p>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">Same money. <span className="text-[#C9A84C]">Wildly different outcome.</span></h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Put $250,000 a year to work for 10 years. Here's what changes when the structure changes.</p>
            </motion.div>

            {/* Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Traditional */}
              <motion.div variants={fadeUp} className="bg-[#111] border border-white/10 p-10">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">Traditional Approach</p>
                <div className="space-y-5">
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Annual investment</span>
                    <span className="text-white font-mono">$250,000</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Years invested</span>
                    <span className="text-white font-mono">10 years</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Tax treatment</span>
                    <span className="text-red-400 font-mono">Taxable</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Annual income (age 51–100)</span>
                    <span className="text-white font-mono">~$350K/yr</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-gray-400 text-sm">Required market return</span>
                    <span className="text-white font-mono">10–12%+</span>
                  </div>
                </div>
              </motion.div>

              {/* KeyArx */}
              <motion.div variants={fadeUp} className="bg-[#C9A84C]/8 border border-[#C9A84C]/40 p-10 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-[#C9A84C] text-black text-[10px] uppercase tracking-widest px-3 py-1 font-bold">KeyArx Strategy</div>
                <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-6">Premium Finance Structure</p>
                <div className="space-y-5">
                  <div className="flex justify-between items-center py-4 border-b border-[#C9A84C]/10">
                    <span className="text-gray-400 text-sm">Annual investment</span>
                    <span className="text-white font-mono">$250,000</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-[#C9A84C]/10">
                    <span className="text-gray-400 text-sm">Years invested</span>
                    <span className="text-white font-mono">10 years</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-[#C9A84C]/10">
                    <span className="text-gray-400 text-sm">Tax treatment</span>
                    <span className="text-[#C9A84C] font-mono font-bold">100% Tax-Free</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-[#C9A84C]/10">
                    <span className="text-gray-400 text-sm">Annual income (age 51–100)</span>
                    <span className="text-[#C9A84C] font-mono font-bold text-xl">$772,000/yr</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-gray-400 text-sm">Equivalent market return needed</span>
                    <span className="text-white font-mono">11–14%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* The $30M gap */}
            <motion.div variants={fadeUp} className="mt-8 bg-[#C9A84C]/5 border border-[#C9A84C]/20 p-10 text-center">
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">The difference</p>
              <p className="font-serif text-6xl md:text-8xl font-bold text-[#C9A84C] mb-4">$30M+</p>
              <p className="text-gray-400 text-lg">in additional tax-free income over your lifetime.<br />Same $2.5M invested. Completely different structure.</p>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="strategy" className="py-32 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-20">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-6">The Strategy</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Two paths to the same goal:<br /><span className="text-[#C9A84C]">Tax-free wealth for life.</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="border border-white/10 p-10">
                <div className="text-[#C9A84C] font-mono text-xs uppercase tracking-widest mb-4">Path 01</div>
                <h3 className="font-serif text-2xl font-bold mb-4">Overfunded Life Insurance</h3>
                <p className="text-gray-400 leading-relaxed mb-6">Contribute $250K/year for 10 years into a specially structured life insurance contract. The cash builds tax-free, grows with market-linked performance, and pays out as tax-free income from age 51 to 100.</p>
                <div className="bg-white/5 p-6">
                  <div className="font-serif text-3xl font-bold text-[#C9A84C] mb-1">$772K/yr</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest">Tax-free income, age 51–100</div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="border border-[#C9A84C]/30 p-10 bg-[#C9A84C]/5">
                <div className="text-[#C9A84C] font-mono text-xs uppercase tracking-widest mb-4">Path 02 — Premium Financing</div>
                <h3 className="font-serif text-2xl font-bold mb-4">Leverage What You Have</h3>
                <p className="text-gray-400 leading-relaxed mb-6">Use a $250K loan to control a $1M+ policy. Your $250K becomes nearly $2M in 10 years — tax-free. The bank's money works for you at a rate the market rarely matches.</p>
                <div className="bg-white/5 p-6">
                  <div className="font-serif text-3xl font-bold text-[#C9A84C] mb-1">~2x Returns</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest">vs. traditional investing, same outlay</div>
                </div>
              </motion.div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimSection>
            <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-6">The KeyArx Group</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold mb-8">
              We don't sell products.<br />We engineer structures.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              KeyArx is commission-neutral and carrier-direct. We work with physicians, athletes, and high-earning professionals to build financial structures that maximize tax-free wealth — not commissions.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed max-w-xl mx-auto">
              We partner with your advisory team. We're not here to replace Rise Advisors or your current team — we're here to add a strategy they likely haven't seen.
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_60%)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <AnimSection>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl font-bold mb-8">
              Let's run<br /><span className="text-[#C9A84C]">your numbers.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-12">
              No pressure. No pitch. Just a conversation about what your money could actually be doing — with a structure built specifically for your career window.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:paul@keyarx.com?subject=Athlete Strategy — Let's Talk"
                className="bg-[#C9A84C] hover:bg-[#E2C47A] text-black font-bold px-12 py-5 uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_60px_rgba(201,168,76,0.5)]"
              >
                Start the Conversation
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="text-gray-600 text-xs mt-8 uppercase tracking-widest">
              The KeyArx Group · paul@keyarx.com · (732) 983-9830
            </motion.p>
          </AnimSection>
        </div>
      </section>

    </div>
  );
}
