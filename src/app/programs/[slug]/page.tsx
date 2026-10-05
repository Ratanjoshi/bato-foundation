import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Tag, Activity, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { DonationCTA } from "@/components/shared/DonationCTA";
import { programs } from "@/data/programs";
import Link from "next/link";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) return { title: "Program Not Found" };
  return { title: program.title, description: program.description };
}

export default function ProgramDetail({
  params,
}: {
  params: { slug: string };
}) {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) notFound();

  return (
    <>
      <PageHeader crumb={program.title} title={program.title} />
      <Section>
        <Container>
          <Link
            href="/programs"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Programs
          </Link>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <div className="relative h-80 overflow-hidden rounded-3xl md:h-[460px]">
                <ParallaxImage
                  src={program.image}
                  alt={program.title}
                  className="h-full w-full"
                />
              </div>
              <div className="mt-8 space-y-4">
                <p className="text-lg leading-relaxed text-primary/75">
                  {program.description}
                </p>
                <p className="leading-relaxed text-primary/65">
                  {program.longDescription}
                </p>
              </div>
            </Reveal>

            <Reveal direction="left">
              <aside className="sticky top-32 h-fit rounded-3xl border border-border bg-muted p-8">
                <h3 className="font-display text-xl font-semibold text-primary">
                  Programme Details
                </h3>
                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-accent-dark" />
                    <span>
                      <strong>Category:</strong> {program.category}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent-dark" />
                    <span>
                      <strong>Location:</strong> {program.location}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-accent-dark" />
                    <span>
                      <strong>Status:</strong> {program.status}
                    </span>
                  </li>
                </ul>
                <div className="mt-8 space-y-3">
                  <Button href="/donate" className="w-full">
                    Support This Programme
                  </Button>
                  <Button href="/contact" variant="outline" className="w-full">
                    Partner With Us
                  </Button>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>
      <DonationCTA />
    </>
  );
}
