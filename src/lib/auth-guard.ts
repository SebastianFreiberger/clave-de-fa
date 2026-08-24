import { auth } from "@/lib/auth";

export async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("No autorizado.");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  if (session.user.role !== "ADMIN") {
    throw new Error("Esta acción requiere permisos de administrador.");
  }
  return session;
}
