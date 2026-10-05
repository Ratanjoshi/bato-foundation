"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  GraduationCap,
  Bot,
  Code2,
  FlaskConical,
  Users,
  Compass,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Timing — tweak these to taste                                      */
/* ------------------------------------------------------------------ */
const AUTOPLAY_MS = 4500; // time each card stays on screen (was 6000)
const INTRO_MS = 3200; // how long the slow "page load" entrance lasts
const SLOW = 1.4; // entrance speed (seconds) — slow & cinematic
const FAST = 0.55; // card-to-card speed (seconds) — snappy
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_WIPE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Edit text / swap images here. Paths point to placeholders in /public/images.
const items = [
  {
    icon: GraduationCap,
    title: "STEM Education",
    desc: "Science, technology, engineering and math learning for schools without access.",
    points: [
      "Hands-on classroom learning",
      "Low-cost experiment kits",
      "Local-language curriculum",
    ],
    image: "/images/programs/stem-classroom.jpg",
  },
  {
    icon: Bot,
    title: "Robotics",
    desc: "Low-cost robotics kits that let students learn by building.",
    points: [
      "Kits from local materials",
      "Electronics & mechanics",
      "Guided by community mentors",
    ],
    image: "/images/programs/robotics.jpg",
  },
  {
    icon: Code2,
    title: "Coding & AI",
    desc: "Programming and artificial-intelligence literacy for the next generation.",
    points: [
      "Computational thinking",
      "Age-appropriate AI basics",
      "Software tools & curriculum",
    ],
    image: "/images/programs/coding-ai.jpg",
  },
  {
    icon: FlaskConical,
    title: "Research",
    desc: "Pilot programmes and impact assessment for technology in education.",
    points: [
      "Pilot before scaling",
      "Measure real outcomes",
      "Improve through evidence",
    ],
    image: "/images/programs/research.jpg",
  },
  {
    icon: Users,
    title: "Capacity Building",
    desc: "Training teachers and local facilitators to teach independently.",
    points: [
      "Teacher training",
      "Facilitator mentoring",
      "Skills that stay local",
    ],
    image: "/images/programs/teacher-training.jpg",
  },
  {
    icon: Compass,
    title: "Community Tech",
    desc: "Applied technology for development, disaster preparedness and resilience.",
    points: [
      "Drones & field technology",
      "Disaster preparedness",
      "Technology for development",
    ],
    image: "/images/programs/drones.jpg",
  },
];

