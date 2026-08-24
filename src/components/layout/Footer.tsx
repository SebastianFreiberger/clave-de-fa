import { getContactInfo } from "@/lib/data";

export function Footer() {
  const contact = getContactInfo();

  return (
    <footer className="border-t border-ink-line px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-2xl text-paper">
            Clave <span className="text-brass italic">de Fa</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-paper-dim">
            Instrumentos y academia de música. Un lugar para empezar, seguir
            o volver a tocar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm text-paper-dim md:flex md:gap-16">
          <div>
            <p className="mb-3 tracking-widest text-paper uppercase">Visitanos</p>
            <p>{contact.address}</p>
            <p>{contact.city}</p>
          </div>
          <div>
            <p className="mb-3 tracking-widest text-paper uppercase">Contacto</p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col-reverse gap-4 border-t border-ink-line pt-6 text-xs text-paper-dim md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Clave de Fa. Todos los derechos reservados.</p>
        <p>{contact.instagram}</p>
      </div>
    </footer>
  );
}
