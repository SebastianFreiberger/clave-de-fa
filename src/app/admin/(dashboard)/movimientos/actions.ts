"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guard";

const schema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1, "Requerido"),
  amount: z.number().int().positive(),
  description: z.string().min(1, "Requerido"),
  date: z.string().min(1, "Requerido"),
});

function parseForm(formData: FormData) {
  return schema.parse({
    type: formData.get("type"),
    category: formData.get("category"),
    amount: Number(formData.get("amount")),
    description: formData.get("description"),
    date: formData.get("date"),
  });
}

export async function createTransaction(formData: FormData) {
  await requireSession();
  const data = parseForm(formData);

  await prisma.transaction.create({
    data: {
      type: data.type,
      category: data.category,
      amount: data.amount,
      description: data.description,
      date: new Date(data.date),
    },
  });

  revalidatePath("/admin/movimientos");
  redirect("/admin/movimientos");
}

export async function deleteTransaction(id: string) {
  await requireSession();
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (transaction?.saleId) {
    throw new Error(
      "Este movimiento viene de una venta y no se puede borrar acá."
    );
  }
  await prisma.transaction.delete({ where: { id } });
  revalidatePath("/admin/movimientos");
}
