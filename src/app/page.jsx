import CtaSection from "@/components/home/CtaSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <HeroSection />
      <FeaturedJobs />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
}
