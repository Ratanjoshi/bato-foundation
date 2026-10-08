import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";
import { MissionCTA } from "@/components/shared/MissionCTA";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BATO Foundation — we're here to collaborate.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Get in Touch"
        subtitle="We'd love to hear from schools, partners, donors and volunteers."
        image="/images/gallery/header/contacts.jpg"
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-container gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      <ContactMap />
      <MissionCTA />
    </>
  );
}
