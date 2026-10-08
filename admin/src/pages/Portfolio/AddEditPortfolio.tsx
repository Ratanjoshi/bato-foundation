import { useGetPortfolioBySlugQuery } from "@/redux/services/portfolio";
import { useListAllTechnologiesQuery } from "@/redux/services/technologies";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  PortfolioFormSchema,
  PortfolioFormType,
  PortfolioInfoFormType,
  PortfolioInfoSchema,
  ProjectDetailFormType,
  ProjectDetailSchema,
} from "./schema";

import { zodResolver } from "@hookform/resolvers/zod";

import PageTitle from "@/components/PageTitle";
import PortfolioInfo from "./PortfolioInfo";
import ProjectDetails from "./ProjectDetails";
import SEO from "./Seo";

export const FormType = ["Portfolio Info", "Project Details", "SEO"] as const;

// type PortfolioFormType = z.infer<typeof PortfolioFormSchema>;

export default function AddEditPortfolio() {
  const { id } = useParams();

  const isEditMode = !!id;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<PortfolioFormType>({
    resolver: zodResolver(PortfolioFormSchema),
    reValidateMode: "onBlur",
  });

  const [tab, setTab] = useState<(typeof FormType)[number]>("Portfolio Info");
  const [hasPortfolioInfoError, setHasOverviewError] = useState<boolean>(false);
  const [hasProjectDetailError, setHasTechInfoError] = useState<boolean>(false);

  const handleNavigateTab = (value: (typeof FormType)[number]) => {
    setTab(value);
  };

  useEffect(() => {
    const portfolioInfoFields = Object.keys(
      PortfolioInfoSchema.shape,
    ) as PortfolioInfoFormType[];

    const projectDetailFields = Object.keys(
      ProjectDetailSchema.shape,
    ) as ProjectDetailFormType[];

    setHasOverviewError(portfolioInfoFields.some((field) => errors[field]));
    setHasTechInfoError(projectDetailFields.some((field) => errors[field]));
  }, [errors]);

  // const selectedImage = useAppSelector((state) => state.media.selectedImage);
  // const [isDesktopImg, setIsDesktopImg] = useState<boolean>(false);
  // const [isTabletImg, setIsTabletImg] = useState<boolean>(false);
  // const [isMobileImg, setIsMobileImg] = useState<boolean>(false);
  const [technologyOptions, setTechnologyOptions] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  const { data: allTechnologies, isSuccess: technologySuccess } =
    useListAllTechnologiesQuery({ page: 1, limit: 9999999 });

  const {
    data: portfolioDetails,
    isSuccess: success,
    isLoading: portfolioLoading,
  } = useGetPortfolioBySlugQuery(id, { skip: id === null || id === undefined });

  useEffect(() => {
    if (technologySuccess && allTechnologies?.data?.data) {
      console.log(allTechnologies?.data?.data);
      if (!id) {
        const options = allTechnologies?.data?.data.map(
          (each: { name: string; id: number; image: string }) => ({
            label: each.name,
            value: Number(each.id),
            image: each.image,
          }),
        );
        setTechnologyOptions(options);
      }
    }
  }, [technologySuccess, allTechnologies]);

  useEffect(() => {
    if (success && portfolioDetails?.data) {
      const {
        seo_keywords,
        core_tech_img,
        portfolioImages,
        projectRequirement: { requirements },
      } = portfolioDetails?.data;
      if (technologySuccess) {
        const selectedTechnology = allTechnologies?.data?.data
          .filter((tech) =>
            portfolioDetails?.data.core_tech_img.includes(tech.image),
          )
          .map((each: { name: string; id: number; image: string }) => ({
            label: each.name,
            value: Number(each.id),
            image: each.image,
          }));
        setTechnologies(selectedTechnology);

        const options = allTechnologies?.data?.data
          .filter(
            (tech) =>
              !portfolioDetails?.data.core_tech_img.includes(tech.image),
          )
          .map((each: { name: string; id: number; image: string }) => ({
            label: each.name,
            value: Number(each.id),
            image: each.image,
          }));

        // console.log(allTechnologies?.data?.data);
        // console.log(portfolioDetails?.data.core_tech_img);
        // console.log("technology options");
        // console.log(options);
        setTechnologyOptions(options);
      }
      reset({
        ...portfolioDetails?.data,
        seo_keywords:
          typeof seo_keywords === "string"
            ? JSON.parse(seo_keywords)
            : seo_keywords,
        core_tech_img:
          typeof core_tech_img === "string"
            ? JSON.parse(core_tech_img)
            : core_tech_img,
        portfolioImages:
          typeof portfolioImages === "string"
            ? JSON.parse(portfolioImages)
            : portfolioImages,
        projectRequirement: {
          ...portfolioDetails?.data?.projectRequirement,
          requirements:
            typeof requirements === "string"
              ? JSON.parse(requirements)
              : requirements,
        },

        // requirement_title: projectRequirement.title,
        // requirements: projectRequirement.requirements,
        // seo_keywords: [],
      });
    }
    // ignore warning for technologies
  }, [portfolioDetails, success, reset, allTechnologies, technologySuccess]);

  useEffect(() => {
    const portfolioInfoFields = Object.keys(
      PortfolioInfoSchema.shape,
    ) as PortfolioInfoFormType[];
    const projectDetailFields = Object.keys(
      ProjectDetailSchema.shape,
    ) as ProjectDetailFormType[];

    setHasOverviewError(portfolioInfoFields.some((field) => errors[field]));
    setHasTechInfoError(projectDetailFields.some((field) => errors[field]));
  }, [errors]);

  return (
    <>
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
              {each}{" "}
              {each === "Portfolio Info" && hasPortfolioInfoError && "⚠️"}{" "}
              {each === "Project Details" && hasProjectDetailError && "⚠️"}
            </button>
          ))}
        </div>
        <div>
          {portfolioLoading ? (
            <>Loading...</>
          ) : (
            <>
              {" "}
              {tab === "Portfolio Info" && (
                <PortfolioInfo
                  control={control}
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  setTab={setTab}
                  technologies={technologies}
                  setTechnologies={setTechnologies}
                  technologyOptions={technologyOptions}
                  setTechnologyOptions={setTechnologyOptions}
                />
              )}
              {tab === "Project Details" && (
                <ProjectDetails
                  register={register}
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
                  portfolioDetails={portfolioDetails}
                  setTab={setTab}
                />
              )}
            </>
          )}
        </div>
      </>
    </>
  );
}
