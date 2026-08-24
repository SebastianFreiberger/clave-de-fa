import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteClass } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

const LEVEL_LABEL: Record<string, string> = {
  Iniciacion: "Iniciación",
  Intermedio: "Intermedio",
  Avanzado: "Avanzado",
};

export default async function ClassesAdminPage() {
  const classes = await prisma.musicClass.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-paper">Clases</h1>
        <Link
          href="/admin/clases/nueva"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-ink hover:bg-paper"
        >
          + Nueva clase
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-soft text-paper-dim">
            <tr>
              <th className="px-4 py-3 font-medium">Instrumento</th>
              <th className="px-4 py-3 font-medium">Nivel</th>
              <th className="px-4 py-3 font-medium">Modalidad</th>
              <th className="px-4 py-3 font-medium">Profesor/a</th>
              <th className="px-4 py-3 font-medium">Horario</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {classes.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-paper">{item.instrument}</td>
                <td className="px-4 py-3 text-paper-dim">{LEVEL_LABEL[item.level]}</td>
                <td className="px-4 py-3 text-paper-dim">{item.modality}</td>
                <td className="px-4 py-3 text-paper-dim">{item.teacher}</td>
                <td className="px-4 py-3 text-paper-dim">{item.schedule}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/clases/${item.id}`}
                      className="text-sm text-brass hover:underline"
                    >
                      Editar
                    </Link>
                    <DeleteButton
                      action={deleteClass.bind(null, item.id)}
                      confirmText={`¿Eliminar la clase de ${item.instrument}?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-paper-dim">
                  Todavía no hay clases cargadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
