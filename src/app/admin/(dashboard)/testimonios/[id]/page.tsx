import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../TestimonialForm";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Editar testimonio</h1>
      <TestimonialForm action={updateTestimonial.bind(null, id)} defaultValues={testimonial} />
    </div>
  );
}
