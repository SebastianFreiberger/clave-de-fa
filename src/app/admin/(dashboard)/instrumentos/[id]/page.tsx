import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { InstrumentForm } from "../InstrumentForm";
import { updateInstrument } from "../actions";

export default async function EditInstrumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const instrument = await prisma.instrument.findUnique({ where: { id } });
  if (!instrument) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Editar instrumento</h1>
      <InstrumentForm
        action={updateInstrument.bind(null, id)}
        defaultValues={instrument}
      />
    </div>
  );
}
