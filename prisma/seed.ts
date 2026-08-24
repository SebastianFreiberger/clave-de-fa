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

  for (const [i, item] of instruments.entries()) {
    await prisma.instrument.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        name: item.name,
        category: item.category as never,
        tagline: item.tagline,
        priceFrom: item.priceFrom,
        currency: item.currency as never,
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
