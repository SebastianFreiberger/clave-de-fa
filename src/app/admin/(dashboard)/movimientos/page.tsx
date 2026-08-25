import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTransaction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function TransactionsAdminPage() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [transactions, monthTransactions] = await Promise.all([
    prisma.transaction.findMany({ orderBy: { date: "desc" }, take: 200 }),
    prisma.transaction.findMany({ where: { date: { gte: monthStart } } }),
  ]);

  const income = monthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = monthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Ingresos y egresos</h1>
        <Link
          href="/admin/movimientos/nuevo"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nuevo movimiento
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-ink-line bg-ink-soft p-6">
          <p className="text-sm text-paper-dim">Ingresos del mes</p>
          <p className="mt-2 font-display text-3xl text-brass">
            {formatPrice(income)}
          </p>
        </div>
        <div className="rounded-2xl border border-ink-line bg-ink-soft p-6">
          <p className="text-sm text-paper-dim">Egresos del mes</p>
          <p className="mt-2 font-display text-3xl text-wine">
            {formatPrice(expense)}
          </p>
        </div>
        <div className="rounded-2xl border border-ink-line bg-ink-soft p-6">
          <p className="text-sm text-paper-dim">Balance del mes</p>
          <p className="mt-2 font-display text-3xl text-paper">
            {formatPrice(income - expense)}
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-paper-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Descripción</th>
              <th className="px-4 py-3 font-medium">Monto</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-3 text-paper-dim">
                  {t.date.toLocaleDateString("es-AR")}
                </td>
                <td className="px-4 py-3">
                  <span className={t.type === "INCOME" ? "text-brass" : "text-wine"}>
                    {t.type === "INCOME" ? "Ingreso" : "Egreso"}
                  </span>
                </td>
                <td className="px-4 py-3 text-paper-dim">{t.category}</td>
                <td className="px-4 py-3 text-paper-dim">{t.description}</td>
                <td className="px-4 py-3 text-paper">{formatPrice(t.amount)}</td>
                <td className="px-4 py-3">
                  {!t.saleId && (
                    <DeleteButton
                      action={deleteTransaction.bind(null, t.id)}
                      confirmText={`¿Eliminar este movimiento?`}
                    />
                  )}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-paper-dim">
                  Todavía no hay movimientos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
