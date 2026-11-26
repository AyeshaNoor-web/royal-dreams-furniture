import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/site/Breadcrumbs";

interface PageHeaderProps {
  /** Accepted for older call sites; headings stand alone, so it is not shown. */
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  /** Trail after "Home". Defaults to the title alone. */
  crumbs?: Crumb[];
  /** Buttons or a price line under the intro. */
  children?: ReactNode;
  /** Kept for older call sites. */
  accent?: string[];
}

/** The band at the top of every inner page: where you are, what the page is, and what to do next. */
export default function PageHeader({ title, intro, crumbs, children }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-sand">
      <div className="wrap pb-10 pt-6 lg:pb-14 lg:pt-8">
        <Breadcrumbs items={crumbs ?? [{ label: title }]} />
        <div className="mt-8 max-w-3xl lg:mt-10">
          <h1 className="h-xl">{title}</h1>
          {intro && <p className="lede mt-5 max-w-2xl">{intro}</p>}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
