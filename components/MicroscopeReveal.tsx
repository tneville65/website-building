"use client";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const investmentTypes = [
  "Medical Technology",
  "Life Sciences",
  "Healthcare Real Estate",
  "Biotech & Therapeutics",
  "Digital Health",
  "Medical Devices",
  "Healthcare AI",
  "Specialty Pharma",
];

export default function MicroscopeReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Lens zoom: starts small, grows as you scroll in
  const lensScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.2, 0.7, 1, 1.3]);
  const lensBlur = useTransform(scrollYProgress, [0, 0.25, 0.5], [8, 3, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const outerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle through investment types as scroll progresses
  const scrollProgress = useRef(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollProgress.current = v;
      const idx = Math.min(
        Math.floor(v * investmentTypes.length * 1.5),
        investmentTypes.length - 1
      );
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="py-40 bg-[#060E1A] relative" style={{ minHeight: "150vh" }}>
      <div className="sticky top-0 flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="text-center mb-16 z-10">
          <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-4">Investment Focus</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold">Where We Invest</h2>
        </div>

        {/* Microscope lens container */}
        <motion.div
          style={{ scale: lensScale, filter: lensBlur.get() > 0 ? `blur(${lensBlur.get()}px)` : "none", opacity: outerOpacity }}
          className="relative"
        >
          {/* Outer microscope ring */}
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Lens rings */}
            <div className="absolute inset-0 rounded-full border-4 border-[#C9A84C]/40 shadow-[0_0_60px_rgba(201,168,76,0.15),inset_0_0_60px_rgba(0,0,0,0.8)]" />
            <div className="absolute inset-4 rounded-full border-2 border-[#C9A84C]/20" />
            <div className="absolute inset-8 rounded-full border border-[#C9A84C]/10" />

            {/* Lens interior */}
            <div className="absolute inset-8 rounded-full bg-[#0A1628] overflow-hidden flex items-center justify-center">
              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-full h-px bg-[#C9A84C]/10" />
                <div className="absolute h-full w-px bg-[#C9A84C]/10" />
                <div className="absolute w-16 h-16 rounded-full border border-[#C9A84C]/20" />
              </div>

              {/* Investment type content inside lens */}
              <motion.div style={{ opacity: contentOpacity }} className="text-center px-6 relative z-10">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif text-lg md:text-xl font-bold text-[#C9A84C] leading-tight"
                >
                  {investmentTypes[activeIndex]}
                </motion.p>
                <div className="mt-3 w-8 h-px bg-[#C9A84C]/40 mx-auto" />
              </motion.div>

              {/* Particle/bokeh overlay */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(201,168,76,0.05) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(100,150,220,0.05) 0%, transparent 60%)"
                }}
              />
            </div>

            {/* Glare spot */}
            <div className="absolute top-6 left-8 w-8 h-8 rounded-full bg-white/5 blur-sm" />
            <div className="absolute top-8 left-10 w-3 h-3 rounded-full bg-white/10" />
          </div>
        </motion.div>

        {/* Investment list below lens */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto px-8"
        >
          {investmentTypes.map((type, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={i <= activeIndex ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`text-center py-4 px-3 border transition-all duration-500 ${
                i === activeIndex
                  ? "border-[#C9A84C]/50 bg-[#C9A84C]/10"
                  : "border-white/5"
              }`}
            >
              <p className={`text-xs uppercase tracking-widest transition-colors duration-300 ${
                i === activeIndex ? "text-[#C9A84C]" : "text-gray-600"
              }`}>
                {type}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
