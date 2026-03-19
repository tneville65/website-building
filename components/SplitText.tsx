"use client";
import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  type?: "words" | "chars" | "lines";
  delay?: number;
  stagger?: number;
  y?: number;
  trigger?: "scroll" | "load";
  once?: boolean;
}

export default function SplitText({
  children,
  className = "",
  type = "words",
  delay = 0,
  stagger = 0.05,
  y = 60,
  trigger = "scroll",
  once = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split into spans
    const text = children;
    let spans: string[] = [];

    if (type === "chars") {
      spans = text.split("");
    } else if (type === "words") {
      spans = text.split(" ");
    } else {
      spans = text.split("\n");
    }

    el.innerHTML = spans
      .map((chunk) => {
        if (type === "words") {
          return `<span class="split-word" style="display:inline-block; overflow:hidden; vertical-align:bottom; margin-right:0.25em"><span class="split-inner" style="display:inline-block">${chunk}</span></span>`;
        }
        return `<span class="split-inner" style="display:inline-block">${chunk === " " ? "&nbsp;" : chunk}</span>`;
      })
      .join(type === "chars" ? "" : "");

    const inners = el.querySelectorAll(".split-inner");

    const animateIn = () => {
      gsap.fromTo(
        inners,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger,
          delay,
          ease: "power3.out",
        }
      );
    };

    if (trigger === "load") {
      const timer = setTimeout(animateIn, delay * 1000);
      return () => clearTimeout(timer);
    } else {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once,
        onEnter: animateIn,
      });
      return () => st.kill();
    }
  }, [children, type, delay, stagger, y, trigger, once]);

  return (
    <div ref={containerRef} className={className} aria-label={children}>
      {children}
    </div>
  );
}
