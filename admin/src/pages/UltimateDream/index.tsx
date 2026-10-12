import PageTitle from "@/components/PageTitle";
import PageHeader from "@/components/PageHeader";
import ImageUploadField from "@/components/common/ImageUploadField";
import { ULTIMATE_DREAM_URL } from "@/constants/apiUrlConstants";
import {
  useGetApiQuery,
  useCreateApiMutation,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { checkAccess } from "@/utils/accessHelper";
import { useEffect, useRef, useState } from "react";
import { Loader2, Save, RotateCcw } from "lucide-react";

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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const uploadKey = useRef(0);

  useEffect(() => {
    if (!record) return;
    setForm({
      eyebrow: record.eyebrow ?? "",
      heading: record.heading ?? "",
      description: record.description ?? "",
      button_label: record.button_label ?? "",
      button_href: record.button_href ?? "",
      image_alt: record.image_alt ?? "",
      is_active: record.is_active ?? true,
      order: record.order ?? 0,
    });
    setPreview(resolveImage(record.image_url));
  }, [data]);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleReset = () => {
    if (!record) {
      setForm(defaults);
      setPreview(null);
      setFile(null);
      uploadKey.current += 1;
      return;
    }
    setForm({
      eyebrow: record.eyebrow,
      heading: record.heading,
      description: record.description,
      button_label: record.button_label,
      button_href: record.button_href,
      image_alt: record.image_alt,
      is_active: record.is_active,
      order: record.order,
    });
    setPreview(resolveImage(record.image_url));
    setFile(null);
    uploadKey.current += 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!record?.id && !file) {
      alert("Please upload an image before saving.");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (file) fd.append("image", file);

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
        onSuccess: () => {
          setFile(null);
          uploadKey.current += 1;
          refetch();
        },
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
      <PageHeader
        hasAddButton={false}
        handleReloadButton={refetch}
        hasSubText
        subText='Manage the "Our Ultimate Dream" hero section on the homepage.'
      />

      <div className="mx-auto mt-6 max-w-4xl">
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <Field label="Eyebrow Text" hint="Small label above heading">
                    <input
                      value={form.eyebrow}
                      onChange={(e) => set("eyebrow", e.target.value)}
                      className="input"
                      placeholder="Our Ultimate Dream"
                    />
                  </Field>
                </div>
                <Field label="Order" hint="Lower = first">
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => set("order", Number(e.target.value))}
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Heading" hint="Main headline">
                <textarea
                  value={form.heading}
                  onChange={(e) => set("heading", e.target.value)}
                  rows={2}
                  className="input"
                  placeholder="A Nepal where no child's future is decided by a missing road."
                />
              </Field>

              <Field label="Description" hint="Supporting paragraph">
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={3}
                  className="input"
                  placeholder="We dream of classrooms in every valley..."
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Button Label">
                  <input
                    value={form.button_label}
                    onChange={(e) => set("button_label", e.target.value)}
                    className="input"
                    placeholder="Help Build the Dream"
                  />
                </Field>
                <Field label="Button Link">
                  <input
                    value={form.button_href}
                    onChange={(e) => set("button_href", e.target.value)}
                    className="input"
                    placeholder="/donate"
                  />
                </Field>
              </div>

              <ImageUploadField
                key={uploadKey.current}
                label="Background Image"
                preview={preview}
                onChange={(f, url) => {
                  setFile(f);
                  setPreview(url);
                }}
              />

              <Field label="Image Alt Text" hint="Accessibility description">
                <input
                  value={form.image_alt}
                  onChange={(e) => set("image_alt", e.target.value)}
                  className="input"
                  placeholder="A student looking toward the horizon"
                />
              </Field>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => set("is_active", e.target.checked)}
                  className="h-5 w-5 rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Active on site
                  </p>
                  <p className="text-xs text-gray-500">
                    When disabled, this section won't appear on the homepage.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-primaryColor px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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
          </form>
        )}
      </div>
    </>
  );
}

/* ───── Helpers ───── */
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

function resolveImage(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const base = (
    import.meta.env.VITE_API_URL || "http://localhost:8080"
  ).replace(/\/api\/v1\/?$/, "");
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}
