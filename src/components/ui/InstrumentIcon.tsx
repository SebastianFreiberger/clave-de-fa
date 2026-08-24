import type { GalleryCategory } from "@/types/content";

const PATHS: Record<GalleryCategory, string> = {
  cuerdas:
    "M40 12c8 0 12 6 11 13-1 8-9 11-15 18-5 6-6 13-2 18 5 6 15 6 19-2M40 12l3 15M32 66c9 4 20 2 26-6",
  vientos:
    "M14 30h34a6 6 0 0 1 6 6v0a6 6 0 0 1-6 6H24M14 30v14M22 42v10M30 42v14M38 42v10",
  percusion:
    "M14 26c0-7 12-12 26-12s26 5 26 12-12 12-26 12-26-5-26-12ZM14 26v22c0 7 12 12 26 12s26-5 26-12V26",
  audio:
    "M40 12a10 10 0 0 1 10 10v14a10 10 0 0 1-20 0V22a10 10 0 0 1 10-10ZM24 34v4a16 16 0 0 0 32 0v-4M40 54v10M30 64h20",
  academia:
    "M12 28 40 16l28 12-28 12-28-12ZM24 34v14c0 4 8 8 16 8s16-4 16-8V34M62 30v16",
};

export function InstrumentIcon({
  category,
  className,
}: {
  category: GalleryCategory;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[category]} />
    </svg>
  );
}
