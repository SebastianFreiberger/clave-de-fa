import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminHome() {
  const [instruments, classes, gallery, testimonials] = await Promise.all([
    prisma.instrument.count(),
    prisma.musicClass.count(),
    prisma.galleryItem.count(),
    prisma.testimonial.count(),
  ]);

  const cards = [
    { label: "Instrumentos", value: instruments, href: "/admin/instrumentos" },
    { label: "Clases", value: classes, href: "/admin/clases" },
    { label: "Fotos en galería", value: gallery, href: "/admin/galeria" },
    { label: "Testimonios", value: testimonials, href: "/admin/testimonios" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Resumen</h1>
      <p className="mt-2 text-paper-dim">
        Desde acá administrás el contenido que se muestra en el sitio público.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors hover:border-brass/50"
          >
            <p className="font-display text-4xl text-brass">{card.value}</p>
            <p className="mt-2 text-sm text-paper-dim">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
