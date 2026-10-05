import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProgramExplorer } from "@/components/programs/ProgramExplorer";
import { BesidesPrograms } from "@/components/programs/BesidesPrograms";
import { UltimateDream } from "@/components/programs/UltimateDream";
import { DonationCTA } from "@/components/shared/DonationCTA";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Explore BATO Foundation's STEM, robotics, coding, AI and community technology programs across Nepal.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        crumb="Programs"
        title="Our Programs"
        subtitle="Filter, search and explore the work we do across Nepal."
        image="/images/gallery/header/program.jpg"
      />
      <ProgramExplorer />
      <BesidesPrograms />
      <UltimateDream />
      <DonationCTA />
    </>
  );
}
