import Link from "next/link";
import { prisma } from "@/lib/prisma";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function AdminHome() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    productCount,
    lowStockCount,
    salesThisMonth,
    monthTransactions,
    classCount,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { stock: { lte: 3 } } }),
    prisma.sale.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.transaction.findMany({ where: { date: { gte: monthStart } } }),
    prisma.musicClass.count(),
  ]);

  const income = monthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = monthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const cards = [
    { label: "Productos", value: productCount, href: "/admin/productos" },
    {
      label: "Stock bajo (≤ 3)",
      value: lowStockCount,
      href: "/admin/productos",
      warn: lowStockCount > 0,
    },
    { label: "Ventas del mes", value: salesThisMonth, href: "/admin/ventas" },
    { label: "Clases", value: classCount, href: "/admin/clases" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Resumen</h1>
      <p className="mt-2 text-paper-dim">
        Desde acá administrás el catálogo, las ventas y el contenido del sitio.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors hover:border-brass/50"
          >
            <p
              className={`font-display text-4xl ${card.warn ? "text-wine" : "text-brass"}`}
            >
              {card.value}
            </p>
            <p className="mt-2 text-sm text-paper-dim">{card.label}</p>
          </Link>
        ))}
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
        <Link
          href="/admin/movimientos"
          className="rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors hover:border-brass/50"
        >
          <p className="text-sm text-paper-dim">Balance del mes</p>
          <p className="mt-2 font-display text-3xl text-paper">
            {formatPrice(income - expense)}
          </p>
        </Link>
      </div>
    </div>
  );
}
