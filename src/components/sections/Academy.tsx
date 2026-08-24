import { getClasses } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export async function Academy() {
  const classes = await getClasses();

  return (
    <section id="academia" className="border-t border-ink-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-brass uppercase">
            Academia
          </p>
          <h2 className="mt-5 max-w-xl text-balance font-display text-4xl leading-tight text-paper md:text-5xl">
            Clases para cada instrumento y cada nivel.
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-ink-line border-y border-ink-line">
          {classes.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <div className="grid grid-cols-2 items-center gap-4 py-6 md:grid-cols-5">
                <p className="font-display text-xl text-paper">{c.instrument}</p>
                <p className="text-sm text-paper-dim">{c.level}</p>
                <p className="text-sm text-paper-dim">{c.modality}</p>
                <p className="text-sm text-paper-dim">{c.schedule}</p>
                <p className="text-right text-sm text-brass md:text-left">
                  {c.teacher}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <MagneticButton href="#contacto">Inscribirme</MagneticButton>
        </div>
      </div>
    </section>
  );
}
