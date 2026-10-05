import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Formation } from "@/components/about/Formation";
import { TimelineSection } from "@/components/about/TimelineSection";
import { MissionVision } from "@/components/about/MissionVision";
import { CoreValues } from "@/components/about/CoreValues";
import { Leadership } from "@/components/about/Leadership";
import { DirectorMessage } from "@/components/about/DirectorMessage";
import { MissionCTA } from "@/components/shared/MissionCTA";
import { DonationCTA } from "@/components/shared/DonationCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "How BATO Foundation was formed — our mission, vision, timeline, values and leadership team.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="About BATO Foundation"
        subtitle="Building the road between talent and technology across Nepal."
        image="/images/gallery/header/about.jpg"
      />
      <Formation />
      <TimelineSection />
      <MissionVision />

      <Leadership />
      <DirectorMessage />
      <MissionCTA />
      <DonationCTA />
    </>
  );
}
