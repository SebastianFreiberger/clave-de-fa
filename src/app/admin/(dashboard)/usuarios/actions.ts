"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

const createSchema = z.object({
  name: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  role: z.enum(["ADMIN", "EDITOR"]),
});

const updateSchema = z.object({
  name: z.string().min(1, "Requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres").optional().or(z.literal("")),
  role: z.enum(["ADMIN", "EDITOR"]),
});

export async function createUser(formData: FormData) {
  await requireAdmin();

  const data = createSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      passwordHash: await bcrypt.hash(data.password, 12),
    },
  });

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}

export async function updateUser(id: string, formData: FormData) {
  await requireAdmin();

  const data = updateSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      ...(data.password ? { passwordHash: await bcrypt.hash(data.password, 12) } : {}),
    },
  });

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();

  if (session.user.id === id) {
    throw new Error("No podés eliminar tu propia cuenta.");
  }

  const admins = await prisma.user.count({ where: { role: "ADMIN" } });
  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === "ADMIN" && admins <= 1) {
    throw new Error("Tiene que quedar al menos un administrador.");
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/usuarios");
}
