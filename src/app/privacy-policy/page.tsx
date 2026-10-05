import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { contactInfo } from "@/data/navigation";

export const metadata = {
  title: "Privacy Policy | BATO Foundation",
  description:
    "How BATO Foundation collects, uses, shares, and protects your personal information.",
};

const LAST_UPDATED = "October 1, 2026";

type Section = {
  id: string;
  title: string;
  body: string[];
  list?: string[];
  after?: string;
};

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      "BATO Foundation is a registered non-profit organization based in Nepal, working to build access to technology and opportunities. We respect your privacy and are committed to protecting the personal information you share with us.",
      "This Privacy Policy explains what information we collect through our website, how we use it, who we share it with, and the choices you have. By using this website, you agree to the practices described here.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: ["We collect information in the following ways:"],
    list: [
      "Information you give us: your name, email address, phone number, and message when you contact us, subscribe to updates, volunteer, partner with us, or apply to our programs.",
      "Donation information: your name, email, donation amount, and related details needed to process and acknowledge your gift. Payments are handled by third-party payment providers, and we do not store your full card or banking details.",
      "Information collected automatically: your IP address, browser type, device, pages visited, and time spent on the website, gathered through cookies and similar technologies.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    body: ["We use the information we collect to:"],
    list: [
      "Respond to your questions, requests, and applications.",
      "Process donations, issue receipts, and thank our supporters.",
      "Run, manage, and improve our programs and services.",
      "Send updates about our work, events, and impact, if you have chosen to receive them.",
      "Understand how visitors use the website so we can improve it.",
      "Keep the website secure and meet our legal obligations.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Analytics",
    body: [
      "Cookies are small files stored on your device. We use them to keep the website working properly, remember your preferences, and understand how the site is used.",
      "You can control or delete cookies through your browser settings. Blocking some cookies may affect how parts of the website work.",
    ],
  },
  {
    id: "sharing",
    title: "How We Share Information",
    body: [
      "We do not sell or rent your personal information. We share it only in these limited cases:",
    ],
    list: [
      "With trusted service providers who help us run the website, process donations, send emails, or analyze usage, and who are required to protect your data.",
      "With partners or volunteers who help deliver our programs, only as far as needed for that purpose.",
      "When required by law, court order, or a lawful request from a public authority.",
      "To protect the rights, safety, and property of BATO Foundation, our community, or others.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    body: [
      "We keep personal information only as long as needed for the purposes in this policy, or as required by law, such as for financial and accounting records. When it is no longer needed, we delete or anonymize it.",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    body: [
      "We use reasonable technical and organizational measures to protect your information from loss, misuse, and unauthorized access. However, no method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    body: ["Subject to applicable law, you may ask us to:"],
    list: [
      "Tell you what personal information we hold about you.",
      "Correct information that is inaccurate or incomplete.",
      "Delete your personal information.",
      "Stop sending you emails. You can also use the unsubscribe link in any message.",
    ],
    after:
      "To make a request, contact us using the details at the end of this page.",
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: [
      "This website is not directed at children under 16, and we do not knowingly collect their personal information without a parent or guardian's consent. If you believe a child has given us personal information, please contact us and we will delete it.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    body: [
      "Our website may link to other websites that we do not own or control. We are not responsible for their privacy practices, and we encourage you to read their policies.",
    ],
  },
  {
    id: "international",
    title: "International Visitors",
    body: [
      "We are based in Nepal. If you visit the website or donate from another country, your information may be processed in Nepal or in other countries where our service providers operate.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The latest version will always be posted here with its updated date. Continuing to use the website after a change means you accept the revised policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const contactNumber = String(sections.length + 1).padStart(2, "0");

  return (
    <main>
      <PageHeader
        title="Privacy Policy"
        subtitle="Learn how BATO Foundation collects, uses, and protects your personal information when you visit our website, contact us, or donate."
        crumb="Privacy Policy"
      />

      <section className="bg-[#f8f9fa] py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* Table of contents */}
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
                        {contactNumber}
                      </span>
                      Contact Us
                    </a>
                  </li>
                </ol>
              </div>
            </aside>

            {/* Policy */}
            <div className="max-w-3xl">
              <p className="mb-8 inline-flex items-center rounded-full bg-primary-dark/5 px-4 py-1.5 text-xs font-medium text-primary-dark/70">
                Last updated: {LAST_UPDATED}
              </p>

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
                    {s.after && <p>{s.after}</p>}
                  </div>
                </section>
              ))}

              {/* Contact */}
              <section id="contact" className="scroll-mt-28 pt-8">
                <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold text-primary-dark">
                  <span className="text-sm tabular-nums text-accent">
                    {contactNumber}
                  </span>
                  Contact Us
                </h2>
                <p className="mt-4 leading-relaxed text-gray-600">
                  If you have questions about this Privacy Policy or want to
                  exercise your rights, please contact BATO Foundation.
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
                    href="/terms-of-use"
                    className="font-medium text-primary-dark underline decoration-accent underline-offset-4"
                  >
                    Terms of Use
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
