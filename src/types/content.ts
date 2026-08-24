export type InstrumentCategory =
  | "cuerdas"
  | "vientos"
  | "percusion"
  | "teclados"
  | "audio";

export interface Instrument {
  slug: string;
  name: string;
  category: InstrumentCategory;
  tagline: string;
  priceFrom: number;
  currency: "ARS" | "USD";
  featured: boolean;
}

export interface MusicClass {
  slug: string;
  instrument: string;
  level: "Iniciación" | "Intermedio" | "Avanzado";
  modality: "Individual" | "Grupal";
  teacher: string;
  schedule: string;
}

export interface ContactInfo {
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  hours: { day: string; hours: string }[];
}

export type GalleryCategory =
  | "cuerdas"
  | "vientos"
  | "percusion"
  | "audio"
  | "academia";

export interface GalleryItem {
  slug: string;
  caption: string;
  category: GalleryCategory;
  size: "small" | "medium" | "large";
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}
