import instrumentsData from "@/content/instruments.json";
import classesData from "@/content/classes.json";
import contactData from "@/content/contact.json";
import galleryData from "@/content/gallery.json";
import testimonialsData from "@/content/testimonials.json";
import type {
  Instrument,
  MusicClass,
  ContactInfo,
  GalleryItem,
  Testimonial,
} from "@/types/content";

// Hoy leen de JSON local. El día de mañana estas mismas firmas pueden
// pasar a consultar una base de datos o un CMS sin tocar los componentes.

export function getInstruments(): Instrument[] {
  return instrumentsData as Instrument[];
}

export function getFeaturedInstruments(): Instrument[] {
  return getInstruments().filter((i) => i.featured);
}

export function getClasses(): MusicClass[] {
  return classesData as MusicClass[];
}

export function getContactInfo(): ContactInfo {
  return contactData as ContactInfo;
}

export function getGalleryItems(): GalleryItem[] {
  return galleryData as GalleryItem[];
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}
