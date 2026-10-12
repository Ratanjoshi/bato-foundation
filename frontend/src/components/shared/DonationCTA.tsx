"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

const API = process.env.NEXT_PUBLIC_API_URL; // e.g. http://localhost:5000

const FALLBACK = {
  eyebrow: "Donate",
  heading: "Fund a future built on technology.",
  description:
    "100% of what we raise goes toward our mission: learning kits, teacher training, robotics, and reaching communities without access.",
  primary_label: "Donate Now",
  primary_href: "/donate",
  secondary_label: "Where Your Gift Goes",
  secondary_href: "/donate#usage",
  image_url: "/images/hero/students-robotics.jpg",
  image_alt: "Students building robotics projects together",
};

export function DonationCTA() {
  const [cta, setCta] = useState(FALLBACK);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API}/api/donation-cta/public`, {
          next: { revalidate: 60 }, // Next.js caching (optional)
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (mounted && json?.data) setCta(json.data);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const imageSrc = cta.image_url?.startsWith("http")
    ? cta.image_url
    : cta.image_url?.startsWith("/uploads")
      ? `${API}${cta.image_url}`
      : cta.image_url;

  return (
    <Section>
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary-dark">
          <div className="absolute inset-0 -z-10">
            <ParallaxImage
              src={imageSrc}
              alt={cta.image_alt || ""}
              speed={0.08}
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-primary-dark/80 md:bg-transparent md:bg-gradient-to-r md:from-primary-dark md:via-primary-dark/85 md:to-primary-dark/10" />
          </div>

          <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
            <Reveal className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                {cta.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
                {cta.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                {cta.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button href={cta.primary_href} size="lg">
                  {cta.primary_label} <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={cta.secondary_href} variant="dark" size="lg">
                  {cta.secondary_label}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
