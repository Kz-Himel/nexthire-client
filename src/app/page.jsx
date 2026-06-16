import CtaSection from "@/components/home/CtaSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PricingSection from "@/components/pricing/PricingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <FeaturesSection />
      <CtaSection />
      <PricingSection />
    </>
  );
}
