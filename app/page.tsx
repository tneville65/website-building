"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const focusAreas = [
  { icon: "🔬", title: "Medical Technology", desc: "Devices, diagnostics, and digital health platforms transforming patient outcomes." },
  { icon: "🧬", title: "Life Sciences", desc: "Pharmaceutical, biotech, and genomic companies at the frontier of medicine." },
  { icon: "🏥", title: "Healthcare Real Estate", desc: "Medical office, surgery centers, and specialty facilities in high-demand markets." },
  { icon: "💊", title: "Biotech & Therapeutics", desc: "Early and growth-stage companies developing next-generation treatments." },
];

const valueProps = [
  { number: "01", title: "Curated Deal Flow", desc: "Every opportunity is vetted by our investment committee before it reaches members. No noise — only signal." },
  { number: "02", title: "Physician-First Perspective", desc: "We understand medicine from the inside. Our members don't just invest — they evaluate with clinical precision." },
  { number: "03", title: "Exclusive Access", desc: "Private placements, co-investment rights, and deal access not available to the general public." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060E1A] via-[#0A1628] to-[#0D1F3C]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08),transparent_60%)]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-8 font-medium">Membership by Invitation Only</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
          >
            Where Medicine
            <br />
            <span className="text-[#C9A84C]">Meets Capital.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            LeagueMed is an exclusive private investment community for physicians and medical professionals. Access curated private market deals in medical technology, life sciences, and healthcare.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/membership"
              className="bg-[#C9A84C] hover:bg-[#E2C47A] text-[#0A1628] font-semibold px-10 py-4 uppercase tracking-widest text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            >
              Request Membership
            </Link>
            <Link
              href="/about"
              className="border border-white/20 hover:border-white/50 text-white px-10 py-4 uppercase tracking-widest text-sm transition-all duration-200"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-[#C9A84C] to-transparent"
          />
        </motion.div>
      </section>

      {/* WHAT IS LEAGUEMED */}
      <section className="py-32 bg-[#060E1A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-6">About the Community</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Built by physicians.<br />For physician investors.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              LeagueMed was founded on a simple premise: the professionals who understand medicine best should have access to the private market opportunities within it. We curate, vet, and present deals exclusively to our member community — so your capital goes where your expertise already lives.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* INVESTMENT FOCUS AREAS */}
      <section className="py-32 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-4">Investment Focus</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Where We Invest</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {focusAreas.map((area) => (
                <motion.div
                  key={area.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, borderColor: "rgba(201,168,76,0.5)" }}
                  className="bg-[#0D1F3C] border border-[#C9A84C]/10 p-8 transition-all duration-300 cursor-default"
                >
                  <div className="text-3xl mb-4">{area.icon}</div>
                  <h3 className="font-serif text-xl font-bold mb-3 text-white">{area.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{area.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY MEMBERS JOIN */}
      <section className="py-32 bg-[#060E1A]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-20">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-4">Member Benefits</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Why Physicians Join</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {valueProps.map((vp) => (
                <motion.div key={vp.number} variants={fadeUp} className="relative">
                  <div className="text-[#C9A84C]/20 font-serif text-8xl font-bold absolute -top-4 -left-2 select-none">{vp.number}</div>
                  <div className="relative z-10 pt-8">
                    <h3 className="font-serif text-2xl font-bold mb-4">{vp.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{vp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FEATURED OPPORTUNITIES */}
      <section id="opportunities" className="py-32 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-4">Deal Flow</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Featured Opportunities</h2>
              <p className="text-gray-400 mt-4">Active investments available to current members.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: "Medical Technology", stage: "Series B", desc: "AI-powered diagnostic imaging platform serving 200+ hospital systems." },
                { type: "Life Sciences", stage: "Growth Equity", desc: "Specialty pharmaceutical company with three FDA-approved assets." },
                { type: "Healthcare Real Estate", stage: "Development", desc: "Class A medical office portfolio across 12 Sun Belt markets." },
              ].map((opp, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative bg-[#0D1F3C] border border-[#C9A84C]/10 overflow-hidden group"
                >
                  {/* Members only overlay */}
                  <div className="absolute inset-0 bg-[#0A1628]/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="border border-[#C9A84C]/40 px-6 py-3 mb-4">
                      <span className="text-[#C9A84C] text-xs uppercase tracking-widest">Members Only</span>
                    </div>
                    <Link href="/membership" className="text-white text-sm hover:text-[#C9A84C] transition-colors">Request Access →</Link>
                  </div>
                  <div className="p-8 blur-[2px] group-hover:blur-[4px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[#C9A84C] text-xs uppercase tracking-widest">{opp.type}</span>
                      <span className="text-gray-500 text-xs border border-gray-700 px-2 py-1">{opp.stage}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{opp.desc}</p>
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Min. Investment</span>
                        <span className="text-white">$██,███</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-500">Target Return</span>
                        <span className="text-white">██%+</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BY INVITATION ONLY CTA */}
      <section className="py-32 bg-gradient-to-br from-[#060E1A] to-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="border border-[#C9A84C]/20 p-16">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-6">Membership</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                By Invitation Only.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-10 text-lg">
                LeagueMed membership is limited and selective. We review every application personally. If you are a licensed physician or qualified medical professional with an interest in private market investing, we invite you to apply.
              </p>
              <Link
                href="/membership"
                className="inline-block bg-[#C9A84C] hover:bg-[#E2C47A] text-[#0A1628] font-semibold px-12 py-4 uppercase tracking-widest text-sm transition-all duration-200 hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]"
              >
                Request Membership
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
