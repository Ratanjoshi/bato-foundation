import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";

import Button from "@/components/Button";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import { ICON_OPTIONS } from "@/constants";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import {
  useCreateWhatWeDoMutation,
  useGetWhatWeDoByIdQuery,
  useUpdateWhatWeDoMutation,
} from "@/redux/services/whatWeDo";
import { handleError, handleResponse } from "@/utils/responseHandler";
import type { WhatWeDoFormValues } from "./types";

const defaultValues: WhatWeDoFormValues = {
  title: "",
  desc: "",
  icon: "GraduationCap",
  points: [],
  image: "",
  order: 0,
  isActive: true,
};

export default function WhatWeDoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { data: detail, isLoading } = useGetWhatWeDoByIdQuery(id!, {
    skip: !id,
  });
  const [createItem, { isLoading: isCreating }] = useCreateWhatWeDoMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateWhatWeDoMutation();
  const saving = isCreating || isUpdating;
  const [points, setPoints] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<WhatWeDoFormValues>({ defaultValues });
  const {
    imageUrl,
    handleConfirmImage,
    isImageModelOpen,
    setIsImageModelOpen,
  } = useSingleImageHandler<WhatWeDoFormValues>(setValue, getValues, "image");

  useEffect(() => {
    if (detail?.data) {
      reset({ ...defaultValues, ...detail.data });
      setPoints(detail.data.points ?? []);
    }
  }, [detail, reset]);

  const onSubmit = async (values: WhatWeDoFormValues) => {
    const body = {
      ...values,
      title: values.title.trim(),
      desc: values.desc.trim(),
      points: points.map((point) => point.trim()).filter(Boolean),
    };

    try {
      const res = id
        ? await updateItem({ id, body }).unwrap()
        : await createItem(body).unwrap();
      handleResponse({
        res,
        onSuccess: () => navigate("/admin/what-we-do/list"),
      });
    } catch (error) {
      handleError({ error });
    }
  };

  if (isEdit && isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => navigate("/admin/what-we-do/list")}
        className="mb-4 flex items-center gap-2 text-primaryColor"
      >
        <MdArrowBackIos size={16} /> Back to list
      </button>
      <h1 className="mb-4 text-xl font-semibold">
        {isEdit ? "Edit What We Do" : "Add What We Do"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded bg-white p-6 shadow"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Title"
            isRequired
            placeholder="e.g. STEM Education"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
            error={errors.title}
          />
          <label className="input-container">
            <span className="input-label">Icon</span>
            <select
              className="w-full rounded border bg-white px-3 py-2"
              {...register("icon")}
            >
              {ICON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="input-label">
            Description <span className="text-red-500">*</span>
          </span>
          <textarea
            rows={4}
            className="input w-full"
            placeholder="Short description..."
            {...register("desc", {
              required: "Description is required",
              minLength: { value: 5, message: "At least 5 characters" },
            })}
          />
          {errors.desc && (
            <span className="input-error">{errors.desc.message}</span>
          )}
        </label>

        <div>
          <p className="input-label">Bullet Points</p>
          <div className="space-y-2">
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  className="w-full rounded border px-3 py-2"
                  placeholder={`Point ${index + 1}`}
                  maxLength={120}
                  value={point}
                  onChange={(event) =>
                    setPoints((current) =>
                      current.map((value, pointIndex) =>
                        pointIndex === index ? event.target.value : value,
                      ),
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setPoints((current) =>
                      current.filter((_, pointIndex) => pointIndex !== index),
                    )
                  }
                  className="p-2 text-red-500"
                  aria-label={`Remove point ${index + 1}`}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            {points.length < 10 && (
              <button
                type="button"
                onClick={() => setPoints((current) => [...current, ""])}
                className="mt-1 flex items-center gap-2 text-primaryColor"
              >
                <FaPlus size={14} /> Add point
              </button>
            )}
          </div>
        </div>

        <div>
          <p className="input-label">Image</p>
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

        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
              />
              <span>Active (visible on public site)</span>
            </label>
          )}
        />
        <Input
          label="Display order"
          type="number"
          {...register("order", { valueAsNumber: true, min: 0 })}
          error={errors.order}
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            isLoading={saving}
            disabled={saving}
            className="rounded bg-primaryColor px-6 py-2 text-white"
          >
            {isEdit ? "Update" : "Create"}
          </Button>
          <Button
            type="button"
            className="rounded border px-6 py-2"
            handleClick={() => navigate("/admin/what-we-do/list")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
