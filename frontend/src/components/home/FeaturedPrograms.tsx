import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import { SmartImage } from "@/components/ui/SmartImage";
import { programs } from "@/data/programs";

export function FeaturedPrograms() {
  return (
    <Section>
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <Reveal className="max-w-xl">
            <Badge>Programs from BATO</Badge>

            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Where our work meets communities.
            </h2>
          </Reveal>

          <Reveal>
            <Button href="/programs" variant="outline">
              View All Programs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        {/* Programs Grid */}
        <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3 xl:gap-10">
          {programs.slice(0, 6).map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <Link
                href={`/programs/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-[16/11]">
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary shadow-sm sm:left-5 sm:top-5 sm:text-sm">
                    {p.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h3 className="font-display text-xl font-semibold leading-snug text-primary transition-colors group-hover:text-accent-dark sm:text-2xl">
                    {p.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-primary/60 sm:text-base">
                    {p.description}
                  </p>

                  {/* Card Footer */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    {/* Location */}
                    <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm text-primary/50">
                      <MapPin className="h-4 w-4 shrink-0" />

                      <span className="truncate">{p.location}</span>
                    </span>

                    {/* Learn More */}
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold whitespace-nowrap text-white transition-all group-hover:bg-accent group-hover:text-primary">
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
