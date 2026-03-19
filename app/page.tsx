"use client";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import SlotMachine from "@/components/SlotMachine";

const ParticleGlobe = dynamic(() => import("@/components/ParticleGlobe"), { ssr: false });

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="text-center"
    >
      <div className="font-serif text-5xl md:text-6xl font-bold text-[#C9A84C] mb-2">{value}</div>
      <div className="text-gray-500 text-xs uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

const focusAreas = [
  { icon: "🔬", title: "Medical Technology", desc: "AI diagnostics, robotic surgery, next-gen devices transforming patient outcomes at scale." },
  { icon: "🧬", title: "Life Sciences", desc: "Pharmaceutical, biotech, and genomic companies at the frontier of human health." },
  { icon: "🏥", title: "Healthcare Real Estate", desc: "Class A medical office, surgery centers, and specialty facilities across high-demand markets." },
  { icon: "💊", title: "Biotech & Therapeutics", desc: "Early and growth-stage companies developing next-generation treatments and cures." },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#030810] via-[#0A1628] to-[#0D1F3C]" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        {/* 3D Particle Globe */}
        <ParticleGlobe />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,transparent_20%,#0A1628_80%)]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-10 font-medium"
          >
            Membership by Invitation Only
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.95] tracking-tight"
            >
              Where Medicine
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.65, ease: "easeInOut" }}
              className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.95] tracking-tight text-[#C9A84C]"
            >
              Meets Capital.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeInOut" }}
            className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12"
          >
            An exclusive private investment community for physicians and medical professionals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: "easeInOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/membership"
              className="group relative overflow-hidden bg-[#C9A84C] text-[#0A1628] font-semibold px-10 py-4 uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_60px_rgba(201,168,76,0.5)]"
            >
              <span className="relative z-10">Request Membership</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>
            <Link
              href="/about"
              className="border border-white/20 hover:border-[#C9A84C]/50 text-white hover:text-[#C9A84C] px-10 py-4 uppercase tracking-widest text-sm transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent origin-top"
          />
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#060E1A]">
        <Marquee />
      </div>

      {/* WHAT IS LEAGUEMED */}
      <section className="py-40 bg-[#060E1A]">
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div variants={fadeUp}>
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-8">The Community</p>
              <h2 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-8">
                Built by physicians.<br />For physician<br />investors.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                LeagueMed was founded on a simple conviction: the professionals who understand medicine best should have access to the private market opportunities within it.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We curate, vet, and present deals exclusively to our member community — so your capital goes where your expertise already lives.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-px bg-[#C9A84C]/10">
              {[
                { stat: "2018", label: "Founded" },
                { stat: "$40M+", label: "Capital Deployed" },
                { stat: "500+", label: "Members" },
                { stat: "100%", label: "Physician-Led" },
              ].map((item) => (
                <div key={item.label} className="bg-[#060E1A] p-10 flex flex-col justify-center">
                  <StatCounter value={item.stat} label={item.label} />
                </div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* INVESTMENT FOCUS */}
      <section className="py-40 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-20">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-6">Investment Focus</p>
              <h2 className="font-serif text-5xl md:text-6xl font-bold max-w-xl">Where We Invest</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#C9A84C]/10">
              {focusAreas.map((area, i) => (
                <motion.div
                  key={area.title}
                  variants={fadeUp}
                  whileHover={{ backgroundColor: "#0D2040" }}
                  className="bg-[#0A1628] p-12 transition-colors duration-500 cursor-default group"
                >
                  <div className="text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{area.icon}</div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-serif text-2xl font-bold">{area.title}</h3>
                    <span className="text-[#C9A84C]/30 text-xs font-mono mt-1">0{i + 1}</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{area.desc}</p>
                  <div className="mt-8 w-8 h-px bg-[#C9A84C]/30 group-hover:w-16 group-hover:bg-[#C9A84C] transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SECOND MARQUEE reversed */}
      <div className="bg-[#060E1A]">
        <Marquee direction={-1} />
      </div>

      <SlotMachine />

      {/* FEATURED OPPORTUNITIES */}
      <section id="opportunities" className="py-40 bg-[#060E1A]">
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-6">Deal Flow</p>
                <h2 className="font-serif text-5xl md:text-6xl font-bold">Featured<br />Opportunities</h2>
              </div>
              <p className="text-gray-500 max-w-xs text-sm leading-relaxed">Active investments available exclusively to current members.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C9A84C]/10">
              {[
                { type: "Medical Technology", stage: "Series B", desc: "AI-powered diagnostic imaging platform serving 200+ hospital systems." },
                { type: "Life Sciences", stage: "Growth Equity", desc: "Specialty pharmaceutical company with three FDA-approved assets." },
                { type: "Healthcare Real Estate", stage: "Development", desc: "Class A medical office portfolio across 12 Sun Belt markets." },
              ].map((opp, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative bg-[#060E1A] overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Members only overlay */}
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-[#060E1A]/60 z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="border border-[#C9A84C]/50 px-6 py-3 mb-4">
                      <span className="text-[#C9A84C] text-xs uppercase tracking-widest">Members Only</span>
                    </div>
                    <Link href="/membership" className="text-white text-xs hover:text-[#C9A84C] transition-colors uppercase tracking-widest">
                      Request Access →
                    </Link>
                  </div>
                  <div className="p-10 select-none">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-[#C9A84C] text-xs uppercase tracking-widest">{opp.type}</span>
                      <span className="text-gray-600 text-xs border border-gray-800 px-3 py-1">{opp.stage}</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-10">{opp.desc}</p>
                    <div className="border-t border-white/5 pt-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Investment</span>
                        <span className="text-white font-mono">$██,███</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target Return</span>
                        <span className="text-white font-mono">██% IRR</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Horizon</span>
                        <span className="text-white font-mono">█-█ years</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <AnimatedSection>
            <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-10">Membership</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-6xl md:text-8xl font-bold mb-10 leading-tight">
              By Invitation<br />Only.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto mb-14">
              We review every application personally. Membership is limited, selective, and intentional.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/membership"
                className="inline-block bg-[#C9A84C] hover:bg-[#E2C47A] text-[#0A1628] font-semibold px-14 py-5 uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_80px_rgba(201,168,76,0.4)]"
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
