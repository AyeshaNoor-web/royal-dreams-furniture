/**
 * Noor's avatar: a line drawing in gold on the dark surface, in the same hairline language as the site's rules and
 * frames. A head and shoulders, hair gathered in a bun, a pencil behind the ear, smiling eyes that blink on a slow
 * loop. Pure SVG, decorative: the element around it carries the accessible name.
 */
export default function Mascot({ className = "h-12 w-12", wave = false }: { className?: string; wave?: boolean }) {
  return (
    <svg viewBox="0 0 96 96" className={"rounded-full " + className + (wave ? " mascot-wave" : "")} aria-hidden="true" focusable="false" style={{ overflow: "hidden" }}>
      <circle cx="48" cy="48" r="47" fill="#161412" />
      <circle cx="48" cy="48" r="46" fill="none" stroke="#B8965A" strokeWidth="1.2" />
      <g fill="none" stroke="#D4AF7A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* shoulders */}
        <path d="M18 92c4-13 15-21 30-21s26 8 30 21" />
        {/* neck */}
        <path d="M42 62v8M54 62v8" />
        {/* face */}
        <path d="M31 44c0-14 8-23 17-23s17 9 17 23c0 12-8 20-17 20s-17-8-17-20z" />
        {/* hair and bun */}
        <path d="M31 44c1-12 8-20 17-20s16 8 17 20c-4-6-9-9-15-9-2 0-3 1-2 1-1 0-2-1-4-1-6 0-10 3-13 9z" />
        <circle cx="66" cy="27" r="6" />
        {/* pencil behind the ear */}
        <path d="M63 36l12-7M75 29l2-1.2" />
        {/* earring */}
        <circle cx="31.5" cy="49" r="1.6" />
        {/* brows */}
        <path d="M38.5 40.5c2-1.6 5-1.6 7 0M50.5 40.5c2-1.6 5-1.6 7 0" strokeWidth="1.3" />
        {/* eyes: gentle arcs, blinking */}
        <g className="mascot-eyes">
          <path d="M39.5 46.5c1.6-1.8 4.4-1.8 6 0M50.5 46.5c1.6-1.8 4.4-1.8 6 0" />
        </g>
        {/* smile */}
        <path d="M43.5 54c2 2.4 7 2.4 9 0" />
      </g>
    </svg>
  );
}
