import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

const reasons = [
  {
    title: "Community Driven",
    desc: "We build with local schools, teachers and communities.",
  },
  {
    title: "Evidence Based",
    desc: "We pilot, measure and improve through real research.",
  },
  {
    title: "Collaborative",
    desc: "We partner with government, donors and the private sector.",
  },
  {
    title: "Long-Term Impact",
    desc: "We build independence — not dependence.",
  },
];

export function WhyBato() {
  return (
    <Section className="bg-primary text-white">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative h-[460px] overflow-hidden rounded-3xl">
              <ParallaxImage
                src="/images/hero/drone-students.jpg"
                alt="Students learning to fly a drone with a mentor"
                className="h-full w-full"
              />
            </div>
          </Reveal>

          <Reveal direction="left">
            <Badge className="text-accent">Why BATO Foundation?</Badge>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight md:text-4xl">
              A foundation built to last.
            </h2>
            <p className="mt-4 text-white/60">
              We don&apos;t just deliver technology — we build the road that lets
              communities keep walking forward on their own.
            </p>

            <ul className="mt-8 space-y-6">
              {reasons.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.1}>
                  <li className="flex gap-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/60">{r.desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
