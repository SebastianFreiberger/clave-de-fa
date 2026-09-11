import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import instruments from "../src/content/instruments.json";
import classes from "../src/content/classes.json";
import gallery from "../src/content/gallery.json";
import testimonials from "../src/content/testimonials.json";
import contact from "../src/content/contact.json";

const prisma = new PrismaClient();

const LEVEL_MAP: Record<string, "Iniciacion" | "Intermedio" | "Avanzado"> = {
  Iniciación: "Iniciacion",
  Intermedio: "Intermedio",
  Avanzado: "Avanzado",
};

const CATEGORIES = [
  { slug: "cuerdas", name: "Cuerdas" },
  { slug: "vientos", name: "Vientos" },
  { slug: "percusion", name: "Percusión" },
  { slug: "teclados", name: "Teclados" },
  { slug: "audio", name: "Audio" },
];

const BRANDS = [
  { slug: "fonseca", name: "Fonseca" },
  { slug: "fender", name: "Fender" },
  { slug: "yamaha", name: "Yamaha" },
  { slug: "gibson", name: "Gibson" },
  { slug: "generico", name: "Genérico" },
];

const BRAND_BY_PRODUCT_SLUG: Record<string, string> = {
  "guitarra-criolla-fonseca": "fonseca",
  "guitarra-electrica-stratocaster": "fender",
  "bajo-electrico-jazz": "fender",
  "bateria-acustica-5-cuerpos": "yamaha",
  "saxo-alto": "yamaha",
  "trompeta-sib": "yamaha",
  "clarinete-sib": "yamaha",
  "piano-digital-88-teclas": "yamaha",
  "sintetizador-61-teclas": "yamaha",
};

async function main() {
  const adminEmail = "dueno@clavedefa.com.ar";
  const adminPassword = "ClaveDeFa2026!";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Dueño",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "ADMIN",
    },
  });

  const categoryIds = new Map<string, string>();
  for (const [i, cat] of CATEGORIES.entries()) {
    const row = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { slug: cat.slug, name: cat.name, order: i },
    });
    categoryIds.set(cat.slug, row.id);
  }

  const brandIds = new Map<string, string>();
  for (const [i, brand] of BRANDS.entries()) {
    const row = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: { slug: brand.slug, name: brand.name, order: i },
    });
    brandIds.set(brand.slug, row.id);
  }

  for (const [i, item] of instruments.entries()) {
    const brandSlug = BRAND_BY_PRODUCT_SLUG[item.slug] ?? "generico";
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        name: item.name,
        tagline: item.tagline,
        categoryId: categoryIds.get(item.category)!,
        brandId: brandIds.get(brandSlug)!,
        costPrice: Math.round(item.priceFrom * 0.65),
        price: item.priceFrom,
        currency: item.currency as never,
        stock: 4 + (i % 6),
        published: true,
        featured: item.featured,
        order: i,
      },
    });
  }

  for (const [i, item] of classes.entries()) {
    await prisma.musicClass.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        instrument: item.instrument,
        level: LEVEL_MAP[item.level],
        modality: item.modality as never,
        teacher: item.teacher,
        schedule: item.schedule,
        order: i,
      },
    });
  }

  for (const [i, item] of gallery.entries()) {
    await prisma.galleryItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        caption: item.caption,
        category: item.category as never,
        size: item.size as never,
        order: i,
      },
    });
  }

  for (const [i, item] of testimonials.entries()) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: item.name },
    });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          name: item.name,
          role: item.role,
          quote: item.quote,
          order: i,
        },
      });
    }
  }

  const existingContact = await prisma.contactInfo.findFirst();
  if (!existingContact) {
    await prisma.contactInfo.create({
      data: {
        address: contact.address,
        city: contact.city,
        phone: contact.phone,
        whatsapp: contact.whatsapp,
        email: contact.email,
        instagram: contact.instagram,
        facebook: contact.facebook,
        hours: {
          create: contact.hours.map((h, i) => ({
            day: h.day,
            hours: h.hours,
            order: i,
          })),
        },
      },
    });
  }

  console.log("Seed completo.");
  console.log(`Usuario admin: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
