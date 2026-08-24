"use client";

export function DeleteButton({
  action,
  confirmText = "¿Seguro que querés eliminar este elemento?",
}: {
  action: () => Promise<void>;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="text-sm text-wine hover:underline"
      >
        Eliminar
      </button>
    </form>
  );
}
