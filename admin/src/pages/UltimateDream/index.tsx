import PageTitle from "@/components/PageTitle";
import MediaComponent from "@/components/MediaComponent";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import { ULTIMATE_DREAM_URL } from "@/constants/apiUrlConstants";
import {
  useGetApiQuery,
  useCreateApiMutation,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { checkAccess } from "@/utils/accessHelper";
import { useEffect, useState } from "react";
import {
  Loader2,
  Save,
  RotateCcw,
  Type,
  MousePointerClick,
  ImageIcon,
  Eye,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface UltimateDreamRecord {
  id: number;
  eyebrow: string;
  heading: string;
  description: string;
  button_label: string;
  button_href: string;
  image_url: string;
  image_alt: string;
  is_active: boolean;
  order: number;
}

const defaults = {
  eyebrow: "Our Ultimate Dream",
  heading: "",
  description: "",
  button_label: "Help Build the Dream",
  button_href: "/donate",
  image_url: "",
  image_alt: "",
  is_active: true,
  order: 0,
};

export default function UltimateDream() {
  const accessList = checkAccess("Ultimate Dream");

  const { data, isLoading, refetch } = useGetApiQuery(
    `${ULTIMATE_DREAM_URL}admin`,
  );
  const [createApi] = useCreateApiMutation();
  const [updateApi] = useUpdateApiMutation();

  const record: UltimateDreamRecord | null = data?.data ?? null;

  const [form, setForm] = useState(defaults);
  const [saving, setSaving] = useState(false);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    if (!record) return;
    setForm({
      eyebrow: record.eyebrow ?? "",
      heading: record.heading ?? "",
      description: record.description ?? "",
      button_label: record.button_label ?? "",
      button_href: record.button_href ?? "",
      image_url: record.image_url ?? "",
      image_alt: record.image_alt ?? "",
      is_active: record.is_active ?? true,
      order: record.order ?? 0,
    });
  }, [data]);

  const handleConfirmImage = (picked: any) => {
    const url =
      typeof picked === "string" ? picked : (picked?.url ?? picked?.path ?? "");
    set("image_url", url);
    setIsImageModalOpen(false);
  };

  const handleReset = () => {
    if (!record) {
      setForm(defaults);
      return;
    }
    setForm({
      eyebrow: record.eyebrow,
      heading: record.heading,
      description: record.description,
      button_label: record.button_label,
      button_href: record.button_href,
      image_url: record.image_url,
      image_alt: record.image_alt,
      is_active: record.is_active,
      order: record.order,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!record?.id && !form.image_url) {
      alert("Please choose an image before saving.");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));

    setSaving(true);
    try {
      const res = record?.id
        ? await updateApi({
            url: `${ULTIMATE_DREAM_URL}${record.id}`,
            body: fd,
          }).unwrap()
        : await createApi({
            url: ULTIMATE_DREAM_URL,
            body: fd,
          }).unwrap();

      handleResponse({
        res,
        onSuccess: () => refetch(),
      });
    } catch (error) {
      handleError({ error });
    } finally {
      setSaving(false);
    }
  };

  if (!accessList.includes("view") && !accessList.includes("edit")) {
    return <p>You don't have permission to view this section.</p>;
  }

  return (
    <>
      <PageTitle title="Ultimate Dream" />

      <div className="mx-auto mt-2 max-w-5xl pb-10">
        {/* ───────── Page header ───────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-gray-900">
              Ultimate Dream
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage the &quot;Our Ultimate Dream&quot; hero section on the
              homepage.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
            >
              <RotateCcw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Reload
            </button>
          </div>
        </div>

        {/* ───────── Form body ───────── */}
        {isLoading ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 py-28">
            <Loader2 className="h-7 w-7 animate-spin text-primaryColor" />
            <p className="text-sm text-gray-500">Loading section…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* ───────── Hero banner ───────── */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-[#123a6b] via-[#1b4a86] to-[#2a63a8] p-6 text-white shadow-sm">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold leading-tight">
                      Ultimate Dream Section
                    </h2>
                    <p className="mt-0.5 text-sm text-white/75">
                      {record?.id
                        ? `Editing record #${record.id}`
                        : "Create the hero block shown on the homepage."}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset backdrop-blur ${
                    form.is_active
                      ? "bg-emerald-400/20 text-emerald-100 ring-emerald-200/40"
                      : "bg-white/10 text-white/80 ring-white/20"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      form.is_active ? "bg-emerald-300" : "bg-white/60"
                    }`}
                  />
                  {form.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* ───────── Content ───────── */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
              <CardHeader
                icon={Type}
                title="Content"
                subtitle="Eyebrow, headline, and supporting paragraph."
              />

              <div className="space-y-5 p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <Field
                      label="Eyebrow Text"
                      hint="Small label shown above the heading"
                    >
                      <input
                        value={form.eyebrow}
                        onChange={(e) => set("eyebrow", e.target.value)}
                        className="input"
                        placeholder="Our Ultimate Dream"
                      />
                    </Field>
                  </div>
                  <Field label="Order" hint="Lower numbers appear first">
                    <input
                      type="number"
                      value={form.order}
                      onChange={(e) => set("order", Number(e.target.value))}
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="Heading" hint="Main headline of the section">
                  <textarea
                    value={form.heading}
                    onChange={(e) => set("heading", e.target.value)}
                    rows={2}
                    className="input resize-none leading-relaxed"
                    placeholder="A Nepal where no child's future is decided by a missing road."
                  />
                </Field>

                <Field
                  label="Description"
                  hint="Short supporting paragraph under the heading"
                >
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={3}
                    className="input resize-none leading-relaxed"
                    placeholder="We dream of classrooms in every valley..."
                  />
                </Field>
              </div>
            </section>

            {/* ───────── Call to Action ───────── */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
              <CardHeader
                icon={MousePointerClick}
                title="Call to Action"
                subtitle="The button displayed inside the section."
              />

              <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                <Field label="Button Label">
                  <input
                    value={form.button_label}
                    onChange={(e) => set("button_label", e.target.value)}
                    className="input"
                    placeholder="Help Build the Dream"
                  />
                </Field>
                <Field label="Button Link" hint="Internal path or full URL">
                  <input
                    value={form.button_href}
                    onChange={(e) => set("button_href", e.target.value)}
                    className="input"
                    placeholder="/donate"
                  />
                </Field>
              </div>
            </section>

            {/* ───────── Media ───────── */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
              <CardHeader
                icon={ImageIcon}
                title="Media"
                subtitle="Pick a background image from the media library."
              />

              <div className="space-y-6 p-6">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Background Image <span className="text-red-500">*</span>
                    </label>
                    {form.image_url && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Selected
                      </span>
                    )}
                  </div>

                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4 transition hover:border-primaryColor/40 hover:bg-gray-50">
                    <MediaComponent
                      title={
                        <ImageInputUIComponent
                          type="large"
                          error=""
                          image={form.image_url || undefined}
                        />
                      }
                      isMultiSelect={false}
                      open={isImageModalOpen}
                      setOpen={setIsImageModalOpen}
                      handleConfirmImage={handleConfirmImage}
                    />
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <ImageIcon className="h-3.5 w-3.5" />
                    Pick a saved image from the media library. Used as the
                    section background.
                  </p>
                </div>

                <Field
                  label="Image Alt Text"
                  hint="Describe the image for screen readers"
                >
                  <input
                    value={form.image_alt}
                    onChange={(e) => set("image_alt", e.target.value)}
                    className="input"
                    placeholder="A student looking toward the horizon"
                  />
                </Field>
              </div>
            </section>

            {/* ───────── Visibility ───────── */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
              <CardHeader
                icon={Eye}
                title="Visibility"
                subtitle="Control whether this section appears on the homepage."
              />

              <div className="p-6">
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 transition hover:border-primaryColor/30 hover:shadow-sm">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg transition ${
                        form.is_active
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Eye className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Active on site
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        When disabled, this section won't appear on the
                        homepage.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.is_active}
                    onClick={() => set("is_active", !form.is_active)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
                      form.is_active ? "bg-primaryColor" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        form.is_active ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>
              </div>
            </section>

            {/* ───────── Sticky actions ───────── */}
            <div className="sticky bottom-4 z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/90 px-5 py-4 shadow-lg ring-1 ring-black/5 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      saving ? "bg-amber-400 animate-pulse" : "bg-emerald-500"
                    }`}
                  />
                  <p className="text-xs text-gray-500">
                    {saving
                      ? "Saving your changes…"
                      : record?.id
                        ? "Changes apply to the live homepage section."
                        : "Choose an image to create the section."}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                  >
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-primaryColor px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {saving
                      ? "Saving..."
                      : record?.id
                        ? "Save Changes"
                        : "Create Section"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

/* ───── Helpers ───── */

function CardHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primaryColor/10 text-primaryColor ring-1 ring-inset ring-primaryColor/15">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
