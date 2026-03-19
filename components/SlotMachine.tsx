"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEM_H = 52;
const VISIBLE_ROWS = 5;
const CENTER_ROW = Math.floor(VISIBLE_ROWS / 2); // row 2 (0-indexed) = center

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
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const viewHeight = ITEM_H * VISIBLE_ROWS;

    colRefs.current.forEach((col, i) => {
      if (!col) return;
      const count = columns[i].items.length;
      const dir = columns[i].dir;

      // The letter is the last item. We want it to land at CENTER_ROW.
      // landY positions the strip so item[count-1] is at CENTER_ROW
      const landY = -(count - 1 - CENTER_ROW) * ITEM_H;

      // Start offset — show words scrolling through, not the letter
      // Both directions start away from landY by the same scroll distance
      const scrollDistance = count * ITEM_H * 0.5;
      const startY = dir === 1
        ? landY - scrollDistance
        : landY + scrollDistance;

      gsap.set(col, { y: startY });
      (col as any)._startY = startY;
      (col as any)._landY = landY;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        onUpdate: (self) => {
          // When 90% complete, light up the boxes
          if (self.progress > 0.7) {
            boxRefs.current.forEach((box) => {
              if (box) {
                box.style.backgroundColor = "rgba(201, 168, 76, 0.2)";
                box.style.borderColor = "rgba(201, 168, 76, 0.8)";
                box.style.boxShadow = "0 0 20px rgba(201, 168, 76, 0.3)";
              }
            });
          } else {
            boxRefs.current.forEach((box) => {
              if (box) {
                box.style.backgroundColor = "rgba(201, 168, 76, 0.05)";
                box.style.borderColor = "rgba(201, 168, 76, 0.3)";
                box.style.boxShadow = "none";
              }
            });
          }
        },
      },
    });

    colRefs.current.forEach((col) => {
      if (!col) return;
      tl.fromTo(col,
        { y: (col as any)._startY },
        { y: (col as any)._landY, ease: "power2.inOut", duration: 0.65 },
        0
      );
    });

    // Fade hint text out early
    if (hintRef.current) {
      tl.to(hintRef.current, { opacity: 0, duration: 0.2 }, 0.1);
    }

    return () => ScrollTrigger.getAll().forEach(t => { if (t.vars?.trigger === section) t.kill(); });
  }, []);

  const windowH = ITEM_H * VISIBLE_ROWS;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A1628]"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}>
        {/* Hint text */}
        <div ref={hintRef} style={{ marginBottom: 8 }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase" }}>
            Scroll to reveal
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          gap: "3px",
          width: "min(900px, 96vw)",
        }}>
          {columns.map((col, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                height: `${windowH}px`,
                overflow: "hidden",
              }}
            >
              {/* Top gradient fade */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: ITEM_H * 1.5, background: "linear-gradient(to bottom, #0A1628, transparent)", zIndex: 2, pointerEvents: "none" }} />
              {/* Bottom gradient fade */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: ITEM_H * 1.5, background: "linear-gradient(to top, #0A1628, transparent)", zIndex: 2, pointerEvents: "none" }} />

              {/* Center highlight box */}
              <div
                ref={el => { boxRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  top: CENTER_ROW * ITEM_H,
                  left: 0,
                  right: 0,
                  height: ITEM_H,
                  backgroundColor: "rgba(201, 168, 76, 0.05)",
                  border: "1px solid rgba(201, 168, 76, 0.3)",
                  zIndex: 1,
                  transition: "all 0.4s ease",
                }}
              />

              {/* Scrolling strip */}
              <div
                ref={el => { colRefs.current[i] = el; }}
                style={{ position: "absolute", top: 0, left: 0, right: 0 }}
              >
                {col.items.map((item, j) => {
                  const isLetter = j === col.items.length - 1;
                  return (
                    <div
                      key={j}
                      style={{
                        height: ITEM_H,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 3,
                      }}
                    >
                      {isLetter ? (
                        <span style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                          fontWeight: 700,
                          color: "#C9A84C",
                          lineHeight: 1,
                        }}>
                          {item}
                        </span>
                      ) : (
                        <span style={{
                          fontSize: "7px",
                          color: "rgba(255,255,255,0.25)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          writingMode: "vertical-lr",
                          textOrientation: "mixed",
                          transform: "rotate(180deg)",
                          maxHeight: ITEM_H - 8,
                          overflow: "hidden",
                          display: "block",
                          fontWeight: 500,
                        }}>
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
      </div>
    </section>
  );
}
