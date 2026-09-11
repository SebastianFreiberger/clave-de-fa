import { prisma } from "@/lib/prisma";
import type {
  Product,
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

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { published: true },
    include: { category: true, brand: true },
    orderBy: { order: "asc" },
  });

  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    category: { slug: r.category.slug, name: r.category.name },
    brand: r.brand ? { slug: r.brand.slug, name: r.brand.name } : null,
    tagline: r.tagline,
    price: r.price,
    currency: r.currency,
    featured: r.featured,
    imageUrl: r.imageUrl ?? undefined,
  }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const items = await getProducts();
  return items.filter((i) => i.featured);
}

export async function getProductCategories() {
  const rows = await prisma.category.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({ slug: r.slug, name: r.name }));
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
      facebook: undefined,
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
    facebook: row.facebook ?? undefined,
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
