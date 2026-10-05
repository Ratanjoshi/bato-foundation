"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 50 },
  down: { x: 0, y: -50 },
  left: { x: 50, y: 0 },
  right: { x: -50, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px 0px" });
  const reduce = useReducedMotion();
  const off = offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: off.x, y: off.y }
      }
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : reduce
          ? { opacity: 0 }
          : { opacity: 0, x: off.x, y: off.y }
      }
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
