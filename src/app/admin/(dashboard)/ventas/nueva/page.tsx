import { prisma } from "@/lib/prisma";
import { SaleForm } from "../SaleForm";
import { createSale } from "../actions";

export default async function NewSalePage() {
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } },
    include: { category: true },
    orderBy: { name: "asc" },
  });

  const options = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    currency: p.currency,
    stock: p.stock,
    categoryName: p.category.name,
  }));

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nueva venta</h1>
      <p className="mt-2 text-paper-dim">
        Buscá productos, armá el carrito y confirmá para descontar stock y
        registrar el ingreso.
      </p>
      <SaleForm action={createSale} products={options} />
    </div>
  );
}
