import Link from "next/link";
import { prisma } from "@/lib/prisma";

const PAYMENT_LABEL: Record<string, string> = {
  efectivo: "Efectivo",
  tarjeta: "Tarjeta",
  transferencia: "Transferencia",
  otro: "Otro",
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function SalesAdminPage() {
  const sales = await prisma.sale.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, createdBy: true },
    take: 100,
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Ventas</h1>
        <Link
          href="/admin/ventas/nueva"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nueva venta
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-paper-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Pago</th>
              <th className="px-4 py-3 font-medium">Registrada por</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-4 py-3 text-paper-dim">
                  {sale.createdAt.toLocaleString("es-AR")}
                </td>
                <td className="px-4 py-3 text-paper-dim">{sale.items.length}</td>
                <td className="px-4 py-3 text-paper-dim">
                  {PAYMENT_LABEL[sale.paymentMethod]}
                </td>
                <td className="px-4 py-3 text-paper-dim">
                  {sale.createdBy?.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-paper">{formatPrice(sale.total)}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/ventas/${sale.id}`}
                    className="text-sm text-brass hover:underline"
                  >
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-paper-dim">
                  Todavía no hay ventas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
