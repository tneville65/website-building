"use client";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Each column scrolls to land on one letter of LEAGUEMED
// The columns alternate direction (odd = down, even = up)
const columns = [
  {
    letter: "L",
    words: ["LIFE SCIENCES", "LIQUIDITY", "LEVERAGE", "LONG-TERM", "LICENSED", "LEAGUEMED", "LUMINARY", "LIFE SCIENCES"],
    landOn: "LEAGUEMED",
    dir: 1,
  },
  {
    letter: "E",
    words: ["EQUITY", "EXCLUSIVE", "EXPERTISE", "EMERGING", "EVIDENCE", "LEAGUEMED", "ENDURING", "EQUITY"],
    landOn: "LEAGUEMED",
    dir: -1,
  },
  {
    letter: "A",
    words: ["ACCESS", "ACCREDITED", "ADVANCED", "ALPHA", "ASSETS", "LEAGUEMED", "ANNUAL", "ACCESS"],
    landOn: "LEAGUEMED",
    dir: 1,
  },
  {
    letter: "G",
    words: ["GROWTH", "GLOBAL", "GENOMICS", "GRADE A", "GOVERNANCE", "LEAGUEMED", "GAINS", "GROWTH"],
    landOn: "LEAGUEMED",
    dir: -1,
  },
  {
    letter: "U",
    words: ["UNIQUE", "UPSIDE", "ULTRA", "UNDERWRITTEN", "UNIFIED", "LEAGUEMED", "UTILITY", "UNIQUE"],
    landOn: "LEAGUEMED",
    dir: 1,
  },
  {
    letter: "E",
    words: ["ELITE", "EMERGING", "EXPONENTIAL", "EARLY ACCESS", "ENTERPRISE", "LEAGUEMED", "EQUITY", "ELITE"],
    landOn: "LEAGUEMED",
    dir: -1,
  },
  {
    letter: "M",
    words: ["MEDICINE", "MEDICAL", "MARKET", "MEMBERS", "MERIT", "LEAGUEMED", "MODERN", "MEDICINE"],
    landOn: "LEAGUEMED",
    dir: 1,
  },
  {
    letter: "E",
    words: ["EXCLUSIVE", "EVIDENCE", "EMERGING", "ELITE", "EXECUTION", "LEAGUEMED", "EQUITY", "EXCLUSIVE"],
    landOn: "LEAGUEMED",
    dir: -1,
  },
  {
    letter: "D",
    words: ["DEALS", "DUE DILIGENCE", "DISTRIBUTION", "DIRECT", "DIVERSIFIED", "LEAGUEMED", "DEPLOYMENT", "DEALS"],
    landOn: "LEAGUEMED",
    dir: 1,
  },
];

function Column({ col, index }: { col: typeof columns[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const itemHeight = 48;
    const totalItems = col.words.length;
    const landIndex = col.words.findIndex(w => w === "LEAGUEMED");
    const landY = -(landIndex * itemHeight);

    // Start position — offset based on direction
    const startY = col.dir === 1 ? -(totalItems * itemHeight * 0.3) : -(totalItems * itemHeight * 0.7);
    gsap.set(el, { y: startY });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      end: "center 30%",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        // Ease into landing position
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentY = startY + (landY - startY) * eased;
        gsap.set(el, { y: currentY });
      },
    });

    return () => trigger.kill();
  }, [col]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center overflow-hidden"
      style={{ height: "240px" }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#060E1A] to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#060E1A] to-transparent z-10 pointer-events-none" />

      {/* Gold highlight bar in center */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-12 border-y border-[#C9A84C]/20 bg-[#C9A84C]/5 z-0 pointer-events-none" />

      <div ref={ref} className="flex flex-col items-center gap-0 relative">
        {col.words.map((word, i) => (
          <div
            key={i}
            className="h-12 flex items-center justify-center text-center px-1"
            style={{ minHeight: "48px" }}
          >
            <span
              className={`text-xs uppercase tracking-widest font-medium transition-colors leading-tight text-center ${
                word === "LEAGUEMED"
                  ? "text-[#C9A84C] text-sm font-bold"
                  : "text-gray-600"
              }`}
              style={{ writingMode: "vertical-lr", textOrientation: "mixed", transform: "rotate(180deg)" }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SlotMachine() {
  const sectionRef = useRef(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        end: "top 40%",
        scrub: 1,
      }
    });
    tl.from(titleRef.current, { opacity: 0, y: 40, duration: 1 });
  }, []);

  return (
    <section ref={sectionRef} className="py-40 bg-[#060E1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div ref={titleRef} className="text-center mb-20">
          <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-6">The Opportunity</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold">
            Every Column.<br />One Community.
          </h2>
          <p className="text-gray-500 mt-6 text-sm uppercase tracking-widest">Scroll to reveal</p>
        </div>

        <div className="relative">
          <div className="grid gap-2 justify-center"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
          >
            {columns.map((col, i) => (
              <div key={i} className="relative">
                <Column col={col} index={i} />
              </div>
            ))}
          </div>

          {/* LEAGUEMED spelled out at bottom */}
          <div className="flex justify-center mt-4 gap-2">
            {columns.map((col, i) => (
              <div
                key={i}
                className="font-serif text-2xl md:text-4xl font-bold text-[#C9A84C]/20 w-full text-center"
              >
                {col.letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
