"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

// Swap these for real photos later (same paths, or edit the list).
const columns = [
  [
    "/images/hero/girl-mountains.jpg",
    "/images/hero/drone-students.jpg",
    "/images/gallery/coding-session.jpg",
  ],
  [
    "/images/hero/classroom-teacher.jpg",
    "/images/programs/robotics.jpg",
    "/images/gallery/community-meeting.jpg",
  ],
  [
    "/images/hero/university-lab.jpg",
    "/images/hero/students-robotics.jpg",
    "/images/gallery/team.jpg",
  ],
];

const ticker = [
  "STEM Education",
  "Robotics",
  "Coding & AI",
  "Teacher Training",
  "Research",
  "Community Tech",
];

function ImageColumn({
  images,
  direction,
  className,
}: {
  images: string[];
  direction: "up" | "down";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const loop = [...images, ...images];
  return (
    <div
      className={cn("h-full overflow-hidden", className)}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex flex-col gap-2.5 sm:gap-4",
          !reduce &&
            (direction === "up"
              ? "animate-marquee-up"
              : "animate-marquee-down"),
        )}
      >
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-t-[999px] rounded-b-2xl ring-1 ring-white/10 sm:rounded-b-3xl"
          >
            <SmartImage
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 30vw, (max-width: 1024px) 28vw, 18vw"
              className="object-cover"
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      {/* Atmosphere: glow + dot grid (scaled down on small screens) */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[260px] w-[260px] rounded-full bg-accent/15 blur-[90px] sm:-left-40 sm:h-[400px] sm:w-[400px] sm:blur-[120px] lg:h-[520px] lg:w-[520px] lg:blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 -top-20 h-[240px] w-[240px] rounded-full bg-primary-light/50 blur-[80px] sm:-right-40 sm:h-[380px] sm:w-[380px] sm:blur-[100px] lg:h-[480px] lg:w-[480px] lg:blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* "Bato" = road: a dashed road that draws itself across the hero */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M-20 700 C 260 640, 360 420, 640 470 S 1040 640, 1460 300"
          stroke="#E3A744"
          strokeOpacity="0.18"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 16"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>

      <Container className="relative">
        <div className="grid items-center gap-10 pb-14 pt-28 sm:gap-12 sm:pb-20 sm:pt-32 md:pt-36 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28 lg:pt-40 xl:gap-12">
          {/* Copy — centered on mobile/tablet, left-aligned on desktop */}
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
            <h1 className="font-display text-[1.9rem] font-semibold leading-[1.1] text-balance min-[400px]:text-4xl sm:text-5xl md:text-[3.25rem] lg:text-5xl lg:leading-[1.06] xl:text-[3.6rem] 2xl:text-6xl">
              <TextReveal text="Creating opportunity." delay={0.15} />
              <br />
              <span className="text-accent">
                <TextReveal text="Building the road" delay={0.4} />
              </span>{" "}
              <TextReveal text="to technology." delay={0.6} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70 sm:mt-7 sm:text-lg"
            >
              BATO Foundation brings coding, robotics, AI and STEM education to
              students and communities across Nepal who have been left without
              access — turning curiosity into capability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4 lg:justify-start"
            >
              {/* Smaller buttons on mobile, full "lg" size from sm and up */}
              <Button
                href="/programs"
                size="lg"
                className="max-sm:!h-10 max-sm:!px-4 max-sm:!py-2 max-sm:!text-[13px] max-sm:gap-1.5"
              >
                Explore Our Programs{" "}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button
                href="/donate"
                variant="dark"
                size="lg"
                className="max-sm:!h-10 max-sm:!px-4 max-sm:!py-2 max-sm:!text-[13px]"
              >
                Support Our Mission
              </Button>
            </motion.div>
          </div>

          {/* Living image columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[320px] w-full max-w-[340px] min-[400px]:h-[360px] min-[400px]:max-w-[400px] sm:h-[460px] sm:max-w-[520px] md:h-[500px] md:max-w-[560px] lg:h-[600px] lg:max-w-none xl:h-[640px] 2xl:h-[700px]"
          >
            <div className="grid h-full grid-cols-3 gap-2.5 sm:gap-4">
              <ImageColumn images={columns[0]} direction="up" />
              <ImageColumn
                images={columns[1]}
                direction="down"
                className="pt-6 sm:pt-10"
              />
              <ImageColumn images={columns[2]} direction="up" />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Slim program ticker — thin, slow, pauses when you hover it */}
      <div className="relative border-t border-white/10 bg-primary py-2 sm:py-2.5">
        <div className="group/ticker mask-fade-x flex overflow-hidden">
          <div
            className="flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover/ticker:[animation-play-state:paused] sm:gap-6 sm:pr-6"
            style={{ animationDuration: "60s" }}
          >
            {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-4 whitespace-nowrap text-xs tracking-wide text-white/60 sm:gap-6 sm:text-[13px]"
              >
                {/* every other word in italic, like a hand-set line of type */}
                <span className={cn("font-display", i % 2 === 1 && "italic")}>
                  {t}
                </span>
                <span className="h-1 w-1 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
