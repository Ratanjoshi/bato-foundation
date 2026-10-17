"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";

export interface UltimateDreamData {
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  image: {
    url: string;
    alt: string;
  };
}

interface Props {
  data: UltimateDreamData;
}

export function UltimateDream({ data }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  // Use the configured backend URL for uploaded images.
  const imageBaseUrl = (
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:8080"
  ).replace(/\/+$/, "");

  // Fix image paths and replace localhost with the configured backend.
  const rawImageUrl = data.image?.url?.trim() || "";

  const imageUrl = (() => {
    if (!rawImageUrl) return "";

    // Correct the typo in older image paths.
    const correctedUrl = rawImageUrl.replace(/\/esources\//g, "/resources/");

    try {
      const url = new URL(correctedUrl, `${imageBaseUrl}/`);

      // Localhost URLs will not work for visitors to the deployed website.
      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        const backendUrl = new URL(imageBaseUrl);
        url.protocol = backendUrl.protocol;
        url.host = backendUrl.host;
      }

      return url.toString();
    } catch {
      return "";
    }
  })();

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden py-36 text-white md:py-44"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? {} : { scale: imgScale }}
      >
        {imageUrl ? (
          <SmartImage
            key={imageUrl}
            src={imageUrl}
            alt={data.image?.alt || "BATO Foundation's ultimate dream"}
            fill
            priority={false}
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/85" />

      {/* Content */}
      <Container className="relative z-10 text-center">
        <Reveal>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-accent">
            {data.eyebrow}
          </p>
        </Reveal>

        <h2 className="mx-auto max-w-4xl text-balance font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          <TextReveal text={data.heading} />
        </h2>

        <Reveal delay={0.5}>
          <p className="mx-auto mt-7 max-w-xl text-lg text-white/80">
            {data.description}
          </p>

          <div className="mt-10">
            <Button href={data.buttonHref} size="lg">
              {data.buttonLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
