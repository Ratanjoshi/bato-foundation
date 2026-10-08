import Link from "next/link";

import { ArrowUpRight, MapPin } from "lucide-react";

import { SmartImage } from "@/components/ui/SmartImage";

import type { Program } from "@/types/program";

type Props = {
  program: Program;
  view?: "grid" | "list";
};

function ArrowButton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:size-11 ${className}`}
    >
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-[18px]" />
    </span>
  );
}

export function ProgramCard({ program: p, view = "grid" }: Props) {
  const href = `/programs/${p.slug}`;

  /* ---------- LIST VIEW ---------- */
  if (view === "list") {
    return (
      <Link
        href={href}
        className="group flex flex-col overflow-hidden rounded-3xl bg-surface shadow-[0_2px_20px_rgba(0,0,0,0.06)] ring-1 ring-border/60 transition-all duration-300 hover:shadow-xl sm:flex-row"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-64 md:w-72 lg:w-80">
          <SmartImage
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm sm:text-sm">
            {p.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-lg font-semibold leading-snug text-primary sm:text-xl lg:text-2xl">
              {p.title}
            </h3>

            <ArrowButton />
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-primary/60 sm:text-base">
            {p.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-primary/50 sm:text-sm">
            <span className="rounded-full bg-muted px-3 py-1 font-medium">
              {p.status}
            </span>

            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {p.location}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  /* ---------- GRID VIEW ---------- */

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-[0_2px_20px_rgba(0,0,0,0.06)] ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Image + category pill */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <SmartImage
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm sm:left-5 sm:top-5 sm:text-sm lg:left-6 lg:top-6 lg:px-4 lg:py-2 lg:text-base">
          {p.category}
        </span>
      </div>

      {/* Title + arrow + description */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 lg:gap-6">
          <h3 className="font-display text-xl font-semibold leading-snug text-primary sm:text-2xl lg:text-[28px]">
            {p.title}
          </h3>

          <ArrowButton className="lg:size-12" />
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-primary/60 sm:text-base lg:mt-4 lg:text-lg">
          {p.description}
        </p>
      </div>
    </Link>
  );
}
