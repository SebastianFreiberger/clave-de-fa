"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant = "solid",
}: {
  children: React.ReactNode;
  variant?: "solid" | "danger";
}) {
  const { pending } = useFormStatus();

  const styles =
    variant === "danger"
      ? "bg-wine text-paper hover:opacity-90"
      : "bg-brass text-ink hover:bg-paper";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-opacity disabled:opacity-50 ${styles}`}
    >
      {pending ? "Guardando…" : children}
    </button>
  );
}
