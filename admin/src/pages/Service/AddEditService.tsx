import { useParams } from "react-router-dom";

import Overview from "./Overview";
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import { useGetServiceBySlugQuery } from "@/redux/services/service";
import { useForm } from "react-hook-form";
import {
  OverviewSchema,
  ServiceFormSchema,
  ServiceFormType,
  TechInfoFormType,
  TechInfoSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import SEO from "./Seo";
import TechInfo from "./TechInfo";

export const FormType = ["Overview", "Tech Info", "SEO"] as const;

export default function AddEditService() {
  const { id } = useParams();

  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm<ServiceFormType>({
    resolver: zodResolver(ServiceFormSchema),
    reValidateMode: "onBlur",
  });

  const {
    data: serviceDetails,
    isSuccess: success,
    isLoading: loading,
  } = useGetServiceBySlugQuery(id, { skip: id === null || id === undefined });

  const [tab, setTab] = useState<(typeof FormType)[number]>("Overview");
  const [hasOverviewError, setHasOverviewError] = useState<boolean>(false);
  const [hasTechInfoError, setHasTechInfoError] = useState<boolean>(false);

  useEffect(() => {
    if (isEditMode && success) {
      const { techStacks, seo_keywords, ...response } = serviceDetails?.data;
      console.log("-------------sdfsdf", seo_keywords);
      const editedTechStack = techStacks.map(
        (each: { title: string; technologies: { id: number }[] }) => {
          return {
            title: each.title,
            choosed: each.technologies.map((each) => each.id),
          };
        },
      );
      reset({
        ...response,
        techStack: editedTechStack,
        seo_keywords:
          typeof seo_keywords === "string"
            ? JSON.parse(seo_keywords)
            : seo_keywords,
      });
    } else {
      reset();
    }
  }, [success]);

  const handleNavigateTab = (value: (typeof FormType)[number]) => {
    setTab(value);
  };

  useEffect(() => {
    const overviewFields = Object.keys(
      OverviewSchema.shape,
    ) as OverviewFormType[];
    const techInfoField = Object.keys(
      TechInfoSchema.shape,
    ) as TechInfoFormType[];

    setHasOverviewError(overviewFields.some((field) => errors[field]));
    setHasTechInfoError(techInfoField.some((field) => errors[field]));
  }, [errors]);

  return (
    <>
      <PageTitle title={isEditMode ? "Edit Title" : "Add Title"} isBack />
      <div className="flex justify-start">
        {FormType.map((each) => (
          <button
            className={`border text-white font-medium px-[1.25rem] py-[0.75rem] ${
              tab === each ? "bg-primaryColor" : "bg-gray-400"
            } `}
            onClick={() => handleNavigateTab(each)}
          >
            {each} {each === "Overview" && hasOverviewError && "⚠️"}{" "}
            {each === "Tech Info" && hasTechInfoError && "⚠️"}
          </button>
        ))}
      </div>
      <div>
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            {" "}
            {tab === "Overview" && (
              <Overview
                register={register}
                getValues={getValues}
                setValue={setValue}
                errors={errors}
                setTab={setTab}
              />
            )}
            {tab === "Tech Info" && (
              <TechInfo
                control={control}
                errors={errors}
                setTab={setTab}
                setValue={setValue}
                getValues={getValues}
              />
            )}
            {tab == "SEO" && (
              <SEO
                register={register}
                control={control}
                errors={errors}
                setError={setError}
                handleSubmit={handleSubmit}
                serviceDetails={serviceDetails}
                setTab={setTab}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
