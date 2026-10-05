"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Check } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

/* =========================================================
   IMAGE FOLDER — change this if your folder name is different
   (this maps to  public/images/why/  in your project)
========================================================= */

const IMAGE_DIR = "/images/why/";

/* =========================================================
   TYPES + CONTENT
========================================================= */

type Reason = {
  tag: string;
  title: string;
  desc: string;
  points: string[];
  image: string;
  alt: string;
};

const reasons: Reason[] = [
  {
    tag: "For students",
    title: "Learning Kits",
    desc: "Robotics and coding kits reach students who have never touched them before. Hands-on building turns abstract ideas into something children can see, test and fix for themselves.",
    points: [
      "Robotics and coding kits",
      "Hands-on, project-based learning",
      "Designed for first-time learners",
    ],
    image: `${IMAGE_DIR}/learning-kits.jpg`,
    alt: "Students building a robotics kit together",
  },
  {
    tag: "For educators",
    title: "Teacher Training",
    desc: "We equip teachers to keep the learning going long after we leave. Practical workshops give educators the confidence, materials and know-how to teach STEM and digital skills in their own classrooms.",
    points: [
      "Practical teacher workshops",
      "Ready-to-use lesson resources",
      "Lasting, locally led impact",
    ],
    image: `${IMAGE_DIR}/teacher-training.jpg`,
    alt: "A teacher leading a workshop for educators",
  },
  {
    tag: "For communities",
    title: "Technology Access",
    desc: "We bring STEM, AI and digital skills to places without access. By closing the gap between connected and unconnected communities, we open doors to future education, work and opportunity for young people.",
    points: [
      "STEM, AI and digital skills",
      "Reaching underserved communities",
      "Opening doors to opportunity",
    ],
    image: `${IMAGE_DIR}/technology-access.jpg`,
    alt: "Children using computers in a community classroom",
  },
];

const COUNT = reasons.length;

const statement =
  "BATO Foundation is a non-profit-distributing organization. By law, no profits are distributed to members, so every contribution goes directly toward education, technology and community programmes.";

const EASE = [0.16, 1, 0.3, 1] as const;

const GRID_BG =
  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)";

/* Shared height so image + right content line up perfectly */
const STAGE_H = "h-[min(600px,calc(100svh-8rem))]";
const ITEM_MIN_H = "min-h-[min(600px,calc(100svh-8rem))]";

/* =========================================================
   PHOTO — image only, no icons
========================================================= */

function Photo({
  reason,
  sizes,
  priority = false,
}: {
  reason: Reason;
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="absolute inset-0 bg-primary">
      {!failed ? (
        <Image
          src={reason.image}
          alt={reason.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        // Plain fallback (no icon) if the file is missing
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: GRID_BG, backgroundSize: "44px 44px" }}
        />
      )}

      {/* Readability overlay for the caption text */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
    </div>
  );
}

/* =========================================================
   SCROLL-REVEALED STATEMENT
========================================================= */

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const full = useMotionValue(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });

  const words = statement.split(" ");

  return (
    <p
      ref={ref}
      className="max-w-3xl font-display text-lg font-medium leading-relaxed text-primary sm:text-xl lg:text-[1.55rem]"
    >
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          word={word}
          progress={reduceMotion ? full : scrollYProgress}
          range={[
            index / words.length,
            Math.min((index + 1.8) / words.length, 1),
          ]}
        />
      ))}
    </p>
  );
}

/* =========================================================
   COUNT UP
========================================================= */

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(reduceMotion ? to : 0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(value, to, { duration: 1.8, ease: EASE });
    return () => controls.stop();
  }, [inView, reduceMotion, to, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>%
    </span>
  );
}

/* =========================================================
   DESKTOP — FIXED IMAGE (LEFT) + SCROLLING CONTENT (RIGHT)
========================================================= */

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

