import { FormField, TextInput, TextArea } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface TestimonialFormValues {
  name: string;
  role: string;
  quote: string;
}

export function TestimonialForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: TestimonialFormValues;
}) {
  return (
    <form action={action} className="mt-8 flex max-w-xl flex-col gap-5">
      <FormField label="Nombre" htmlFor="name">
        <TextInput id="name" name="name" required defaultValue={defaultValues?.name} />
      </FormField>

      <FormField label="Rol / relación con el local" htmlFor="role">
        <TextInput
          id="role"
          name="role"
          required
          placeholder="Alumno de guitarra, 2 años"
          defaultValue={defaultValues?.role}
        />
      </FormField>

      <FormField label="Testimonio" htmlFor="quote">
        <TextArea id="quote" name="quote" rows={4} required defaultValue={defaultValues?.quote} />
      </FormField>

      <div className="mt-2">
        <SubmitButton>Guardar</SubmitButton>
      </div>
    </form>
  );
}
