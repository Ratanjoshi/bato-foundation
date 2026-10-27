import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Formation, FormationData } from "@/components/about/Formation"; // ✅ Import type
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

// ✅ 1. Create the fetch function
async function getFormationData(): Promise<FormationData | null> {
  try {
    // Adjust the URL if your backend is hosted elsewhere in production
    const res = await fetch("http://localhost:8080/api/v1/formation", {
      next: { revalidate: 60 }, // Caches data for 60 seconds
    });

    if (!res.ok) {
      console.error("Failed to fetch formation data");
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching formation data:", error);
    return null;
  }
}

// ✅ 2. Make the page function async
export default async function AboutPage() {
  // ✅ 3. Fetch the data
  const formationData = await getFormationData();

  return (
    <>
      <PageHeader
        crumb="About"
        title="About BATO Foundation"
        subtitle="Building the road between talent and technology across Nepal."
        image="/images/gallery/header/about.jpg"
      />

      {/* ✅ 4. Pass the data to the component */}
      <Formation data={formationData} />

      <TimelineSection />
      <MissionVision />

      <Leadership />
      <DirectorMessage />
      <MissionCTA />
      <DonationCTA />
    </>
  );
}
