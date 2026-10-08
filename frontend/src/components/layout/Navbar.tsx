"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { contactInfo, navItems } from "@/data/navigation";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// "Donate" is the gold button, so it is not repeated in the link list
const links = navItems.filter((i) => i.href !== "/donate");

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const lastY = useRef(0);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Floating pill after 40px; hide when scrolling down, show when scrolling up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 400 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6 || y <= 400) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll + Esc to close while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-3 transition-transform duration-500 sm:px-5",
          hidden && !open ? "-translate-y-[140%]" : "translate-y-0",
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between border transition-[max-width,padding,margin,background-color,border-color,box-shadow,border-radius] duration-500 ease-out",
            scrolled
              ? "mt-3 max-w-[1080px] rounded-full border-white/10 bg-primary-dark/80 py-2 pl-2 pr-2 shadow-[0_18px_50px_-12px_rgba(10,16,36,0.55)] backdrop-blur-xl"
              : "mt-0 max-w-container rounded-none border-transparent bg-transparent py-4 pl-2 pr-2 sm:px-3",
          )}
        >
          {/* Logo image on a white chip so it stays readable on the
              dark glass bar and over the navy hero. */}
          <Link
            href="/"
            aria-label="BATO Foundation home"
            className="flex shrink-0 items-center rounded-full bg-white px-4 py-1.5 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-transform duration-300 hover:scale-[1.03] md:px-5 md:py-2"
          >
            <Image
              src="/brand/logo.png"
              alt="BATO Foundation"
              width={160}
              height={48}
              priority
              className="h-7 w-auto object-contain md:h-8"
            />
          </Link>

          {/* Desktop links */}
          <nav
            className="hidden items-center lg:flex"
            aria-label="Main navigation"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.href)}
                  onFocus={() => setHovered(item.href)}
                  onBlur={() => setHovered(null)}
                  className={cn(
                    "relative px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                    active ? "text-accent" : "text-white/75 hover:text-white",
                  )}
                >
                  {/* sliding hover highlight */}
                  {hovered === item.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 38,
                      }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {/* gold dot = current page */}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(227,167,68,0.7)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Magnetic strength={0.12}>
                <Link
                  href="/donate"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-primary-dark transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(227,167,68,0.55)]"
                >
                  {/* shine sweep */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/45 transition-transform duration-700 group-hover:translate-x-[320%]"
                  />
                  <Heart className="relative h-4 w-4 fill-primary-dark/90 transition-transform duration-300 group-hover:scale-125" />
                  <span className="relative">Donate</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: open ? -90 : 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: open ? 90 : -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.22 }}
                >
                  {open ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — a sibling of <header> so it is never clipped by its blur/transform */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-primary-dark text-white lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 40px)" }}
            exit={{
              clipPath: "circle(0% at calc(100% - 36px) 40px)",
              transition: { duration: 0.45, ease: EASE },
            }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* atmosphere */}
            <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
            <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary-light/60 blur-[100px]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />

            <div className="relative flex min-h-full flex-col justify-center px-7 pb-10 pt-28">
              <nav
                aria-label="Mobile navigation"
                className="relative ml-2 border-l border-dashed border-white/20"
              >
                {links.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.25 + i * 0.08,
                        duration: 0.6,
                        ease: EASE,
                      }}
                      className="relative"
                    >
                      {active && (
                        <span className="absolute -left-[7px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-accent ring-4 ring-primary-dark" />
                      )}
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-baseline gap-4 py-4 pl-8 font-display text-4xl font-semibold transition-colors",
                          active
                            ? "text-white"
                            : "text-white/45 active:text-white",
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs font-semibold tabular-nums",
                            active ? "text-accent" : "text-white/30",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25 + links.length * 0.08 + 0.1,
                  duration: 0.6,
                  ease: EASE,
                }}
                className="mt-10"
              >
                <Link
                  href="/donate"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-lg font-semibold text-primary-dark"
                >
                  <Heart className="h-5 w-5 fill-primary-dark/90" />
                  Donate Now
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Building Access to Technology &amp; Opportunities
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-2 block text-sm text-white/55"
                >
                  {contactInfo.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
