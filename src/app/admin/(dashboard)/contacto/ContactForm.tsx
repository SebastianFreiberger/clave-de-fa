"use client";

import { useState } from "react";
import { FormField, TextInput } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

interface ContactFormValues {
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  hours: { day: string; hours: string }[];
}

export function ContactForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues: ContactFormValues;
}) {
  const [hours, setHours] = useState(
    defaultValues.hours.length > 0
      ? defaultValues.hours
      : [{ day: "", hours: "" }]
  );

  function updateRow(index: number, field: "day" | "hours", value: string) {
    setHours((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    setHours((prev) => [...prev, { day: "", hours: "" }]);
  }

  function removeRow(index: number) {
    setHours((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form action={action} className="mt-8 flex max-w-xl flex-col gap-5">
      <FormField label="Dirección" htmlFor="address">
        <TextInput id="address" name="address" required defaultValue={defaultValues.address} />
      </FormField>

      <FormField label="Ciudad" htmlFor="city">
        <TextInput id="city" name="city" required defaultValue={defaultValues.city} />
      </FormField>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Teléfono" htmlFor="phone">
          <TextInput id="phone" name="phone" required defaultValue={defaultValues.phone} />
        </FormField>
        <FormField label="WhatsApp (solo números, con código de país)" htmlFor="whatsapp">
          <TextInput
            id="whatsapp"
            name="whatsapp"
            required
            placeholder="5491100000000"
            defaultValue={defaultValues.whatsapp}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Email" htmlFor="email">
          <TextInput id="email" name="email" type="email" required defaultValue={defaultValues.email} />
        </FormField>
        <FormField label="Instagram" htmlFor="instagram">
          <TextInput
            id="instagram"
            name="instagram"
            required
            placeholder="@clavedefa"
            defaultValue={defaultValues.instagram}
          />
        </FormField>
      </div>

      <div>
        <p className="text-sm text-paper-dim">Horarios</p>
        <div className="mt-2 flex flex-col gap-2">
          {hours.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput
                name="hourDay"
                placeholder="Lunes a viernes"
                value={row.day}
                onChange={(e) => updateRow(i, "day", e.target.value)}
                className="flex-1"
              />
              <TextInput
                name="hourRange"
                placeholder="10:00 – 20:00"
                value={row.hours}
                onChange={(e) => updateRow(i, "hours", e.target.value)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="text-sm text-wine hover:underline"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-3 text-sm text-brass hover:underline"
        >
          + Agregar horario
        </button>
      </div>

      <div className="mt-2">
        <SubmitButton>Guardar</SubmitButton>
      </div>
    </form>
  );
}
