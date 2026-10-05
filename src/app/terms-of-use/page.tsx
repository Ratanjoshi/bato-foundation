import Link from "next/link";

import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/ui/Container";

import { contactInfo } from "@/data/navigation";

export const metadata = {
  title: "Terms of Use | BATO Foundation",
  description:
    "The terms that govern your use of the BATO Foundation website, including donations, content, and contact.",
};

const LAST_UPDATED = "October 1, 2026";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: [
      "By accessing or using the BATO Foundation website, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use the website.",
    ],
  },
  {
    id: "about",
    title: "About BATO Foundation",
    body: [
      "BATO Foundation is a registered non-profit organization based in Nepal, working to build access to technology and opportunities. This website shares information about our work, programs, partners, and ways to support us.",
    ],
  },
  {
    id: "use",
    title: "Use of the Website",
    body: [
      "You may use this website for lawful purposes only. You agree not to:",
    ],
    list: [
      "Use the website in any way that breaks applicable local or international law.",
      "Attempt to gain unauthorized access to the website, its servers, or any connected systems.",
      "Introduce viruses, malware, or any harmful or disruptive code.",
      "Copy, scrape, or reuse content in a way that misrepresents BATO Foundation or its work.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: [
      "All content on this website, including text, graphics, logos, images, and design, is the property of BATO Foundation or its content providers and is protected by applicable intellectual property laws.",
      "You may view and share pages for personal, non-commercial purposes. Any other use, including reproduction, modification, or distribution, requires our prior written permission.",
    ],
  },
  {
    id: "donations",
    title: "Donations",
    body: [
      "Donations made through this website support BATO Foundation's mission and programs. By donating, you confirm that you are authorized to use the payment method provided and that the information you give is accurate.",
      "Unless required by law or stated otherwise at the time of giving, donations are voluntary and non-refundable. If you believe a donation was made in error, please contact us as soon as possible and we will review your request.",
    ],
  },
  {
    id: "communications",
    title: "Messages and Submissions",
    body: [
      "When you contact us or submit information through forms on this website, you agree to provide accurate information. We use the details you share only to respond to you and to run our programs, as described in our Privacy Policy.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Links and Partners",
    body: [
      "This website may link to websites or mention organizations that are not operated by BATO Foundation. We do not control and are not responsible for their content, policies, or practices. Visiting those links is at your own risk.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: [
      "We work to keep the information on this website accurate and up to date, but we provide it on an “as is” and “as available” basis without warranties of any kind. We do not guarantee that the website will be uninterrupted or error-free.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, BATO Foundation and its board members, volunteers, and partners are not liable for any indirect or consequential loss arising from your use of, or inability to use, this website.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: [
      "We may update these Terms of Use from time to time. The latest version will always be posted on this page with its updated date. Continued use of the website after changes means you accept the revised terms.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: [
      "These terms are governed by the laws of Nepal. Any dispute arising from them will be subject to the jurisdiction of the courts of Nepal.",
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <main>
      {/* PAGE HEADER */}
      <PageHeader
        title="Terms of Use"
        subtitle="Please read these terms carefully. They explain how you can use the BATO Foundation website, our content, and our donation tools."
        crumb="Terms of Use"
      />

      {/* LAST UPDATED */}
      <div className="bg-[#f8f9fa]">
        <Container>
          <div className="flex justify-end pt-6">
            <p className="inline-flex items-center rounded-full border border-primary-dark/10 bg-white px-4 py-1.5 text-xs font-medium text-primary-dark/60 shadow-sm">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </Container>
      </div>

      {/* CONTENT */}
      <section className="bg-[#f8f9fa] py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* TABLE OF CONTENTS */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl bg-[#e7eaee] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-dark/60">
                  On this page
                </p>

                <ol className="mt-4 space-y-2.5 text-sm">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-3 text-primary-dark/70 transition-colors hover:text-primary-dark"
                      >
                        <span className="tabular-nums text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {s.title}
                      </a>
                    </li>
                  ))}

                  <li>
                    <a
                      href="#contact"
                      className="flex gap-3 text-primary-dark/70 transition-colors hover:text-primary-dark"
                    >
                      <span className="tabular-nums text-accent">
                        {String(sections.length + 1).padStart(2, "0")}
                      </span>
                      Contact Us
                    </a>
                  </li>
                </ol>
              </div>
            </aside>

            {/* TERMS */}
            <div className="max-w-3xl">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 border-b border-primary-dark/10 py-8 first:pt-0"
                >
                  <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold text-primary-dark">
                    <span className="text-sm tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {s.title}
                  </h2>

                  <div className="mt-4 space-y-4 leading-relaxed text-gray-600">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}

                    {s.list && (
                      <ul className="space-y-2 pl-1">
                        {s.list.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />

                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}

              {/* CONTACT */}
              <section id="contact" className="scroll-mt-28 pt-8">
                <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold text-primary-dark">
                  <span className="text-sm tabular-nums text-accent">
                    {String(sections.length + 1).padStart(2, "0")}
                  </span>
                  Contact Us
                </h2>

                <p className="mt-4 leading-relaxed text-gray-600">
                  If you have any questions about these Terms of Use, please get
                  in touch with us.
                </p>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-5 inline-flex items-center rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/85"
                >
                  {contactInfo.email}
                </a>

                <p className="mt-6 text-sm text-gray-500">
                  See also our{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-medium text-primary-dark underline decoration-accent underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
