import Link from "next/link";
import Image from "next/image";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export function Logo({ light = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex items-center transition-opacity hover:opacity-85"
      aria-label={`${brand.name} — Home`}
    >
      <Image
        src={light ? brand.logoLight : brand.logo}
        alt={brand.name}
        width={brand.width}
        height={brand.height}
        priority
        unoptimized
        className={cn("h-11 w-auto md:h-12", className)}
      />
    </Link>
  );
}
