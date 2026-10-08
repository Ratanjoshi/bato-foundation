import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function DonationCTA() {
  return (
    <Section>
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary-dark">
          {/* Photo */}
          <div className="absolute inset-0 -z-10">
            <ParallaxImage
              src="/images/hero/students-robotics.jpg"
              alt="Students building robotics projects together"
              speed={0.08}
              className="h-full w-full"
            />
            {/* Keeps text readable: solid on the left, fading out to the photo */}
            <div className="absolute inset-0 bg-primary-dark/80 md:bg-transparent md:bg-gradient-to-r md:from-primary-dark md:via-primary-dark/85 md:to-primary-dark/10" />
          </div>

          <div className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
            <Reveal className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Donate
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
                Fund a future built on technology.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                100% of what we raise goes toward our mission: learning kits,
                teacher training, robotics, and reaching communities without
                access.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button href="/donate" size="lg">
                  Donate Now <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/donate#usage" variant="dark" size="lg">
                  Where Your Gift Goes
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
