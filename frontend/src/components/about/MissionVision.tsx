"use client";

import { useRef, useState, type Ref } from "react";
import Image from "next/image";
import {
  Users,
  Lightbulb,
  Heart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const ease = [0.22, 1, 0.36, 1] as const;

const MISSION =
  "To bring technology, robotics and STEM education, knowledge and opportunity to students and communities without access, especially in public schools, rural areas and under-resourced regions.";

const values: {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
  radius: string;
  rotate: number;
  bg: string;
}[] = [
  {
    number: "01",
    title: "Access for all",
    text: "Every student deserves a path to technology, whether they live in a city or a remote village.",
    icon: Users,
    radius: "50% 50% 50% 50%", // circle
    rotate: 0,
    bg: "bg-accent",
  },
  {
    number: "02",
    title: "Learn by doing",
    text: "Real robots, real code, real projects. Students learn best with their hands on the work.",
    icon: Lightbulb,
    radius: "14% 14% 14% 14%", // rounded square, turned into a diamond
    rotate: 45,
    bg: "bg-white",
  },
  {
    number: "03",
    title: "Rooted in Nepal",
    text: "Curriculum and low-cost tools designed for Nepali classrooms, languages and communities.",
    icon: Heart,
    radius: "50% 0% 50% 0%", // leaf
    rotate: 0,
    bg: "bg-accent",
  },
  {
    number: "04",
    title: "Open and accountable",
    text: "Independent governance, open-source thinking and honest reporting to the people we serve.",
    icon: ShieldCheck,
    radius: "50% 50% 0% 0%", // arch
    rotate: 0,
    bg: "bg-white",
  },
];

const rise = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? (false as const) : { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease },
});

/* One full-screen image panel with text on top */
function PanelFrame({
  src,
  alt,
  children,
  panelRef,
  scale,
  dim,
  rounded,
  z,
  priority,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  panelRef?: Ref<HTMLDivElement>;
  scale?: MotionValue<number>;
  dim?: MotionValue<number>;
  rounded?: boolean;
  z: number;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      ref={panelRef}
      className={`sticky top-0 h-svh overflow-hidden bg-primary ${
        rounded ? "rounded-t-[2rem] md:rounded-t-[3rem]" : ""
      }`}
      style={{ zIndex: z }}
    >
      <motion.div
        className="absolute inset-0"
        style={scale ? { scale } : undefined}
      >
        {/* Image with a slow zoom-out when it appears */}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0 : 2, ease }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority={priority}
            className="object-cover"
          />
        </motion.div>

        {/* Dark gradient so the text is always readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/10 md:bg-gradient-to-r md:from-primary/90 md:via-primary/55 md:to-transparent"
        />

        <div className="relative z-10 flex h-full items-end pb-20 md:items-center md:pb-0">
          <Container>{children}</Container>
        </div>
      </motion.div>

      {/* Dims this panel while the next one covers it */}
      {dim && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: dim }}
        />
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
      <span aria-hidden="true" className="h-px w-10 bg-accent" />
      {children}
    </span>
  );
}

