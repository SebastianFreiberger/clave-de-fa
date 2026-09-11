"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guard";

const schema = z.object({
  address: z.string().min(1, "Requerido"),
  city: z.string().min(1, "Requerido"),
  phone: z.string().min(1, "Requerido"),
  whatsapp: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  instagram: z.string().min(1, "Requerido"),
  facebook: z.string().optional(),
});

export async function updateContact(formData: FormData) {
  await requireSession();

  const data = schema.parse({
    address: formData.get("address"),
    city: formData.get("city"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
    instagram: formData.get("instagram"),
    facebook: formData.get("facebook"),
  });

  const facebook = data.facebook?.trim() || null;

  const days = formData.getAll("hourDay") as string[];
  const hours = formData.getAll("hourRange") as string[];
  const hourRows = days
    .map((day, i) => ({ day: day.trim(), hours: hours[i]?.trim() ?? "" }))
    .filter((row) => row.day && row.hours);

  const existing = await prisma.contactInfo.findFirst();

  if (existing) {
    await prisma.contactInfo.update({
      where: { id: existing.id },
      data: {
        ...data,
        facebook,
        hours: {
          deleteMany: {},
          create: hourRows.map((row, i) => ({ ...row, order: i })),
        },
      },
    });
  } else {
    await prisma.contactInfo.create({
      data: {
        ...data,
        facebook,
        hours: { create: hourRows.map((row, i) => ({ ...row, order: i })) },
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/contacto");
}
