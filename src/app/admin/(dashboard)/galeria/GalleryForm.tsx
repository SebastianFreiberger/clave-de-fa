import Image from "next/image";
import { FormField, TextInput, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface GalleryFormValues {
  slug: string;
  caption: string;
  category: string;
  size: string;
  imageUrl?: string | null;
}

export function GalleryForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: GalleryFormValues;
}) {
  return (
    <form action={action} className="mt-8 flex max-w-xl flex-col gap-5">
      <FormField label="Descripción" htmlFor="caption">
        <TextInput
          id="caption"
          name="caption"
          required
          placeholder="Pared de guitarras y bajos"
          defaultValue={defaultValues?.caption}
        />
      </FormField>

      <FormField label="Slug (identificador único)" htmlFor="slug">
        <TextInput
          id="slug"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          placeholder="salon-guitarras"
          defaultValue={defaultValues?.slug}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Categoría" htmlFor="category">
          <Select id="category" name="category" defaultValue={defaultValues?.category ?? "cuerdas"}>
            <option value="cuerdas">Cuerdas</option>
            <option value="vientos">Vientos</option>
            <option value="percusion">Percusión</option>
            <option value="audio">Audio</option>
            <option value="academia">Academia</option>
          </Select>
        </FormField>

        <FormField label="Tamaño en el mosaico" htmlFor="size">
          <Select id="size" name="size" defaultValue={defaultValues?.size ?? "small"}>
            <option value="small">Chico</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </Select>
        </FormField>
      </div>

      <FormField label="Foto (JPG, PNG o WEBP, máx. 5MB)" htmlFor="image">
        {defaultValues?.imageUrl && (
          <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg">
            <Image src={defaultValues.imageUrl} alt="" fill className="object-cover" />
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
