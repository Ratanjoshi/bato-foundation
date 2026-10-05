import {
  Compass,
  Users,
  Lightbulb,
  Heart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import { coreValues } from "@/data/values";

const iconMap = {
  Compass,
  Users,
  Lightbulb,
  Heart,
  ShieldCheck,
  TrendingUp,
};

export function CoreValues() {
  return (
    <Section className="bg-muted">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading: stays in view on large screens while the cards scroll */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Badge>Core Values</Badge>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                  The principles that guide us.
                </h2>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-primary/60">
                  What we believe shapes how we teach, build and serve.
                </p>
                <span
                  aria-hidden="true"
                  className="mt-8 block h-1 w-16 rounded-full bg-accent"
                />
              </Reveal>
            </div>
          </div>

          {/* Values */}
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {coreValues.map((v, i) => {
              const Icon = iconMap[v.iconName as keyof typeof iconMap];
              return (
                <StaggerItem key={v.title}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl sm:p-8">
                    {/* Large faded number */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-5 top-4 select-none font-display text-5xl font-semibold text-primary/10 sm:text-6xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent-dark transition-all duration-400 group-hover:rotate-6 group-hover:bg-accent group-hover:text-primary">
                      {Icon && <Icon className="h-6 w-6" />}
                    </span>

                    <h3 className="mt-6 font-display text-lg font-semibold text-primary sm:text-xl">
                      {v.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-primary/60 sm:text-base">
                      {v.description}
                    </p>

                    {/* Accent line grows on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full"
                    />
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </Container>
    </Section>
  );
}
