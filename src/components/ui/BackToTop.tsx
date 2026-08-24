"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { BassClefIcon } from "./BassClefIcon";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenisRef = useLenis();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.3 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          title="Volver arriba"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-brass/40 bg-ink-soft text-brass shadow-lg shadow-black/40 backdrop-blur-md md:right-10 md:bottom-10"
        >
          <BassClefIcon className="h-7 w-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
