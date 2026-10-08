import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { contactInfo } from "@/data/navigation";

export function ContactInfo() {
  const items = [
    { icon: Mail, label: "Email", value: contactInfo.email },
    { icon: Phone, label: "Phone", value: contactInfo.phone },
    { icon: MapPin, label: "Location", value: contactInfo.location },
    { icon: Clock, label: "Office Hours", value: contactInfo.officeHours },
  ];

  return (
    <Reveal>
      <Badge>Contact Information</Badge>
      <h2 className="mt-5 font-display text-3xl font-semibold text-primary md:text-4xl">
        Let&apos;s build the road together.
      </h2>
      <p className="mt-4 text-primary/60">
        Whether you represent a school, organisation, government body or want to
        contribute as an individual — every conversation starts here.
      </p>

      <div className="mt-8 space-y-5">
        {items.map((it) => (
          <div
            key={it.label}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-primary">
              <it.icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary/40">
                {it.label}
              </p>
              <p className="mt-0.5 font-medium text-primary">{it.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {contactInfo.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-primary/70 transition-all duration-300 hover:border-accent hover:text-accent-dark"
          >
            {s.label}
          </a>
        ))}
      </div>
    </Reveal>
  );
}
