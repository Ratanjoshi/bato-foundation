import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { SetStateAction } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { MdArrowBackIos } from "react-icons/md";
import { PortfolioFormType } from "./schema";
import MultiInput from "@/components/MultipleInput";
import { FormType } from "./AddEditPortfolio";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import MediaComponent from "@/components/MediaComponent";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";

interface ProjectDetailsProps {
  register: ReturnType<typeof useForm<PortfolioFormType>>["register"];
  control: ReturnType<typeof useForm<PortfolioFormType>>["control"];
  setValue: ReturnType<typeof useForm<PortfolioFormType>>["setValue"];
  getValues: ReturnType<typeof useForm<PortfolioFormType>>["getValues"];
  errors: FieldErrors<PortfolioFormType>;
  setTab: React.Dispatch<SetStateAction<(typeof FormType)[number]>>;
}

export default function ProjectDetails({
  register,
  control,
  errors,
  setTab,
  setValue,
  getValues,
}: ProjectDetailsProps) {
  const {
    imageUrl: desktop_view_url,
    handleConfirmImage: handleDesktopImageConfirm,
    isImageModelOpen: isDesktopImg,
    setIsImageModelOpen: setIsDesktopImg,
  } = useSingleImageHandler(setValue, getValues, "desktop_view_url");

  return (
    <form className="form-container grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
      {/* key projects requirements */}
      <div>
        <p className="text-left mb-4">Project Requirement</p>
        <Input
          label="Requirement Title"
          isRequired
          {...register("projectRequirement.title")}
          error={errors?.projectRequirement?.title?.message}
        />
        <br />
        <br />
        <MultiInput
          stackInput={true}
          control={control}
          // name="portfolioRequirement"
          {...register("projectRequirement.requirements")}
          label="Project Features"
        />
        {errors.projectRequirement?.requirements && (
          <span className="text-red-500 text-sm">
            {errors.projectRequirement?.requirements?.message}
          </span>
        )}
        {/* Portfolio snapshots */}
        <div className="flex lg:gap-[4rem] gap-[2rem] px-[1rem] py-[3rem]">
          <div className="flex flex-col items-start">
            <label className="font-[400] input-label text-[.75rem] text-start mb-[2px] text-[#626c78]">
              {"Desktop Snapshot"} <span className="text-red-500">*</span>
            </label>
            <MediaComponent
              title={
                <ImageInputUIComponent
                  error={errors?.desktop_view_url?.message}
                  type="large"
                  image={desktop_view_url}
                />
              }
              isMultiSelect={false}
              open={isDesktopImg}
              setOpen={setIsDesktopImg}
              // handleConfirmImage={() => handleConfirmImage("top_img_url")}
              handleConfirmImage={handleDesktopImageConfirm}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <TextArea
          label={"Business Requirement"}
          {...register("business_challenges")}
          error={errors.business_challenges?.message}
        ></TextArea>
        <TextArea
          label={"Provided Solution"}
          {...register("solutions")}
          error={errors.solutions?.message}
        ></TextArea>
      </div>
      <div className="flex gap-[2rem]">
        <button
          className="bg-gray-400 px-[10px] py-[0.5rem] text-white rounded-[0.3rem] flex items-center gap-[10px]"
          onClick={() => setTab("Portfolio Info")}
        >
          <MdArrowBackIos size={18} />
          Back
        </button>
        <Button
          type="button"
          className="submit-button w-[5rem]"
          handleClick={() => setTab("SEO")}
        >
          <div className="flex justify-center items-center gap-[.5rem] text-white ">
            Continue
          </div>
        </Button>
      </div>
    </form>
  );
}
