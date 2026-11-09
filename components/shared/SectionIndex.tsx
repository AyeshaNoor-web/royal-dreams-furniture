/** Editorial running index, e.g. "01 / Collections", pinned in the left gutter on wide screens. */
export default function SectionIndex({ n, label }: { n: string; label: string }) {
  return (
    <span className="section-index" aria-hidden="true">
      {n} &nbsp;/&nbsp; {label}
    </span>
  );
}
