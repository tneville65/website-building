"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEM_H = 44;

const columns = [
  { letter: "L", dir: 1, items: ["LIQUIDITY","LEVERAGE","LICENSED","LIFE SCIENCES","LONG-TERM","LUMINARY","LIQUID ASSETS","LEADERSHIP","LIMITED PARTNER","LIFE EXPECTANCY","LEVERAGE RATIO","LONGITUDINAL","LAB RESEARCH","LATERAL THINKING","LICENSED MD","L"] },
  { letter: "E", dir: -1, items: ["EQUITY","EXCLUSIVE","EXPERTISE","EMERGING","EVIDENCE","ENDURING","EARLY ACCESS","ENTERPRISE","EXPONENTIAL","EQUITY STAKE","EXIT MULTIPLE","EVIDENCE-BASED","ECONOMIC MOAT","ESOP","EXECUTION","E"] },
  { letter: "A", dir: 1, items: ["ACCESS","ACCREDITED","ADVANCED","ALPHA","ASSETS","ANNUAL RETURN","ASYMMETRIC","ALLOCATION","ARBITRAGE","ANCHOR INVESTOR","ACCREDITED MD","AGGREGATE","APPLIED SCIENCE","ANNUALIZED","ACCRUED VALUE","A"] },
  { letter: "G", dir: -1, items: ["GROWTH","GLOBAL","GENOMICS","GRADE A","GOVERNANCE","GAINS","GP ECONOMICS","GROSS RETURN","GENETICS","GROWTH EQUITY","GRANULAR DATA","GP COMMIT","GRANT FUNDING","GUIDED PORTFOLIO","GENOMIC MEDICINE","G"] },
  { letter: "U", dir: 1, items: ["UNIQUE","UPSIDE","ULTRA-HIGH","UNDERWRITTEN","UNIFIED","UTILITY","UNCORRELATED","UPMARKET","UNICORN","UNIT ECONOMICS","UNDERVALUED","UNLOCK VALUE","UPSIDE CAPTURE","UNLIMITED","UNLEVERED","U"] },
  { letter: "E", dir: -1, items: ["ELITE","EMERGING","EXPONENTIAL","EARLY STAGE","ENTERPRISE","EVIDENCE BASED","EXIT STRATEGY","EQUITY MULTIPLE","EXECUTION RISK","ENDOWMENT MODEL","EARLY ACCESS","ELITE PHYSICIANS","EMBEDDED ALPHA","ENHANCED YIELD","EMERGING BIOTECH","E"] },
  { letter: "M", dir: 1, items: ["MEDICINE","MEDICAL","MARKET RATE","MEMBERS ONLY","MERIT-BASED","MODERN PORTFOLIO","MED TECH","MILESTONE","MULTI-ASSET","MEZZANINE","MOLECULAR","MANAGED CARE","MARKET ACCESS","MILESTONE RETURN","MEDICAL GRADE","M"] },
  { letter: "E", dir: -1, items: ["EXCLUSIVE","EVIDENCE","EMERGING","ELITE","EXECUTION","EQUITY","ENTERPRISE","EARLY ACCESS","EXPONENTIAL","ENDURING VALUE","EVIDENCE-BASED","ELITE NETWORK","ECONOMIC RETURN","EXPERT UNDERWRITING","EVOLVING MARKET","E"] },
  { letter: "D", dir: 1, items: ["DEALS","DUE DILIGENCE","DISTRIBUTION","DIRECT ACCESS","DIVERSIFIED","DEPLOYMENT","DATA-DRIVEN","DIAGNOSTIC","DEAL FLOW","DEBT STRUCTURE","DIFFERENTIATED","DIRECT INVEST","DISTRIBUTION RATE","DOMAIN EXPERTISE","DIAGNOSTIC AI","D"] },
];

function SlotColumn({ col }: { col: typeof columns[0]; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const wrap = wrapRef.current;
    if (!inner || !wrap) return;

    const count = col.items.length;
    const landIndex = count - 1;
    const landY = -(landIndex * ITEM_H);
    const startY = col.dir === 1
      ? 0
      : -(count * ITEM_H * 0.55);

    gsap.set(inner, { y: startY });

    // Pinned section handles global progress — column just needs to animate
    return () => {};
  }, [col]);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden flex flex-col items-center"
      style={{ height: `${ITEM_H * 5}px`, width: "100%" }}
    >
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0A1628] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0A1628] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-11 border-y border-[#C9A84C]/20 bg-[#C9A84C]/5 z-0" />

      <div ref={innerRef} className="absolute top-0 flex flex-col items-center w-full slot-inner" data-dir={col.dir} data-count={col.items.length}>
        {col.items.map((item, i) => {
          const isLetter = i === col.items.length - 1;
          return (
            <div key={i} className="flex items-center justify-center w-full" style={{ height: `${ITEM_H}px`, minHeight: `${ITEM_H}px` }}>
              <span
                className={`text-center leading-tight select-none ${
                  isLetter
                    ? "font-serif text-3xl font-bold text-[#C9A84C]"
                    : "text-[9px] uppercase tracking-widest text-gray-600 font-medium"
                }`}
                style={!isLetter ? { writingMode: "vertical-lr", textOrientation: "mixed", transform: "rotate(180deg)", maxHeight: `${ITEM_H - 4}px`, overflow: "hidden" } : {}}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SlotMachine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const colInners = inner.querySelectorAll<HTMLDivElement>(".slot-inner");

    // Initialize positions
    colInners.forEach((col) => {
      const dir = parseInt(col.dataset.dir || "1");
      const count = parseInt(col.dataset.count || "16");
      const landY = -((count - 1) * ITEM_H);
      const startY = dir === 1 ? 0 : -(count * ITEM_H * 0.55);
      gsap.set(col, { y: startY });

      // Store targets
      (col as HTMLDivElement & { _startY?: number; _landY?: number })._startY = startY;
      (col as HTMLDivElement & { _startY?: number; _landY?: number })._landY = landY;
    });

    // Pinned scroll trigger — page pins until LEAGUEMED is spelled
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",  // pin for 2x viewport height of scrolling
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    // Animate all columns in the timeline
    colInners.forEach((col) => {
      const typed = col as HTMLDivElement & { _startY?: number; _landY?: number };
      const startY = typed._startY ?? 0;
      const landY = typed._landY ?? 0;

      tl.to(col, {
        y: landY,
        ease: "power2.inOut",
        duration: 1,
      }, 0); // all start at same time
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A1628] relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen py-16">
        <div className="text-center mb-8">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em]">Scroll to reveal</p>
        </div>

        <div
          ref={innerRef}
          className="grid gap-1 w-full max-w-7xl px-6"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((col, i) => (
            <SlotColumn key={i} col={col} index={i} />
          ))}
        </div>

        <div
          className="grid gap-1 mt-2 w-full max-w-7xl px-6"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((col, i) => (
            <div key={i} className="text-center">
              <span className="text-[#C9A84C]/15 font-serif text-xs font-bold uppercase tracking-widest">
                {col.letter}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
