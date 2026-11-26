import HeroStart from "@/components/home/HeroStart";
import TrustTicker from "@/components/home/TrustTicker";
import PieceGrid from "@/components/home/PieceGrid";
import Steps from "@/components/home/Steps";
import WorkWall from "@/components/home/WorkWall";
import PriceGuide from "@/components/home/PriceGuide";
import WhyUs from "@/components/home/WhyUs";
import Reviews from "@/components/home/Reviews";
import Answers from "@/components/home/Answers";
import FinalStart from "@/components/home/FinalStart";
import Planner from "@/components/plan/Planner";
import { SHOW_CABINET_RATES } from "@/lib/cabinet-rates";
import { faqs } from "@/lib/faq";

// Lets search engines show the questions below the listing.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

// The page is one funnel. Promise and first question (hero) -> what we make -> how it works and what is free ->
// proof -> a real price -> why trust us -> the planner (the ask) -> last objections -> the ask again.
// Every button on the way feeds the planner or opens WhatsApp.
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HeroStart />
      <TrustTicker />
      <PieceGrid />
      <Steps />
      <WorkWall />
      {SHOW_CABINET_RATES && <PriceGuide />}
      <WhyUs />
      <Reviews />
      <Planner />
      <Answers />
      <FinalStart />
    </>
  );
}
