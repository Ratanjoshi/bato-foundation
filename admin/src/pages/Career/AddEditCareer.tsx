import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CareerFormType, CareerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { CAREER_CATEGORY_URL, CAREER_URL } from "@/constants/apiUrlConstants";
import { useEffect, useMemo } from "react";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { CAREER_LIST_ROUTE } from "@/routes/routeNames";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import TextArea from "@/components/TextArea";
import MediaComponent from "@/components/MediaComponent";
import Select from "@/components/Select";
import RichTextEditor from "@/components/RichTextEditor";
import MultiInput from "@/components/MultipleInput";
import { changeTagType } from "@/utils/generalHelper";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";

export default function AddEditCareer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormType>({
    resolver: zodResolver(CareerSchema),
    defaultValues: {
      categoryId: "",
      meta_description: null,
      meta_keywords: null,
    },
  });

  const [createBlog, { isLoading: creatingCareer }] = useCreateApiMutation();
  const [updateBlog, { isLoading: updatingCareer }] = useUpdateApiMutation();
  const {
    data: careerData,
    isSuccess: success,
    isLoading: loading,
  } = useGetApiQuery(`${CAREER_URL}admin-get/${id}`, {
    skip: !isEditMode,
  });
  const { data: careerCategoryData } = useGetApiQuery(
    `${CAREER_CATEGORY_URL}list`,
  );

  useEffect(() => {
    if (isEditMode && careerData && careerData?.data) {
      const changedMetaKeywords = changeTagType(
        careerData?.data?.meta_keywords,
      );
      reset({ ...careerData?.data, meta_keywords: changedMetaKeywords });
    }
  }, [careerData]);

  const careerCategoryOptions = useMemo(() => {
    if (!careerCategoryData?.data) return [];
    return careerCategoryData?.data?.data.map(
      (item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name,
      }),
    );
  }, [careerCategoryData]);

  const onSubmit = async (data: CareerFormType) => {
    const body = { ...data };
    try {
      const response = isEditMode
        ? await updateBlog({
            url: `${CAREER_URL}${careerData?.data?.id}`,
            body,
          }).unwrap()
        : await createBlog({
            url: `${CAREER_URL}`,
            body,
          }).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {
          navigate(CAREER_LIST_ROUTE);
        },
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  return (
    <>
      <PageTitle title={id ? "Edit Career" : "Add Career"} isBack />
      <form
        className="form-container space-y-[1rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Title"
          {...register("title")}
          className="w-full md:w-1/2"
          error={errors?.title?.message}
        />
        <Input
          label="Location"
          {...register("location")}
          className="w-full md:w-1/2"
          error={errors?.location?.message}
        />
        <Input
          label="No.of Openings"
          type="number"
          {...register("no_of_opening", { valueAsNumber: true })}
          className="w-full md:w-1/2"
          error={errors?.no_of_opening?.message}
        />
        <Input
          label="Job Location"
          {...register("type")}
          className="w-full md:w-1/2"
          error={errors?.type?.message}
        />
        <Input
          type="checkbox"
          label="Is Published"
          {...register("is_published")}
          className="w-fit"
          error={errors?.is_published?.message}
        />
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Career Category"
              options={careerCategoryOptions}
              className="w-full md:w-1/2"
            />
          )}
        />
        {(!id || success) && (
          <RichTextEditor
            label="Job Description"
            data={watch("description")}
            onChange={(value) => setValue("description", value)} // Update value
            error={errors.description?.message}
            className="w-1/4"
          />
        )}
        {(!id || success) && (
          <RichTextEditor
            label="Job Specification"
            data={watch("specification")}
            onChange={(value) => setValue("specification", value)} // Update value
            error={errors.specification?.message}
            className="w-1/4"
          />
        )}
        <TextArea
          label="Meta Description"
          {...register("meta_description")}
          className="w-full md:w-1/2"
          error={errors?.meta_description?.message}
        />
        <MultiInput
          className="flex flex-col items-start w-1/2"
          name="meta_keywords"
          label="Meta Keywords"
          control={control}
          placeholder="Press Enter"
          error={errors.meta_keywords?.message}
        />

        <div className="flex justify-start">
          <Button type="submit" className="submit-button w-[5rem]">
            {" "}
            <div className="flex justify-center items-center gap-[0.5rem] text-white ">
              Submit
            </div>
          </Button>
        </div>
      </form>
    </>
  );
}
