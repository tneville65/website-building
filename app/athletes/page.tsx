"use client";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ── Animated counter ──────────────────────────────────────────────────────────
function CountUp({ end, prefix = "", suffix = "", duration = 2 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); return; }
      setVal(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// ── Animated section ──────────────────────────────────────────────────────────
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const fadeLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
const fadeRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ── Particle field ────────────────────────────────────────────────────────────
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AthletesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#080808] text-white min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030303] via-[#080808] to-[#0A0F1A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,rgba(201,168,76,0.06),transparent)]" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        {/* Particles */}
        <GoldParticles />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#080808_85%)]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-[#C9A84C] text-xs uppercase tracking-[0.5em] mb-10">
            The KeyArx Group · Athlete Financial Strategy
          </motion.p>

          {/* Animated headline */}
          {["What's your", "money really doing?"].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`font-serif leading-[1.0] font-bold block ${
                  i === 1 ? "text-[#C9A84C] mb-8" : "text-white mb-2"
                } text-5xl md:text-7xl lg:text-8xl`}
              >
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-3">
            Most athletes leave <span className="text-white font-bold">$20–30 million</span> on the table.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
            className="text-gray-500 text-lg mb-14">
            Not from bad decisions — from the wrong structure.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href="#number"
              className="bg-[#C9A84C] hover:bg-[#E2C47A] text-black font-bold px-12 py-5 uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_60px_rgba(201,168,76,0.6)] cursor-pointer"
            >
              See Your Number
            </MagneticButton>
            <MagneticButton
              href="#strategy"
              className="border border-white/20 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] text-white px-12 py-5 uppercase tracking-widest text-sm transition-all duration-300 cursor-pointer"
            >
              How It Works
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-gray-600 text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.div animate={{ scaleY: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-10 bg-gradient-to-b from-[#C9A84C] to-transparent origin-top" />
        </motion.div>
      </section>

      {/* ── THE BIG NUMBER ── */}
      <section id="number" className="py-32 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04),transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
          <AnimSection>
            <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-8">The Difference</motion.p>
            <motion.div variants={fadeUp} className="mb-6">
              <span className="font-serif font-bold text-[#C9A84C] leading-none" style={{ fontSize: "clamp(5rem, 15vw, 10rem)" }}>
                +$<CountUp end={30} duration={2.5} />M
              </span>
            </motion.div>
            <motion.p variants={fadeUp} className="text-white text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-6">
              In Additional Tax-Free Income
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto">
              Same $250,000/year. Same 10-year window.<br />Completely different structure.
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-32 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-8">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-6">Side by Side</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Same money.<br /><span className="text-[#C9A84C]">Wildly different outcome.</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Traditional */}
              <motion.div variants={fadeLeft} className="bg-[#111] border border-white/8 p-10">
                <p className="text-gray-600 text-xs uppercase tracking-widest mb-8 pb-4 border-b border-white/5">Traditional Approach</p>
                {[
                  ["Annual Contribution", "$250,000 / year"],
                  ["Years", "10 years"],
                  ["Tax Treatment", "Taxable ✗"],
                  ["Annual Income Age 51–100", "~$350,000 / yr"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className={`font-mono text-sm ${val.includes("✗") ? "text-red-400" : "text-white"}`}>{val}</span>
                  </div>
                ))}
              </motion.div>

              {/* KeyArx */}
              <motion.div variants={fadeRight} className="bg-[#C9A84C]/6 border border-[#C9A84C]/35 p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C9A84C] text-black text-[9px] uppercase tracking-widest px-4 py-1.5 font-bold">KeyArx Strategy</div>
                <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-8 pb-4 border-b border-[#C9A84C]/15">Premium Finance Structure</p>
                {[
                  ["Annual Contribution", "$250,000 / year", false],
                  ["Years", "10 years", false],
                  ["Tax Treatment", "100% Tax-Free ✓", true],
                  ["Annual Income Age 51–100", "$772,000 / yr", true],
                ].map(([label, val, gold]) => (
                  <div key={label as string} className="flex justify-between items-center py-4 border-b border-[#C9A84C]/8 last:border-0">
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className={`font-mono font-bold ${gold ? "text-[#C9A84C] text-lg" : "text-white text-sm"}`}>{val}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Gap callout */}
            <motion.div variants={fadeUp} className="mt-6 border border-[#C9A84C]/20 bg-[#C9A84C]/4 p-10 text-center">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">The lifetime gap</p>
              <div className="font-serif font-bold text-[#C9A84C] mb-3" style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}>
                $30M+
              </div>
              <p className="text-gray-400">additional tax-free income · same $2.5M invested · completely different structure</p>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ── TWO PATHS ── */}
      <section id="strategy" className="py-32 bg-[#030303]">
        <div className="max-w-5xl mx-auto px-8">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-6">The Strategy</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">Two paths.<br /><span className="text-[#C9A84C]">Same destination: tax-free wealth.</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  num: "01",
                  title: "Overfunded Life Insurance",
                  body: "$250K/year for 10 years builds tax-free cash that pays $772,000/year from age 51 to 100. Gains lock in — losses don't. Death benefit included.",
                  stat: "$772K/yr",
                  statLabel: "Tax-free income, age 51–100",
                  dir: fadeLeft,
                },
                {
                  num: "02",
                  title: "Premium Financing",
                  body: "Your $250K controls a $1M+ policy. Nearly 2x returns in 10 years — equivalent to 14%+ market returns. The bank's capital works for you.",
                  stat: "~2x Returns",
                  statLabel: "vs. traditional investing, same outlay",
                  dir: fadeRight,
                },
              ].map((path) => (
                <motion.div key={path.num} variants={path.dir} className="border border-white/10 hover:border-[#C9A84C]/30 p-10 transition-colors duration-500 group">
                  <div className="text-[#C9A84C]/40 font-mono text-xs uppercase tracking-widest mb-6 group-hover:text-[#C9A84C]/70 transition-colors">Path {path.num}</div>
                  <h3 className="font-serif text-2xl font-bold mb-4">{path.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">{path.body}</p>
                  <div className="bg-white/5 p-6 group-hover:bg-[#C9A84C]/8 transition-colors duration-500">
                    <div className="font-serif text-3xl font-bold text-[#C9A84C] mb-1">{path.stat}</div>
                    <div className="text-gray-600 text-xs uppercase tracking-wider">{path.statLabel}</div>
                  </div>
                  <div className="mt-6 w-8 h-px bg-[#C9A84C]/30 group-hover:w-20 group-hover:bg-[#C9A84C] transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-32 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-8">
          <AnimSection className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div variants={fadeLeft}>
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-8">The KeyArx Group</p>
              <h2 className="font-serif text-4xl font-bold leading-tight mb-6">We don't sell products.<br /><span className="text-[#C9A84C]">We engineer structures.</span></h2>
              <p className="text-gray-400 leading-relaxed mb-6">Commission-neutral. Carrier-direct. We've built tax-free income structures for physicians and high earners for over 30 years.</p>
              <p className="text-gray-600 leading-relaxed text-sm">We work alongside your advisory team — including Rise Advisors — to add a tax-free income layer your current plan likely doesn't have.</p>
            </motion.div>
            <motion.div variants={fadeRight} className="grid grid-cols-2 gap-px bg-[#C9A84C]/10">
              {[
                ["30+", "Years in Practice"],
                ["$2.5M", "Same Investment"],
                ["$772K", "Annual Tax-Free Income"],
                ["$30M+", "Lifetime Advantage"],
              ].map(([val, label]) => (
                <div key={label} className="bg-[#080808] p-8 text-center">
                  <div className="font-serif text-3xl font-bold text-[#C9A84C] mb-2">{val}</div>
                  <div className="text-gray-600 text-xs uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-8">
          <AnimSection>
            <motion.div variants={fadeUp} className="border border-[#C9A84C]/20 p-16 text-center">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.5em] mb-8">Ready?</p>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Let's run<br /><span className="text-[#C9A84C]">your numbers.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg mx-auto">
                No pressure. No pitch. A straight conversation about what your money could actually be doing.
              </p>
              <MagneticButton
                href="mailto:paul@keyarx.com?subject=Athlete Strategy — Let's Talk"
                className="inline-block bg-[#C9A84C] hover:bg-[#E2C47A] text-black font-bold px-14 py-5 uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_80px_rgba(201,168,76,0.5)] cursor-pointer"
              >
                Start the Conversation
              </MagneticButton>
              <p className="text-gray-700 text-xs mt-10 uppercase tracking-widest">
                The KeyArx Group · paul@keyarx.com · (732) 983-9830
              </p>
            </motion.div>
          </AnimSection>
        </div>
      </section>

    </div>
  );
}
