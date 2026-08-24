import { getContactInfo } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  const contact = getContactInfo();
  const whatsappHref = `https://wa.me/${contact.whatsapp}`;

  return (
    <section id="contacto" className="border-t border-ink-line px-6 py-28 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-brass uppercase">
            Visitanos
          </p>
          <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-paper md:text-5xl">
            Vení a probar antes de decidir.
          </h2>
          <p className="mt-6 max-w-md text-paper-dim">
            Te esperamos en el local para asesorarte, probar instrumentos y
            coordinar tu primera clase.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton href={whatsappHref}>Escribir por WhatsApp</MagneticButton>
            <MagneticButton href={`mailto:${contact.email}`} variant="outline">
              Enviar email
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-ink-line bg-ink-soft p-8">
            <dl className="space-y-6 text-sm">
              <div>
                <dt className="tracking-widest text-brass uppercase">Dirección</dt>
                <dd className="mt-1 text-paper">
                  {contact.address}, {contact.city}
                </dd>
              </div>
              <div>
                <dt className="tracking-widest text-brass uppercase">Teléfono</dt>
                <dd className="mt-1 text-paper">{contact.phone}</dd>
              </div>
              <div>
                <dt className="tracking-widest text-brass uppercase">Horarios</dt>
                <dd className="mt-1 space-y-1 text-paper">
                  {contact.hours.map((h) => (
                    <p key={h.day}>
                      {h.day}: {h.hours}
                    </p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="tracking-widest text-brass uppercase">Instagram</dt>
                <dd className="mt-1 text-paper">{contact.instagram}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
