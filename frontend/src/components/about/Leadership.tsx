import Image from "next/image";
import { Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import { leadership } from "@/data/team";

// First letter of the first and last word, e.g. "Prashant Thapa" -> "PT"
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// "https://www.example.com/" -> "www.example.com"
function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function Leadership() {
  return (
    <Section>
      <Container>
        {/* Heading */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <Reveal className="max-w-xl">
            <Badge>Leadership Behind BATO</Badge>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-primary sm:mt-5 sm:text-4xl lg:text-5xl">
              The people building the road.
            </h2>
          </Reveal>

          <Reveal className="max-w-sm md:pb-1">
            <p className="text-base leading-relaxed text-primary/60">
              Independent leadership guiding BATO Foundation&apos;s mission
              across Nepal.
            </p>
          </Reveal>
        </div>

        {/* Team */}
        <StaggerContainer className="mx-auto mt-10 grid max-w-sm grid-cols-1 gap-x-6 gap-y-10 sm:mt-12 sm:max-w-none sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 xl:gap-x-10">
          {leadership.map((m) => {
            const photo = (
              <>
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-primary">
                    <span className="font-display text-7xl font-semibold text-accent/40 sm:text-8xl">
                      {initials(m.name)}
                    </span>
                  </div>
                )}

                {m.portfolio && (
                  <>
                    {/* Dark overlay + URL (desktop hover / keyboard focus) */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 hidden items-center justify-center bg-primary/60 px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:flex"
                    >
                      <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/70 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-[2px] transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-primary">
                        <Globe className="size-4 shrink-0" />
                        <span className="truncate">
                          {displayUrl(m.portfolio)}
                        </span>
                      </span>
                    </div>

                    {/* Always-visible URL chip on touch screens (no hover there) */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-1.5 rounded-full bg-primary/75 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm md:hidden"
                    >
                      <Globe className="size-3.5 shrink-0" />
                      <span className="truncate">
                        {displayUrl(m.portfolio)}
                      </span>
                    </span>
                  </>
                )}
              </>
            );

            const photoClasses =
              "group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:rounded-3xl";

            return (
              <StaggerItem key={m.name}>
                <article className="flex flex-col items-center text-center">
                  {m.portfolio ? (
                    <a
                      href={m.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${m.name}'s portfolio website`}
                      className={photoClasses}
                    >
                      {photo}
                    </a>
                  ) : (
                    <div className={photoClasses}>{photo}</div>
                  )}

                  <h3 className="mt-5 font-display text-lg font-semibold text-primary sm:text-xl">
                    {m.name}
                  </h3>
                  <p className="mt-1 max-w-[18rem] text-sm leading-snug text-primary/60 sm:text-base">
                    {m.role}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
