
"use client";
import Spline from "@splinetool/react-spline";

export default function SplineHero() {
  return (
    <div
      className="absolute inset-0"
      style={{
        filter: "hue-rotate(-30deg) saturate(0.7) brightness(0.85)",
      }}
    >
      <Spline
        scene="https://prod.spline.design/Qb2AmcNrCEdOhDdc/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
