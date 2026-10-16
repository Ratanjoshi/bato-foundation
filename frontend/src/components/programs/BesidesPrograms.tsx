"use client";

import { useEffect, useState, type ComponentType } from "react";
import {
  FlaskConical,
  Lightbulb,
  Wrench,
  Share2,
  Users,
  BookOpen,
  Globe,
  Heart,
  Target,
  Sparkles,
  Zap,
  Award,
  Handshake,
  GraduationCap,
  Rocket,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  FlaskConical,
  Lightbulb,
  Wrench,
  Share2,
  Users,
  BookOpen,
  Globe,
  Heart,
  Target,
  Sparkles,
  Zap,
  Award,
  Handshake,
  GraduationCap,
  Rocket,
};

const FALLBACK_ICON = Sparkles;

interface BesidesProgramItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export function BesidesPrograms() {
  const [items, setItems] = useState<BesidesProgramItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBesidesPrograms() {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

      if (!baseUrl) {
        console.error("BesidesPrograms: NEXT_PUBLIC_API_URL is missing.");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }

      // Remove a trailing slash to avoid a double slash.
      const apiUrl = `${baseUrl.replace(/\/+$/, "")}/besidprogram`;

      try {
        console.log("Fetching Beyond Programmes:", apiUrl);

        const response = await fetch(apiUrl, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const json = await response.json();

        console.log("Beyond Programmes API response:", json);

        // Supports common API response structures.
        const result = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
            ? json.data
            : Array.isArray(json.data?.items)
              ? json.data.items
              : Array.isArray(json.items)
                ? json.items
                : [];

        setItems(result);
        setError(null);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;

        console.error("BesidesPrograms fetch error:", err);
        setError("Unable to load Beyond Programmes.");
        setItems([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadBesidesPrograms();

    return () => controller.abort();
  }, []);

  return (
    <Section className="bg-muted">
      <Container>
        <Reveal className="max-w-xl">
          <Badge>Beyond Programmes</Badge>

          <h2 className="mt-5 font-display text-3xl font-semibold text-primary md:text-4xl">
            Building the ecosystem, not just the classroom.
          </h2>
        </Reveal>

        {loading ? (
          <div className="mt-14 py-8 text-center text-primary/60">
            Loading Beyond Programmes...
          </div>
        ) : error ? (
          <div
            role="status"
            className="mt-14 rounded-xl bg-surface p-6 text-center text-primary/70"
          >
            {error}
            <p className="mt-2 text-sm">
              Check your API URL and backend endpoint.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-14 rounded-xl bg-surface p-6 text-center text-primary/70">
            No programmes are available yet.
          </div>
        ) : (
          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((item) => {
              const Icon = ICON_MAP[item.icon] || FALLBACK_ICON;

              return (
                <StaggerItem key={item.id}>
                  <div className="group flex h-full flex-col items-center rounded-2xl bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-accent transition-all duration-300 group-hover:rotate-6 group-hover:bg-accent group-hover:text-primary">
                      <Icon className="h-6 w-6" />
                    </span>

                    <h3 className="mt-5 font-display font-semibold text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-primary/60">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </Container>
    </Section>
  );
}
