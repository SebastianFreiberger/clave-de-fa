"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guard";

const schema = z.object({
  name: z.string().min(1, "Requerido"),
  role: z.string().min(1, "Requerido"),
  quote: z.string().min(1, "Requerido"),
});

function parseForm(formData: FormData) {
  return schema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    quote: formData.get("quote"),
  });
}

export async function createTestimonial(formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  const count = await prisma.testimonial.count();
  await prisma.testimonial.create({ data: { ...data, order: count } });

  revalidatePath("/");
  revalidatePath("/admin/testimonios");
  redirect("/admin/testimonios");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireSession();
  const data = parseForm(formData);
  await prisma.testimonial.update({ where: { id }, data });

  revalidatePath("/");
  revalidatePath("/admin/testimonios");
  redirect("/admin/testimonios");
}

export async function deleteTestimonial(id: string) {
  await requireSession();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonios");
}
