import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Partners } from "@/components/home/Partners";
import { FeaturedPrograms } from "@/components/home/FeaturedPrograms";
import { WhyBato } from "@/components/home/WhyBato";
import { MissionCTA } from "@/components/shared/MissionCTA";
import { DonationCTA } from "@/components/shared/DonationCTA";
import { ContactPreview } from "@/components/home/ContactPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WhatWeDo />
      <Partners />
      <WhyBato />
      <FeaturedPrograms />

      <MissionCTA />
      <DonationCTA />
      <ContactPreview />
    </>
  );
}
