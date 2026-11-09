import HeroEditorial from "@/components/home/HeroEditorial";
import CategoryTiles from "@/components/home/CategoryTiles";
import UspStrip from "@/components/home/UspStrip";
import TrendingNow from "@/components/home/TrendingNow";
import PromoBanners from "@/components/home/PromoBanners";
import Inspiration from "@/components/home/Inspiration";
import HowItWorks from "@/components/home/HowItWorks";
import InquiryBand from "@/components/home/InquiryBand";
import InstagramStrip from "@/components/home/InstagramStrip";

export default function HomePage() {
  return (
    <>
      <HeroEditorial />
      <UspStrip />
      <CategoryTiles />
      <TrendingNow />
      <PromoBanners />
      <Inspiration />
      <HowItWorks />
      <InquiryBand />
      <InstagramStrip />
    </>
  );
}
