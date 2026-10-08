import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import { partners } from "@/data/partners";

export function SupportingOrganizations() {
  return (
    <Section className="bg-muted">
      <Container>
        <Reveal className="text-center">
          <Badge className="justify-center">
            Our Supporting Organizations
          </Badge>
          <h2 className="mt-5 font-display text-3xl font-semibold text-primary md:text-4xl">
            Standing with us.
          </h2>
        </Reveal>
        <StaggerContainer className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <StaggerItem key={p}>
              <div className="flex h-24 items-center justify-center rounded-2xl border border-border bg-surface px-5 text-center text-sm font-semibold text-primary/50 transition-all duration-300 hover:border-accent hover:text-primary hover:shadow-md">
                {p}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
