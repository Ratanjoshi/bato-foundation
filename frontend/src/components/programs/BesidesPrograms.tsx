import {
  FlaskConical,
  Lightbulb,
  Wrench,
  Share2,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";

const items = [
  {
    icon: FlaskConical,
    title: "Research",
    desc: "Studying how technology access changes real outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Designing low-cost, context-fit learning solutions.",
  },
  {
    icon: Wrench,
    title: "Development",
    desc: "Building curriculum, kits and prototypes for the field.",
  },
  {
    icon: Share2,
    title: "Knowledge Sharing",
    desc: "Open resources for teachers and facilitators.",
  },
  {
    icon: Users,
    title: "Community Engagement",
    desc: "Working hand-in-hand with local communities.",
  },
];

export function BesidesPrograms() {
  return (
    <Section className="bg-muted">
      <Container>
        <Reveal className="max-w-xl">
          <Badge>Beyond Programmes</Badge>
          <h2 className="mt-5 font-display text-3xl font-semibold text-primary md:text-4xl">
            Building the ecosystem, not just the classroom.
          </h2>
        </Reveal>
        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <StaggerItem key={it.title}>
              <div className="group flex h-full flex-col items-center rounded-2xl bg-surface p-6 text-center transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-accent transition-all duration-400 group-hover:bg-accent group-hover:text-primary group-hover:rotate-6">
                  <it.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display font-semibold text-primary">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-primary/60">{it.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
