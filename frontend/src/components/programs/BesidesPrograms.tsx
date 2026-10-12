"use client";

import { useEffect, useState } from "react";
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

/**
 * ICON_MAP — must match the ALLOWED_ICONS list in the backend.
 */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!baseUrl) {
        console.warn(
          "BesidesPrograms: NEXT_PUBLIC_API_URL is not set — skipping fetch.",
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/besidprogram`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Failed (status ${res.status})`);

        const json = await res.json();
        setItems(json.data || []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("BesidesPrograms fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // Don't render if loading or if there's no data
  if (loading || items.length === 0) return null;

  return (
    <Section className="bg-muted">
      <Container>
        <Reveal className="max-w-xl">
          <Badge>Beyond Programmes</Badge>
          <h2 className="mt-5 font-display text-3xl font-semibold text-primary md:text-4xl">
            Building the ecosystem, not just the classroom.
          </h2>
        </Reveal>

        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => {
            const Icon = ICON_MAP[it.icon] || FALLBACK_ICON;
            return (
              <StaggerItem key={it.id}>
                <div className="group flex h-full flex-col items-center rounded-2xl bg-surface p-6 text-center transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-accent transition-all duration-400 group-hover:bg-accent group-hover:text-primary group-hover:rotate-6">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display font-semibold text-primary">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm text-primary/60">
                    {it.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
