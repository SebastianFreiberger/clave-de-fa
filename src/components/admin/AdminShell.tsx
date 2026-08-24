import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/instrumentos", label: "Instrumentos" },
  { href: "/admin/clases", label: "Clases" },
  { href: "/admin/galeria", label: "Galería" },
  { href: "/admin/testimonios", label: "Testimonios" },
  { href: "/admin/contacto", label: "Contacto y horarios" },
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-ink-line bg-ink-soft p-6 md:block">
          <Link href="/admin" className="font-display text-xl text-paper">
            Clave <span className="text-brass italic">de Fa</span>
          </Link>
          <p className="mt-1 text-xs tracking-widest text-paper-dim uppercase">
            Panel de administración
          </p>

          <nav className="mt-10 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-paper-dim transition-colors hover:bg-ink hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
            {session?.user.role === "ADMIN" && (
              <Link
                href="/admin/usuarios"
                className="rounded-lg px-3 py-2 text-sm text-paper-dim transition-colors hover:bg-ink hover:text-paper"
              >
                Usuarios
              </Link>
            )}
          </nav>

          <Link
            href="/"
            target="_blank"
            className="mt-10 block text-xs text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-brass"
          >
            Ver sitio público
          </Link>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-ink-line px-6 py-4 md:px-10">
            <p className="text-sm text-paper-dim">
              {session?.user.name} · {session?.user.email}
              <span className="ml-2 rounded-full border border-brass/40 px-2 py-0.5 text-xs text-brass">
                {session?.user.role}
              </span>
            </p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="text-sm text-paper-dim hover:text-brass"
              >
                Cerrar sesión
              </button>
            </form>
          </header>

          <main className="px-6 py-10 md:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
