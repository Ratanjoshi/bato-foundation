import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import { useSingleImageHandler } from "@/hooks/useImageHandler";

import { handleError, handleResponse } from "@/utils/responseHandler";

import {
  useCreateTimelineMutation,
  useGetTimelineByIdQuery,
  useUpdateTimelineByIdMutation,
} from "@/redux/store/api";

import { TIMELINE_LIST_ROUTE } from "@/routes/routeNames";

interface FormValues {
  year: string;
  title: string;
  description: string;
  image: string;
  isPublished: boolean;
  order: number;
}

const AddEditTimeline = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: detail, isLoading: isLoadingDetail } = useGetTimelineByIdQuery(
    id!,
    { skip: !isEdit },
  );

  const [createTimeline, { isLoading: isCreating }] =
    useCreateTimelineMutation();
  const [updateTimeline, { isLoading: isUpdating }] =
    useUpdateTimelineByIdMutation();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      year: "",
      title: "",
      description: "",
      isPublished: true,
      order: 0,
      image: "",
    },
  });

  const {
    imageUrl,
    handleConfirmImage,
    isImageModelOpen,
    setIsImageModelOpen,
  } = useSingleImageHandler(setValue, getValues, "image");

  useEffect(() => {
    if (isEdit && detail?.data) {
      const d = detail.data;
      reset({
        year: d.year ?? "",
        title: d.title ?? "",
        description: d.description ?? "",
        image: d.image ?? "",
        isPublished: d.isPublished ?? true,
        order: d.order ?? 0,
      });
    }
  }, [detail, isEdit, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      const body = { ...values, order: Number(values.order || 0) };

      if (isEdit && id) {
        const res = await updateTimeline({ id, body }).unwrap();
        handleResponse({
          res,
          onSuccess: () => navigate(TIMELINE_LIST_ROUTE),
        });
      } else {
        const res = await createTimeline(body).unwrap();
        handleResponse({
          res,
          onSuccess: () => navigate(TIMELINE_LIST_ROUTE),
        });
      }
    } catch (error) {
      handleError({ error });
    }
  };

  if (isEdit && isLoadingDetail) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Timeline Milestone" : "Add Timeline Milestone"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Year / Phase"
            isRequired
            placeholder="e.g. 2083 B.S. or Phase 1"
            {...register("year", {
              required: "Year / Phase is required",
            })}
            error={errors.year}
          />

          <Input
            label="Title"
            isRequired
            placeholder="Milestone title"
            {...register("title", {
              required: "Title is required",
            })}
            error={errors.title}
          />

          <Input
            label="Order"
            type="number"
            placeholder="0"
            {...register("order", { valueAsNumber: true })}
            error={errors.order}
          />
        </div>

        <div>
          <label className="input-label">Milestone Image</label>
          <input type="hidden" {...register("image")} />
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

        <div>
          <label className="input-label">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            className="border rounded px-3 py-2 w-full"
            placeholder="Short description..."
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="input-error">{errors.description.message}</span>
          )}
        </div>

        <Controller
          control={control}
          name="isPublished"
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <span>Publish this milestone</span>
            </label>
          )}
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            isLoading={isCreating || isUpdating}
            className="bg-primaryColor text-white px-6 py-2 rounded"
          >
            {isEdit ? "Update" : "Create"}
          </Button>
          <Button
            type="button"
            className="border px-6 py-2 rounded"
            handleClick={() => navigate(TIMELINE_LIST_ROUTE)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditTimeline;
