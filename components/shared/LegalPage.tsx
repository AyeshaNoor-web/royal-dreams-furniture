import type { ReactNode } from "react";
import PageHeader from "@/components/shared/PageHeader";

interface Section {
  heading: string;
  body: ReactNode;
}

/** Shared frame for the legal drafts. The DRAFT strip stays until the client's lawyer has approved the text. */
export default function LegalPage({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: Section[] }) {
  return (
    <>
      <div role="note" className="border-b border-border bg-beige-dark px-6 py-2 text-center font-dm text-[13px] text-charcoal">
        Draft for legal review. Text in [square brackets] must be completed by the business before publication.
      </div>
      <PageHeader title={title} intro={intro} />
      <section className="mx-auto max-w-3xl px-6 py-12 lg:px-10 lg:py-16">
        <p className="text-[14px] text-taupe">Last updated: {updated}</p>
        <div className="mt-8 flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-serif text-2xl text-charcoal">{s.heading}</h2>
              <div className="mt-3 flex flex-col gap-3 text-[16px] leading-relaxed text-taupe [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1">{s.body}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
