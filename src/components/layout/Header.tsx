"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useSession, signOut } from "next-auth/react";

const LINKS = [
  { href: "#instrumentos", label: "Instrumentos" },
  { href: "#academia", label: "Academia" },
  { href: "#galeria", label: "Galería" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const isStaff = user?.role === "ADMIN" || user?.role === "EDITOR";
  const firstName = user?.name?.split(" ")[0];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-display text-xl tracking-tight text-paper">
          Clave <span className="text-brass italic">de Fa</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-paper-dim transition-colors hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {user ? (
            <>
              <span className="text-sm text-paper-dim">Hola, {firstName}</span>
              {isStaff && (
                <Link
                  href="/admin"
                  className="text-sm tracking-wide text-paper-dim transition-colors hover:text-brass"
                >
                  Panel
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm tracking-wide text-paper-dim transition-colors hover:text-brass"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/ingresar"
              className="text-sm tracking-wide text-paper-dim transition-colors hover:text-brass"
            >
              Ingresar
            </Link>
          )}

          <a
            href="#contacto"
            className="rounded-full border border-ink-line px-5 py-2 text-sm text-paper transition-colors hover:border-brass hover:text-brass"
          >
            Visitanos
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Abrir menú"
        >
          <span className="h-px w-6 bg-paper" />
          <span className="h-px w-6 bg-paper" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink-line md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-paper-dim hover:text-brass"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-2 flex flex-col gap-1 border-t border-ink-line pt-3">
                {user ? (
                  <>
                    <span className="py-2 text-paper-dim">Hola, {firstName}</span>
                    {isStaff && (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="py-2 text-paper-dim hover:text-brass"
                      >
                        Panel de administración
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="py-2 text-left text-paper-dim hover:text-brass"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <Link
                    href="/ingresar"
                    onClick={() => setOpen(false)}
                    className="py-2 text-paper-dim hover:text-brass"
                  >
                    Ingresar
                  </Link>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
