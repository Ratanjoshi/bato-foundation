import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Loader2,
  Save,
  RotateCcw,
  Type,
  AlignLeft,
  MousePointerClick,
  MessageSquare,
  ImageIcon,
  Eye,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import { handleError, handleResponse } from "@/utils/responseHandler";
import {
  useGetAboutPreviewQuery,
  useUpdateAboutPreviewMutation,
} from "@/redux/services/aboutPreview";

interface FormValues {
  badge: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  buttonLink: string;
  imageAlt: string;
  /** Replaced FileList with a URL string — image now comes from the media library. */
  imageUrl: string;
  floatingTitle: string;
  floatingText: string;
  isPublished: boolean;
}

const AboutPreviewPage = () => {
  /* ───── Media library modal state (same pattern as program section) ───── */
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const {
    data: detail,
    isLoading: isLoadingDetail,
    refetch,
  } = useGetAboutPreviewQuery("");
  const [updateAboutPreview, { isLoading: isUpdating }] =
    useUpdateAboutPreviewMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      badge: "",
      title: "",
      paragraph1: "",
      paragraph2: "",
      buttonText: "",
      buttonLink: "",
      imageAlt: "",
      imageUrl: "",
      floatingTitle: "",
      floatingText: "",
      isPublished: true,
    },
  });

  const imageUrl = watch("imageUrl");

  /* Load existing record */
  useEffect(() => {
    if (detail?.data) {
      const d = detail.data;
      reset({
        badge: d.badge ?? "",
        title: d.title ?? "",
        paragraph1: d.paragraph1 ?? "",
        paragraph2: d.paragraph2 ?? "",
        buttonText: d.buttonText ?? "",
        buttonLink: d.buttonLink ?? "",
        imageAlt: d.imageAlt ?? "",
        imageUrl: d.imageUrl ?? "",
        floatingTitle: d.floatingTitle ?? "",
        floatingText: d.floatingText ?? "",
        isPublished: d.isPublished ?? true,
      });
    }
  }, [detail, reset]);

  /* Confirm handler for the media library modal */
  const handleConfirmImage = (picked: any) => {
    const url =
      typeof picked === "string" ? picked : (picked?.url ?? picked?.path ?? "");
    setValue("imageUrl", url, { shouldDirty: true, shouldValidate: true });
    setIsImageModalOpen(false);
  };

  /* Reset form back to the last loaded state */
  const handleReset = () => {
    if (!detail?.data) {
      reset();
      return;
    }
    const d = detail.data;
    reset({
      badge: d.badge ?? "",
      title: d.title ?? "",
      paragraph1: d.paragraph1 ?? "",
      paragraph2: d.paragraph2 ?? "",
      buttonText: d.buttonText ?? "",
      buttonLink: d.buttonLink ?? "",
      imageAlt: d.imageAlt ?? "",
      imageUrl: d.imageUrl ?? "",
      floatingTitle: d.floatingTitle ?? "",
      floatingText: d.floatingText ?? "",
      isPublished: d.isPublished ?? true,
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();

      formData.append("badge", values.badge);
      formData.append("title", values.title);
      formData.append("paragraph1", values.paragraph1);
      formData.append("paragraph2", values.paragraph2);
      formData.append("buttonText", values.buttonText);
      formData.append("buttonLink", values.buttonLink);
      formData.append("imageAlt", values.imageAlt);
      formData.append("floatingTitle", values.floatingTitle);
      formData.append("floatingText", values.floatingText);
      formData.append("isPublished", String(values.isPublished));

      // Image is now a URL string from the media library, not a File.
      formData.append("imageUrl", values.imageUrl);

      const res = await updateAboutPreview(formData).unwrap();

      handleResponse({ res });
    } catch (error) {
      handleError({ error });
    }
  };

  if (isLoadingDetail) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-28">
        <Loader2 className="h-7 w-7 animate-spin text-primaryColor" />
        <p className="text-sm text-gray-500">Loading section…</p>
      </div>
    );
  }

  const published = watch("isPublished");

  return (
    <div className="mx-auto w-full max-w-5xl pb-10">
      {/* ───────── Page header ───────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-gray-900">About Preview</h1>
          <p className="mt-1 text-sm text-gray-500">
            This section appears on the BATO Foundation home page.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
          >
            <RotateCcw
              className={`h-4 w-4 ${isLoadingDetail ? "animate-spin" : ""}`}
            />
            Reload
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
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
                  About Preview Section
                </h2>
                <p className="mt-0.5 text-sm text-white/75">
                  Homepage block that introduces BATO Foundation.
                </p>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset backdrop-blur ${
                published
                  ? "bg-emerald-400/20 text-emerald-100 ring-emerald-200/40"
                  : "bg-white/10 text-white/80 ring-white/20"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  published ? "bg-emerald-300" : "bg-white/60"
                }`}
              />
              {published ? "Published" : "Unpublished"}
            </span>
          </div>
        </div>

        {/* ───────── Identity ───────── */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader
            icon={Type}
            title="Identity"
            subtitle="Badge and main headline of the section."
          />

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <Input
              label="Badge"
              isRequired
              placeholder="e.g. What is BATO Foundation?"
              {...register("badge", { required: "Badge is required" })}
              error={errors.badge}
            />

            <Input
              label="Title"
              isRequired
              placeholder="e.g. A road from talent to opportunity."
              {...register("title", { required: "Title is required" })}
              error={errors.title}
            />
          </div>
        </section>

        {/* ───────── Body text ───────── */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader
            icon={AlignLeft}
            title="Body Text"
            subtitle="Two short paragraphs shown under the heading."
          />

          <div className="space-y-5 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Paragraph 1 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                className="input resize-none leading-relaxed"
                placeholder="First paragraph..."
                {...register("paragraph1", {
                  required: "Paragraph 1 is required",
                })}
              />
              {errors.paragraph1 && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.paragraph1.message}
                </span>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Paragraph 2 <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                className="input resize-none leading-relaxed"
                placeholder="Second paragraph..."
                {...register("paragraph2", {
                  required: "Paragraph 2 is required",
                })}
              />
              {errors.paragraph2 && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.paragraph2.message}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ───────── Call to Action ───────── */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader
            icon={MousePointerClick}
            title="Call to Action"
            subtitle="Button shown inside the section."
          />

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <Input
              label="Button Text"
              isRequired
              placeholder="e.g. Learn More About BATO"
              {...register("buttonText", {
                required: "Button text is required",
              })}
              error={errors.buttonText}
            />

            <Input
              label="Button Link"
              isRequired
              placeholder="e.g. /about"
              {...register("buttonLink", {
                required: "Button link is required",
              })}
              error={errors.buttonLink}
            />
          </div>
        </section>

        {/* ───────── Floating card ───────── */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader
            icon={MessageSquare}
            title="Floating Card"
            subtitle="Small highlight card that floats over the image."
          />

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <Input
              label="Floating Title"
              isRequired
              placeholder="e.g. STEM"
              {...register("floatingTitle", {
                required: "Floating title is required",
              })}
              error={errors.floatingTitle}
            />

            <Input
              label="Floating Text"
              isRequired
              placeholder="e.g. Learning that reaches where roads don't."
              {...register("floatingText", {
                required: "Floating text is required",
              })}
              error={errors.floatingText}
            />
          </div>
        </section>

        {/* ───────── Media ───────── */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader
            icon={ImageIcon}
            title="Media"
            subtitle="Pick a section image from the media library."
          />

          <div className="space-y-6 p-6">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Section Image <span className="text-red-500">*</span>
                </label>
                {imageUrl && (
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
                      image={imageUrl || undefined}
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
                Pick a saved image from the media library. Used as the section
                image.
              </p>
            </div>

            <Input
              label="Image Alt Text"
              isRequired
              placeholder="e.g. Teacher helping students build robots"
              {...register("imageAlt", {
                required: "Image alt text is required",
              })}
              error={errors.imageAlt}
            />
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
            <Controller
              control={control}
              name="isPublished"
              render={({ field }) => (
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 transition hover:border-primaryColor/30 hover:shadow-sm">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg transition ${
                        field.value
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Eye className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Published
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        When disabled, this section won&apos;t appear on the
                        public website.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={field.value}
                    onClick={() => field.onChange(!field.value)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
                      field.value ? "bg-primaryColor" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        field.value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>
              )}
            />
          </div>
        </section>

        {/* ───────── Sticky actions ───────── */}
        <div className="sticky bottom-4 z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/90 px-5 py-4 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  isUpdating ? "bg-amber-400 animate-pulse" : "bg-emerald-500"
                }`}
              />
              <p className="text-xs text-gray-500">
                {isUpdating
                  ? "Saving your changes…"
                  : "Changes apply to the live homepage section."}
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

              <Button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center gap-2 rounded-lg bg-primaryColor px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

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

export default AboutPreviewPage;
