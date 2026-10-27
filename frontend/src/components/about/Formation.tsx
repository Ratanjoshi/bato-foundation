"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ArrowDownRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

const EASE = [0.22, 1, 0.36, 1] as const;

// ✅ MUST EXPORT THIS INTERFACE
export interface FormationData {
  badgeLabel: string;
  headingLead: string;
  headingAccent: string;
  imageUrl: string;
  imageAlt: string;
  locationLabel: string;
  locationValue: string;
  introParagraph: string;
  secondaryParagraph: string;
  quoteText: string;
  noteIndex: string;
  noteLabel: string;
  noteTitle: string;
  noteParagraph1: string;
  noteParagraph2: string;
  noteParagraph3: string;
  noteFooter: string;
}

function ArchMark() {
  return (
    <span
      aria-hidden="true"
      className="mt-1 inline-block h-5 w-4 shrink-0 rounded-t-full border-2 border-[#E3A744]"
    />
  );
}

// ✅ ACCEPT DATA AS A PROP
export function Formation({ data }: { data: FormationData | null }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const fallback: FormationData = {
    badgeLabel: "How was BATO Foundation formed?",
    headingLead: "A road that began with a",
    headingAccent: "simple belief.",
    imageUrl: "/images/hero/university-lab.jpg",
    imageAlt: "Students collaborating in a computer lab",
    locationLabel: "Registered office",
    locationValue: "Lalitpur",
    introParagraph:
      "BATO Foundation was established as a purely social, non-profit-distributing company under the Companies Act, 2063.",
    secondaryParagraph:
      "BATO focuses on improving access to technology and learning opportunities.",
    quoteText:
      "Access to technology should not depend on where a child is born.",
    noteIndex: "01",
    noteLabel: "Founding Note",
    noteTitle: "Building the road to opportunity.",
    noteParagraph1:
      "BATO Foundation was established as a purely social, non-profit-distributing company under the Companies Act, 2063.",
    noteParagraph2:
      "The foundation was created around the belief that access to technology should not depend on where a child is born.",
    noteParagraph3:
      "BATO's work connects students with STEM education, coding, robotics, AI literacy and digital skills.",
    noteFooter: "Technology · Learning · Opportunity",
  };

  const content = data || fallback;

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
  const displayImage = content.imageUrl?.startsWith("http")
    ? content.imageUrl
    : `${backendUrl}${content.imageUrl?.startsWith("/") ? "" : "/"}${content.imageUrl}`;

  return (
    <Section id="story" className="overflow-hidden">
      <Container>
        {/* HEADING */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <Badge>{content.badgeLabel}</Badge>
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-[#1A2747] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            {content.headingLead}{" "}
            <span className="italic text-[#E3A744]">
              {content.headingAccent}
            </span>
          </h2>
        </motion.div>

        {/* MAIN GRID */}
        <div className="mt-14 grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* IMAGE COLUMN */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-[470px]">
              <div
                aria-hidden="true"
                className="absolute left-4 top-4 h-[calc(100%-18px)] w-[88%] rounded-t-[999px] border border-[#1A2747]/20 sm:left-6 sm:top-6"
              />

              <motion.div
                initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.25, ease: EASE }}
                className="relative aspect-[0.78] w-[88%] overflow-hidden rounded-t-[999px] bg-[#1A2747]"
              >
                <motion.div
                  initial={reduce ? false : { scale: 1.16 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={displayImage}
                    alt={content.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 38vw, 88vw"
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2747]/25 via-transparent to-transparent" />
                </motion.div>
              </motion.div>

              {/* LOCATION */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.6 }}
                className="absolute bottom-4 right-0 flex items-center gap-3 rounded-tl-[1.8rem] rounded-br-[1.8rem] bg-[#1A2747] px-4 py-3.5 shadow-xl ring-[6px] ring-[#f8f9fa] sm:bottom-6 sm:px-5"
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-[#E3A744]/70"
                      animate={{ scale: [1, 1.45, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#E3A744] text-[#1A2747]">
                    <motion.span
                      animate={reduce ? undefined : { y: [0, -2, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <MapPin className="h-5 w-5" />
                    </motion.span>
                  </span>
                </span>

                <div>
                  <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[10px]">
                    {content.locationLabel}
                  </span>
                  <span className="mt-0.5 block font-display text-lg leading-tight text-white sm:text-xl">
                    {content.locationValue}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CONTENT COLUMN */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="flex flex-col items-center text-center lg:col-span-7"
          >
            <div
              className="max-w-2xl text-base leading-8 text-[#1A2747]/70 sm:text-lg prose prose-p:my-2 prose-a:text-[#E3A744]"
              dangerouslySetInnerHTML={{ __html: content.introParagraph }}
            />

            <motion.blockquote
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
              className="relative my-8 max-w-2xl px-7 font-display text-2xl italic leading-snug text-[#1A2747] sm:text-[1.75rem] md:text-[2rem]"
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[-14px] h-1 w-10 -translate-x-1/2 rounded-full bg-[#E3A744]"
              />
              {content.quoteText}
              <span
                aria-hidden="true"
                className="absolute bottom-[-14px] left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#E3A744]"
              />
            </motion.blockquote>

            <div
              className="max-w-2xl text-base leading-8 text-[#1A2747]/65 sm:text-lg prose prose-p:my-2 prose-a:text-[#E3A744]"
              dangerouslySetInnerHTML={{ __html: content.secondaryParagraph }}
            />

            <motion.button
              type="button"
              aria-expanded={open}
              aria-controls="founding-note"
              onClick={() => setOpen((value) => !value)}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="mt-9 inline-flex items-center gap-3 rounded-full border border-[#1A2747]/15 px-5 py-2.5 text-sm font-medium tracking-wide text-[#1A2747] transition-all duration-300 hover:border-[#E3A744]"
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#1A2747] text-white"
              >
                <span className="font-display text-lg leading-none">+</span>
              </motion.span>

              <span>
                {open ? "Close the founding note" : "Read the founding note"}
              </span>

              <ArrowDownRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  open ? "rotate-90" : ""
                }`}
              />
            </motion.button>

            <motion.div
              id="founding-note"
              initial={false}
              animate={{
                height: open ? "auto" : 0,
                opacity: open ? 1 : 0,
                marginTop: open ? 28 : 0,
              }}
              transition={{ duration: 0.55, ease: EASE }}
              className="w-full max-w-2xl overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] border border-[#1A2747]/10 bg-[#E4ECF8] p-6 text-left sm:p-8 md:p-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full border border-[#1A2747]/10"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A2747]/40">
                    {content.noteLabel}
                  </span>
                  <span className="text-xs font-medium tracking-[0.16em] text-[#1A2747]/30">
                    {content.noteIndex}
                  </span>
                </div>

                <h3 className="mt-5 flex items-start gap-3 font-display text-2xl font-medium leading-tight text-[#1A2747] sm:text-3xl">
                  <ArchMark />
                  <span>{content.noteTitle}</span>
                </h3>

                <div className="mt-5 space-y-4 text-[#1A2747]/65 leading-7 prose prose-sm prose-p:my-2 prose-a:text-[#E3A744]">
                  <div
                    dangerouslySetInnerHTML={{ __html: content.noteParagraph1 }}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: content.noteParagraph2 }}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: content.noteParagraph3 }}
                  />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="h-px w-10 bg-[#E3A744]" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#1A2747]/40">
                    {content.noteFooter}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
