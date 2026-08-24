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
  instrument: z.string().min(1, "Requerido"),
  level: z.enum(["Iniciacion", "Intermedio", "Avanzado"]),
  modality: z.enum(["Individual", "Grupal"]),
  teacher: z.string().min(1, "Requerido"),
  schedule: z.string().min(1, "Requerido"),
});

function parseForm(formData: FormData) {
  return schema.parse({
    slug: formData.get("slug"),
    instrument: formData.get("instrument"),
    level: formData.get("level"),
    modality: formData.get("modality"),
    teacher: formData.get("teacher"),
    schedule: formData.get("schedule"),
  });
}

export async function createClass(formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  const count = await prisma.musicClass.count();
  await prisma.musicClass.create({ data: { ...data, order: count } });

  revalidatePath("/");
  revalidatePath("/admin/clases");
  redirect("/admin/clases");
}

export async function updateClass(id: string, formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  await prisma.musicClass.update({ where: { id }, data });

  revalidatePath("/");
  revalidatePath("/admin/clases");
  redirect("/admin/clases");
}

export async function deleteClass(id: string) {
  await requireSession();
  await prisma.musicClass.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/clases");
}
