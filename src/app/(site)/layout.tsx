import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { BackToTop } from "@/components/ui/BackToTop";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="grain" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </SmoothScroll>
  );
}
