import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navItems, contactInfo } from "@/data/navigation";
import { programs } from "@/data/programs";

const getSocialIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "facebook":
      return <Facebook className="h-5 w-5" />;
    case "instagram":
      return <Instagram className="h-5 w-5" />;
    case "linkedin":
      return <Linkedin className="h-5 w-5" />;
    case "youtube":
      return <Youtube className="h-5 w-5" />;
    default:
      return null;
  }
};

export function Footer() {
  return (
    <footer
      className="relative text-white"
      style={{ backgroundColor: "#1A2747" }}
      role="contentinfo"
    >
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#E3A744] to-transparent opacity-70" />

      {/* Removed excess bottom gap with pb-0 */}
      <Container className="pt-16 pb-0 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 lg:pr-8">
            {/* Added white background container with padding and rounded corners */}
            <Link
              href="/"
              className="inline-block bg-white p-3 rounded-xl transition-transform hover:scale-105"
            >
              <Image
                src="/brand/logo.png"
                alt="BATO Foundation Logo"
                width={160}
                height={60}
                className="h-auto w-auto object-contain"
                priority
              />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Building Access to Technology and Opportunities — bringing coding,
              robotics, AI and STEM education to underserved communities across
              Nepal.
            </p>
            <p className="mt-4 text-xs font-medium text-white/40">
              Non-profit-distributing company under Companies Act 2063
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#E3A744]">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-[#E3A744]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#E3A744]">
              Programs
            </h3>
            <ul className="space-y-4">
              {programs.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-[#E3A744]"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#E3A744]">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#E3A744]" />
                <span className="leading-relaxed">{contactInfo.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#E3A744]" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-[#E3A744]"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#E3A744]" />
                <a
                  href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className="transition-colors hover:text-[#E3A744]"
                >
                  {contactInfo.phone}
                </a>
              </li>
            </ul>

            {/* Social Icons - Semi-rectangle style */}
            <div className="mt-8 flex flex-wrap gap-3">
              {contactInfo.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E3A744] hover:text-[#1A2747]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(s.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar - Contains standard bottom padding (pb-6) */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pb-6 pt-6 text-sm text-white/50 md:flex-row">
          <p className="flex items-center gap-1.5 text-center md:text-left">
            © {new Date().getFullYear()} BATO Foundation. Built with
            <Heart className="h-4 w-4 animate-pulse text-[#E3A744]" /> for
            Nepal.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#E3A744]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="transition-colors hover:text-[#E3A744]"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
