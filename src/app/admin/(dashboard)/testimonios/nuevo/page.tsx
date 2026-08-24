import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nuevo testimonio</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
