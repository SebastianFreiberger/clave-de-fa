import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClassForm } from "../ClassForm";
import { updateClass } from "../actions";

export default async function EditClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const musicClass = await prisma.musicClass.findUnique({ where: { id } });
  if (!musicClass) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Editar clase</h1>
      <ClassForm action={updateClass.bind(null, id)} defaultValues={musicClass} />
    </div>
  );
}
