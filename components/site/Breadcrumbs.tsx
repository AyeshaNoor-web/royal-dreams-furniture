import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

/** "Home / Products / Sofas / Cream sofa" so a visitor always knows where they are and how to step back. */
export default function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const base = tone === "dark" ? "text-white/70" : "text-taupe";
  const last = tone === "dark" ? "text-white" : "text-charcoal";
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-charcoal";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={"flex flex-wrap items-center gap-x-2 gap-y-1 font-dm text-[13px] " + base}>
        <li><Link href="/" className={"underline-offset-4 hover:underline " + hover}>Home</Link></li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className={"underline-offset-4 hover:underline " + hover}>{c.label}</Link>
            ) : (
              <span aria-current="page" className={"font-semibold " + last}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
