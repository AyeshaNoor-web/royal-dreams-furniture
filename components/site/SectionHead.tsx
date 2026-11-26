import type { ReactNode } from "react";

interface Props {
  /** Accepted for older call sites; headings stand alone, so it is not shown. */
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  /** Right-hand slot on left-aligned heads, usually a "view all" link. */
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionHead({ title, lede, align = "center", action, as: Tag = "h2", className = "" }: Props) {
  if (align === "center") {
    return (
      <div className={"mx-auto max-w-2xl text-center " + className}>
        <Tag className="h-lg">{title}</Tag>
        {lede && <p className="lede mt-4">{lede}</p>}
      </div>
    );
  }
  return (
    <div className={"flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between " + className}>
      <div className="max-w-2xl">
        <Tag className="h-lg">{title}</Tag>
        {lede && <p className="lede mt-4">{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
