import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clave de Fa — Instrumentos y academia de música",
  description:
    "Tienda de instrumentos musicales y academia de música. Guitarras, bajos, teclados, vientos, percusión y equipos de audio, con clases para todos los niveles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <div className="grain" />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
