"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const DiamondSVG = ({ size = 32, opacity = 1 }: { size?: number; opacity?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    {/* Outer diamond */}
    <path
      d="M50 5 L95 50 L50 95 L5 50 Z"
      stroke="#C9A84C"
      strokeWidth="5"
      fill="none"
    />
    {/* Middle diamond */}
    <path
      d="M50 20 L80 50 L50 80 L20 50 Z"
      stroke="#C9A84C"
      strokeWidth="4"
      fill="none"
    />
    {/* Inner diamond */}
    <path
      d="M50 35 L65 50 L50 65 L35 50 Z"
      stroke="#C9A84C"
      strokeWidth="3.5"
      fill="rgba(201,168,76,0.15)"
    />
  </svg>
);

export default function DiamondCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      setVisible(true);
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const onEnterInteractive = () => {
      setIsHovering(true);
      gsap.to(cursor, { scale: 1.5, duration: 0.2 });
      gsap.to(follower, { scale: 1.8, opacity: 0.5, duration: 0.3 });
    };

    const onLeaveInteractive = () => {
      setIsHovering(false);
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, opacity: 0.2, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor — diamond */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ top: 0, left: 0, opacity: visible ? 1 : 0 }}
      >
        <div
          className="transition-all duration-200"
          style={{
            filter: isHovering
              ? "drop-shadow(0 0 8px rgba(201,168,76,0.9))"
              : "drop-shadow(0 0 4px rgba(201,168,76,0.5))",
          }}
        >
          <DiamondSVG size={28} />
        </div>
      </div>

      {/* Follower — larger faded diamond */}
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ top: 0, left: 0, opacity: visible ? 0.2 : 0 }}
      >
        <DiamondSVG size={56} opacity={0.4} />
      </div>
    </>
  );
}
