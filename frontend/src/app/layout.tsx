import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://batofoundation.org"),

  title: {
    default: "BATO Foundation — Building Access to Technology & Opportunities",
    template: "%s | BATO Foundation",
  },

  description:
    "BATO Foundation brings coding, robotics, AI and STEM education to underserved communities across Nepal — building pathways from technology to opportunity.",

  keywords: [
    "BATO Foundation",
    "STEM education Nepal",
    "robotics Nepal",
    "coding for children Nepal",
    "digital literacy",
    "nonprofit Nepal",
    "AI education",
  ],

  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "BATO Foundation — Building Access to Technology & Opportunities",
    description:
      "Building Access to Technology and Opportunities across Nepal.",
    type: "website",
    locale: "en_US",
    siteName: "BATO Foundation",
    url: "https://batofoundation.org",
  },

  twitter: {
    card: "summary_large_image",
    title: "BATO Foundation",
    description:
      "Building Access to Technology and Opportunities across Nepal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="relative">
        <div className="grain" aria-hidden="true" />

        <ScrollProgress />

        <Navbar />

        <main id="main-content">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