function StoryItem({
  reason,
  index,
  onActive,
}: {
  reason: Reason;
  index: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Becomes "active" when it crosses the middle band of the viewport
  const isCentered = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isCentered) onActive(index);
  }, [isCentered, index, onActive]);

  // Scroll-linked fade + slide of the text
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0.08, 0.3, 0.72, 0.92],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [0.08, 0.3, 0.72, 0.92],
    [50, 0, 0, -50],
  );

  return (
    <div ref={ref} className={`flex items-center ${ITEM_MIN_H}`}>
      <motion.div
        style={reduceMotion ? undefined : { opacity, y }}
        className="w-full"
      >
        <p className="text-sm font-semibold text-accent-dark">{reason.tag}</p>

        <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-primary xl:text-[2.9rem]">
          {reason.title}
        </h3>

        <p className="mt-5 max-w-xl text-base leading-7 text-primary/65 xl:text-lg xl:leading-8">
          {reason.desc}
        </p>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-35% 0px -35% 0px" }}
          className="mt-8 space-y-3.5"
        >
          {reason.points.map((point) => (
            <motion.li
              key={point}
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="text-base font-medium text-primary">
                {point}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

function DesktopStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 30%", "end 70%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const current = reasons[active];

  return (
    <div className="grid grid-cols-2 items-start gap-12 xl:gap-20">
      {/* ---------------------------------------------
          LEFT — FIXED IMAGE (only the image changes)
      --------------------------------------------- */}
      <div className="sticky top-24">
        <div
          className={`relative w-full overflow-hidden rounded-[2rem] bg-primary shadow-[0_30px_80px_rgba(39,40,60,0.2)] ${STAGE_H}`}
        >
          {reasons.map((reason, index) => {
            const isActive = index === active;
            return (
              <motion.div
                key={reason.title}
                aria-hidden={!isActive}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.06,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  ease: EASE,
                }}
                className="absolute inset-0"
              >
                <Photo
                  reason={reason}
                  priority={index === 0}
                  sizes="(min-width: 1280px) 50vw, 48vw"
                />
              </motion.div>
            );
          })}

          {/* Caption — text only */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-8 xl:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
              >
                <p className="text-sm font-medium text-white/70">
                  {current.tag}
                </p>
                <p className="mt-1 font-display text-3xl font-semibold text-white">
                  {current.title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Counter */}
          <div className="absolute right-6 top-6 z-20 rounded-full border border-white/15 bg-black/25 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md">
            {active + 1}
            <span className="mx-1.5 text-white/40">/</span>
            <span className="text-white/60">{COUNT}</span>
          </div>

          {/* Overall progress */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/15">
            <motion.div
              style={{ scaleX: smooth, transformOrigin: "left" }}
              className="h-full bg-accent"
            />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------
          RIGHT — NORMAL SCROLLING CONTENT
      --------------------------------------------- */}
      <div ref={trackRef} className="pt-0">
        {reasons.map((reason, index) => (
          <StoryItem
            key={reason.title}
            reason={reason}
            index={index}
            onActive={setActive}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE / TABLET — STACKED CARDS
========================================================= */

function MobileStory() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {reasons.map((reason) => (
        <motion.article
          key={reason.title}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_50px_rgba(39,40,60,0.1)] ring-1 ring-primary/5"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/8]">
            <Photo reason={reason} sizes="(min-width: 640px) 90vw, 100vw" />
            <div className="absolute bottom-4 left-4 right-4 z-10 sm:bottom-6 sm:left-6">
              <p className="text-xs font-medium text-white/70">{reason.tag}</p>
              <p className="mt-0.5 truncate font-display text-xl font-semibold text-white sm:text-2xl">
                {reason.title}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-base leading-7 text-primary/70 sm:text-lg sm:leading-8">
              {reason.desc}
            </p>

            <ul className="mt-6 space-y-3">
              {reason.points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-primary sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export function DonationWhy() {
  return (
    /*
      Do NOT add overflow-hidden to this Section (or any parent
      up the tree) — it breaks position: sticky. If you need to
      clip horizontal overflow on the page, use `overflow-x-clip`
      instead; it does not create a scroll container.
    */
    <Section className="relative bg-[#f8f9fa] py-14 sm:py-16 lg:py-20">
      {/* Decorative background — clipping is isolated here */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 top-20 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -right-48 top-[45%] h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="max-w-4xl"
        >
          <Badge>Why Donate?</Badge>

          <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            100% of your gift{" "}
            <span className="text-accent-dark">funds the mission.</span>
          </h2>

          <div className="mt-6 sm:mt-8">
            <ScrollStatement />
          </div>
        </motion.div>
      </Container>

      <Container className="relative z-10">
        <div className="mt-10 sm:mt-12 lg:mt-10">
          <div className="hidden lg:block">
            <DesktopStory />
          </div>
          <div className="lg:hidden">
            <MobileStory />
          </div>
        </div>

        {/* 100% band */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-primary px-6 py-9 shadow-[0_20px_60px_rgba(39,40,60,0.14)] sm:px-10 sm:py-11 lg:mt-6 lg:px-14 lg:py-12"
        >
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: GRID_BG, backgroundSize: "44px 44px" }}
          />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-[100px]" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div className="font-display text-6xl font-semibold leading-none text-accent sm:text-7xl lg:text-8xl">
              <CountUp to={100} />
            </div>
            <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7 lg:text-lg">
              of every contribution goes directly toward education, technology
              and community programmes.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
