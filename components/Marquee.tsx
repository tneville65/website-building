"use client";
import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

const items = [
  "Medical Technology",
  "Life Sciences",
  "Healthcare Real Estate",
  "Biotech & Therapeutics",
  "Digital Health",
  "Medical Devices",
  "Pharma",
  "Healthcare AI",
];

export default function Marquee({ direction = 1 }: { direction?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!ref.current) return;
    xRef.current -= (delta / 1000) * 60 * direction;
    const width = ref.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= width) xRef.current = 0;
    ref.current.style.transform = `translateX(${xRef.current}px)`;
  });

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-6 border-y border-[#C9A84C]/15">
      <div ref={ref} className="inline-flex gap-12 items-center">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-gray-400 text-sm uppercase tracking-[0.2em] font-medium hover:text-[#C9A84C] transition-colors cursor-default">
              {item}
            </span>
            <span className="text-[#C9A84C]/30 text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
