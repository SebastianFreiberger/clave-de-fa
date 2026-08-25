import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

const LOW_STOCK_THRESHOLD = 3;

export default async function ProductsAdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { order: "asc" },
    include: { category: true, brand: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-paper-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Foto</th>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Marca</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Publicado</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {products.map((item) => (
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
                <td className="px-4 py-3 text-paper-dim">{item.category.name}</td>
                <td className="px-4 py-3 text-paper-dim">{item.brand?.name ?? "—"}</td>
                <td className="px-4 py-3 text-paper-dim">
                  {item.currency} {item.price.toLocaleString("es-AR")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      item.stock <= LOW_STOCK_THRESHOLD
                        ? "text-wine"
                        : "text-paper-dim"
                    }
                  >
                    {item.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-paper-dim">
                  {item.published ? "Sí" : "No"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/productos/${item.id}`}
                      className="text-sm text-brass hover:underline"
                    >
                      Editar
                    </Link>
                    <DeleteButton
                      action={deleteProduct.bind(null, item.id)}
                      confirmText={`¿Eliminar "${item.name}"? Si tiene ventas registradas, no se va a poder borrar — despublicalo en su lugar.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-paper-dim">
                  Todavía no hay productos cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
