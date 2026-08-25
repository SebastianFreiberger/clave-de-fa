import { notFound } from "next/navigation";
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

export default async function SaleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sale = await prisma.sale.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, createdBy: true },
  });
  if (!sale) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">
        Venta del {sale.createdAt.toLocaleString("es-AR")}
      </h1>
      <p className="mt-1 text-sm text-paper-dim">
        {PAYMENT_LABEL[sale.paymentMethod]} · Registrada por{" "}
        {sale.createdBy?.name ?? "—"}
      </p>

      <div className="mt-8 max-w-xl overflow-hidden rounded-2xl border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-paper-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Cant.</th>
              <th className="px-4 py-3 font-medium">Precio unit.</th>
              <th className="px-4 py-3 font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {sale.items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-paper">{item.product.name}</td>
                <td className="px-4 py-3 text-paper-dim">{item.quantity}</td>
                <td className="px-4 py-3 text-paper-dim">
                  {formatPrice(item.unitPrice)}
                </td>
                <td className="px-4 py-3 text-paper">
                  {formatPrice(item.subtotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 max-w-xl border-t border-ink-line pt-4 text-right">
        <p className="text-paper-dim">Total</p>
        <p className="font-display text-3xl text-brass">
          {formatPrice(sale.total)}
        </p>
      </div>

      {sale.notes && (
        <p className="mt-6 max-w-xl text-sm text-paper-dim">
          <span className="text-paper">Notas:</span> {sale.notes}
        </p>
      )}
    </div>
  );
}
