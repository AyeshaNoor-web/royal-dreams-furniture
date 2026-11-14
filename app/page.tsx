import HeroEditorial from "@/components/home/HeroEditorial";
import UspStrip from "@/components/home/UspStrip";
import WhatWeMake from "@/components/home/WhatWeMake";
import PlanByRoom from "@/components/home/PlanByRoom";
import HowItWorks from "@/components/home/HowItWorks";
import QuoteFactors from "@/components/home/QuoteFactors";
import InquiryBand from "@/components/home/InquiryBand";
import RecentWork from "@/components/home/RecentWork";
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
      <HeroEditorial />
      <UspStrip />
      <WhatWeMake />
      <PlanByRoom />
      <HowItWorks />
      <QuoteFactors />
      <InquiryBand />
      <RecentWork />
      <Workshop />
      <WhereWeWork />
      <Faq />
      <FinalCta />
      <InstagramStrip />
    </>
  );
}
