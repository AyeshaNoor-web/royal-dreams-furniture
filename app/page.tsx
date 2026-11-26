import HeroGallery from "@/components/home/HeroGallery";
import UspStrip from "@/components/home/UspStrip";
import WhatWeMake from "@/components/home/WhatWeMake";
import PlanByRoom from "@/components/home/PlanByRoom";
import ProcessSticky from "@/components/home/ProcessSticky";
import QuoteFactors from "@/components/home/QuoteFactors";
import EstimatorTeaser from "@/components/home/EstimatorTeaser";
import InquiryBand from "@/components/home/InquiryBand";
import RecentWork from "@/components/home/RecentWork";
import Reviews from "@/components/home/Reviews";
import Workshop from "@/components/home/Workshop";
import WhereWeWork from "@/components/home/WhereWeWork";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import InstagramStrip from "@/components/home/InstagramStrip";
import { faqs } from "@/lib/faq";

// Lets search engines show the questions below the listing.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

// Order follows the enquiry path: what we make, which room, how it works, what it costs, ask,
// then proof (work, workshop, areas, questions) and a last invitation.
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeroGallery />
      <UspStrip />
      <WhatWeMake />
      <PlanByRoom />
      <ProcessSticky />
      <QuoteFactors />
      <EstimatorTeaser />
      <InquiryBand />
      <RecentWork />
      <Reviews />
      <Workshop />
      <WhereWeWork />
      <Faq />
      <FinalCta />
      <InstagramStrip />
    </>
  );
}
