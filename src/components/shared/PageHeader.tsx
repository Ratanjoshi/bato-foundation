"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/ui/TextReveal";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  crumb: string;
  /** Path in /public, e.g. "/images/headers/programs.jpg". Optional. */
  image?: string;
}

export function PageHeader({ title, subtitle, crumb, image }: PageHeaderProps) {
  return (
    <section className="relative isolate flex min-h-[22rem] items-end overflow-hidden bg-primary pb-14 pt-32 text-white sm:min-h-[26rem] sm:pb-16 sm:pt-36 md:pb-20 md:pt-44 lg:min-h-[30rem] lg:pb-24">
      {/* Background image */}
      {image && (
        <>
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 -z-20"
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Overlay: darkens from the bottom on mobile, from the left on desktop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/80 to-primary/40 md:bg-gradient-to-r md:from-primary md:via-primary/80 md:to-primary/30"
          />
          {/* Extra fade at the bottom edge so the section blends into the page */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-primary/60 to-transparent"
          />
        </>
      )}

      {/* Decorative blobs (softer when there is a photo) */}
      <div
        className={`pointer-events-none absolute -right-32 -top-16 -z-10 h-96 w-96 rounded-full bg-accent blur-[100px] ${
          image ? "opacity-10" : "opacity-15"
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-32 -left-16 -z-10 h-96 w-96 rounded-full bg-accent blur-[100px] ${
          image ? "opacity-[0.07]" : "opacity-10"
        }`}
      />

      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative w-full">
        {/* Breadcrumb pill */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-md sm:mb-6 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="size-3.5 sm:size-4" />
          <span className="font-medium text-accent">{crumb}</span>
        </motion.nav>

        {/* Title */}
        <h1 className="max-w-3xl font-display text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
          <TextReveal text={title} />
        </h1>

        {/* Accent line */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 block h-1 w-16 origin-left rounded-full bg-accent sm:mt-6 sm:w-20"
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
