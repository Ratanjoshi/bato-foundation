import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProgramExplorer } from "@/components/programs/ProgramExplorer";
import { BesidesPrograms } from "@/components/programs/BesidesPrograms";
import { UltimateDream } from "@/components/programs/UltimateDream";
import { DonationCTA } from "@/components/shared/DonationCTA";
import { getUltimateDream, resolveImageUrl } from "@/lib/api/ultimateDream";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Explore BATO Foundation's STEM, robotics, coding, AI and community technology programs across Nepal.",
};

const FALLBACK = {
  eyebrow: "Our Ultimate Dream",
  heading: "A Nepal where no child's future is decided by a missing road.",
  description:
    "We dream of classrooms in every valley where robots are built, code is written, and possibility has no postcode.",
  buttonLabel: "Help Build the Dream",
  buttonHref: "/donate",
  image: {
    url: "/images/hero/girl-mountains.jpg",
    alt: "A student looking toward the horizon",
  },
};

const ImageURL = "http://localhost:8080/";
async function loadUltimateDream() {
  try {
    const dream = await getUltimateDream();
    if (!dream) return FALLBACK;

    return {
      eyebrow: dream.eyebrow || FALLBACK.eyebrow,
      heading: dream.heading || FALLBACK.heading,
      description: dream.description || FALLBACK.description,
      buttonLabel: dream.button_label || FALLBACK.buttonLabel,
      buttonHref: dream.button_href || FALLBACK.buttonHref,
      image: {
        url: ImageURL + (dream.image_url?.substring(1) || FALLBACK.image.url),
        alt: dream.image_alt || FALLBACK.image.alt,
      },
    };
  } catch (err) {
    console.error("Ultimate Dream fetch failed:", err);
    return FALLBACK;
  }
}

export default async function ProgramsPage() {
  const ultimateDream = await loadUltimateDream();

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
      <UltimateDream data={ultimateDream} />
      <DonationCTA />
    </>
  );
}
