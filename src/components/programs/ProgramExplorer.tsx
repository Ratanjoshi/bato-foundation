"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { programs, programCategories } from "@/data/programs";
import { cn } from "@/lib/utils";

export function ProgramExplorer() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [category, query]);

  return (
    <Section>
      <Container>
        {/* Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          {/* Categories: scroll sideways on small screens, wrap on large */}
          <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              {programCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    category === c
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted text-primary/70 hover:bg-border hover:text-primary",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Search + view toggle */}
          <div className="flex items-center gap-3">
            <div className="relative min-w-0 flex-1 lg:flex-none">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary/30" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search programs..."
                aria-label="Search programs"
                className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent lg:w-72"
              />
            </div>

            <div className="flex shrink-0 rounded-full border border-border bg-surface p-1">
              {(
                [
                  { key: "grid", icon: LayoutGrid, label: "Grid view" },
                  { key: "list", icon: List, label: "List view" },
                ] as const
              ).map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  aria-label={label}
                  aria-pressed={view === key}
                  className={cn(
                    "rounded-full p-2 transition-all duration-300",
                    view === key
                      ? "bg-primary text-white"
                      : "text-primary/40 hover:text-primary",
                  )}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-16 text-center sm:mt-20">
            <p className="font-display text-lg text-primary/40 sm:text-xl">
              No programs match your search.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={view + category + query}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "mt-8 sm:mt-12",
                view === "grid"
                  ? "mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 md:max-w-none md:grid-cols-2 lg:gap-10"
                  : "flex flex-col gap-5 sm:gap-6",
              )}
            >
              {filtered.map((p) => (
                <ProgramCard key={p.id} program={p} view={view} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </Container>
    </Section>
  );
}
