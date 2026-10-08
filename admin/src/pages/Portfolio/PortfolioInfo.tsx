import Button from "@/components/Button";
import ImageInputUIComponent, {
  MultipleImageInputUI,
} from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import TextArea from "@/components/TextArea";
import useImageHandler, {
  useSingleImageHandler,
} from "@/hooks/useImageHandler";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { PortfolioFormType } from "./schema";
import { FormType } from "./AddEditPortfolio";
import Select from "@/components/Select";
import { useListAllServiceQuery } from "@/redux/services/service";
import { useListAllTechnologiesQuery } from "@/redux/services/technologies";
import MultiSelect from "@/components/MultiSelect";

interface OverviewProps {
  technologyOptions: unknown;
  setTechnologyOptions: unknown;
  setTechnologies: unknown;
  technologies: unknown;
  control: Control<PortfolioFormType>;
  register: ReturnType<typeof useForm<PortfolioFormType>>["register"];
  setValue: ReturnType<typeof useForm<PortfolioFormType>>["setValue"];
  getValues: ReturnType<typeof useForm<PortfolioFormType>>["getValues"];
  watch: ReturnType<typeof useForm<PortfolioFormType>>["watch"];
  errors: FieldErrors<PortfolioFormType>;
  setTab: React.Dispatch<SetStateAction<(typeof FormType)[number]>>;
}

export default function PortfolioInfo({
  control,
  register,
  getValues,
  setValue,
  watch,
  errors,
  setTab,
}: OverviewProps) {
  const {
    imageUrl: portfolioLogo,
    handleConfirmImage: handlePortfolioLogoConfirm,
    isImageModelOpen: isPortfolioLogo,
    setIsImageModelOpen: setIsPortfolioLogo,
  } = useSingleImageHandler(setValue, getValues, "portfolioLogo");

  const coreTechImg = watch("core_tech_img") || [];

  console.log(errors);

  const {
    media: mediaMultiple,
    currentImageIndex: currentImageIndexMultiple,
    isImageModelOpen: isImageModelOpenMultiple,
    setIsImageModalOpen: setIsImageModalOpenMultiple,
    handleRemoveButton: handleRemoveButtonMultiple,
    handleConfirmImage: handleConfirmImageMultiple,
    handleNextButton: handleNextButtonMultiple,
    handlePrevButton: handlePrevButtonMultiple,
  } = useImageHandler(setValue, getValues, "portfolioImages");

  const [serviceOptions, setServiceOptions] = useState([]);

  const { data: allServices, isSuccess: getServiceSuccess } =
    useListAllServiceQuery({
      page: 1,
      limit: 100,
    });

  const { data: allTechnologies } = useListAllTechnologiesQuery({
    page: 1,
    limit: 9999999,
  });

  const technologyOptions = useMemo(() => {
    if (!allTechnologies?.data) return [];
    return allTechnologies.data.data.map(
      (item: { image: string; name: string; id: number }) => ({
        value: `${item.id}~!${item.image}`,
        label: item.name,
      }),
    );
  }, [allTechnologies]);

  useEffect(() => {
    if (getServiceSuccess && allServices?.data?.data) {
      const options = allServices?.data?.data.map(
        (each: { name: string; id: number }) => ({
          label: each.name,
          value: Number(each.id),
        }),
      );
      setServiceOptions(options);
    }
  }, [allServices, getServiceSuccess]);

  return (
    <form className="form-container grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
      {/* Portfolio logo */}
      <div className="flex flex-col items-start">
        <label className="font-[400] input-label text-[.75rem] text-start mb-[2px] text-[#626c78]">
          {"Portfolio logo"} <span className="text-red-500">*</span>
        </label>
        <MediaComponent
          title={
            <ImageInputUIComponent
              error={errors.portfolioLogo?.message}
              type="large"
              image={portfolioLogo}
            />
          }
          isMultiSelect={false}
          open={isPortfolioLogo}
          setOpen={setIsPortfolioLogo}
          // handleConfirmImage={() => handleConfirmImage("top_img_url")}
          handleConfirmImage={handlePortfolioLogoConfirm}
        />
      </div>

      <div className="flex flex-col justify-evenly">
        {/* portfolio title */}
        <Input
          label="Title"
          isRequired
          {...register("title")}
          error={errors?.title?.message}
        />
        {/* portfolio category/service */}
        <Controller
          name="serviceId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              {...register("serviceId")}
              label={
                <p>
                  {"Service"} <span className="text-red-500">*</span>
                </p>
              }
              options={serviceOptions}
              error={errors?.serviceId?.message}
            />
          )}
        />
      </div>

      {/* portfolio introduction */}
      <TextArea
        label={"Introduction"}
        {...register("introduction")}
        error={errors?.introduction?.message}
      ></TextArea>

      {/* portfolio description */}
      <TextArea
        label={"Description"}
        {...register("product_description")}
        error={errors?.product_description?.message}
      ></TextArea>

      {/* portfolio used technology */}
      <div>
        <MultiSelect
          value={coreTechImg}
          onChange={(value) => {
            setValue("core_tech_img", value);
          }}
          options={technologyOptions}
          label="Technology Used"
          placeholder="Enter title"
          error={errors.core_tech_img?.message}
        />
      </div>

      {/* ProjectUrl */}
      <Input
        label="Project Url"
        isRequired
        {...register("projectUrl")}
        error={errors?.projectUrl?.message}
      />

      {/* multiselect carousel images */}
      <div className="flex flex-col items-start w-[20rem] ">
        <label className="input-label text-start mb-[2px]">
          Carousel Images <span className="text-red-500">*</span>
        </label>
        <MediaComponent
          title={
            <MultipleImageInputUI
              images={mediaMultiple}
              imageIndex={currentImageIndexMultiple}
            />
          }
          isMultiSelect={true}
          handleConfirmImage={() =>
            handleConfirmImageMultiple("portfolioImages")
          }
          open={isImageModelOpenMultiple}
          setOpen={setIsImageModalOpenMultiple}
        />
        <div className="mt-[1rem] flex w-full justify-between">
          <button
            type="button"
            className="px-[0.75rem] py-[0.5rem] rounded-[0.25rem] bg-primaryColor text-white"
            onClick={handlePrevButtonMultiple}
          >
            Previous
          </button>
          <button
            type="button"
            className="px-[0.75rem] py-[0.5rem] rounded-[0.25rem] bg-primaryColor text-white"
            onClick={handleRemoveButtonMultiple}
          >
            Remove
          </button>
          <button
            type="button"
            className="px-[0.75rem] py-[0.5rem] rounded-[0.25rem] bg-primaryColor text-white"
            onClick={handleNextButtonMultiple}
          >
            Next
          </button>
          {errors?.portfolioImages && (
            <span className="text-red-500 text-sm">
              {errors.portfolioImages.message}
            </span>
          )}
        </div>
      </div>

      <Input
        label="Slug"
        isRequired
        {...register("slug")}
        error={errors?.slug?.message}
      />

      <div className="flex">
        <Button
          type="button"
          className="submit-button w-[5rem]"
          handleClick={() => setTab("Project Details")}
        >
          <div className="flex justify-center items-center gap-[.5rem] text-white ">
            Continue
          </div>
        </Button>
      </div>
    </form>
  );
}
