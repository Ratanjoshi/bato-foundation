"use client"; // Ensure this is a client component if using Next.js App Router

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

// ✅ Point this to your backend API
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

type DirectorData = {
  name: string;
  role: string;
  org: string;
  photo: string | null;
  message: string[];
};

export function DirectorMessage() {
  const [data, setData] = useState<DirectorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Fetch from the backend
    fetch(`${API_URL}/directormessage/active`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => console.error("Failed to load director message:", err))
      .finally(() => setLoading(false));
  }, []);

  // Show a placeholder while loading to prevent layout shift
  if (loading) {
    return (
      <Section className="bg-primary text-white">
        <Container>
          <div className="flex h-64 items-center justify-center">
            <p className="text-white/50 animate-pulse">Loading message...</p>
          </div>
        </Container>
      </Section>
    );
  }

  // Fallback if the API fails or returns nothing
  if (!data) return null;

  return (
    <Section className="bg-primary text-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
          {/* Photo */}
          <Reveal direction="right">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-2xl bg-primary-light">
              {data.photo ? (
                <Image
                  // ✅ Prepend backend URL if the photo is a relative path (e.g., /resources/...)
                  src={
                    data.photo.startsWith("http")
                      ? data.photo
                      : `${API_URL.replace("/api/v1", "")}${data.photo}`
                  }
                  alt={`${data.name}, ${data.role}`}
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-7xl font-semibold text-white/15">
                    {/* ✅ Dynamically generate initials (e.g., "PT" for Prashant Thapa) */}
                    {data.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {/* Message */}
          <Reveal direction="left">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              A message from our {data.role}
            </p>

            <div className="mt-6 space-y-5 text-lg leading-relaxed text-white/80">
              {data.message.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="font-display text-xl font-semibold">{data.name}</p>
              <p className="mt-1 text-sm text-white/60">
                {data.role}, {data.org}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
