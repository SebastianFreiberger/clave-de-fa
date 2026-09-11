"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { TextInput, FormField } from "@/components/admin/FormField";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "No se pudo completar el registro.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Te registramos, pero hubo un problema al iniciar sesión. Probá ingresar desde /ingresar.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-2xl border border-ink-line bg-ink-soft p-8">
        <p className="font-display text-2xl text-paper">
          Clave <span className="text-brass italic">de Fa</span>
        </p>
        <p className="mt-1 text-sm text-paper-dim">
          Creá tu cuenta para recibir novedades y promociones
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <FormField label="Nombre" htmlFor="name">
            <TextInput id="name" name="name" required autoComplete="name" />
          </FormField>
          <FormField label="Email" htmlFor="email">
            <TextInput
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </FormField>
          <FormField label="Contraseña" htmlFor="password">
            <TextInput
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </FormField>

          {error && <p className="text-sm text-wine">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-brass px-6 py-2.5 text-sm font-medium text-ink transition-opacity hover:bg-paper disabled:opacity-50"
          >
            {loading ? "Creando cuenta…" : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-paper-dim">
          ¿Ya tenés cuenta?{" "}
          <Link href="/ingresar" className="text-brass hover:underline">
            Ingresá
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-paper-dim">
          <Link href="/" className="hover:text-brass">
            ← Volver al sitio
          </Link>
        </p>
      </div>
    </div>
  );
}
