export interface ProductCategory {
  slug: string;
  name: string;
}

export interface ProductBrand {
  slug: string;
  name: string;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  brand: ProductBrand | null;
  tagline: string;
  price: number;
  currency: "ARS" | "USD";
  featured: boolean;
  imageUrl?: string;
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
  facebook?: string;
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
  imageUrl?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}
