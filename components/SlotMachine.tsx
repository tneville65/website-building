"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEM_H = 48;

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

export default function SlotMachine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const count = columns[0].items.length;
    const landY = -((count - 1) * ITEM_H);

    // Set initial positions — start off-screen per direction
    colRefs.current.forEach((col, i) => {
      if (!col) return;
      const dir = columns[i].dir;
      const startY = dir === 1 ? 0 : -(count * ITEM_H * 0.6);
      gsap.set(col, { y: startY });
      (col as any)._startY = startY;
    });

    // Pin the section while columns animate to their letters
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // All columns animate simultaneously
    colRefs.current.forEach((col, i) => {
      if (!col) return;
      const startY = (col as any)._startY ?? 0;
      tl.fromTo(col, { y: startY }, { y: landY, ease: "power2.inOut", duration: 1 }, 0);
    });

    // Fade in the "scroll to reveal" text
    if (titleRef.current) {
      tl.to(titleRef.current, { opacity: 0, duration: 0.3 }, 0.7);
    }

    return () => ScrollTrigger.getAll().forEach(t => { if (t.vars?.trigger === section) t.kill(); });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A1628] overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Scroll hint */}
        <div ref={titleRef} className="mb-6 text-center">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.5em]">Scroll to reveal</p>
        </div>

        {/* Columns grid */}
        <div
          className="grid w-full px-4 md:px-8 gap-0.5"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)`, maxWidth: "900px" }}
        >
          {columns.map((col, i) => (
            <div
              key={i}
              className="relative overflow-hidden flex flex-col items-center"
              style={{ height: `${ITEM_H * 5}px` }}
            >
              {/* Top/bottom fade */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0A1628] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0A1628] to-transparent z-10 pointer-events-none" />
              {/* Center highlight - solid gold box */}
              <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-12 bg-[#C9A84C]/15 border border-[#C9A84C]/50 z-0" />

              {/* Scrolling content */}
              <div
                ref={el => { colRefs.current[i] = el; }}
                className="absolute top-0 flex flex-col items-center w-full"
              >
                {col.items.map((item, j) => {
                  const isLetter = j === col.items.length - 1;
                  return (
                    <div
                      key={j}
                      className="flex items-center justify-center w-full"
                      style={{ height: `${ITEM_H}px`, minHeight: `${ITEM_H}px` }}
                    >
                      {isLetter ? (
                        <span
                          className="font-serif font-bold text-[#C9A84C] relative z-20"
                          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                        >
                          {item}
                        </span>
                      ) : (
                        <span
                          className="text-gray-600 font-medium"
                          style={{
                            fontSize: "8px",
                            writingMode: "vertical-lr",
                            textOrientation: "mixed",
                            transform: "rotate(180deg)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            maxHeight: `${ITEM_H - 6}px`,
                            overflow: "hidden",
                            display: "block",
                          }}
                        >
                          {item}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* LEAGUEMED label below */}
        <div
          className="grid mt-2 px-4 md:px-8 gap-0.5"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)`, maxWidth: "900px", width: "100%" }}
        >
          {columns.map((col, i) => (
            <div key={i} className="text-center">
              <span className="text-[#C9A84C]/20 font-serif text-xs font-bold uppercase tracking-widest">
                {col.letter}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
