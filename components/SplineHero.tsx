"use client";
import Spline from "@splinetool/react-spline";
import { useEffect, useRef } from "react";
import type { Application } from "@splinetool/runtime";

export default function SplineHero() {
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    // Forward Lenis scroll events to Spline as native scroll events
    // Lenis fires a custom 'scroll' event on the window — we re-dispatch as wheel
    const handleLenisScroll = (e: Event) => {
      const splineCanvas = document.querySelector("canvas");
      if (!splineCanvas) return;
      // Dispatch a synthetic wheel event to the canvas so Spline sees it
      const wheelEvent = new WheelEvent("wheel", {
        bubbles: true,
        cancelable: true,
        deltaY: (e as any).velocity ? (e as any).velocity * 10 : 50,
      });
      splineCanvas.dispatchEvent(wheelEvent);
    };

    window.addEventListener("scroll", handleLenisScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleLenisScroll);
  }, []);

  const onLoad = (app: Application) => {
    splineRef.current = app;
  };

  return (
    <div
      className="absolute inset-0"
      style={{
        filter: "hue-rotate(-30deg) saturate(0.65) brightness(0.82)",
      }}
    >
      <Spline
        scene="https://prod.spline.design/Qb2AmcNrCEdOhDdc/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
        onLoad={onLoad}
      />
    </div>
  );
}
