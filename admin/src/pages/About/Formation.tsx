import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ImageIcon } from "lucide-react"; // Added icon to match About Preview style

import Button from "@/components/Button";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import RichTextEditor from "@/components/RichTextEditor";
import { useSingleImageHandler } from "@/hooks/useImageHandler";

import { handleError, handleResponse } from "@/utils/responseHandler";
import {
  useGetFormationQuery,
  useUpdateFormationMutation,
} from "@/redux/services/api";

interface FormValues {
  badgeLabel: string;
  headingLead: string;
  headingAccent: string;
  imageUrl: string;
  imageAlt: string;
  locationLabel: string;
  locationValue: string;
  introParagraph: string;
  secondaryParagraph: string;
  quoteText: string;
  noteIndex: string;
  noteLabel: string;
  noteTitle: string;
  noteParagraph1: string;
  noteParagraph2: string;
  noteParagraph3: string;
  noteFooter: string;
}

const FormationAdmin = () => {
  const navigate = useNavigate();

  const {
    data: response,
    isLoading: isLoadingDetail,
    refetch,
  } = useGetFormationQuery();
  const [updateFormation, { isLoading: isUpdating }] =
    useUpdateFormationMutation();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    watch, // ✅ Added watch to track image state
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      badgeLabel: "",
      headingLead: "",
      headingAccent: "",
      imageUrl: "",
      imageAlt: "",
      locationLabel: "",
      locationValue: "",
      introParagraph: "",
      secondaryParagraph: "",
      quoteText: "",
      noteIndex: "",
      noteLabel: "",
      noteTitle: "",
      noteParagraph1: "",
      noteParagraph2: "",
      noteParagraph3: "",
      noteFooter: "",
    },
  });

  // ✅ Use the exact same hook pattern as About Preview
  const { handleConfirmImage, isImageModelOpen, setIsImageModelOpen } =
    useSingleImageHandler<FormValues>(setValue, getValues, "imageUrl");

  // ✅ Track the image URL in real-time
  const imageUrl = watch("imageUrl");

  // Populate form when data loads
  useEffect(() => {
    if (response?.data) {
      const d = response.data;
      reset({
        badgeLabel: d.badgeLabel ?? "",
        headingLead: d.headingLead ?? "",
        headingAccent: d.headingAccent ?? "",
        imageUrl: d.imageUrl ?? "",
        imageAlt: d.imageAlt ?? "",
        locationLabel: d.locationLabel ?? "",
        locationValue: d.locationValue ?? "",
        introParagraph: d.introParagraph ?? "",
        secondaryParagraph: d.secondaryParagraph ?? "",
        quoteText: d.quoteText ?? "",
        noteIndex: d.noteIndex ?? "",
        noteLabel: d.noteLabel ?? "",
        noteTitle: d.noteTitle ?? "",
        noteParagraph1: d.noteParagraph1 ?? "",
        noteParagraph2: d.noteParagraph2 ?? "",
        noteParagraph3: d.noteParagraph3 ?? "",
        noteFooter: d.noteFooter ?? "",
      });
    }
  }, [response, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await updateFormation(values).unwrap();
      handleResponse({
        res,
        onSuccess: () => navigate("/admin/about/formation"),
      });
    } catch (error) {
      handleError({ error });
    }
  };

  if (isLoadingDetail) return <div className="p-6">Loading...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Manage Formation Section</h1>
        <Button
          type="button"
          onClick={() => refetch()}
          className="text-sm border px-4 py-2 rounded hover:bg-gray-50"
        >
          Reload Data
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-8"
      >
        {/* ================= HEADER / HERO ================= */}
        <div>
          <h2 className="text-lg font-medium border-b pb-2 mb-4">
            Header Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Badge Label"
              isRequired
              placeholder="e.g. How was BATO Foundation formed?"
              {...register("badgeLabel", { required: "Required" })}
              error={errors.badgeLabel}
            />
            <Input
              label="Heading Lead"
              isRequired
              placeholder="e.g. A road that began with a"
              {...register("headingLead", { required: "Required" })}
              error={errors.headingLead}
            />
            <Input
              label="Heading Accent (Gold Text)"
              isRequired
              placeholder="e.g. simple belief."
              {...register("headingAccent", { required: "Required" })}
              error={errors.headingAccent}
            />
          </div>
        </div>

        {/* ================= IMAGE SECTION (Matched to About Preview) ================= */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primaryColor/10 text-primaryColor">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Media & Location
              </h2>
              <p className="text-xs text-gray-500">
                Pick an image from the media library.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Main Arch Image <span className="text-red-500">*</span>
                  </label>
                  {imageUrl && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Selected
                    </span>
                  )}
                </div>

                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4 transition hover:border-primaryColor/40 hover:bg-gray-50">
                  <input type="hidden" {...register("imageUrl")} />
                  <MediaComponent
                    title={
                      <ImageInputUIComponent
                        type="large"
                        error=""
                        image={imageUrl || undefined}
                      />
                    }
                    isMultiSelect={false}
                    open={isImageModelOpen}
                    setOpen={setIsImageModelOpen}
                    handleConfirmImage={handleConfirmImage}
                  />
                </div>

                {errors.imageUrl && (
                  <span className="mt-1 block text-xs text-red-600">
                    {errors.imageUrl.message}
                  </span>
                )}
              </div>

              <Input
                label="Image Alt Text (SEO)"
                isRequired
                placeholder="e.g. Students collaborating in a lab"
                {...register("imageAlt", { required: "Required" })}
                error={errors.imageAlt}
              />
            </div>

            <div className="space-y-4">
              <Input
                label="Location Label"
                isRequired
                placeholder="e.g. Registered office"
                {...register("locationLabel", { required: "Required" })}
                error={errors.locationLabel}
              />
              <Input
                label="Location Value"
                isRequired
                placeholder="e.g. Lalitpur"
                {...register("locationValue", { required: "Required" })}
                error={errors.locationValue}
              />
            </div>
          </div>
        </div>

        {/* ================= PARAGRAPHS (Rich Text) ================= */}
        <div>
          <h2 className="text-lg font-medium border-b pb-2 mb-4">
            Main Content
          </h2>
          <div className="space-y-6">
            <Controller
              control={control}
              name="introParagraph"
              rules={{ required: "Intro paragraph is required" }}
              render={({ field }) => (
                <RichTextEditor
                  label="Intro Paragraph"
                  data={field.value}
                  onChange={field.onChange}
                  error={errors.introParagraph?.message}
                />
              )}
            />

            <Input
              label="Quote Text"
              isRequired
              placeholder="e.g. Access to technology should not depend..."
              {...register("quoteText", { required: "Required" })}
              error={errors.quoteText}
            />

            <Controller
              control={control}
              name="secondaryParagraph"
              rules={{ required: "Secondary paragraph is required" }}
              render={({ field }) => (
                <RichTextEditor
                  label="Secondary Paragraph"
                  data={field.value}
                  onChange={field.onChange}
                  error={errors.secondaryParagraph?.message}
                />
              )}
            />
          </div>
        </div>

        {/* ================= FOUNDING NOTE CARD ================= */}
        <div>
          <h2 className="text-lg font-medium border-b pb-2 mb-4">
            Founding Note Card
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Card Index (e.g. 01)"
              isRequired
              {...register("noteIndex", { required: "Required" })}
              error={errors.noteIndex}
            />
            <Input
              label="Card Label"
              isRequired
              {...register("noteLabel", { required: "Required" })}
              error={errors.noteLabel}
            />
            <Input
              label="Card Title"
              isRequired
              {...register("noteTitle", { required: "Required" })}
              error={errors.noteTitle}
              className="md:col-span-2"
            />
          </div>

          <div className="space-y-6">
            <Controller
              control={control}
              name="noteParagraph1"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <RichTextEditor
                  label="Note Paragraph 1"
                  data={field.value}
                  onChange={field.onChange}
                  error={errors.noteParagraph1?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="noteParagraph2"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <RichTextEditor
                  label="Note Paragraph 2"
                  data={field.value}
                  onChange={field.onChange}
                  error={errors.noteParagraph2?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="noteParagraph3"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <RichTextEditor
                  label="Note Paragraph 3"
                  data={field.value}
                  onChange={field.onChange}
                  error={errors.noteParagraph3?.message}
                />
              )}
            />

            <Input
              label="Footer Text"
              isRequired
              {...register("noteFooter", { required: "Required" })}
              error={errors.noteFooter}
            />
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex gap-3 pt-6 border-t">
          <Button
            type="submit"
            isLoading={isUpdating}
            className="bg-primaryColor text-white px-8 py-2 rounded"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormationAdmin;
