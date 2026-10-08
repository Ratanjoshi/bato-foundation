import Button from "@/components/Button";
import MultiInput from "@/components/MultipleInput";
import TextArea from "@/components/TextArea";
import {
  useCreateServiceMutation,
  useUpdateServiceByIdMutation,
} from "@/redux/services/service";
import { SERVICE_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceFormType } from "./schema";
import { SetStateAction } from "react";
import { FormType } from "./AddEditService";

interface SEOProps {
  register: ReturnType<typeof useForm<ServiceFormType>>["register"];
  errors: FieldErrors<ServiceFormType>;
  setTab: React.Dispatch<SetStateAction<(typeof FormType)[number]>>;
  control: Control<ServiceFormType>;
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
  setError: UseFormSetError<ServiceFormType>;
  serviceDetails: unknown;
}

export default function SEO({
  register,
  control,
  errors,
  handleSubmit,
  setError,
  serviceDetails,
  setTab,
}: SEOProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [createService] = useCreateServiceMutation();
  const [updateSerivce] = useUpdateServiceByIdMutation();
  const onSubmit = async (data: any) => {
    console.log(data, "data");
    const technologyArray =
      Array.isArray(data.techStack) && data.techStack.length > 0
        ? data.techStack.map((each) => {
            return {
              ...each,
              choosed: each.choosed.map((item) => {
                return { id: item };
              }),
            };
          })
        : [];
    const body = { ...data, techStack: technologyArray };

    try {
      const response = isEditMode
        ? await updateSerivce({
            body,
            id: serviceDetails?.data?.id,
          }).unwrap()
        : await createService({
            ...body,
          }).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => navigate(SERVICE_LIST_ROUTE),
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };
  return (
    <form
      className="form-container space-y-[1rem] w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextArea label={"SEO Description"} {...register("seo_description")} />
      <MultiInput
        control={control}
        name="seo_keywords"
        label="Seo Keywords"
        error={errors?.seo_keywords?.message}
      />
      <div className="flex gap-[2rem]">
        <button
          className="bg-gray-400 px-[10px] py-[0.5rem] text-white rounded-[0.3rem] flex items-center gap-[10px]"
          onClick={() => setTab("Tech Info")}
        >
          <MdArrowBackIos size={18} />
          Back
        </button>
        <Button type="submit" className="submit-button w-[5rem]">
          <div className="flex justify-center items-center gap-[.5rem] text-white ">
            {"Submit"}
          </div>
        </Button>
      </div>
    </form>
  );
}
