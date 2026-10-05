"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SmartImage } from "./SmartImage";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className,
  imgClassName,
  priority,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [
    `-${speed * 100}%`,
    `${speed * 100}%`,
  ]);

  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <motion.div
        style={reduce ? {} : { y }}
        className="relative h-[120%] w-full"
      >
        <SmartImage
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-cover ${imgClassName || ""}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
}
