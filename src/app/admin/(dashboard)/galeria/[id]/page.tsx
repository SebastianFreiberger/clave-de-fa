import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GalleryForm } from "../GalleryForm";
import { updateGalleryItem } from "../actions";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Editar foto</h1>
      <GalleryForm action={updateGalleryItem.bind(null, id)} defaultValues={item} />
    </div>
  );
}
