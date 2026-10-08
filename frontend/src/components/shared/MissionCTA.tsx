"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function MissionCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary-dark py-20 text-white md:py-28">
      {/* Animated floating circles */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute left-[20%] top-[10%] h-64 w-64 rounded-full bg-accent/20 blur-[80px]"
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-[10%] right-[20%] h-80 w-80 rounded-full bg-primary-light/30 blur-[80px]"
            animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      <Container className="relative text-center">
        <Reveal>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Be Part of the Change
          </p>
        </Reveal>
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
          <TextReveal text="Every child deserves a path to technology and opportunity." />
        </h2>
        <Reveal delay={0.4}>
          <p className="mx-auto mt-6 max-w-xl text-white/60">
            Join us in building bridges between talent and technology across
            Nepal — as a supporter, partner, or volunteer.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Get Involved <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/donate" variant="dark" size="lg">
              Support BATO
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