/* Mission, then Vision sliding over it */
function StackedPanels() {
  const reduce = useReducedMotion();
  const visionRef = useRef<HTMLDivElement>(null);

  // 0 -> 1 while the vision panel slides up over the mission panel
  const { scrollYProgress: cover } = useScroll({
    target: visionRef,
    offset: ["start end", "start start"],
  });
  const missionScale = useTransform(cover, [0, 1], [1, 0.93]);
  const missionDim = useTransform(cover, [0, 1], [0, 0.55]);

  return (
    <section aria-label="Mission and vision" className="relative">
      <PanelFrame
        src="/images/mission/mission.jpg"
        alt="Students learning robotics together"
        scale={missionScale}
        dim={missionDim}
        z={10}
        priority
      >
        <div className="max-w-2xl text-white">
          <motion.div {...rise(reduce, 0.1)}>
            <Label>Our Mission</Label>
          </motion.div>
          <motion.h2
            {...rise(reduce, 0.25)}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Reaching the <span className="text-accent">unreached.</span>
          </motion.h2>
          <motion.p
            {...rise(reduce, 0.4)}
            className="mt-6 max-w-xl text-base leading-7 text-white/80 md:text-lg md:leading-8"
          >
            {MISSION}
          </motion.p>
        </div>
      </PanelFrame>

      <PanelFrame
        panelRef={visionRef}
        src="/images/mission/vision.jpg"
        alt="A school community in the hills of Nepal"
        rounded
        z={20}
      >
        <div className="max-w-4xl text-white">
          <motion.div {...rise(reduce, 0.1)}>
            <Label>Our Vision</Label>
          </motion.div>
          <motion.h2
            {...rise(reduce, 0.25)}
            className="mt-6 font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
          >
            A Nepal where every child, wherever they live, has a{" "}
            <span className="text-accent">path</span> to technology and the
            skills to shape their own future.
          </motion.h2>
        </div>
      </PanelFrame>
    </section>
  );
}

/* Pinned section: one shape (with an icon) that changes with each value */
function CoreValues() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = values.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const morph = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 70, damping: 15 };

  const v = values[active];
  const Icon = v.icon;

  return (
    <section
      ref={sectionRef}
      aria-label="Core values"
      className="relative bg-primary text-white"
      style={{ height: `${(n + 1) * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl"
        />

        <Container>
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-24">
            {/* Shape with icon */}
            <div className="flex justify-center">
              <div className="relative h-32 w-32 sm:h-56 sm:w-56 lg:h-[26rem] lg:w-[26rem]">
                <motion.div
                  aria-hidden="true"
                  className="absolute -inset-3 border border-accent/40 sm:-inset-6 lg:-inset-7"
                  style={{ rotate: ringRotate }}
                  animate={{ borderRadius: v.radius }}
                  transition={morph}
                />
                <motion.div
                  aria-hidden="true"
                  className={`absolute inset-0 grid place-items-center transition-colors duration-700 ${v.bg}`}
                  animate={{ borderRadius: v.radius, rotate: v.rotate }}
                  transition={morph}
                >
                  {/* Counter-rotate so the icon always stays upright */}
                  <motion.span
                    animate={{ rotate: -v.rotate }}
                    transition={morph}
                    className="text-primary"
                  >
                    <motion.span
                      key={active}
                      className="block"
                      initial={reduce ? false : { opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: reduce ? 0 : 0.6, ease }}
                    >
                      <Icon
                        strokeWidth={1.5}
                        className="h-12 w-12 sm:h-20 sm:w-20 lg:h-32 lg:w-32"
                      />
                    </motion.span>
                  </motion.span>
                </motion.div>
              </div>
            </div>

            {/* Text: centered on phones and tablets, left-aligned on desktop */}
            <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
              <Badge className="text-accent">Core Values</Badge>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:mt-5 lg:text-5xl">
                The principles that guide us.
              </h2>

              {/* Fixed height, so nothing below it jumps when the text changes */}
              <div className="mt-6 min-h-[13rem] sm:min-h-[15rem] lg:min-h-[19rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: reduce ? 0 : 0.45, ease }}
                  >
                    <p className="font-display text-sm font-semibold tracking-[0.2em] text-accent">
                      {v.number} / 0{n}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:mt-4 lg:text-5xl">
                      {v.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/65 lg:mx-0 lg:mt-5 lg:text-lg lg:leading-8">
                      {v.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress */}
              <div
                className="mx-auto mt-6 flex max-w-xs gap-2 lg:mx-0 lg:mt-8"
                aria-hidden="true"
              >
                {values.map((item, i) => (
                  <span
                    key={item.number}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      i <= active ? "bg-accent" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export function MissionVision() {
  return (
    <>
      <StackedPanels />
      <CoreValues />
    </>
  );
}
