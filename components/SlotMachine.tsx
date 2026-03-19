"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEM_H = 44;

const columns = [
  {
    letter: "L",
    dir: 1,
    items: ["LIQUIDITY","LEVERAGE","LICENSED","LIFE SCIENCES","LONG-TERM","LUMINARY","LIQUID ASSETS","LEADERSHIP","LIMITED PARTNER","LIFE EXPECTANCY","LEVERAGE RATIO","LONGITUDINAL","LAB RESEARCH","LATERAL THINKING","LICENSED MD","L"],
  },
  {
    letter: "E",
    dir: -1,
    items: ["EQUITY","EXCLUSIVE","EXPERTISE","EMERGING","EVIDENCE","ENDURING","EARLY ACCESS","ENTERPRISE","EXPONENTIAL","EQUITY STAKE","EXIT MULTIPLE","EVIDENCE-BASED","ECONOMIC MOAT","ESOP","EXECUTION","E"],
  },
  {
    letter: "A",
    dir: 1,
    items: ["ACCESS","ACCREDITED","ADVANCED","ALPHA","ASSETS","ANNUAL RETURN","ASYMMETRIC","ALLOCATION","ARBITRAGE","ANCHOR INVESTOR","ACCREDITED MD","AGGREGATE","APPLIED SCIENCE","ANNUALIZED","ACCRUED VALUE","A"],
  },
  {
    letter: "G",
    dir: -1,
    items: ["GROWTH","GLOBAL","GENOMICS","GRADE A","GOVERNANCE","GAINS","GP ECONOMICS","GROSS RETURN","GENETICS","GROWTH EQUITY","GRANULAR DATA","GP COMMIT","GRANT FUNDING","GUIDED PORTFOLIO","GENOMIC MEDICINE","G"],
  },
  {
    letter: "U",
    dir: 1,
    items: ["UNIQUE","UPSIDE","ULTRA-HIGH NET WORTH","UNDERWRITTEN","UNIFIED","UTILITY","UNCORRELATED","UPMARKET","UNICORN","UNIT ECONOMICS","UNDERVALUED","UNLOCK VALUE","UPSIDE CAPTURE","UNLIMITED POTENTIAL","UNLEVERED RETURN","U"],
  },
  {
    letter: "E",
    dir: -1,
    items: ["ELITE","EMERGING","EXPONENTIAL","EARLY STAGE","ENTERPRISE VALUE","EVIDENCE BASED","EXIT STRATEGY","EQUITY MULTIPLE","EXECUTION RISK","ENDOWMENT MODEL","EARLY ACCESS","ELITE PHYSICIANS","EMBEDDED ALPHA","ENHANCED YIELD","EMERGING BIOTECH","E"],
  },
  {
    letter: "M",
    dir: 1,
    items: ["MEDICINE","MEDICAL","MARKET RATE","MEMBERS ONLY","MERIT-BASED","MODERN PORTFOLIO","MED TECH","MILESTONE","MULTI-ASSET","MEZZANINE","MOLECULAR","MANAGED CARE","MARKET ACCESS","MILESTONE RETURN","MEDICAL GRADE","M"],
  },
  {
    letter: "E",
    dir: -1,
    items: ["EXCLUSIVE","EVIDENCE","EMERGING","ELITE","EXECUTION","EQUITY","ENTERPRISE","EARLY ACCESS","EXPONENTIAL","ENDURING VALUE","EVIDENCE-BASED MD","ELITE NETWORK","ECONOMIC RETURN","EXPERT UNDERWRITING","EVOLVING MARKET","E"],
  },
  {
    letter: "D",
    dir: 1,
    items: ["DEALS","DUE DILIGENCE","DISTRIBUTION","DIRECT ACCESS","DIVERSIFIED","DEPLOYMENT","DATA-DRIVEN","DIAGNOSTIC","DEAL FLOW","DEBT STRUCTURE","DIFFERENTIATED","DIRECT INVEST","DISTRIBUTION RATE","DOMAIN EXPERTISE","DIAGNOSTIC AI","D"],
  },
];

function SlotColumn({ col, index }: { col: typeof columns[0]; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const count = col.items.length;
    const landIndex = count - 1; // last item is the letter
    const landY = -(landIndex * ITEM_H);
    const startY = col.dir === 1
      ? -(count * ITEM_H * 0.05)
      : -(count * ITEM_H * 0.6);

    gsap.set(inner, { y: startY });

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top 95%",
      end: "top 20%",
      scrub: 0.5,
      onUpdate: (self) => {
        // Snap to end by 70% scroll progress
        const p = Math.min(self.progress / 0.7, 1);
        const eased = p < 0.6
          ? p / 0.6
          : 1 - Math.pow(1 - ((p - 0.6) / 0.4), 3);
        const y = startY + (landY - startY) * eased;
        gsap.set(inner, { y });
      },
    });

    return () => trigger.kill();
  }, [col]);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden flex flex-col items-center"
      style={{ height: `${ITEM_H * 5}px`, width: "100%" }}
    >
      {/* Fades */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A1628] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A1628] to-transparent z-10 pointer-events-none" />

      {/* Center highlight */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-11 border-y border-[#C9A84C]/25 bg-[#C9A84C]/5 z-0" />

      <div ref={innerRef} className="absolute top-0 flex flex-col items-center w-full">
        {col.items.map((item, i) => {
          const isLetter = i === col.items.length - 1;
          return (
            <div
              key={i}
              className="flex items-center justify-center w-full"
              style={{ height: `${ITEM_H}px`, minHeight: `${ITEM_H}px` }}
            >
              <span
                className={`text-center leading-tight select-none transition-colors ${
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

  return (
    <section ref={sectionRef} className="bg-[#0A1628] pt-0 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-4">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em]">Scroll to reveal</p>
        </div>

        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((col, i) => (
            <SlotColumn key={i} col={col} index={i} />
          ))}
        </div>

        {/* Letters spelled out below */}
        <div
          className="grid gap-1 mt-1"
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
