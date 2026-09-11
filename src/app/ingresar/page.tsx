"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { TextInput, FormField } from "@/components/admin/FormField";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    router.push(searchParams.get("callbackUrl") ?? "/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-2xl border border-ink-line bg-ink-soft p-8">
        <p className="font-display text-2xl text-paper">
          Clave <span className="text-brass italic">de Fa</span>
        </p>
        <p className="mt-1 text-sm text-paper-dim">Ingresá a tu cuenta</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
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
              autoComplete="current-password"
            />
          </FormField>

          {error && <p className="text-sm text-wine">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-brass px-6 py-2.5 text-sm font-medium text-ink transition-opacity hover:bg-paper disabled:opacity-50"
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-paper-dim">
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="text-brass hover:underline">
            Registrate
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

export default function PublicLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
