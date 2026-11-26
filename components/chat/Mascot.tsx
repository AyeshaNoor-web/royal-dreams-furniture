/**
 * The assistant's face: a flat, friendly designer drawn in the brand palette, with a pencil behind one ear.
 * Pure SVG, so it is sharp at any size and costs nothing to load. Eyes blink on a slow loop unless the visitor
 * prefers reduced motion. Decorative: the surrounding element carries the accessible name.
 */
export default function Mascot({ className = "h-12 w-12", wave = false }: { className?: string; wave?: boolean }) {
  return (
    <svg viewBox="0 0 96 96" className={"rounded-full " + className + (wave ? " mascot-wave" : "")} aria-hidden="true" focusable="false" style={{ overflow: "hidden" }}>
      <circle cx="48" cy="48" r="46" fill="#F9F3F0" stroke="#C4A090" strokeWidth="2" />
      <path d="M14 98c3-18 16-28 34-28s31 10 34 28z" fill="#2A1F18" />
      <path d="M41 70l7 9 7-9" fill="none" stroke="#C4A090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="42" y="55" width="12" height="14" rx="5" fill="#D4B8A8" />
      <circle cx="65" cy="27" r="8" fill="#2A1F18" />
      <ellipse cx="48" cy="44" rx="18" ry="20" fill="#E8D5C4" />
      <path d="M30 44c0-12 8-21 18-21s18 9 18 21c-3-6-7-9-12-9-3 0-5 1-6 2-1-1-3-2-6-2-5 0-9 3-12 9z" fill="#2A1F18" />
      <circle cx="30.5" cy="49" r="2.2" fill="#C4A090" />
      <path d="M61 35l11-6" stroke="#C4A090" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M72 29l3-1.6" stroke="#2A1F18" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M37.5 39.5c2.2-1.8 5.8-1.8 8 0M50.5 39.5c2.2-1.8 5.8-1.8 8 0" stroke="#2A1F18" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <g className="mascot-eyes">
        <circle cx="41.5" cy="44.5" r="1.9" fill="#2A1F18" />
        <circle cx="54.5" cy="44.5" r="1.9" fill="#2A1F18" />
      </g>
      <circle cx="37" cy="50" r="2.4" fill="#D4B8A8" opacity="0.8" />
      <circle cx="59" cy="50" r="2.4" fill="#D4B8A8" opacity="0.8" />
      <path d="M43.5 52c2 2.6 7 2.6 9 0" stroke="#A08070" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
