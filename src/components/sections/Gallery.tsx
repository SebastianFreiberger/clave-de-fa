import Image from "next/image";
import { getGalleryItems } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { InstrumentIcon } from "@/components/ui/InstrumentIcon";
import type { GalleryCategory } from "@/types/content";

const SIZE_CLASS: Record<string, string> = {
  large: "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto",
  medium: "sm:col-span-2 aspect-video",
  small: "aspect-square",
};

const CATEGORY_GRADIENT: Record<GalleryCategory, string> = {
  cuerdas: "from-[#2a2015] via-ink to-ink",
  vientos: "from-[#241c1c] via-ink to-ink",
  percusion: "from-[#241417] via-ink to-ink",
  audio: "from-[#161c1c] via-ink to-ink",
  academia: "from-[#1f1a24] via-ink to-ink",
};

export async function Gallery() {
  const items = await getGalleryItems();
  const hasMissingPhotos = items.some((item) => !item.imageUrl);

  return (
    <section id="galeria" className="border-t border-ink-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-brass uppercase">
            Galería
          </p>
          <h2 className="mt-5 max-w-xl text-balance font-display text-4xl leading-tight text-paper md:text-5xl">
            Un vistazo al local y a las clases.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.06} className={SIZE_CLASS[item.size]}>
              <div
                className={`group relative h-full w-full overflow-hidden rounded-2xl border border-ink-line bg-gradient-to-br ${CATEGORY_GRADIENT[item.category]}`}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <InstrumentIcon
                    category={item.category}
                    className="absolute inset-0 m-auto h-16 w-16 text-brass/40 transition-transform duration-500 group-hover:scale-110 group-hover:text-brass/70"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10">
                  <p className="text-sm text-paper-dim">{item.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {hasMissingPhotos && (
          <p className="mt-8 text-center text-xs text-paper-dim/70">
            Fotos reales próximamente — subilas desde el panel de administración.
          </p>
        )}
      </div>
    </section>
  );
}
