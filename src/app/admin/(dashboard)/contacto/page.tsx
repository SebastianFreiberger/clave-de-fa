import { prisma } from "@/lib/prisma";
import { ContactForm } from "./ContactForm";
import { updateContact } from "./actions";

export default async function ContactAdminPage() {
  const contact = await prisma.contactInfo.findFirst({
    include: { hours: { orderBy: { order: "asc" } } },
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Contacto y horarios</h1>
      <p className="mt-2 text-paper-dim">
        Esta información se muestra en el pie de página y en la sección de
        ubicación del sitio.
      </p>

      <ContactForm
        action={updateContact}
        defaultValues={
          contact ?? {
            address: "",
            city: "",
            phone: "",
            whatsapp: "",
            email: "",
            instagram: "",
            hours: [],
          }
        }
      />
    </div>
  );
}
