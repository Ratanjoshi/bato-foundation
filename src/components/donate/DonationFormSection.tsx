"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, QrCode } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const amounts = [1000, 2500, 5000, 10000];
type FormState = "idle" | "loading" | "success" | "error";

export function DonationFormSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(2500);
  const [customValue, setCustomValue] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const update = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setState("error");
      return;
    }
    setState("loading");
    // Frontend-only — connect backend/payment later.
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
  };

  return (
    <Section>
      <Container>
        <Reveal>
          <Badge>Make a Donation</Badge>
          <h2 className="mt-5 font-display text-3xl font-semibold text-primary md:text-4xl">
            Give in a minute.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
              {state === "success" ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <CheckCircle2 className="h-16 w-16 text-accent" />
                  <h3 className="mt-5 font-display text-2xl font-semibold text-primary">
                    Thank you, {form.name}!
                  </h3>
                  <p className="mt-2 max-w-sm text-primary/60">
                    Your intent to donate has been recorded. Please complete your
                    gift using the FonePay QR, and we&apos;ll be in touch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-primary">
                      Choose an amount (NPR)
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {amounts.map((a) => (
                        <button
                          type="button"
                          key={a}
                          onClick={() => setSelectedAmount(a)}
                          className={cn(
                            "rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-300",
                            selectedAmount === a
                              ? "border-accent bg-accent/10 text-primary shadow-sm"
                              : "border-border text-primary/50 hover:border-accent/50"
                          )}
                        >
                          {a.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedAmount("custom")}
                      className={cn(
                        "mt-3 w-full rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-300",
                        selectedAmount === "custom"
                          ? "border-accent bg-accent/10 text-primary"
                          : "border-border text-primary/50 hover:border-accent/50"
                      )}
                    >
                      Custom Amount
                    </button>
                    {selectedAmount === "custom" && (
                      <input
                        type="number"
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        placeholder="Enter amount in NPR"
                        className="mt-3 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                      />
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Full Name *"
                      value={form.name}
                      onChange={(v) => update("name", v)}
                    />
                    <FormField
                      label="Email *"
                      type="email"
                      value={form.email}
                      onChange={(v) => update("email", v)}
                    />
                  </div>
                  <FormField
                    label="Phone"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                  />
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-primary">
                      Message / Purpose
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                    />
                  </div>

                  {state === "error" && (
                    <p className="text-sm text-red-600">
                      Please fill in your name and email.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={state === "loading"}
                    className="w-full"
                  >
                    {state === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      "Donate Now"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>

          {/* FonePay QR */}
          <Reveal direction="left">
            <div className="flex h-full flex-col rounded-3xl bg-primary p-8 text-white md:p-10">
              <QrCode className="h-10 w-10 text-accent" />
              <h3 className="mt-5 font-display text-2xl font-semibold">
                Scan to Donate
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Use FonePay or any supported wallet to scan and give instantly.
              </p>
              <div className="mt-8 flex aspect-square w-full max-w-[240px] items-center justify-center self-center rounded-2xl bg-white p-4">
                <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-primary/15 text-center text-xs text-primary/35">
                  FonePay QR
                  <br />
                  Placeholder
                </div>
              </div>
              <div className="mt-8 space-y-2 text-sm text-white/60">
                <p>
                  <strong className="text-white">Account Name:</strong> [Add
                  account name]
                </p>
                <p>
                  <strong className="text-white">Account No:</strong> [Add
                  number]
                </p>
                <p>
                  <strong className="text-white">Bank:</strong> [Add bank]
                </p>
              </div>
              <p className="mt-6 text-xs italic text-white/35">
                * Payment details are placeholders — verify before publishing.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
