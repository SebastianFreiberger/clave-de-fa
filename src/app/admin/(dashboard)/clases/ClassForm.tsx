import { FormField, TextInput, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface ClassFormValues {
  slug: string;
  instrument: string;
  level: string;
  modality: string;
  teacher: string;
  schedule: string;
}

export function ClassForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ClassFormValues;
}) {
  return (
    <form action={action} className="mt-8 flex max-w-xl flex-col gap-5">
      <FormField label="Instrumento" htmlFor="instrument">
        <TextInput
          id="instrument"
          name="instrument"
          required
          placeholder="Guitarra"
          defaultValue={defaultValues?.instrument}
        />
      </FormField>

      <FormField label="Slug (identificador único)" htmlFor="slug">
        <TextInput
          id="slug"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          placeholder="guitarra-iniciacion"
          defaultValue={defaultValues?.slug}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Nivel" htmlFor="level">
          <Select id="level" name="level" defaultValue={defaultValues?.level ?? "Iniciacion"}>
            <option value="Iniciacion">Iniciación</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </Select>
        </FormField>

        <FormField label="Modalidad" htmlFor="modality">
          <Select id="modality" name="modality" defaultValue={defaultValues?.modality ?? "Individual"}>
            <option value="Individual">Individual</option>
            <option value="Grupal">Grupal</option>
          </Select>
        </FormField>
      </div>

      <FormField label="Profesor/a" htmlFor="teacher">
        <TextInput
          id="teacher"
          name="teacher"
          required
          defaultValue={defaultValues?.teacher}
        />
      </FormField>

      <FormField label="Horario" htmlFor="schedule">
        <TextInput
          id="schedule"
          name="schedule"
          required
          placeholder="Lunes y miércoles 18:00"
          defaultValue={defaultValues?.schedule}
        />
      </FormField>

      <div className="mt-2">
        <SubmitButton>Guardar</SubmitButton>
      </div>
    </form>
  );
}
