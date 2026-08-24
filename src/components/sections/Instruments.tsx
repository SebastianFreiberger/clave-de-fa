import { getFeaturedInstruments } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const CATEGORY_LABEL: Record<string, string> = {
  cuerdas: "Cuerdas",
  vientos: "Vientos",
  percusion: "Percusión",
  teclados: "Teclados",
  audio: "Audio",
};

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function Instruments() {
  const instruments = getFeaturedInstruments();

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
                Instrumentos destacados
              </h2>
            </div>
            <p className="max-w-xs text-sm text-paper-dim">
              Selección de la tienda. Consultanos disponibilidad y financiación
              en cada modelo.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
          {instruments.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.08}>
              <div className="group flex h-full flex-col justify-between bg-ink p-8 transition-colors hover:bg-ink-soft">
                <div>
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
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <MagneticButton href="#contacto" variant="outline">
            Consultar catálogo completo
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
