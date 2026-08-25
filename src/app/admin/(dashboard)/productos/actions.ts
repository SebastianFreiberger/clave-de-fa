"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guard";
import { saveUploadedImage } from "@/lib/upload";

const schema = z.object({
  slug: z
    .string()
    .min(1, "Requerido")
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  name: z.string().min(1, "Requerido"),
  categoryId: z.string().min(1, "Requerido"),
  brandId: z.string().optional(),
  tagline: z.string().min(1, "Requerido"),
  costPrice: z.number().int().nonnegative(),
  price: z.number().int().nonnegative(),
  currency: z.enum(["ARS", "USD"]),
  stock: z.number().int().nonnegative(),
  published: z.boolean(),
  featured: z.boolean(),
});

function parseForm(formData: FormData) {
  const brandId = formData.get("brandId");
  return schema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    categoryId: formData.get("categoryId"),
    brandId: brandId && brandId !== "" ? brandId : undefined,
    tagline: formData.get("tagline"),
    costPrice: Number(formData.get("costPrice")),
    price: Number(formData.get("price")),
    currency: formData.get("currency"),
    stock: Number(formData.get("stock")),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
  });
}

export async function createProduct(formData: FormData) {
  await requireSession();
  const { brandId, ...data } = parseForm(formData);
  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedImage(image, data.slug);

  const count = await prisma.product.count();
  await prisma.product.create({
    data: { ...data, brandId: brandId ?? null, imageUrl, order: count },
  });

  revalidatePath("/");
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireSession();
  const { brandId, ...data } = parseForm(formData);
  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedImage(image, data.slug);

  await prisma.product.update({
    where: { id },
    data: { ...data, brandId: brandId ?? null, ...(imageUrl ? { imageUrl } : {}) },
  });

  revalidatePath("/");
  revalidatePath("/admin/productos");
  redirect("/admin/productos");
}

export async function deleteProduct(id: string) {
  await requireSession();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/productos");
}
