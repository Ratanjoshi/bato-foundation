import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CareerCategoryFormType, CareerCategorySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { CAREER_CATEGORY_URL } from "@/constants/apiUrlConstants";
import { useEffect } from "react";
import { CAREER_CATEGORY_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function AddEditCareerCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CareerCategoryFormType>({
    resolver: zodResolver(CareerCategorySchema),
  });

  const [createBlog, { isLoading: creatingCareerCategory }] =
    useCreateApiMutation();
  const [updateBlog, { isLoading: updatingCareerCategory }] =
    useUpdateApiMutation();
  const {
    data: careerData,
    isSuccess: success,
    isLoading: loading,
  } = useGetApiQuery(`${CAREER_CATEGORY_URL}${id}`, {
    skip: !isEditMode,
  });

  useEffect(() => {
    if (careerData && careerData?.data) {
      reset(careerData?.data);
    }
  }, [careerData]);

  const onSubmit = async (data: CareerCategoryFormType) => {
    const body = { ...data };
    try {
      const response = isEditMode
        ? await updateBlog({
            url: `${CAREER_CATEGORY_URL}${careerData?.data?.id}`,
            body,
          }).unwrap()
        : await createBlog({
            url: `${CAREER_CATEGORY_URL}`,
            body,
          }).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {
          navigate(CAREER_CATEGORY_LIST_ROUTE);
        },
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  return (
    <>
      <PageTitle title={id ? "Edit Career Category" : "Add Career Category"} />
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
