"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const update = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setState("error");
      return;
    }
    setState("submitting");
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
  };

  return (
    <Reveal direction="left">
      <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
        {state === "success" ? (
          <div className="flex flex-col items-center py-16 text-center">
            <CheckCircle2 className="h-16 w-16 text-accent" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-primary">
              Message sent!
            </h3>
            <p className="mt-2 max-w-sm text-primary/60">
              Thank you, {form.name}. We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full Name *"
                value={form.name}
                onChange={(v) => update("name", v)}
              />
              <Field
                label="Email *"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
              />
              <Field
                label="Subject"
                value={form.subject}
                onChange={(v) => update("subject", v)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-primary">
                Message *
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
            </div>
            {state === "error" && (
              <p className="text-sm text-red-600">
                Please complete the required fields.
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={state === "submitting"}
              className="w-full"
            >
              {state === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        )}
      </div>
    </Reveal>
  );
}

function Field({
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
