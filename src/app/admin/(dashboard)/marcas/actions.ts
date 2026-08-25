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

export async function createBrand(formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  const count = await prisma.brand.count();
  await prisma.brand.create({ data: { ...data, order: count } });

  revalidatePath("/");
  revalidatePath("/admin/marcas");
  redirect("/admin/marcas");
}

export async function updateBrand(id: string, formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  await prisma.brand.update({ where: { id }, data });

  revalidatePath("/");
  revalidatePath("/admin/marcas");
  redirect("/admin/marcas");
}

export async function deleteBrand(id: string) {
  await requireSession();
  await prisma.brand.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/marcas");
}
