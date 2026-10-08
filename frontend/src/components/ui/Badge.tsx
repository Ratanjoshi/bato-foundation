import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-dark",
        className
      )}
    >
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
