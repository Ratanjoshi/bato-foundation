import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DonationWhy } from "@/components/donate/DonationWhy";
import { DonationGallery } from "@/components/donate/DonationGallery";
import { DonationUsage } from "@/components/donate/DonationUsage";
import { SupportingOrganizations } from "@/components/donate/SupportingOrganizations";
import { DonationFormSection } from "@/components/donate/DonationFormSection";

export const metadata: Metadata = {
  title: "Support Our Mission",
  description:
    "Donate to BATO Foundation and help bring technology, robotics and STEM education to communities across Nepal.",
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        crumb="Donate"
        title="Support Our Mission"
        subtitle="Your gift builds the road between talent and technology."
        image="/images/gallery/header/donate.jpg"
      />
      <DonationWhy />
      <DonationGallery />
      <DonationUsage />
      <SupportingOrganizations />
      <DonationFormSection />
    </>
  );
}
