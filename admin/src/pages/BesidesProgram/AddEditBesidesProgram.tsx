import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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
    setValue,
    watch,
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

  const selectedIcon = watch("icon");

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

  if (isEdit && isLoadingDetail) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Besides Program" : "Add Besides Program"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        {/* Icon Picker */}
        <div>
          <label className="input-label mb-2 block">
            Icon <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="icon"
            rules={{ required: "Icon is required" }}
            render={({ field }) => (
              <IconPicker value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.icon && (
            <span className="input-error">{errors.icon.message}</span>
          )}
        </div>

        {/* Title + Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <Input
            label="Display Order"
            type="number"
            placeholder="0"
            {...register("order", { valueAsNumber: true })}
            error={errors.order}
          />
        </div>

        {/* Description */}
        <div>
          <label className="input-label">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            maxLength={300}
            className="border rounded px-3 py-2 w-full"
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
            <span className="input-error">{errors.description.message}</span>
          )}
        </div>

        {/* Publish */}
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
              <span>Publish this item</span>
            </label>
          )}
        />

        {/* Actions */}
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
            handleClick={() => navigate(BESIDES_PROGRAM_LIST_ROUTE)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditBesidesProgram;
