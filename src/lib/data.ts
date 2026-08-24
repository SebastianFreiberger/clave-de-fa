import { prisma } from "@/lib/prisma";
import type {
  Instrument,
  MusicClass,
  ContactInfo,
  GalleryItem,
  Testimonial,
} from "@/types/content";

const LEVEL_LABEL: Record<string, MusicClass["level"]> = {
  Iniciacion: "Iniciación",
  Intermedio: "Intermedio",
  Avanzado: "Avanzado",
};

export async function getInstruments(): Promise<Instrument[]> {
  const rows = await prisma.instrument.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    category: r.category,
    tagline: r.tagline,
    priceFrom: r.priceFrom,
    currency: r.currency,
    featured: r.featured,
    imageUrl: r.imageUrl ?? undefined,
  }));
}

export async function getFeaturedInstruments(): Promise<Instrument[]> {
  const items = await getInstruments();
  return items.filter((i) => i.featured);
}

export async function getClasses(): Promise<MusicClass[]> {
  const rows = await prisma.musicClass.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    instrument: r.instrument,
    level: LEVEL_LABEL[r.level],
    modality: r.modality,
    teacher: r.teacher,
    schedule: r.schedule,
  }));
}

export async function getContactInfo(): Promise<ContactInfo> {
  const row = await prisma.contactInfo.findFirst({
    include: { hours: { orderBy: { order: "asc" } } },
  });

  if (!row) {
    return {
      address: "",
      city: "",
      phone: "",
      whatsapp: "",
      email: "",
      instagram: "",
      hours: [],
    };
  }

  return {
    address: row.address,
    city: row.city,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    instagram: row.instagram,
    hours: row.hours.map((h) => ({ day: h.day, hours: h.hours })),
  };
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const rows = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    caption: r.caption,
    category: r.category,
    size: r.size,
    imageUrl: r.imageUrl ?? undefined,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({ name: r.name, role: r.role, quote: r.quote }));
}
