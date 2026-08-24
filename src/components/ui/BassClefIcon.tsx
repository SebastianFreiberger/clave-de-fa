export function BassClefIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M66,16 A24,24 0 1 0 42,50 C36,60 30,74 40,80 C48,84 58,80 58,72"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="76" cy="26" r="5.5" fill="currentColor" />
      <circle cx="76" cy="44" r="5.5" fill="currentColor" />
    </svg>
  );
}
