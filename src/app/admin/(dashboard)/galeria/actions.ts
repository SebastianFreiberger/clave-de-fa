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
  caption: z.string().min(1, "Requerido"),
  category: z.enum(["cuerdas", "vientos", "percusion", "audio", "academia"]),
  size: z.enum(["small", "medium", "large"]),
});

function parseForm(formData: FormData) {
  return schema.parse({
    slug: formData.get("slug"),
    caption: formData.get("caption"),
    category: formData.get("category"),
    size: formData.get("size"),
  });
}

export async function createGalleryItem(formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedImage(image, data.slug);

  const count = await prisma.galleryItem.count();
  await prisma.galleryItem.create({ data: { ...data, imageUrl, order: count } });

  revalidatePath("/");
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria");
}

export async function updateGalleryItem(id: string, formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedImage(image, data.slug);

  await prisma.galleryItem.update({
    where: { id },
    data: { ...data, ...(imageUrl ? { imageUrl } : {}) },
  });

  revalidatePath("/");
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria");
}

export async function deleteGalleryItem(id: string) {
  await requireSession();
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/galeria");
}
