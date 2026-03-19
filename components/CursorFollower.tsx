"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
      gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.5 });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(201,168,76,0.8)", duration: 0.2 });
      gsap.to(follower, { scale: 1.5, opacity: 0.3, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "rgba(201,168,76,1)", duration: 0.2 });
      gsap.to(follower, { scale: 1, opacity: 0.15, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button");
    links.forEach(link => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach(link => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 rounded-full bg-[#C9A84C] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ top: 0, left: 0 }}
      />
      <div
        ref={followerRef}
        className="fixed w-10 h-10 rounded-full border border-[#C9A84C] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-15"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
