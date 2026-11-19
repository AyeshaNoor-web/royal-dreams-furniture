import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import EstimatorFlow from "@/components/estimator/EstimatorFlow";
import { estimatorEnabled } from "@/lib/flags";
import { publicCatalogue } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Budget estimator",
  description: "An indicative price range for made-to-measure sofas, beds, wardrobes, media walls, curtains and more, before the free home visit.",
  robots: estimatorEnabled ? undefined : { index: false, follow: false },
};

export default function EstimatorPage() {
  if (!estimatorEnabled) notFound();
  // Units, bounds and option names only. Rates stay in lib/pricing.ts on the server.
  const catalogue = publicCatalogue();
  return (
    <>
      <PageHeader
        title="A budget range before we visit."
        intro="Choose a piece, its size and finish level, and see an indicative range in dirhams. Add more pieces to plan a whole room. The exact quotation follows the free site measurement and 3D design."
      />
      <EstimatorFlow catalogue={catalogue} />
    </>
  );
}
