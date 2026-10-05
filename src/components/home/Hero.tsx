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
          "flex flex-col gap-4",
          !reduce &&
            (direction === "up"
              ? "animate-marquee-up"
              : "animate-marquee-down"),
        )}
      >
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-t-[999px] rounded-b-3xl ring-1 ring-white/10"
          >
            <SmartImage
              src={src}
              alt=""
              fill
              sizes="(max-width: 1024px) 33vw, 18vw"
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
      {/* Atmosphere: glow + dot grid */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 -top-20 h-[480px] w-[480px] rounded-full bg-primary-light/50 blur-[120px]" />
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
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>

      <Container className="relative">
        <div className="grid items-center gap-12 pb-24 pt-32 md:pt-40 lg:min-h-[100vh] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-32">
          {/* Copy */}
          <div>
            <h1 className="font-display text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-[3.6rem] text-balance">
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
              className="mt-7 max-w-xl text-lg leading-relaxed text-white/70"
            >
              BATO Foundation brings coding, robotics, AI and STEM education to
              students and communities across Nepal who have been left without
              access — turning curiosity into capability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button href="/programs" size="lg">
                Explore Our Programs <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/donate" variant="dark" size="lg">
                Support Our Mission
              </Button>
            </motion.div>
          </div>

          {/* Living image columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[520px] lg:h-[640px] lg:max-w-none"
          >
            <div className="grid h-full grid-cols-3 gap-4">
              <ImageColumn images={columns[0]} direction="up" />
              <ImageColumn
                images={columns[1]}
                direction="down"
                className="pt-10"
              />
              <ImageColumn images={columns[2]} direction="up" />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Slim program ticker — thin, slow, pauses when you hover it */}
      <div className="relative border-t border-white/10 bg-primary py-2.5">
        <div className="group/ticker flex overflow-hidden mask-fade-x">
          <div
            className="flex shrink-0 animate-marquee items-center gap-6 pr-6 group-hover/ticker:[animation-play-state:paused]"
            style={{ animationDuration: "60s" }}
          >
            {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap text-[13px] tracking-wide text-white/60"
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
