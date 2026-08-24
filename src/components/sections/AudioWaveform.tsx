"use client";

import { useEffect, useRef } from "react";

export function AudioWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    let t = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const layers = [
      { amp: 0.28, freq: 0.014, speed: 0.018, color: "rgba(209, 164, 65, 0.9)", width: 2 },
      { amp: 0.18, freq: 0.022, speed: -0.026, color: "rgba(168, 51, 63, 0.55)", width: 1.5 },
      { amp: 0.12, freq: 0.03, speed: 0.034, color: "rgba(244, 237, 226, 0.25)", width: 1 },
    ];

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const midY = height / 2;

      for (const layer of layers) {
        ctx!.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const y =
            midY +
            Math.sin(x * layer.freq + t * layer.speed) *
              layer.amp *
              (height / 2) *
              Math.sin(t * 0.004 + x * 0.002);
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = layer.color;
        ctx!.lineWidth = layer.width;
        ctx!.stroke();
      }

      t += 1;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
