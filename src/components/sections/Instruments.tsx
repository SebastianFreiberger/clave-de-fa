import { getInstruments } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { InstrumentsGrid } from "./InstrumentsGrid";

export function Instruments() {
  const instruments = getInstruments();

  return (
    <section id="instrumentos" className="border-t border-ink-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm tracking-[0.3em] text-brass uppercase">
                Catálogo
              </p>
              <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-paper md:text-5xl">
                Instrumentos
              </h2>
            </div>
            <p className="max-w-xs text-sm text-paper-dim">
              Filtrá por categoría. Consultanos disponibilidad y financiación
              en cada modelo.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <InstrumentsGrid instruments={instruments} />
        </Reveal>

        <div className="mt-14 flex justify-center">
          <MagneticButton href="#contacto" variant="outline">
            Consultar por un instrumento
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
