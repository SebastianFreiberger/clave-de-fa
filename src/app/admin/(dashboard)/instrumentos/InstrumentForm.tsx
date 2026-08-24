import Image from "next/image";
import { FormField, TextInput, TextArea, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface InstrumentFormValues {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  priceFrom: number;
  currency: string;
  featured: boolean;
  imageUrl?: string | null;
}

export function InstrumentForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: InstrumentFormValues;
}) {
  return (
    <form action={action} className="mt-8 flex max-w-xl flex-col gap-5">
      <FormField label="Nombre" htmlFor="name">
        <TextInput
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
        />
      </FormField>

      <FormField label="Slug (identificador único, sin espacios)" htmlFor="slug">
        <TextInput
          id="slug"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          placeholder="guitarra-criolla-fonseca"
          defaultValue={defaultValues?.slug}
        />
      </FormField>

      <FormField label="Categoría" htmlFor="category">
        <Select id="category" name="category" defaultValue={defaultValues?.category ?? "cuerdas"}>
          <option value="cuerdas">Cuerdas</option>
          <option value="vientos">Vientos</option>
          <option value="percusion">Percusión</option>
          <option value="teclados">Teclados</option>
          <option value="audio">Audio</option>
        </Select>
      </FormField>

      <FormField label="Descripción breve" htmlFor="tagline">
        <TextArea
          id="tagline"
          name="tagline"
          rows={2}
          required
          defaultValue={defaultValues?.tagline}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Precio desde" htmlFor="priceFrom">
          <TextInput
            id="priceFrom"
            name="priceFrom"
            type="number"
            min={0}
            required
            defaultValue={defaultValues?.priceFrom}
          />
        </FormField>

        <FormField label="Moneda" htmlFor="currency">
          <Select id="currency" name="currency" defaultValue={defaultValues?.currency ?? "ARS"}>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
          </Select>
        </FormField>
      </div>

      <label className="flex items-center gap-2 text-sm text-paper-dim">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={defaultValues?.featured}
          className="h-4 w-4 accent-brass"
        />
        Mostrar como destacado
      </label>

      <FormField label="Foto (JPG, PNG o WEBP, máx. 5MB)" htmlFor="image">
        {defaultValues?.imageUrl && (
          <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg">
            <Image
              src={defaultValues.imageUrl}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        )}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="text-sm text-paper-dim file:mr-4 file:rounded-full file:border-0 file:bg-ink-soft file:px-4 file:py-2 file:text-paper file:hover:bg-ink"
        />
      </FormField>

      <div className="mt-2">
        <SubmitButton>Guardar</SubmitButton>
      </div>
    </form>
  );
}
