import Button from "@/components/Button";
import MultiInput from "@/components/MultipleInput";
import TextArea from "@/components/TextArea";
import { PORTFOLIO_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { SetStateAction } from "react";
import {
  useCreatePortfolioMutation,
  useUpdatePortfolioByIdMutation,
} from "@/redux/services/portfolio";
import { PortfolioFormType } from "./schema";
import { FormType } from "./AddEditPortfolio";

interface SEOProps {
  register: ReturnType<typeof useForm<PortfolioFormType>>["register"];
  errors: FieldErrors<PortfolioFormType>;
  setTab: React.Dispatch<SetStateAction<(typeof FormType)[number]>>;
  control: Control<PortfolioFormType>;
  handleSubmit: ReturnType<typeof useForm>["handleSubmit"];
  setError: UseFormSetError<PortfolioFormType>;
  portfolioDetails: unknown;
}

export default function SEO({
  register,
  control,
  errors,
  handleSubmit,
  setError,
  portfolioDetails,
  setTab,
}: SEOProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [createPortfolio] = useCreatePortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioByIdMutation();
  const onSubmit = async (data: any) => {
    data.serviceId = Number(data.serviceId);
    data.core_tech_img = data.core_tech_img.map((item) =>
      item.split("~!").at(-1),
    );
    try {
      const response = isEditMode
        ? await updatePortfolio({
            body: data,
            id: portfolioDetails?.data.id,
          }).unwrap()
        : await createPortfolio(data).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => navigate(PORTFOLIO_LIST_ROUTE),
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
          onClick={() => setTab("Project Details")}
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
