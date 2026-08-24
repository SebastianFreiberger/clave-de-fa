"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Instrument, InstrumentCategory } from "@/types/content";

const CATEGORY_LABEL: Record<InstrumentCategory, string> = {
  cuerdas: "Cuerdas",
  vientos: "Vientos",
  percusion: "Percusión",
  teclados: "Teclados",
  audio: "Audio",
};

const CATEGORIES: InstrumentCategory[] = [
  "cuerdas",
  "vientos",
  "percusion",
  "teclados",
  "audio",
];

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function InstrumentsGrid({ instruments }: { instruments: Instrument[] }) {
  const [active, setActive] = useState<InstrumentCategory | "todos">("todos");

  const visible =
    active === "todos"
      ? instruments
      : instruments.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("todos")}
          className={`rounded-full px-4 py-2 text-sm tracking-wide transition-colors ${
            active === "todos"
              ? "bg-brass text-ink"
              : "border border-ink-line text-paper-dim hover:text-brass"
          }`}
        >
          Todos
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm tracking-wide transition-colors ${
              active === cat
                ? "bg-brass text-ink"
                : "border border-ink-line text-paper-dim hover:text-brass"
            }`}
          >
            {CATEGORY_LABEL[cat]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <motion.div
            key={item.slug}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="group flex h-full flex-col justify-between bg-ink p-8 transition-colors hover:bg-ink-soft"
          >
            <div>
              {item.imageUrl && (
                <div className="relative mb-5 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-xs tracking-[0.2em] text-brass uppercase">
                {CATEGORY_LABEL[item.category]}
              </span>
              <h3 className="mt-4 font-display text-2xl text-paper">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-paper-dim">{item.tagline}</p>
            </div>
            <p className="mt-8 font-sans text-lg text-paper">
              Desde {formatPrice(item.priceFrom, item.currency)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
