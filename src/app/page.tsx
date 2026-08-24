import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { About } from "@/components/sections/About";
import { Instruments } from "@/components/sections/Instruments";
import { Gallery } from "@/components/sections/Gallery";
import { Academy } from "@/components/sections/Academy";
import { Testimonials } from "@/components/sections/Testimonials";
import { LocationMap } from "@/components/sections/LocationMap";
import { Contact } from "@/components/sections/Contact";

const TICKER_ITEMS = [
  "Guitarras",
  "Bajos",
  "Teclados",
  "Vientos",
  "Percusión",
  "Audio",
  "Clases individuales",
  "Clases grupales",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={TICKER_ITEMS} />
      <About />
      <Instruments />
      <Gallery />
      <Academy />
      <Testimonials />
      <LocationMap />
      <Contact />
    </>
  );
}
