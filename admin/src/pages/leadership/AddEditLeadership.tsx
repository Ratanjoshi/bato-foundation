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
  useCreateLeadershipMutation,
  useGetLeadershipByIdQuery,
  useUpdateLeadershipMutation,
} from "@/redux/services/api";

import { LEADERSHIP_LIST_ROUTE } from "@/routes/routeNames";

interface FormValues {
  name: string;
  role: string;
  image: string;
  portfolio: string;
  order: number;
  published: boolean;
}

const AddEditLeadership = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const { data: detail, isLoading: isLoadingDetail } =
    useGetLeadershipByIdQuery(id!, {
      skip: !isEdit,
    });

  const [createMember, { isLoading: isCreating }] =
    useCreateLeadershipMutation();
  const [updateMember, { isLoading: isUpdating }] =
    useUpdateLeadershipMutation();

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
      name: "",
      role: "",
      image: "",
      portfolio: "",
      order: 0,
      published: true,
    },
  });

  const {
    imageUrl,
    handleConfirmImage,
    isImageModelOpen,
    setIsImageModelOpen,
  } = useSingleImageHandler(setValue, getValues, "image");

  /* Load existing member */
  useEffect(() => {
    if (isEdit && detail?.data) {
      const d = detail.data;
      reset({
        name: d.name ?? "",
        role: d.role ?? "",
        image: d.image ?? "",
        portfolio: d.portfolio ?? "",
        order: d.order ?? 0,
        published: d.published ?? true,
      });
    }
  }, [detail, isEdit, reset]);

  /* Submit */
  const onSubmit = async (values: FormValues) => {
    try {
      const body = { ...values, order: Number(values.order || 0) };

      if (isEdit && id) {
        const res = await updateMember({ id, body }).unwrap();
        handleResponse({
          res,
          onSuccess: () => navigate(LEADERSHIP_LIST_ROUTE),
        });
      } else {
        const res = await createMember(body).unwrap();
        handleResponse({
          res,
          onSuccess: () => navigate(LEADERSHIP_LIST_ROUTE),
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
        {isEdit ? "Edit Leadership Member" : "Add Leadership Member"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            isRequired
            placeholder="e.g. Prashant Thapa"
            {...register("name", { required: "Name is required" })}
            error={errors.name}
          />

          <Input
            label="Role / Title"
            isRequired
            placeholder="e.g. Founder & Chairperson"
            {...register("role", { required: "Role is required" })}
            error={errors.role}
          />

          <Input
            label="Portfolio URL"
            placeholder="https://example.com"
            {...register("portfolio")}
            error={errors.portfolio}
          />

          <Input
            label="Order"
            type="number"
            placeholder="0"
            {...register("order", { valueAsNumber: true })}
            error={errors.order}
          />
        </div>

        {/* Image Upload (Matches your BatoProgram exactly) */}
        <div>
          <label className="input-label">Profile Photo</label>
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

        {/* Publish Toggle */}
        <Controller
          control={control}
          name="published"
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <span>Publish this member</span>
            </label>
          )}
        />

        {/* Buttons */}
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
            handleClick={() => navigate(LEADERSHIP_LIST_ROUTE)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditLeadership;
