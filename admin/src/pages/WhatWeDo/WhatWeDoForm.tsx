// admin/src/pages/WhatWeDo/WhatWeDoForm.tsx
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";

import Input from "@/components/Input";
import Button from "@/components/Button";
import MediaComponent from "@/components/MediaComponent";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import { useSingleImageHandler } from "@/hooks/useImageHandler";

import { handleError, handleResponse } from "@/utils/responseHandler";
import { ICON_OPTIONS } from "@/constants";

import {
  useCreateWhatWeDoMutation,
  useGetWhatWeDoByIdQuery,
  useUpdateWhatWeDoMutation,
} from "@/redux/services/whatWeDo";

interface FormValues {
  title: string;
  desc: string;
  icon: string;
  isActive: boolean;
  image: string; // 👈 MUST be a string path
}

export default function WhatWeDoForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: detail, isLoading: isLoadingDetail } = useGetWhatWeDoByIdQuery(
    id!,
    { skip: !isEdit },
  );

  const [createItem, { isLoading: isCreating }] = useCreateWhatWeDoMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateWhatWeDoMutation();

  const [points, setPoints] = useState<string[]>([""]);

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
      title: "",
      desc: "",
      icon: "GraduationCap",
      isActive: true,
      image: "",
    },
  });

  /* ---------------- Image handler (SAME as BatoProgram) ---------------- */
  const {
    imageUrl,
    handleConfirmImage,
    isImageModelOpen,
    setIsImageModelOpen,
  } = useSingleImageHandler(setValue, getValues, "image");

  /* ---------------- Load existing for edit ---------------- */
  useEffect(() => {
    if (isEdit && detail?.item) {
      const it = detail.item;
      reset({
        title: it.title ?? "",
        desc: it.desc ?? "",
        icon: it.icon ?? "GraduationCap",
        isActive: it.isActive ?? true,
        image: it.image ?? "",
      });
      setPoints(it.points?.length ? it.points : [""]);
    }
  }, [detail, isEdit, reset]);

  /* ---------------- Points helpers ---------------- */
  const addPoint = () => {
    if (points.length >= 10) return;
    setPoints((p) => [...p, ""]);
  };
  const removePoint = (idx: number) => {
    if (points.length === 1) return;
    setPoints((p) => p.filter((_, i) => i !== idx));
  };
  const updatePoint = (idx: number, value: string) =>
    setPoints((p) => p.map((v, i) => (i === idx ? value : v)));

  /* ---------------- Submit ---------------- */
  const onSubmit = async (values: FormValues) => {
    try {
      const cleanedPoints = points.map((p) => p.trim()).filter(Boolean);

      // Coerce image to a string (defensive — always a string)
      const safeImage =
        typeof values.image === "string" ? values.image : imageUrl || "";

      const body = {
        title: values.title.trim(),
        desc: values.desc.trim(),
        icon: values.icon,
        isActive: Boolean(values.isActive),
        image: safeImage,
        points: cleanedPoints,
      };

      if (isEdit && id) {
        const res = await updateItem({ id, body }).unwrap();
        handleResponse({
          res,
          onSuccess: () => navigate("/admin/what-we-do/list"),
        });
      } else {
        const res = await createItem(body).unwrap();
        handleResponse({
          res,
          onSuccess: () => navigate("/admin/what-we-do/list"),
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
      <button
        type="button"
        onClick={() => navigate("/admin/what-we-do/list")}
        className="flex items-center gap-2 text-[#0190dd] mb-4"
      >
        <MdArrowBackIos size={16} /> Back to list
      </button>

      <h1 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit What We Do" : "Add What We Do"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
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

          {/* Icon */}
          <div className="input-container">
            <label className="input-label">
              Icon <span className="text-red-500">*</span>
            </label>
            <select
              className="border rounded px-3 py-2 w-full bg-white"
              {...register("icon")}
            >
              {ICON_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="input-label">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            className="border rounded px-3 py-2 w-full"
            placeholder="Short description..."
            {...register("desc", {
              required: "Description is required",
              minLength: { value: 5, message: "At least 5 characters" },
            })}
          />
          {errors.desc && (
            <span className="input-error">{errors.desc.message}</span>
          )}
        </div>

        {/* Points */}
        <div>
          <label className="input-label">Bullet Points</label>
          <div className="space-y-2">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={pt}
                  onChange={(e) => updatePoint(idx, e.target.value)}
                  placeholder={`Point ${idx + 1}`}
                  className="border rounded px-3 py-2 w-full"
                  maxLength={120}
                />
                <button
                  type="button"
                  onClick={() => removePoint(idx)}
                  disabled={points.length === 1}
                  className="text-red-500 p-2 disabled:opacity-40"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPoint}
              disabled={points.length >= 10}
              className="flex items-center gap-2 text-[#0190dd] mt-1 disabled:opacity-40"
            >
              <FaPlus size={14} /> Add point {points.length >= 10 && "(max 10)"}
            </button>
          </div>
        </div>

        {/* Image — matches BatoProgram exactly */}
        <div>
          <label className="input-label">Image</label>
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

        {/* Active */}
        <Controller
          control={control}
          name="isActive"
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <span>Active (visible on public site)</span>
            </label>
          )}
        />

        {/* Submit */}
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
            handleClick={() => navigate("/admin/what-we-do/list")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
