"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const leadership = [
  { name: "Eugene Malhoky", title: "Founder & CEO", bio: "Founder of LeagueMed and pioneer in connecting medical professionals with private market investment opportunities." },
  { name: "Advisory Board", title: "Investment Committee", bio: "LeagueMed's investment committee is composed of board-certified physicians, private equity professionals, and healthcare executives." },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-[#060E1A] to-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-6">Our Mission</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-serif text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Investing at the<br /><span className="text-[#C9A84C]">Intersection of Medicine</span><br />and Capital Markets.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            LeagueMed was built on a conviction: the people who understand medicine best should have access to the most compelling investment opportunities within it.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[#060E1A]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp}>
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-6">Who We Are</p>
              <h2 className="font-serif text-4xl font-bold mb-6">A private community. Not a platform.</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                LeagueMed is not a crowdfunding site. We are not a marketplace. We are a curated membership community where qualified physicians and medical professionals gain access to vetted private market opportunities — deals that are typically reserved for institutional investors and ultra-high-net-worth individuals.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Every deal on LeagueMed has been reviewed by our investment committee before it reaches members. Every member has been reviewed by us before they receive access. The selectivity is intentional. The quality is non-negotiable.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {[
                { stat: "2018", label: "Founded" },
                { stat: "$40M+", label: "Capital Deployed" },
                { stat: "500+", label: "Members" },
                { stat: "100%", label: "Physician-Led" },
              ].map((item) => (
                <div key={item.label} className="bg-[#0D1F3C] border border-[#C9A84C]/10 p-8 text-center">
                  <div className="font-serif text-3xl font-bold text-[#C9A84C] mb-2">{item.stat}</div>
                  <div className="text-gray-500 text-sm uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-4">The Team</p>
              <h2 className="font-serif text-4xl font-bold">Leaders & Innovators</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leadership.map((person) => (
                <motion.div key={person.name} variants={fadeUp} className="bg-[#0D1F3C] border border-[#C9A84C]/10 p-10">
                  <div className="w-16 h-16 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full mb-6 flex items-center justify-center">
                    <span className="text-[#C9A84C] text-xl font-serif font-bold">{person.name[0]}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-1">{person.name}</h3>
                  <p className="text-[#C9A84C] text-sm uppercase tracking-wide mb-4">{person.title}</p>
                  <p className="text-gray-400 leading-relaxed">{person.bio}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-[#060E1A]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <AnimatedSection>
            <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-12">Trusted Partners</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-12 items-center">
              {["The KeyArx Group", "League Capital Markets", "Alliance Global Partners", "MGIS"].map((partner) => (
                <div key={partner} className="text-gray-600 hover:text-gray-400 transition-colors text-sm uppercase tracking-widest font-medium">
                  {partner}
                </div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0A1628] text-center">
        <AnimatedSection>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl font-bold mb-6">Ready to Apply?</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 mb-8 max-w-lg mx-auto">Membership is limited. We review every application personally.</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/membership" className="inline-block bg-[#C9A84C] hover:bg-[#E2C47A] text-[#0A1628] font-semibold px-10 py-4 uppercase tracking-widest text-sm transition-all duration-200">
              Request Membership
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>
    </>
  );
}
