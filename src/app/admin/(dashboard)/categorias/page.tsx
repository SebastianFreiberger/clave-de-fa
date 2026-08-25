import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function CategoriesAdminPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Categorías</h1>
        <Link
          href="/admin/categorias/nueva"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nueva categoría
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-paper-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Productos</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {categories.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 text-paper">{c.name}</td>
                <td className="px-4 py-3 text-paper-dim">{c.slug}</td>
                <td className="px-4 py-3 text-paper-dim">{c._count.products}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/categorias/${c.id}`}
                      className="text-sm text-brass hover:underline"
                    >
                      Editar
                    </Link>
                    <DeleteButton
                      action={deleteCategory.bind(null, c.id)}
                      confirmText={`¿Eliminar "${c.name}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
