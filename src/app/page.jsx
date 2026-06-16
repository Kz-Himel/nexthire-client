import FeaturedJobs from "@/components/home/FeaturedJobs";
import HeroSection from "@/components/home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <FeaturedJobs />
    </div>
  );
}
