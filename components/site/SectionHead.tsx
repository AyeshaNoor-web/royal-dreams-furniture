import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  /** Right-hand slot on left-aligned heads, usually a "view all" link. */
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionHead({ eyebrow, title, lede, align = "center", action, as: Tag = "h2", className = "" }: Props) {
  if (align === "center") {
    return (
      <div className={"mx-auto max-w-2xl text-center " + className}>
        {eyebrow && <p className="eyebrow eyebrow-center mb-5">{eyebrow}</p>}
        <Tag className="h-lg">{title}</Tag>
        {lede && <p className="lede mt-5">{lede}</p>}
      </div>
    );
  }
  return (
    <div className={"flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between " + className}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <Tag className="h-lg">{title}</Tag>
        {lede && <p className="lede mt-4">{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
