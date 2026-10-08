import Button from "@/components/Button";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import TextArea from "@/components/TextArea";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import { FieldErrors, useForm } from "react-hook-form";
import { ServiceFormType } from "./schema";
import { SetStateAction } from "react";
import { FormType } from "./AddEditService";

interface OverviewProps {
  register: ReturnType<typeof useForm<ServiceFormType>>["register"];
  setValue: ReturnType<typeof useForm<ServiceFormType>>["setValue"];
  getValues: ReturnType<typeof useForm<ServiceFormType>>["getValues"];
  errors: FieldErrors<ServiceFormType>;
  setTab: React.Dispatch<SetStateAction<(typeof FormType)[number]>>;
}

export default function Overview({
  register,
  getValues,
  setValue,
  errors,
  setTab,
}: OverviewProps) {
  const {
    imageUrl: img_path,
    handleConfirmImage: handleImgPathConfirm,
    isImageModelOpen: isImgPath,
    setIsImageModelOpen: setIsImgPath,
  } = useSingleImageHandler(setValue, getValues, "img_path");

  return (
    <form className="form-container grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
      <Input
        label="Name"
        isRequired
        {...register("name")}
        error={errors?.name?.message}
      />
      <Input
        label="Title"
        isRequired
        {...register("title")}
        error={errors?.title?.message}
      />
      <TextArea
        label={"Description"}
        {...register("description")}
        error={errors?.description?.message}
      />
      <TextArea
        label={"Summary"}
        {...register("summary")}
        error={errors?.summary?.message}
      />
      <div className="flex flex-wrap lg:gap-[4rem] gap-[2rem] px-[1rem] py-[3rem]">
        <div className="flex flex-col items-start">
          <label className="font-[400] input-label text-[.75rem] text-start mb-[2px] text-[#626c78]">
            {"Service Image"} <span className="text-red-500">*</span>
          </label>
          <MediaComponent
            title={
              <ImageInputUIComponent
                error={errors?.img_path?.message}
                type="large"
                image={img_path}
              />
            }
            isMultiSelect={false}
            open={isImgPath}
            setOpen={setIsImgPath}
            handleConfirmImage={handleImgPathConfirm}
          />
        </div>
      </div>
      <br />
      <div className="flex">
        <Button
          type="button"
          className="submit-button w-[5rem]"
          handleClick={() => setTab("Tech Info")}
        >
          <div className="flex justify-center items-center gap-[.5rem] text-white ">
            Continue
          </div>
        </Button>
      </div>
    </form>
  );
}
