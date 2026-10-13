const API_URL = process.env.NEXT_PUBLIC_API_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export interface UltimateDream {
  id: number;
  eyebrow: string;
  heading: string;
  description: string;
  button_label: string;
  button_href: string;
  image_url: string;
  image_alt: string;
  is_active: boolean;
  order: number;
}

export async function getUltimateDream(): Promise<UltimateDream | null> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const response = await fetch(`${API_URL}/ultimate-dream`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Ultimate Dream");
  }

  const result = await response.json();

  return result.data ?? null;
}

/** Convert a relative image path to a full backend URL. */
export function resolveImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (!IMAGE_BASE_URL) return url;
  const path = url.replace(/\\/g, "/");
  return `${IMAGE_BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
}
