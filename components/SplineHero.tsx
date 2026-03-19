"use client";
import Spline from "@splinetool/react-spline";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function SplineHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Capsules drift upward as you scroll down (parallax)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0"
      style={{
        y,
        opacity,
        filter: "hue-rotate(-30deg) saturate(0.65) brightness(0.82)",
      }}
    >
      <Spline
        scene="https://prod.spline.design/Qb2AmcNrCEdOhDdc/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
}
