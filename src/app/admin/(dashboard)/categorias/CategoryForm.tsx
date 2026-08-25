import { FormField, TextInput } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface CategoryFormValues {
  slug: string;
  name: string;
}

export function CategoryForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: CategoryFormValues;
}) {
  return (
    <form action={action} className="mt-8 flex max-w-md flex-col gap-5">
      <FormField label="Nombre" htmlFor="name">
        <TextInput id="name" name="name" required defaultValue={defaultValues?.name} />
      </FormField>

      <FormField label="Slug (identificador único)" htmlFor="slug">
        <TextInput
          id="slug"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          placeholder="cuerdas"
          defaultValue={defaultValues?.slug}
        />
      </FormField>

      <div className="mt-2">
        <SubmitButton>Guardar</SubmitButton>
      </div>
    </form>
  );
}
