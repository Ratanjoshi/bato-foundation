import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// One vertical rhythm for the whole site: every section uses the same padding.
export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      {children}
    </section>
  );
}
