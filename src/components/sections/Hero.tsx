"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AudioWaveform } from "./AudioWaveform";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 opacity-70">
        <AudioWaveform />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm tracking-[0.3em] text-brass uppercase"
        >
          Tienda &amp; academia de música
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-display text-5xl leading-[1.05] text-paper sm:text-6xl md:text-7xl"
        >
          Todo instrumento
          <br />
          tiene una <span className="text-brass italic">primera nota.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 max-w-lg text-lg text-paper-dim"
        >
          Instrumentos, clases y un espacio pensado para quienes tocan por
          primera vez y para quienes nunca van a dejar de hacerlo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#instrumentos">Ver instrumentos</MagneticButton>
          <MagneticButton href="#academia" variant="outline">
            Conocer la academia
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
