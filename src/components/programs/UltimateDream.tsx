"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";

export function UltimateDream() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-36 text-white md:py-44">
      <motion.div
        className="absolute inset-0"
        style={reduce ? {} : { scale: imgScale }}
      >
        <SmartImage
          src="/images/hero/girl-mountains.jpg"
          alt="A student looking toward the horizon"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-primary/85" />
      <Container className="relative text-center">
        <Reveal>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Our Ultimate Dream
          </p>
        </Reveal>
        <h2 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl text-balance">
          <TextReveal text="A Nepal where no child's future is decided by a missing road." />
        </h2>
        <Reveal delay={0.5}>
          <p className="mx-auto mt-7 max-w-xl text-lg text-white/60">
            We dream of classrooms in every valley where robots are built,
            code is written, and possibility has no postcode.
          </p>
          <div className="mt-10">
            <Button href="/donate" size="lg">
              Help Build the Dream <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
