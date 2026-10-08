import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function AboutPreview() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative">
              <div className="relative h-[440px] overflow-hidden rounded-3xl md:h-[520px]">
                <ParallaxImage
                  src="/images/hero/classroom-teacher.jpg"
                  alt="Teacher helping students build robots in a rural classroom"
                  className="h-full w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 rounded-2xl bg-primary p-6 text-white shadow-2xl md:-right-8">
                <p className="font-display text-3xl font-bold text-accent">
                  STEM
                </p>
                <p className="mt-1 max-w-[11rem] text-sm text-white/65">
                  Learning that reaches where roads don&apos;t.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <Badge>What is BATO Foundation?</Badge>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-primary md:text-4xl lg:text-[2.6rem]">
              A road from talent to opportunity.
            </h2>
            <p className="mt-5 text-primary/65 leading-relaxed">
              In Nepali, <em className="text-accent-dark">bato</em> means
              &quot;the road.&quot; BATO Foundation is a purely social,
              non-profit-distributing organization registered in Lalitpur. We
              exist to close the technology gap for students and communities —
              especially in public schools, rural areas, and places without
              resources.
            </p>
            <p className="mt-4 text-primary/65 leading-relaxed">
              We deliver STEM education, coding, robotics, AI literacy and
              digital skills — and we build the curriculum, low-cost kits and
              teacher training that make it last.
            </p>
            <div className="mt-8">
              <Button href="/about">
                Learn More About BATO <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
