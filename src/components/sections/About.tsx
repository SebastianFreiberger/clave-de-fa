import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="nosotros" className="px-6 py-28 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-brass uppercase">
            Nosotros
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-paper md:text-5xl">
            Un espacio para tocar, aprender y quedarse.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-lg leading-relaxed text-paper-dim">
            Clave de Fa nace para acompañar a quien recién empieza y a quien
            ya vive de la música. Elegimos cada instrumento pensando en
            calidad y sonido real, y armamos una academia con clases a medida
            de cada alumno, sin importar el nivel.
          </p>
          <p className="mt-5 leading-relaxed text-paper-dim">
            Guitarras, bajos, teclados, vientos, percusión y equipos de
            audio, con asesoramiento honesto y espacio para probar antes de
            decidir.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
