import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Testimonios</h1>
        <Link
          href="/admin/testimonios/nuevo"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nuevo testimonio
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-ink-line bg-ink-soft p-6">
            <p className="text-paper-dim">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-4 text-sm text-paper">{t.name}</p>
            <p className="text-xs text-paper-dim">{t.role}</p>
            <div className="mt-4 flex items-center gap-4">
              <Link
                href={`/admin/testimonios/${t.id}`}
                className="text-sm text-brass hover:underline"
              >
                Editar
              </Link>
              <DeleteButton
                action={deleteTestimonial.bind(null, t.id)}
                confirmText={`¿Eliminar el testimonio de ${t.name}?`}
              />
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="text-paper-dim">Todavía no hay testimonios cargados.</p>
        )}
      </div>
    </div>
  );
}
