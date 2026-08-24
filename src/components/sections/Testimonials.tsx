import { getTestimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section className="border-t border-ink-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-brass uppercase">
            Testimonios
          </p>
          <h2 className="mt-5 max-w-xl text-balance font-display text-4xl leading-tight text-paper md:text-5xl">
            Lo que cuentan quienes ya tocan con nosotros.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-ink-line bg-ink-soft p-8">
                <span className="font-display text-5xl leading-none text-brass">
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 text-paper-dim">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-ink-line pt-4">
                  <p className="text-paper">{t.name}</p>
                  <p className="text-sm text-paper-dim">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
