import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteInstrument } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

const CATEGORY_LABEL: Record<string, string> = {
  cuerdas: "Cuerdas",
  vientos: "Vientos",
  percusion: "Percusión",
  teclados: "Teclados",
  audio: "Audio",
};

export default async function InstrumentsAdminPage() {
  const instruments = await prisma.instrument.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Instrumentos</h1>
        <Link
          href="/admin/instrumentos/nuevo"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nuevo instrumento
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-paper-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Foto</th>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Destacado</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {instruments.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  {item.imageUrl ? (
                    <div className="relative h-10 w-14 overflow-hidden rounded">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-14 rounded bg-ink-soft" />
                  )}
                </td>
                <td className="px-4 py-3 text-paper">{item.name}</td>
                <td className="px-4 py-3 text-paper-dim">
                  {CATEGORY_LABEL[item.category]}
                </td>
                <td className="px-4 py-3 text-paper-dim">
                  {item.currency} {item.priceFrom.toLocaleString("es-AR")}
                </td>
                <td className="px-4 py-3 text-paper-dim">
                  {item.featured ? "Sí" : "No"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/instrumentos/${item.id}`}
                      className="text-sm text-brass hover:underline"
                    >
                      Editar
                    </Link>
                    <DeleteButton
                      action={deleteInstrument.bind(null, item.id)}
                      confirmText={`¿Eliminar "${item.name}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {instruments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-paper-dim">
                  Todavía no hay instrumentos cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
