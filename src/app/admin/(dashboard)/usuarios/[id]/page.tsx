import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { UserForm } from "../UserForm";
import { updateUser } from "../actions";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/admin");

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Editar usuario</h1>
      <UserForm action={updateUser.bind(null, id)} defaultValues={user} isEdit />
    </div>
  );
}
