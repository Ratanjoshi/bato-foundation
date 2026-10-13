import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Loader2,
  Save,
  X,
  Sparkles,
  ListOrdered,
  Eye,
  type LucideIcon,
} from "lucide-react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { handleError, handleResponse } from "@/utils/responseHandler";

import {
  useCreateBesidesProgramMutation,
  useGetBesidesProgramByIdQuery,
  useUpdateBesidesProgramByIdMutation,
} from "@/redux/services/besidesProgram";

import { BESIDES_PROGRAM_LIST_ROUTE } from "@/routes/routeNames";
import IconPicker from "./IconPicker";

interface FormValues {
  icon: string;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
}

const AddEditBesidesProgram = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: detail, isLoading: isLoadingDetail } =
    useGetBesidesProgramByIdQuery(id!, { skip: !isEdit });

  const [createItem, { isLoading: isCreating }] =
    useCreateBesidesProgramMutation();
  const [updateItem, { isLoading: isUpdating }] =
    useUpdateBesidesProgramByIdMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      icon: "Sparkles",
      title: "",
      description: "",
      order: 0,
      isPublished: true,
    },
  });

  /* Load existing item */
  useEffect(() => {
    if (isEdit && detail?.data) {
      const d = detail.data;
      reset({
        icon: d.icon ?? "Sparkles",
        title: d.title ?? "",
        description: d.description ?? "",
        order: d.order ?? 0,
        isPublished: d.isPublished ?? true,
      });
    }
  }, [detail, isEdit, reset]);

  /* Submit */
  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        icon: values.icon,
        title: values.title.trim(),
        description: values.description.trim(),
        order: Number(values.order) || 0,
        isPublished: Boolean(values.isPublished),
      };

      if (isEdit && id) {
        const res = await updateItem({ id, body: payload }).unwrap();
        handleResponse({
          res,
          onSuccess: () => navigate(BESIDES_PROGRAM_LIST_ROUTE),
        });
      } else {
        const res = await createItem(payload).unwrap();
        handleResponse({
          res,
          onSuccess: () => navigate(BESIDES_PROGRAM_LIST_ROUTE),
        });
      }
    } catch (error) {
      handleError({ error });
    }
  };

  const saving = isCreating || isUpdating;

  if (isEdit && isLoadingDetail) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-28">
        <Loader2 className="h-7 w-7 animate-spin text-primaryColor" />
        <p className="text-sm text-gray-500">Loading item…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl pb-10">
      {/* ───────── Page header ───────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-gray-900">
            {isEdit ? "Edit Besides Program" : "Add Besides Program"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isEdit
              ? "Update the icon, title, and details for this item."
              : "Create a new item to display in the Besides Program section."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        {/* ───────── Identity ───────── */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader
            icon={Sparkles}
            title="Identity"
            subtitle="Choose an icon and give this item a title."
          />

          <div className="space-y-5 p-6">
            {/* Icon Picker */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Icon <span className="text-red-500">*</span>
              </label>

              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4 transition hover:border-primaryColor/40 hover:bg-gray-50">
                <Controller
                  control={control}
                  name="icon"
                  rules={{ required: "Icon is required" }}
                  render={({ field }) => (
                    <IconPicker value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>

              {errors.icon && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.icon.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="md:col-span-2">
                <Input
                  label="Title"
                  isRequired
                  placeholder="e.g. Research"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: {
                      value: 100,
                      message: "Max 100 characters",
                    },
                  })}
                  error={errors.title}
                />
              </div>

              <Input
                label="Display Order"
                type="number"
                placeholder="0"
                {...register("order", { valueAsNumber: true })}
                error={errors.order}
              />
            </div>
          </div>
        </section>

        {/* ───────── Content ───────── */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader
            icon={ListOrdered}
            title="Content"
            subtitle="A short description shown under the title."
          />

          <div className="space-y-5 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                rows={3}
                maxLength={300}
                className="input resize-none leading-relaxed"
                placeholder="e.g. Studying how technology access changes real outcomes."
                {...register("description", {
                  required: "Description is required",
                  maxLength: {
                    value: 300,
                    message: "Max 300 characters",
                  },
                })}
              />

              {errors.description && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ───────── Visibility ───────── */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
          <CardHeader
            icon={Eye}
            title="Visibility"
            subtitle="Control whether this item appears on the public site."
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
                        Publish this item
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        When disabled, this item won&apos;t appear on the public
                        site.
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
                  saving ? "bg-amber-400 animate-pulse" : "bg-emerald-500"
                }`}
              />
              <p className="text-xs text-gray-500">
                {saving
                  ? "Saving your changes…"
                  : isEdit
                    ? "Changes apply to the live site."
                    : "Fill in the fields to create a new item."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                handleClick={() => navigate(BESIDES_PROGRAM_LIST_ROUTE)}
              >
                <X className="h-4 w-4" /> Cancel
              </Button>

              <Button
                type="submit"
                isLoading={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-primaryColor px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {!saving && <Save className="h-4 w-4" />}
                {isEdit ? "Update" : "Create"}
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

export default AddEditBesidesProgram;
