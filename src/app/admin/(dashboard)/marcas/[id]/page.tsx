import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BrandForm } from "../BrandForm";
import { updateBrand } from "../actions";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Editar marca</h1>
      <BrandForm action={updateBrand.bind(null, id)} defaultValues={brand} />
    </div>
  );
}
