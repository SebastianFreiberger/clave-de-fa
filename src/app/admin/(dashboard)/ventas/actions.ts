"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guard";

const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().int().nonnegative(),
});

const saleSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Agregá al menos un producto"),
  paymentMethod: z.enum(["efectivo", "tarjeta", "transferencia", "otro"]),
  notes: z.string().optional(),
});

export async function createSale(formData: FormData) {
  const session = await requireSession();

  let cartRaw: unknown;
  try {
    cartRaw = JSON.parse(String(formData.get("cart") ?? "[]"));
  } catch {
    throw new Error("Carrito inválido.");
  }

  const notes = formData.get("notes");
  const data = saleSchema.parse({
    items: cartRaw,
    paymentMethod: formData.get("paymentMethod"),
    notes: typeof notes === "string" && notes.trim() ? notes.trim() : undefined,
  });

  const sale = await prisma.$transaction(async (tx) => {
    let total = 0;
    const itemsData = [];

    for (const item of data.items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        throw new Error("Uno de los productos ya no existe.");
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para "${product.name}" (disponible: ${product.stock}).`
        );
      }

      const subtotal = item.unitPrice * item.quantity;
      total += subtotal;
      itemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal,
      });

      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    const createdSale = await tx.sale.create({
      data: {
        total,
        paymentMethod: data.paymentMethod,
        notes: data.notes,
        createdById: session.user.id,
        items: { create: itemsData },
      },
    });

    await tx.transaction.create({
      data: {
        type: "INCOME",
        category: "Venta",
        amount: total,
        description: `Venta #${createdSale.id.slice(-6)}`,
        saleId: createdSale.id,
      },
    });

    return createdSale;
  });

  revalidatePath("/admin/ventas");
  revalidatePath("/admin/productos");
  revalidatePath("/admin/movimientos");
  revalidatePath("/admin");
  revalidatePath("/");
  redirect(`/admin/ventas/${sale.id}`);
}