export function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // off for good once the visitor clicks
  const [hover, setHover] = useState(false);
  const [started, setStarted] = useState(false); // first time section scrolls into view
  const [ready, setReady] = useState(false); // slow intro finished -> switch to fast mode

  // Start the slow entrance only when the section is actually visible
  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setReady(true), reduce ? 0 : INTRO_MS);
    return () => clearTimeout(t);
  }, [started, reduce]);

  const playing = auto && ready && inView && !hover && !reduce;
  const idle = auto && !ready; // bar stays empty during the intro
  const current = items[active];

  // Slow while entering, fast when switching cards
  const speed = ready ? FAST : SLOW;

  const choose = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  /* ---- caption choreography (staggered, faster after intro) ---- */
  const capParent = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: ready ? 0.07 : 0.2,
        delayChildren: ready ? 0.3 : 1.1,
      },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.14 } },
  };
  const capChild = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: ready ? 0.45 : 1.1, ease: EASE_OUT },
    },
  };
  const titleV = {
    hidden: reduce ? { opacity: 0 } : { y: "110%" },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: ready ? 0.5 : 1.1, ease: EASE_OUT },
    },
  };
  const iconV = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.2, rotate: -120 },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 220, damping: 16 },
    },
  };

  /* ---- section heading choreography (slow) ---- */
  const headParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.28 } },
  };
  const headChild = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE_OUT } },
  };

  return (
    <Section className="relative overflow-hidden bg-primary text-white">
      {/* atmosphere */}
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-primary-light/60 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative">
        {/* ------------------------- Heading (slow) ------------------------- */}
        <motion.div
          className="flex flex-wrap items-end justify-between gap-8"
          variants={headParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="max-w-2xl">
            <motion.span
              variants={headChild}
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent"
            >
              <motion.span
                aria-hidden="true"
                className="h-px w-8 origin-left bg-accent"
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { duration: 1.4, ease: EASE_OUT },
                  },
                }}
              />
              What Do We Do?
            </motion.span>

            <div className="mt-5 overflow-hidden pb-2">
              <motion.h2
                variants={{
                  hidden: reduce ? { opacity: 0 } : { y: "110%" },
                  show: {
                    y: "0%",
                    opacity: 1,
                    transition: { duration: 1.4, ease: EASE_OUT },
                  },
                }}
                className="font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-[2.6rem]"
              >
                Turning access into ability.
              </motion.h2>
            </div>

            <motion.p
              variants={headChild}
              className="mt-2 max-w-xl text-white/60"
            >
              We work across education, technology and community — meeting
              people where they are and building skills that stay.
            </motion.p>
          </div>

          <motion.div variants={headChild}>
            <Button href="/programs" variant="dark">
              All Programs <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* ---------------------- Interactive road ---------------------- */}
        <div
          ref={ref}
          className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Preview card (above the list on mobile) */}
          <div className="lg:order-2">
            <div className="lg:sticky lg:top-28">
              <motion.div
                className="relative h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-primary-dark shadow-2xl sm:h-[500px] lg:h-[580px]"
                initial={
                  reduce
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 70,
                        clipPath: "inset(14% 8% 14% 8% round 40px)",
                      }
                }
                animate={
                  started
                    ? reduce
                      ? { opacity: 1 }
                      : {
                          opacity: 1,
                          y: 0,
                          clipPath: "inset(0% 0% 0% 0% round 24px)",
                        }
                    : undefined
                }
                transition={{ duration: 1.7, ease: EASE_OUT, delay: 0.25 }}
              >
                {started && (
                  <>
                    {/* Photo: diagonal-free curtain wipe + push-in zoom */}
                    <AnimatePresence initial={false} mode="sync">
                      <motion.div
                        key={active}
                        className="absolute inset-0"
                        initial={
                          reduce
                            ? { opacity: 0 }
                            : { clipPath: "inset(0 100% 0 0)" }
                        }
                        animate={
                          reduce
                            ? { opacity: 1 }
                            : { clipPath: "inset(0 0% 0 0)" }
                        }
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.3, delay: speed * 0.9 },
                        }}
                        transition={{
                          duration: ready ? speed : 1.8,
                          delay: ready ? 0 : 0.5,
                          ease: EASE_WIPE,
                        }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          initial={reduce ? false : { scale: 1.35, x: "-7%" }}
                          animate={{ scale: 1, x: "0%" }}
                          transition={{
                            duration: ready ? 1 : 2.6,
                            delay: ready ? 0 : 0.5,
                            ease: EASE_OUT,
                          }}
                        >
                          <SmartImage
                            src={current.image}
                            alt={current.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                          />
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Gold scan line that leads the wipe */}
                    {!reduce && (
                      <motion.div
                        key={`scan-${active}`}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 z-20 w-[3px] bg-accent shadow-[0_0_28px_6px_rgba(227,167,68,0.65)]"
                        initial={{ left: "0%", opacity: 1 }}
                        animate={{ left: "100%", opacity: [1, 1, 0] }}
                        transition={{
                          duration: ready ? speed : 1.8,
                          delay: ready ? 0 : 0.5,
                          ease: EASE_WIPE,
                          opacity: { times: [0, 0.85, 1] },
                        }}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/55 to-transparent" />

                    {/* Big ghost number */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`n-${active}`}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: 30,
                          transition: { duration: 0.12 },
                        }}
                        transition={{
                          duration: ready ? 0.45 : 1.2,
                          delay: ready ? 0.1 : 1,
                          ease: EASE_OUT,
                        }}
                        className="absolute right-6 top-4 z-10 font-display text-8xl font-bold text-white/15 sm:text-9xl"
                      >
                        {String(active + 1).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>

                    {/* Caption */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-9">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={`c-${active}`}
                          variants={capParent}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                        >
                          <motion.span
                            variants={iconV}
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary"
                          >
                            <current.icon className="h-6 w-6" />
                          </motion.span>

                          <div className="mt-4 overflow-hidden pb-1">
                            <motion.h3
                              variants={titleV}
                              className="font-display text-2xl font-semibold sm:text-3xl"
                            >
                              {current.title}
                            </motion.h3>
                          </div>

                          <motion.p
                            variants={capChild}
                            className="mt-2 max-w-md text-sm leading-relaxed text-white/75 sm:text-base"
                          >
                            {current.desc}
                          </motion.p>

                          <ul className="mt-5 flex flex-wrap gap-2">
                            {current.points.map((p) => (
                              <motion.li
                                key={p}
                                variants={capChild}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/85 backdrop-blur"
                              >
                                <Check
                                  className="h-3.5 w-3.5 text-accent"
                                  strokeWidth={3}
                                />
                                {p}
                              </motion.li>
                            ))}
                          </ul>

                          <motion.div variants={capChild}>
                            <Link
                              href="/programs"
                              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                            >
                              See related programs
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          {/* The road: list of what we do */}
          <div className="lg:order-1 lg:py-4">
            <ol
              className="relative ml-3"
              role="tablist"
              aria-label="What we do"
            >
              {/* dashed road line that draws itself downward */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px origin-top"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.28) 0 6px, transparent 6px 12px)",
                }}
                initial={{ scaleY: 0 }}
                animate={started ? { scaleY: 1 } : undefined}
                transition={{ duration: 2.2, ease: EASE_OUT }}
              />

              {items.map((it, i) => {
                const isActive = i === active;
                return (
                  <motion.li
                    key={it.title}
                    className="relative"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: -50 }}
                    animate={started ? { opacity: 1, x: 0 } : undefined}
                    transition={{
                      duration: 1.1,
                      delay: 0.6 + i * 0.16,
                      ease: EASE_OUT,
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="road-dot"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 28,
                        }}
                        className="absolute -left-[8px] top-1/2 z-10 h-[17px] w-[17px] -translate-y-1/2 rounded-full bg-accent ring-4 ring-primary"
                      />
                    )}
                    <button
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => choose(i)}
                      onFocus={() => setHover(true)}
                      onBlur={() => setHover(false)}
                      className={cn(
                        "group relative flex w-full items-center gap-5 py-5 pl-8 pr-2 text-left transition-all duration-300 sm:py-6",
                        isActive ? "translate-x-1" : "hover:translate-x-1",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-sm font-semibold tabular-nums transition-colors",
                          isActive
                            ? "text-accent"
                            : "text-white/30 group-hover:text-white/60",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 font-display text-2xl font-semibold transition-colors duration-300 sm:text-3xl",
                          isActive
                            ? "text-white"
                            : "text-white/40 group-hover:text-white/75",
                        )}
                      >
                        {it.title}
                      </span>
                      <it.icon
                        className={cn(
                          "h-6 w-6 shrink-0 transition-all duration-300",
                          isActive
                            ? "text-accent"
                            : "text-white/20 group-hover:text-white/50",
                        )}
                      />
                    </button>

                    {/* autoplay progress */}
                    <div className="ml-8 h-px bg-white/10">
                      {isActive && (
                        <motion.div
                          key={`${active}-${playing}-${idle}`}
                          className="h-px origin-left bg-accent"
                          initial={{ scaleX: playing || idle ? 0 : 1 }}
                          animate={{ scaleX: idle ? 0 : 1 }}
                          transition={{
                            duration: playing ? AUTOPLAY_MS / 1000 : 0.3,
                            ease: "linear",
                          }}
                          onAnimationComplete={() => {
                            if (playing)
                              setActive((a) => (a + 1) % items.length);
                          }}
                        />
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            <motion.p
              className="mt-8 pl-11 text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={started ? { opacity: 1 } : undefined}
              transition={{ duration: 1.2, delay: 2 }}
            >
              Tap any area to explore — or watch the road move on its own.
            </motion.p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
