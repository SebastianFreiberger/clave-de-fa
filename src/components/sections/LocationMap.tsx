import { getContactInfo } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function LocationMap() {
  const contact = getContactInfo();
  const query = encodeURIComponent(`${contact.address}, ${contact.city}`);
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section className="border-t border-ink-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm tracking-[0.3em] text-brass uppercase">
                Ubicación
              </p>
              <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-paper md:text-5xl">
                Encontranos acá
              </h2>
            </div>
            <MagneticButton href={directionsHref} variant="outline">
              Cómo llegar
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mt-14 aspect-[16/8] overflow-hidden rounded-2xl border border-ink-line">
            <iframe
              title="Ubicación de Clave de Fa"
              src={embedSrc}
              loading="lazy"
              className="h-full w-full grayscale contrast-125"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/45 mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 bg-brass/15 mix-blend-color" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
