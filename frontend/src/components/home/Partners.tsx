"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

// 1. Pull the API URL from Vercel Environment Variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export function Partners() {
  const [partners, setPartners] = useState<string[]>([]);

  useEffect(() => {
    // 2. Use the dynamic variable in the fetch URL
    fetch(`${API_BASE_URL}/api/v1/partners`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setPartners(json.data);
        }
      })
      .catch((err) => console.error("Failed to fetch partners:", err));
  }, []);

  // 4 identical sets + the animation moving exactly -50% (= 2 sets) gives a
  // perfectly seamless, never-jumping loop.
  const loop = [...partners, ...partners, ...partners, ...partners];

  return (
    <Section className="overflow-hidden">
      <Container>
        <Reveal className="text-center">
          <Badge className="justify-center">Our Partner Organizations</Badge>
          <h2 className="mt-5 font-display text-3xl font-semibold text-primary md:text-4xl">
            Working Together for Greater Impact
          </h2>
        </Reveal>
      </Container>

      <div className="group/track relative mt-14 flex overflow-hidden py-4 mask-fade-x">
        <div className="flex shrink-0 animate-marquee gap-5 pr-5 group-hover/track:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <div
              key={`${p}-${i}`}
              className="flex h-20 w-56 shrink-0 items-center justify-center gap-3 rounded-2xl border border-accent-dark/25 bg-accent px-5 text-center font-display text-sm font-semibold text-primary shadow-[0_6px_18px_-8px_rgba(200,143,46,0.7)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:bg-accent-light hover:shadow-[0_16px_30px_-10px_rgba(26,39,71,0.35)]"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
              />
              {p}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
