"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { timeline } from "@/data/timeline";

const ease = [0.22, 1, 0.36, 1] as const;

export function TimelineSection() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-linked progress for the timeline line.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });
  const lineScale = reduceMotion ? scrollYProgress : smooth;

  const current = timeline[active];

  return (
    <Section className="relative isolate overflow-hidden bg-primary py-24 text-white md:py-32">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-white/[0.04] blur-3xl"
      />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* LEFT: sticky header + image stage */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.header
              className="max-w-xl"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
            >
              <Badge className=" text-accent">Our journey</Badge>

              <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                BATO Foundation
                <span className="mt-2 block text-white/55">
                  through the years.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-white/65 md:text-lg md:leading-8">
                A record of the moments, people, and progress behind BATO
                Foundation.
              </p>
            </motion.header>

            {/* Image stage: desktop only, changes with the active milestone */}
            <div className="relative mt-10 hidden aspect-[4/3] max-h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:block">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.9, ease }}
                >
                  {current?.image ? (
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                      priority={active === 0}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-accent/20 via-white/[0.04] to-transparent" />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Readability gradient + overlay text */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div className="min-w-0">
                  <p className="font-display text-5xl font-semibold leading-none text-accent">
                    {current?.year}
                  </p>
                  <p className="mt-2 truncate text-sm font-medium text-white/80">
                    {current?.title}
                  </p>
                </div>
                <p className="shrink-0 text-xs font-semibold tracking-[0.2em] text-white/50">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(timeline.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: timeline */}
          <div className="relative">
            {/* Track */}
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-[15px] top-8 w-px bg-white/10 sm:left-[19px]"
            />
            {/* Scroll-filled line */}
            <motion.div
              aria-hidden="true"
              className="absolute bottom-8 left-[15px] top-8 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/40 shadow-[0_0_12px_rgba(255,190,92,0.6)] sm:left-[19px]"
              style={{ scaleY: lineScale }}
            />

            <ol
              ref={listRef}
              aria-label="BATO Foundation milestones"
              className="space-y-6 sm:space-y-8"
            >
              {timeline.map((item, index) => {
                const isActive = index === active;
                const isPassed = index <= active;

                return (
                  <motion.li
                    key={`${item.year}-${item.title}`}
                    className="relative pl-12 sm:pl-16"
                    // Marks which milestone is in the middle of the viewport
                    onViewportEnter={() => setActive(index)}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                  >
                    {/* Marker */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-7 z-10 grid h-8 w-8 place-items-center rounded-full border bg-primary shadow-[0_0_0_6px_rgba(8,24,20,0.9)] transition-all duration-500 sm:left-1 sm:top-8 sm:h-9 sm:w-9 ${
                        isPassed ? "border-accent" : "border-white/20"
                      } ${isActive ? "scale-110" : ""}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full transition-all duration-500 ${
                          isPassed
                            ? "bg-accent shadow-[0_0_14px_rgba(255,190,92,0.9)]"
                            : "bg-white/25"
                        }`}
                      />
                      {isActive && !reduceMotion && (
                        <span className="absolute inset-0 animate-ping rounded-full border border-accent/50" />
                      )}
                    </span>

                    {/* Card (entrance animation) */}
                    <motion.article
                      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: reduceMotion ? 0 : 0.75, ease }}
                      className={`group relative overflow-hidden rounded-2xl border bg-white/[0.045] shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.075] sm:rounded-3xl ${
                        isActive
                          ? "border-accent/40 lg:bg-white/[0.07]"
                          : "border-white/10"
                      }`}
                    >
                      {/* Image: visible below lg (desktop uses the sticky stage) */}
                      {item.image && (
                        <div className="relative aspect-[16/10] w-full overflow-hidden lg:hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(min-width: 640px) 80vw, 100vw"
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"
                          />
                          <p className="absolute bottom-4 left-5 font-display text-3xl font-semibold leading-none text-accent sm:text-4xl">
                            {item.year}
                          </p>
                        </div>
                      )}

                      <div className="relative p-5 sm:p-7 md:p-8">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/10"
                        />

                        <div
                          className={`relative flex items-start justify-between gap-4 ${
                            item.image ? "lg:flex" : ""
                          }`}
                        >
                          {/* On mobile the year sits on the image, so hide it here */}
                          <p
                            className={`font-display text-3xl font-semibold leading-none tracking-tight text-accent sm:text-4xl ${
                              item.image ? "hidden lg:block" : ""
                            }`}
                          >
                            {item.year}
                          </p>
                          <span className="ml-auto rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/40 sm:text-xs">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="relative mt-4 font-display text-xl font-semibold leading-snug text-white sm:text-2xl lg:mt-5">
                          {item.title}
                        </h3>
                        <p className="relative mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
                          {item.description}
                        </p>

                        <div
                          aria-hidden="true"
                          className="relative mt-6 h-px w-12 bg-accent/70 transition-all duration-300 group-hover:w-20"
                        />
                      </div>
                    </motion.article>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
