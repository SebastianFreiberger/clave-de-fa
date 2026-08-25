"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guard";

const schema = z.object({
  slug: z
    .string()
    .min(1, "Requerido")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  name: z.string().min(1, "Requerido"),
});

function parseForm(formData: FormData) {
  return schema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
  });
}

export async function createCategory(formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  const count = await prisma.category.count();
  await prisma.category.create({ data: { ...data, order: count } });

  revalidatePath("/");
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  await prisma.category.update({ where: { id }, data });

  revalidatePath("/");
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}

export async function deleteCategory(id: string) {
  await requireSession();
  const productsUsingIt = await prisma.product.count({ where: { categoryId: id } });
  if (productsUsingIt > 0) {
    throw new Error(
      "No se puede eliminar: hay productos usando esta categoría. Reasigná esos productos primero."
    );
  }
  await prisma.category.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/categorias");
}
