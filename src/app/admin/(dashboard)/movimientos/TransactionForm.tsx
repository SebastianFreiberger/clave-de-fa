import { FormField, TextInput, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

const CATEGORY_SUGGESTIONS = [
  "Venta",
  "Alquiler",
  "Sueldos",
  "Proveedores",
  "Servicios",
  "Impuestos",
  "Otro",
];

export function TransactionForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="mt-8 flex max-w-md flex-col gap-5">
      <FormField label="Tipo" htmlFor="type">
        <Select id="type" name="type" defaultValue="EXPENSE">
          <option value="INCOME">Ingreso</option>
          <option value="EXPENSE">Egreso</option>
        </Select>
      </FormField>

      <FormField label="Categoría" htmlFor="category">
        <TextInput
          id="category"
          name="category"
          required
          list="category-suggestions"
          placeholder="Alquiler"
        />
        <datalist id="category-suggestions">
          {CATEGORY_SUGGESTIONS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </FormField>

      <FormField label="Monto" htmlFor="amount">
        <TextInput id="amount" name="amount" type="number" min={0} required />
      </FormField>

      <FormField label="Descripción" htmlFor="description">
        <TextInput id="description" name="description" required />
      </FormField>

      <FormField label="Fecha" htmlFor="date">
        <TextInput id="date" name="date" type="date" required defaultValue={today} />
      </FormField>

      <div className="mt-2">
        <SubmitButton>Guardar</SubmitButton>
      </div>
    </form>
  );
}
