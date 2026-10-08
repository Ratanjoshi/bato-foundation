import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/* ---------- Edit these ---------- */
const PLACE_NAME = "BATO Foundation";
const ADDRESS_LINE_1 = "Ward No. 3, Lalitpur Metropolitan City";
const ADDRESS_LINE_2 = "Lalitpur, Nepal";

// Text Google Maps will search for. Make it as exact as you can,
// e.g. "BATO Foundation, Pulchowk, Lalitpur, Nepal"
const MAP_QUERY = "Ward 3, Lalitpur Metropolitan City, Lalitpur, Nepal";

// Optional: paste the exact embed link from Google Maps
// (Share -> Embed a map -> copy the src="..." value). If set, it overrides MAP_QUERY.
const CUSTOM_EMBED_URL = "";
/* -------------------------------- */

const encodedQuery = encodeURIComponent(MAP_QUERY);

const embedUrl =
  CUSTOM_EMBED_URL ||
  `https://www.google.com/maps?q=${encodedQuery}&z=15&output=embed`;

const openUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;

export function ContactMap() {
  return (
    <Section className="bg-muted">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            {/* Map */}
            <iframe
              title={`Map showing ${PLACE_NAME}, ${ADDRESS_LINE_2}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-72 w-full border-0 sm:h-96 lg:h-[30rem]"
            />

            {/* Info card: sits on the map on large screens, below it on small ones */}
            <div className="border-t border-border bg-surface p-5 sm:p-6 lg:absolute lg:bottom-6 lg:left-6 lg:max-w-sm lg:rounded-2xl lg:border lg:shadow-xl">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-dark">
                  <MapPin className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-primary sm:text-xl">
                    {PLACE_NAME}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-primary/60">
                    {ADDRESS_LINE_1}
                    <br />
                    {ADDRESS_LINE_2}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  <Navigation className="size-4" />
                  Get directions
                </a>
                <a
                  href={openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-muted"
                >
                  <ExternalLink className="size-4" />
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
