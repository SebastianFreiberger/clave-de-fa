import { FormField, TextInput, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface UserFormValues {
  name: string;
  email: string;
  role: string;
}

export function UserForm({
  action,
  defaultValues,
  isEdit = false,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: UserFormValues;
  isEdit?: boolean;
}) {
  return (
    <form action={action} className="mt-8 flex max-w-xl flex-col gap-5">
      <FormField label="Nombre" htmlFor="name">
        <TextInput id="name" name="name" required defaultValue={defaultValues?.name} />
      </FormField>

      <FormField label="Email" htmlFor="email">
        <TextInput id="email" name="email" type="email" required defaultValue={defaultValues?.email} />
      </FormField>

      <FormField
        label={isEdit ? "Nueva contraseña (dejar en blanco para no cambiarla)" : "Contraseña"}
        htmlFor="password"
      >
        <TextInput
          id="password"
          name="password"
          type="password"
          required={!isEdit}
          minLength={8}
          autoComplete="new-password"
        />
      </FormField>

      <FormField label="Rol" htmlFor="role">
        <Select id="role" name="role" defaultValue={defaultValues?.role ?? "EDITOR"}>
          <option value="EDITOR">Editor — puede administrar contenido</option>
          <option value="ADMIN">Administrador — además gestiona usuarios</option>
        </Select>
      </FormField>

      <div className="mt-2">
        <SubmitButton>Guardar</SubmitButton>
      </div>
    </form>
  );
}
