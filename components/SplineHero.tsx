"use client";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef } from "react";
import type { Application } from "@splinetool/runtime";

export default function SplineHero() {
  const splineRef = useRef<Application | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Listen to actual scroll position changes and notify Spline
    // without creating a feedback loop
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      const splineCanvas = document.querySelector<HTMLCanvasElement>("canvas");
      if (!splineCanvas || Math.abs(delta) < 0.5) return;

      // Dispatch non-bubbling wheel event so Lenis doesn't catch it again
      const wheelEvent = new WheelEvent("wheel", {
        bubbles: false,   // ← key: doesn't bubble back to Lenis
        cancelable: false,
        deltaY: delta * 3,
        deltaMode: 0,
      });
      splineCanvas.dispatchEvent(wheelEvent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onLoad = (app: Application) => {
    splineRef.current = app;
  };

  return (
    <div
      className="absolute inset-0"
      style={{ filter: "hue-rotate(-30deg) saturate(0.65) brightness(0.82)" }}
    >
      <Spline
        scene="https://prod.spline.design/Qb2AmcNrCEdOhDdc/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
        onLoad={onLoad}
      />
    </div>
  );
}
