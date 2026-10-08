import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import { contactInfo } from "@/data/navigation";

export function ContactPreview() {
  const items = [
    {
      icon: Mail,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactInfo.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        contactInfo.location,
      )}`,
      external: true,
    },
  ];

  return (
    <Section className="bg-muted">
      <Container>
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: heading */}
          <Reveal>
            <Badge>Contact Us</Badge>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Let&apos;s Work Together.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-primary/60 sm:text-lg">
              Whether you&apos;re a school, a partner, a donor or a volunteer —
              we&apos;d love to hear how we can build the road forward together.
            </p>

            {/* Button: under the text, desktop only */}
            <div className="mt-8 hidden lg:block">
              <Button href="/contact">
                Contact Page <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>

          {/* Right: animated contact cards */}
          <StaggerContainer className="space-y-3 sm:space-y-4">
            {items.map((it) => (
              <StaggerItem key={it.label}>
                <a
                  href={it.href}
                  {...(it.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl sm:gap-5 sm:p-6"
                >
                  {/* Accent bar that grows in on hover */}
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />

                  {/* Icon */}
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-accent transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary sm:h-14 sm:w-14">
                    <it.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary/40">
                      {it.label}
                    </p>
                    <p className="mt-0.5 break-words font-medium text-primary sm:text-lg">
                      {it.value}
                    </p>
                  </div>

                  {/* Arrow slides in on hover */}
                  <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-2 text-accent-dark opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Button: bottom center, mobile and tablet only */}
        <Reveal className="lg:hidden">
          <div className="mt-10 flex justify-center sm:mt-12">
            <Button href="/contact">
              Contact Page <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
