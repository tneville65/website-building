"use client";
import { useEffect, useRef } from "react";

export default function DNAHelix({ height = 120 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const segments = 20;
      const freq = (2 * Math.PI) / segments;

      for (let i = 0; i <= segments; i++) {
        const y = (i / segments) * H;
        const x1 = W / 2 + Math.sin(freq * i + t) * (W * 0.35);
        const x2 = W / 2 + Math.sin(freq * i + t + Math.PI) * (W * 0.35);
        const phase = (Math.sin(freq * i + t) + 1) / 2;

        // Strand 1
        if (i > 0) {
          const py1 = ((i - 1) / segments) * H;
          const px1 = W / 2 + Math.sin(freq * (i - 1) + t) * (W * 0.35);
          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(x1, y);
          ctx.strokeStyle = `rgba(201, 168, 76, ${0.4 + phase * 0.5})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Strand 2
          const px2 = W / 2 + Math.sin(freq * (i - 1) + t + Math.PI) * (W * 0.35);
          ctx.beginPath();
          ctx.moveTo(px2, py1);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(100, 150, 220, ${0.4 + (1 - phase) * 0.5})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Cross-rungs every other segment
        if (i % 2 === 0) {
          const rungPhase = Math.abs(Math.sin(freq * i + t));
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(201, 168, 76, ${0.15 + rungPhase * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Nodes
          [x1, x2].forEach((x, idx) => {
            ctx.beginPath();
            ctx.arc(x, y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = idx === 0
              ? `rgba(201, 168, 76, ${0.7 + rungPhase * 0.3})`
              : `rgba(100, 150, 220, ${0.7 + (1 - rungPhase) * 0.3})`;
            ctx.fill();
          });
        }
      }

      t += 0.025;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={80}
      height={height}
      className="opacity-90"
    />
  );
}
