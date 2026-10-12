"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface AboutPreviewData {
  id: number;
  badge: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imageAlt: string;
  floatingTitle: string;
  floatingText: string;
  isPublished: boolean;
}

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const PUBLIC_ABOUT_PREVIEW_URL = `${API_BASE_URL}/api/v1/public-about-preview`;

// ─────────────────────────────────────────────
// Helper — resolve correct image URL
// ─────────────────────────────────────────────
function resolveImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "";

  // Absolute URL (Cloudinary, external CDN)
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Backend-served upload
  if (imageUrl.startsWith("/uploads/")) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  // Local Next.js public asset (default)
  return imageUrl;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export function AboutPreview() {
  const [data, setData] = useState<AboutPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(PUBLIC_ABOUT_PREVIEW_URL, {
          // Always get fresh data on page load
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json = await res.json();

        if (isMounted) {
          setData(json.data ?? null);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ─────────────────────────────────────────
  // Loading Skeleton
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <Section>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 animate-pulse">
            <div className="h-[440px] rounded-3xl bg-gray-200 md:h-[520px]" />
            <div className="space-y-4">
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="h-10 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-10 w-48 rounded bg-gray-200" />
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // ─────────────────────────────────────────
  // Hide section if error / no data / unpublished
  // ─────────────────────────────────────────
  if (error || !data || !data.isPublished) {
    return null;
  }

  const fullImageUrl = resolveImageUrl(data.imageUrl);

  // ─────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative">
              <div className="relative h-[440px] overflow-hidden rounded-3xl md:h-[520px]">
                <ParallaxImage
                  src={fullImageUrl}
                  alt={data.imageAlt}
                  className="h-full w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 rounded-2xl bg-primary p-6 text-white shadow-2xl md:-right-8">
                <p className="font-display text-3xl font-bold text-accent">
                  {data.floatingTitle}
                </p>
                <p className="mt-1 max-w-[11rem] text-sm text-white/65">
                  {data.floatingText}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left">
            <Badge>{data.badge}</Badge>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-primary md:text-4xl lg:text-[2.6rem]">
              {data.title}
            </h2>
            <p className="mt-5 text-primary/65 leading-relaxed">
              {data.paragraph1}
            </p>
            <p className="mt-4 text-primary/65 leading-relaxed">
              {data.paragraph2}
            </p>
            <div className="mt-8">
              <Button href={data.buttonLink}>
                {data.buttonText} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
