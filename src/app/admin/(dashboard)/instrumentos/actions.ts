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
  category: z.enum(["cuerdas", "vientos", "percusion", "teclados", "audio"]),
  tagline: z.string().min(1, "Requerido"),
  priceFrom: z.number().int().nonnegative(),
  currency: z.enum(["ARS", "USD"]),
  featured: z.boolean(),
});

function parseForm(formData: FormData) {
  return schema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    category: formData.get("category"),
    tagline: formData.get("tagline"),
    priceFrom: Number(formData.get("priceFrom")),
    currency: formData.get("currency"),
    featured: formData.get("featured") === "on",
  });
}

export async function createInstrument(formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedImage(image, data.slug);

  const count = await prisma.instrument.count();
  await prisma.instrument.create({
    data: { ...data, imageUrl, order: count },
  });

  revalidatePath("/");
  revalidatePath("/admin/instrumentos");
  redirect("/admin/instrumentos");
}

export async function updateInstrument(id: string, formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  const image = formData.get("image") as File | null;
  const imageUrl = await saveUploadedImage(image, data.slug);

  await prisma.instrument.update({
    where: { id },
    data: { ...data, ...(imageUrl ? { imageUrl } : {}) },
  });

  revalidatePath("/");
  revalidatePath("/admin/instrumentos");
  redirect("/admin/instrumentos");
}

export async function deleteInstrument(id: string) {
  await requireSession();
  await prisma.instrument.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/instrumentos");
}
