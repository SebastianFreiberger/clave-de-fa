import Image from "next/image";
import { FormField, TextInput, TextArea, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface Option {
  id: string;
  name: string;
}

interface ProductFormValues {
  slug: string;
  name: string;
  categoryId: string;
  brandId: string | null;
  tagline: string;
  costPrice: number;
  price: number;
  currency: string;
  stock: number;
  published: boolean;
  featured: boolean;
  imageUrl?: string | null;
}

export function ProductForm({
  action,
  categories,
  brands,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  categories: Option[];
  brands: Option[];
  defaultValues?: ProductFormValues;
}) {
  return (
    <form action={action} className="mt-8 flex max-w-xl flex-col gap-5">
      <FormField label="Nombre" htmlFor="name">
        <TextInput id="name" name="name" required defaultValue={defaultValues?.name} />
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

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Categoría" htmlFor="categoryId">
          <Select id="categoryId" name="categoryId" required defaultValue={defaultValues?.categoryId}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Marca" htmlFor="brandId">
          <Select id="brandId" name="brandId" defaultValue={defaultValues?.brandId ?? ""}>
            <option value="">Sin marca</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label="Descripción breve" htmlFor="tagline">
        <TextArea
          id="tagline"
          name="tagline"
          rows={2}
          required
          defaultValue={defaultValues?.tagline}
        />
      </FormField>

      <div className="grid grid-cols-3 gap-5">
        <FormField label="Precio de costo" htmlFor="costPrice">
          <TextInput
            id="costPrice"
            name="costPrice"
            type="number"
            min={0}
            required
            defaultValue={defaultValues?.costPrice}
          />
        </FormField>

        <FormField label="Precio de venta" htmlFor="price">
          <TextInput
            id="price"
            name="price"
            type="number"
            min={0}
            required
            defaultValue={defaultValues?.price}
          />
        </FormField>

        <FormField label="Moneda" htmlFor="currency">
          <Select id="currency" name="currency" defaultValue={defaultValues?.currency ?? "ARS"}>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
          </Select>
        </FormField>
      </div>

      <FormField label="Stock (unidades disponibles)" htmlFor="stock">
        <TextInput
          id="stock"
          name="stock"
          type="number"
          min={0}
          required
          defaultValue={defaultValues?.stock ?? 0}
        />
      </FormField>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-paper-dim">
          <input
            type="checkbox"
            name="published"
            defaultChecked={defaultValues?.published ?? true}
            className="h-4 w-4 accent-brass"
          />
          Publicado en el sitio (visible en el catálogo)
        </label>
        <label className="flex items-center gap-2 text-sm text-paper-dim">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={defaultValues?.featured}
            className="h-4 w-4 accent-brass"
          />
          Mostrar como destacado
        </label>
      </div>

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
