import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BlogFormType, BlogSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { BLOG_CATEGORY_URL, BLOG_URL } from "@/constants/apiUrlConstants";
import { useEffect, useMemo } from "react";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { BLOG_LIST_ROUTE } from "@/routes/routeNames";
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

export default function AddEditBlog() {
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
  } = useForm<BlogFormType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      blogCategoryId: "",
    },
  });

  const {
    imageUrl,
    handleConfirmImage,
    isImageModelOpen,
    setIsImageModelOpen,
  } = useSingleImageHandler(setValue, getValues, "image");

  const [createBlog, { isLoading: creatingBlog }] = useCreateApiMutation();
  const [updateBlog, { isLoading: updatingBlog }] = useUpdateApiMutation();
  const {
    data: blogData,
    isSuccess: success,
    isLoading: loading,
  } = useGetApiQuery(`${BLOG_URL}${id}`, {
    skip: !isEditMode,
  });
  const { data: blogCategoryData } = useGetApiQuery(`${BLOG_CATEGORY_URL}list`);

  useEffect(() => {
    if (isEditMode && blogData && blogData?.data) {
      const changedMetaKeywords = changeTagType(blogData?.data?.meta_keywords);
      reset({ ...blogData?.data, meta_keywords: changedMetaKeywords });
    }
  }, [blogData]);

  const blogCategoryOptions = useMemo(() => {
    if (!blogCategoryData?.data) return [];
    return blogCategoryData?.data?.data.map(
      (item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name,
      }),
    );
  }, [blogCategoryData]);

  const onSubmit = async (data: BlogFormType) => {
    const body = { ...data };
    try {
      const response = isEditMode
        ? await updateBlog({
            url: `${BLOG_URL}${blogData?.data?.id}`,
            body,
          }).unwrap()
        : await createBlog({
            url: `${BLOG_URL}`,
            body,
          }).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {
          navigate(BLOG_LIST_ROUTE);
        },
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  return (
    <>
      <PageTitle title={id ? "Edit Blog" : "Add Blog"} isBack />
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
        <Controller
          name="blogCategoryId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Blog Category"
              options={blogCategoryOptions}
              className="w-full md:w-1/2"
            />
          )}
        />
        <Input
          label="Author"
          {...register("author")}
          className="w-full md:w-1/2"
          error={errors?.author?.message}
        />
        <TextArea
          label="Summary"
          {...register("summary")}
          className="w-full md:w-1/2"
          error={errors?.summary?.message}
        />
        {(!id || success) && (
          <RichTextEditor
            data={watch("description")}
            onChange={(value) => setValue("description", value)} // Update value
            error={errors.description?.message}
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
        <div className="relative flex flex-col items-start w-[20rem] ">
          <label className="input-label">
            Main Image <span className="text-red-500">*</span>
          </label>

          <MediaComponent
            title={
              <ImageInputUIComponent type="large" error="" image={imageUrl} />
            }
            isMultiSelect={false}
            open={isImageModelOpen}
            setOpen={setIsImageModelOpen}
            handleConfirmImage={handleConfirmImage}
          />
        </div>

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
