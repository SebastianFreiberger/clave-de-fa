import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteGalleryItem } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function GalleryAdminPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Galería</h1>
        <Link
          href="/admin/galeria/nueva"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nueva foto
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft"
          >
            <div className="relative aspect-video">
              {item.imageUrl ? (
                <Image src={item.imageUrl} alt={item.caption} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-paper-dim">
                  Sin foto
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm text-paper">{item.caption}</p>
              <div className="mt-3 flex items-center justify-between">
                <Link
                  href={`/admin/galeria/${item.id}`}
                  className="text-sm text-brass hover:underline"
                >
                  Editar
                </Link>
                <DeleteButton
                  action={deleteGalleryItem.bind(null, item.id)}
                  confirmText={`¿Eliminar "${item.caption}"?`}
                />
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-paper-dim">Todavía no hay fotos cargadas.</p>
        )}
      </div>
    </div>
  );
}
