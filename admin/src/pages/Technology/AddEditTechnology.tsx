import Button from "@/components/Button";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import {
  useCreateTechnologyMutation,
  useGetTechnologyByIdQuery,
  useUpdateTechnologyByIdMutation,
} from "@/redux/services/technologies";
import { useAppSelector } from "@/redux/store/hooks";
import { TECHNOLOGY_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { TechnologyFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

type TechnologyFormType = z.infer<typeof TechnologyFormSchema>;

export default function AddEditTechnology() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    formState: { isValid, isSubmitting, errors },
  } = useForm<TechnologyFormType>({
    resolver: zodResolver(TechnologyFormSchema),
  });

  const selectedImage = useAppSelector((state) => state.media.selectedImage);
  const [isImg, setIsImg] = useState<boolean>(false);

  const image = getValues("image");

  const { data: technologyDetails, isSuccess: success } =
    useGetTechnologyByIdQuery(id, { skip: id === null || id === undefined });
  const [createTechnology] = useCreateTechnologyMutation();
  const [updateTechnology] = useUpdateTechnologyByIdMutation();

  useEffect(() => {
    if (success && technologyDetails?.data) {
      console.log(technologyDetails?.data);
      reset({ ...technologyDetails?.data });
    }
  }, [technologyDetails, success]);

  const handleConfirmImage = (field: string) => {
    if (field === "image") {
      setValue("image", selectedImage);
      setIsImg(false);
    }
  };

  const onSubmit = async (data: any) => {
    // if edit page
    if (id) {
      try {
        console.log(data);
        delete data.id;
        delete data.createdAt;
        delete data.updatedAt;
        const body = { ...data };
        const response = await updateTechnology({ body, id }).unwrap();
        handleResponse({
          res: response,
          onSuccess: () => navigate(TECHNOLOGY_LIST_ROUTE),
        });
      } catch (error) {
        handleError({ error, setError });
      }
    } else {
      try {
        const response = await createTechnology(data).unwrap();
        handleResponse({
          res: response,
          onSuccess: () => navigate(TECHNOLOGY_LIST_ROUTE),
        });
      } catch (error) {
        handleError({ error, setError });
      }
    }
  };

  console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative grid grid-cols-1 md:grid-cols-2 gap-[2rem] w-full border pl-[1.5rem] pt-[1.5rem] pb-[3rem] pr-[4.5rem] mt-[3rem]"
      >
        <div className="absolute top-[-0.7rem] left-[43px] px-[1rem] z-20 bg-[#FAF7FA]">
          <p className="font-[400] text-[1.25rem]">{"Technology"} *</p>
        </div>
        <Input
          label="name"
          isRequired
          {...register("name")}
          error={errors?.name?.message}
        />
        <br />
        <div className="flex flex-col items-start">
          <label className="font-[400] input-label text-[0.75rem] text-start mb-[2px] text-[#626c78]">
            {"Icon Image"} <span className="text-red-500">*</span>
          </label>
          <MediaComponent
            title={
              <ImageInputUIComponent
                error={
                  errors?.image?.message && !image
                    ? errors?.image?.message
                    : undefined
                }
                type="large"
                image={image}
              />
            }
            handleConfirmImage={() => handleConfirmImage("image")}
            open={isImg}
            setOpen={setIsImg}
            isMultiSelect={false}
          />
        </div>
        <br />
        <div className="flex">
          <Button type="submit" className="submit-button w-[5rem]">
            <div className="flex justify-center items-center gap-[0.5rem] text-white ">
              {"Submit"}
            </div>
          </Button>
        </div>
      </form>
    </>
  );
}
