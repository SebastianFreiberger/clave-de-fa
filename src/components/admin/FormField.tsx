import type { ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm text-paper-dim">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-wine">{error}</p>}
    </div>
  );
}

const inputClass =
  "rounded-lg border border-ink-line bg-ink px-3.5 py-2.5 text-sm text-paper outline-none transition-colors focus:border-brass";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}
