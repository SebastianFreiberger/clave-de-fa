import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { deleteUser } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function UsersAdminPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "EDITOR"] } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Usuarios</h1>
        <Link
          href="/admin/usuarios/nuevo"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nuevo usuario
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-paper-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 text-paper">{user.name}</td>
                <td className="px-4 py-3 text-paper-dim">{user.email}</td>
                <td className="px-4 py-3 text-paper-dim">{user.role}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/usuarios/${user.id}`}
                      className="text-sm text-brass hover:underline"
                    >
                      Editar
                    </Link>
                    {user.id !== session.user.id && (
                      <DeleteButton
                        action={deleteUser.bind(null, user.id)}
                        confirmText={`¿Eliminar a ${user.name}?`}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
