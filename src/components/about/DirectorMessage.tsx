import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function DirectorMessage() {
  return (
    <Section className="bg-primary text-white">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal direction="right">
            <div className="flex h-80 items-center justify-center rounded-3xl bg-primary-light lg:h-96">
              <span className="font-display text-8xl font-bold text-accent/40">
                ED
              </span>
            </div>
          </Reveal>
          <Reveal direction="left">
            <Quote className="h-12 w-12 text-accent" />
            <blockquote className="mt-6 font-display text-2xl font-medium leading-relaxed md:text-3xl lg:text-[1.9rem]">
              &quot;[Message from the Executive Director — a personal note about
              why BATO exists, who it serves, and the road ahead. To be written
              and added here.]&quot;
            </blockquote>
            <div className="mt-10">
              <p className="font-display text-lg font-semibold">
                [Executive Director Name]
              </p>
              <p className="text-sm text-white/50">
                Executive Director, BATO Foundation
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
