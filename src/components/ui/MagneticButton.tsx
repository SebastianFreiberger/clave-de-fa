"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  variant?: "solid" | "outline";
}

export function MagneticButton({
  children,
  href,
  variant = "solid",
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors";
  const styles =
    variant === "solid"
      ? "bg-brass text-ink hover:bg-paper"
      : "border border-ink-line text-paper hover:border-brass hover:text-brass";

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
}
