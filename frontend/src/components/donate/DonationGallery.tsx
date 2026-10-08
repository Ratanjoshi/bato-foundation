"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { galleryItems, galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function DonationGallery() {
  const [cat, setCat] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered =
    cat === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === cat);

  const active = activeIndex !== null ? filtered[activeIndex] : null;

  const countFor = (c: string) =>
    c === "All"
      ? galleryItems.length
      : galleryItems.filter((g) => g.category === c).length;

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + filtered.length) % filtered.length,
    );
  }, [filtered.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % filtered.length));
  }, [filtered.length]);

  const changeCategory = (c: string) => {
    setCat(c);
    setActiveIndex(null);
  };

  // Keyboard controls + scroll lock while the lightbox is open
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, prev, next]);

  return (
    <Section className="bg-muted py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Header + filters */}
        <div className="max-w-3xl">
          <Reveal>
            <Badge>Impact Gallery</Badge>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Where your support goes.
            </h2>
          </Reveal>

          {/* Filters — sit directly under the heading */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-7 sm:mt-8"
          >
            <div
              role="tablist"
              aria-label="Filter gallery"
              className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:inline-flex sm:max-w-full sm:gap-1 sm:rounded-full sm:border sm:border-primary/10 sm:bg-white/80 sm:p-1.5 sm:shadow-[0_8px_30px_rgba(39,40,60,0.08)] sm:backdrop-blur"
            >
              {galleryCategories.map((c) => {
                const selected = cat === c;
                const count = countFor(c);

                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => changeCategory(c)}
                    className={cn(
                      "relative shrink-0 snap-start rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-5",
                      selected
                        ? "text-white"
                        : "bg-surface text-primary/60 hover:text-primary sm:bg-transparent",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="gallery-filter-pill"
                        className="absolute inset-0 rounded-full bg-primary shadow-[0_6px_18px_rgba(39,40,60,0.28)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-2">
                      {c}
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums transition-colors duration-300",
                          selected
                            ? "bg-accent text-primary"
                            : "bg-primary/10 text-primary/50",
                        )}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Grid — fewer columns so each card is large */}
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                layout
                key={item.id}
                type="button"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={() => setActiveIndex(index)}
                aria-label={`Open image: ${item.caption}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl bg-primary text-left shadow-[0_14px_40px_rgba(39,40,60,0.12)] transition-shadow duration-500 hover:shadow-[0_26px_60px_rgba(39,40,60,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:aspect-[4/5] xl:aspect-[4/4.6]"
              >
                <SmartImage
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />

                {/* Always-on gradient so the caption is readable on touch screens */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent transition-opacity duration-500 group-hover:from-primary" />

                {/* Category chip */}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm sm:left-5 sm:top-5">
                  {item.category}
                </span>

                {/* Expand icon */}
                <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-accent text-primary opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:right-5 sm:top-5">
                  <Maximize2 className="h-4 w-4" />
                </span>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="mb-3 h-0.5 w-10 origin-left bg-accent transition-all duration-500 group-hover:w-20" />
                  <p className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                    {item.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-primary/60">
            No photos in this category yet.
          </p>
        )}
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/90 p-3 backdrop-blur-md sm:p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            {/* Close */}
            <button
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:top-6"
              onClick={close}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev / Next */}
            {filtered.length > 1 && (
              <>
                <button
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ scale: 0.92, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-surface shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/3] max-h-[70svh] w-full sm:aspect-video">
                  <SmartImage
                    src={active.src}
                    alt={active.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 95vw, 1024px"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 p-5 sm:p-7">
                  <div className="min-w-0">
                    <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-dark">
                      {active.category}
                    </span>
                    <p className="mt-3 font-display text-xl font-semibold text-primary sm:text-2xl">
                      {active.caption}
                    </p>
                  </div>

                  <span className="shrink-0 pt-1 text-sm font-medium tabular-nums text-primary/50">
                    {(activeIndex ?? 0) + 1} / {filtered.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
