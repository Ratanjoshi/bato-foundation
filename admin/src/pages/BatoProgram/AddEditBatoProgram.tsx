import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { handleError, handleResponse } from "@/utils/responseHandler";

import {
  useCreateBatoProgramMutation,
  useGetBatoProgramByIdQuery,
  useUpdateBatoProgramByIdMutation,
} from "@/redux/services/batoProgram";

import { BATO_PROGRAM_LIST_ROUTE } from "@/routes/routeNames";

interface FormValues {
  slug: string;
  title: string;
  category: string;
  status: "Ongoing" | "Upcoming" | "Completed";
  location: string;
  description: string;
  longDescription: string;
  image?: FileList;
  isPublished: boolean;
  order: number;
}

const AddEditBatoProgram = () => {
  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);

  const navigate = useNavigate();

  const [preview, setPreview] = useState<string>("");

  const { data: detail, isLoading: isLoadingDetail } =
    useGetBatoProgramByIdQuery(id!, {
      skip: !isEdit,
    });

  const [createProgram, { isLoading: isCreating }] =
    useCreateBatoProgramMutation();

  const [updateProgram, { isLoading: isUpdating }] =
    useUpdateBatoProgramByIdMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      slug: "",
      title: "",
      category: "",
      status: "Upcoming",
      location: "",
      description: "",
      longDescription: "",
      isPublished: false,
      order: 0,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Load existing program
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (isEdit && detail?.data) {
      const d = detail.data;

      reset({
        slug: d.slug ?? "",
        title: d.title ?? "",
        category: d.category ?? "",
        status: d.status ?? "Upcoming",
        location: d.location ?? "",
        description: d.description ?? "",
        longDescription: d.longDescription ?? "",
        isPublished: d.isPublished ?? false,
        order: d.order ?? 0,
      });

      if (d.image) {
        setPreview(d.image);
      }
    }
  }, [detail, isEdit, reset]);

  /*
  |--------------------------------------------------------------------------
  | Image Preview
  |--------------------------------------------------------------------------
  */

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select JPG, JPEG, PNG, WEBP or GIF image.");

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");

      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("category", values.category);
      formData.append("status", values.status);
      formData.append("location", values.location);
      formData.append("description", values.description);
      formData.append("longDescription", values.longDescription);

      formData.append("isPublished", String(values.isPublished));

      formData.append("order", String(Number(values.order || 0)));

      /*
      |--------------------------------------------------------------------------
      | Add Image
      |--------------------------------------------------------------------------
      */

      if (values.image && values.image.length > 0) {
        formData.append("image", values.image[0]);
      }

      /*
      |--------------------------------------------------------------------------
      | Create
      |--------------------------------------------------------------------------
      */

      if (isEdit && id) {
        const res = await updateProgram({
          id,
          body: formData,
        }).unwrap();

        handleResponse({
          res,
          onSuccess: () => navigate(BATO_PROGRAM_LIST_ROUTE),
        });
      } else {
        const res = await createProgram(formData).unwrap();

        handleResponse({
          res,
          onSuccess: () => navigate(BATO_PROGRAM_LIST_ROUTE),
        });
      }
    } catch (error) {
      handleError({ error });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (isEdit && isLoadingDetail) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit BATO Program" : "Add BATO Program"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        {/* ------------------------------------------------------------- */}
        {/* Basic Information */}
        {/* ------------------------------------------------------------- */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Title"
            isRequired
            placeholder="Program title"
            {...register("title", {
              required: "Title is required",
            })}
            error={errors.title}
          />

          <Input
            label="Slug"
            isRequired
            placeholder="e.g. clean-water-project"
            {...register("slug", {
              required: "Slug is required",
            })}
            error={errors.slug}
          />

          <Input
            label="Category"
            isRequired
            placeholder="e.g. Education, Health"
            {...register("category", {
              required: "Category is required",
            })}
            error={errors.category}
          />

          {/* Status */}

          <div className="input-container">
            <label className="input-label">
              Status <span className="text-red-500">*</span>
            </label>

            <select
              className="border rounded px-3 py-2 w-full"
              {...register("status", {
                required: "Status is required",
              })}
            >
              <option value="Upcoming">Upcoming</option>

              <option value="Ongoing">Ongoing</option>

              <option value="Completed">Completed</option>
            </select>

            {errors.status && (
              <span className="input-error">{errors.status.message}</span>
            )}
          </div>

          <Input
            label="Location"
            isRequired
            placeholder="e.g. Kathmandu, Nepal"
            {...register("location", {
              required: "Location is required",
            })}
            error={errors.location}
          />

          <Input
            label="Order"
            type="number"
            placeholder="0"
            {...register("order", {
              valueAsNumber: true,
            })}
            error={errors.order}
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Image Upload */}
        {/* ------------------------------------------------------------- */}

        <div>
          <label className="input-label">Program Image</label>

          <div className="border border-dashed border-gray-300 rounded-lg p-5">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              {...register("image")}
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                file:mr-4
                file:py-2
                file:px-4
                file:rounded-md
                file:border-0
                file:text-sm
                file:font-medium
                file:bg-gray-100
                file:text-gray-700
                hover:file:bg-gray-200"
            />

            <p className="text-xs text-gray-500 mt-2">
              JPG, JPEG, PNG, WEBP or GIF. Maximum size: 5MB.
            </p>

            {/* Preview */}

            {preview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Image Preview</p>

                <div className="relative w-full max-w-sm">
                  <img
                    src={preview}
                    alt="Program preview"
                    className="w-full h-52 object-cover rounded-lg border"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Description */}
        {/* ------------------------------------------------------------- */}

        <div>
          <label className="input-label">
            Description <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={3}
            className="border rounded px-3 py-2 w-full"
            placeholder="Short description"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <span className="input-error">{errors.description.message}</span>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Long Description */}
        {/* ------------------------------------------------------------- */}

        <div>
          <label className="input-label">
            Long Description <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={6}
            className="border rounded px-3 py-2 w-full"
            placeholder="Full details"
            {...register("longDescription", {
              required: "Long description is required",
            })}
          />

          {errors.longDescription && (
            <span className="input-error">
              {errors.longDescription.message}
            </span>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Publish */}
        {/* ------------------------------------------------------------- */}

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

              <span>Publish this program</span>
            </label>
          )}
        />

        {/* ------------------------------------------------------------- */}
        {/* Buttons */}
        {/* ------------------------------------------------------------- */}

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
            handleClick={() => navigate(BATO_PROGRAM_LIST_ROUTE)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditBatoProgram;
