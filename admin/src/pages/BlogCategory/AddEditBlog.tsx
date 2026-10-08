import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BlogCategoryFormType, BlogCategorySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { BLOG_CATEGORY_URL, BLOG_URL } from "@/constants/apiUrlConstants";
import { useEffect } from "react";
import { BLOG_CATEGORY_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function AddEditBlogCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogCategoryFormType>({
    resolver: zodResolver(BlogCategorySchema),
  });

  const [createBlog, { isLoading: creatingBlog }] = useCreateApiMutation();
  const [updateBlog, { isLoading: updatingBlog }] = useUpdateApiMutation();
  const {
    data: blogData,
    isSuccess: success,
    isLoading: loading,
  } = useGetApiQuery(`${BLOG_CATEGORY_URL}${id}`, {
    skip: !isEditMode,
  });

  useEffect(() => {
    if (blogData && blogData?.data) {
      reset(blogData?.data);
    }
  }, [blogData]);

  const onSubmit = async (data: BlogCategoryFormType) => {
    const body = { ...data };
    try {
      const response = isEditMode
        ? await updateBlog({
            url: `${BLOG_CATEGORY_URL}${blogData?.data?.id}`,
            body,
          }).unwrap()
        : await createBlog({
            url: `${BLOG_CATEGORY_URL}`,
            body,
          }).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {
          navigate(BLOG_CATEGORY_LIST_ROUTE);
        },
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  return (
    <>
      <PageTitle title={id ? "Edit Blog Category" : "Add Blog Category"} />
      <form
        className="form-container space-y-[1rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Name"
          {...register("name")}
          className="w-full md:w-1/2"
          error={errors?.name?.message}
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
