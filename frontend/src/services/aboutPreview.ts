/**
 * Public About Preview service.
 * Works without Redux — plain fetch, safe for Next.js App Router.
 */

export interface AboutPreviewData {
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

/**
 * Base URL of your backend API.
 * Set NEXT_PUBLIC_API_URL in .env.local, e.g.
 *   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

/**
 * Fetch the About Preview section.
 * Returns null on any failure so the homepage never crashes.
 */
export async function fetchAboutPreview(): Promise<AboutPreviewData | null> {
  try {
    const res = await fetch(`${API_BASE}/about-preview`, {
      // Next.js App Router cache — revalidate every 60s
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    // Support both { data: {...} } and direct { ... } shapes
    return (json?.data ?? json ?? null) as AboutPreviewData | null;
  } catch {
    return null;
  }
}
