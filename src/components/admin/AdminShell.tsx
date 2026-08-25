import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const NAV_GROUPS: { label: string | null; items: { href: string; label: string }[] }[] = [
  {
    label: null,
    items: [{ href: "/admin", label: "Resumen" }],
  },
  {
    label: "Catálogo",
    items: [
      { href: "/admin/productos", label: "Productos" },
      { href: "/admin/categorias", label: "Categorías" },
      { href: "/admin/marcas", label: "Marcas" },
    ],
  },
  {
    label: "Negocio",
    items: [
      { href: "/admin/ventas", label: "Ventas" },
      { href: "/admin/movimientos", label: "Ingresos y egresos" },
    ],
  },
  {
    label: "Contenido",
    items: [
      { href: "/admin/clases", label: "Clases" },
      { href: "/admin/galeria", label: "Galería" },
      { href: "/admin/testimonios", label: "Testimonios" },
      { href: "/admin/contacto", label: "Contacto y horarios" },
    ],
  },
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-ink-line bg-ink-soft p-6 md:block">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="font-display text-lg text-paper">Clave de Fa</span>
            <span className="rounded border border-ink-line px-1.5 py-0.5 text-[10px] tracking-widest text-paper-dim uppercase">
              Admin
            </span>
          </Link>

          <nav className="mt-8 flex flex-col gap-5">
            {NAV_GROUPS.map((group, i) => (
              <div key={i}>
                {group.label && (
                  <p className="px-3 pb-1 text-[11px] tracking-widest text-paper-dim/70 uppercase">
                    {group.label}
                  </p>
                )}
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm text-paper-dim transition-colors hover:bg-ink hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {session?.user.role === "ADMIN" && (
              <div>
                <p className="px-3 pb-1 text-[11px] tracking-widest text-paper-dim/70 uppercase">
                  Cuenta
                </p>
                <Link
                  href="/admin/usuarios"
                  className="rounded-lg px-3 py-2 text-sm text-paper-dim transition-colors hover:bg-ink hover:text-paper"
                >
                  Usuarios
                </Link>
              </div>
            )}
          </nav>

          <Link
            href="/"
            target="_blank"
            className="mt-8 block text-xs text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-brass"
          >
            Ver sitio público
          </Link>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
            className="mt-4"
          >
            <button
              type="submit"
              className="w-full rounded-full border border-ink-line px-4 py-2 text-sm text-paper transition-colors hover:border-brass hover:text-brass"
            >
              Cerrar sesión
            </button>
          </form>
        </aside>

        <div className="flex-1">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-line px-6 py-4 md:px-10">
            <p className="text-sm text-paper-dim">
              {session?.user.name}
              <span className="hidden sm:inline"> · {session?.user.email}</span>
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
                className="rounded-full border border-ink-line px-4 py-2 text-sm text-paper transition-colors hover:border-brass hover:text-brass"
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
