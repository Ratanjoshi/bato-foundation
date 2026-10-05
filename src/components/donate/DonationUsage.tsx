"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

/* =========================================================
   DATA

   Update these percentages when the board confirms the final
   allocation. They should add up to 100.
========================================================= */

const usage = [
  { label: "Programmes & Learning Kits", percent: 40 },
  { label: "Community Initiatives", percent: 25 },
  { label: "Research & Development", percent: 15 },
  { label: "Operations", percent: 10 },
  { label: "Development & Outreach", percent: 10 },
];

/* Set to false once the figures above are officially confirmed. */
const SHOW_PLACEHOLDER_NOTE = true;

const EASE = [0.22, 1, 0.36, 1] as const;

const GRID_BG =
  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)";

/* =========================================================
   ROW

   One motion value (`progress`, 0 -> 1) drives both the
   number and the bar, so they always move in perfect sync.
========================================================= */

function Row({
  label,
  percent,
  index,
  dimmed,
  onHover,
}: {
  label: string;
  percent: number;
  index: number;
  dimmed: boolean;
  onHover: (index: number | null) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const progress = useMotionValue(reduce ? 1 : 0);
  const width = useTransform(progress, (v) => `${v * percent}%`);
  const display = useTransform(progress, (v) => Math.round(v * percent));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(progress, 1, {
      duration: 1.7,
      delay: 0.15 + index * 0.14,
      ease: EASE,
    });
    return () => controls.stop();
  }, [inView, reduce, index, progress]);

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      animate={
        inView || reduce ? { opacity: dimmed ? 0.4 : 1, y: 0 } : undefined
      }
      transition={{
        duration: 0.7,
        delay: inView && !dimmed ? index * 0.1 : 0,
        ease: EASE,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(index)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      className="group relative rounded-2xl px-4 py-5 outline-none transition-colors duration-300 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-accent sm:px-6 sm:py-6"
    >
      <div className="flex items-end justify-between gap-4">
        <span className="text-base font-medium leading-snug text-white sm:text-lg">
          {label}
        </span>

        <span className="shrink-0 font-display text-4xl font-semibold leading-none tabular-nums text-white sm:text-5xl">
          <motion.span>{display}</motion.span>
          <span className="text-accent">%</span>
        </span>
      </div>

      {/* Track */}
      <div className="relative mt-4 h-2.5 rounded-full bg-white/10 sm:mt-5">
        {/* Fill */}
        <motion.div
          style={{ width }}
          className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-accent-dark via-accent to-[#f5b26a]"
        >
          {/* One-time shine sweep once the bar has filled */}
          {!reduce && (
            <motion.span
              aria-hidden
              initial={{ x: "-120%" }}
              animate={inView ? { x: "420%" } : undefined}
              transition={{
                duration: 1.1,
                delay: 1.1 + index * 0.14,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 left-0 w-1/4 skew-x-[-20deg] bg-white/50 blur-[2px]"
            />
          )}
        </motion.div>

        {/* Glowing end-cap that rides the tip of the bar */}
        <motion.span
          aria-hidden
          style={{ left: width }}
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent shadow-[0_0_18px_rgba(236,138,44,0.9)]"
        />
      </div>
    </motion.li>
  );
}

/* =========================================================
   MAIN
========================================================= */

export function DonationUsage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="usage" className="relative bg-primary py-20 sm:py-24 lg:py-32">
      {/* Background — clipping is isolated to this layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: GRID_BG, backgroundSize: "56px 56px" }}
        />
        <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -bottom-48 -left-40 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-24">
          {/* ---------------------------------------------
              LEFT — heading
          --------------------------------------------- */}
          <div className="lg:sticky lg:top-28">
            <Reveal className="max-w-md">
              <Badge>Transparency</Badge>

              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] text-white sm:text-4xl lg:text-5xl">
                Where will your donation be used?
              </h2>

              <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                Every contribution is shared across five areas of our work, so
                you can see exactly what your gift supports.
              </p>
            </Reveal>

            {/* Summary strip */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="mt-10 flex max-w-sm items-stretch divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur"
            >
              <div className="flex-1 px-5 py-4">
                <p className="font-display text-3xl font-semibold text-accent">
                  {usage.length}
                </p>
                <p className="mt-1 text-xs font-medium text-white/55">
                  Focus areas
                </p>
              </div>
              <div className="flex-1 px-5 py-4">
                <p className="font-display text-3xl font-semibold text-accent">
                  100%
                </p>
                <p className="mt-1 text-xs font-medium text-white/55">
                  Of every gift allocated
                </p>
              </div>
            </motion.div>
          </div>

          {/* ---------------------------------------------
              RIGHT — allocation list
          --------------------------------------------- */}
          <div>
            <ul className="space-y-1.5 sm:space-y-2">
              {usage.map((u, i) => (
                <Row
                  key={u.label}
                  label={u.label}
                  percent={u.percent}
                  index={i}
                  dimmed={hovered !== null && hovered !== i}
                  onHover={setHovered}
                />
              ))}
            </ul>

            {SHOW_PLACEHOLDER_NOTE && (
              <p className="mt-6 px-4 text-sm text-white/40 sm:px-6">
                Figures shown are indicative until the board confirms the final
                allocation.
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
