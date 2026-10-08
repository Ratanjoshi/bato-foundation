import Button from "@/components/Button";
import Input from "@/components/Input";
import CustomModal from "@/components/Modal/customModal";
import MultiSelect from "@/components/MultiSelect";
import TextArea from "@/components/TextArea";
import { useListAllTechnologiesQuery } from "@/redux/services/technologies";
import { SetStateAction, useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { MdArrowBackIos } from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { ServiceFormType } from "./schema";
import { FormType } from "./AddEditService";

interface TechInfoProps {
  setValue: ReturnType<typeof useForm<ServiceFormType>>["setValue"];
  getValues: ReturnType<typeof useForm<ServiceFormType>>["getValues"];
  errors: FieldErrors<ServiceFormType>;
  setTab: React.Dispatch<SetStateAction<(typeof FormType)[number]>>;
  control: Control<ServiceFormType>;
}

interface TechStackProps {
  title: string;
  index: number;
  errors: FieldErrors<ServiceFormType>;
  control: Control<ServiceFormType>;
  technologyOptions: { label: string; value: string }[];
  remove: (index: number | number[]) => void;
}

interface UseCaseProps {
  title: string;
  index: number;
  errors: FieldErrors<ServiceFormType>;
  control: Control<ServiceFormType>;
  technologyOptions: { label: string; value: string }[];
  remove: (index: number | number[]) => void;
  setValue: ReturnType<typeof useForm<ServiceFormType>>["setValue"];
  getValues: ReturnType<typeof useForm<ServiceFormType>>["getValues"];
}

export default function TechInfo({
  control,
  errors,
  setTab,
  setValue,
  getValues,
}: TechInfoProps) {
  const {
    fields: techStackField,
    append: techStackAppend,
    remove: techStackRemove,
  } = useFieldArray({
    name: "techStack",
    control,
  });

  const {
    fields: useCaseField,
    append: useCaseAppend,
    remove: useCaseRemove,
  } = useFieldArray({
    name: "useCases",
    control,
  });

  const { data: allTechnologies, isSuccess: technologySuccess } =
    useListAllTechnologiesQuery({ page: 1, limit: 9999999 });

  const technologyOptions = useMemo(() => {
    if (!allTechnologies?.data) return [];
    return allTechnologies.data.data.map(
      (item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name,
      }),
    );
  }, [allTechnologies]);

  const handleTechStack = (event: React.FormEvent) => {
    event.preventDefault();
    techStackAppend({ title: "", choosed: "" });
  };

  const handleUseCase = (event: React.FormEvent) => {
    event.preventDefault();
    useCaseAppend({ title: "", description: "", img_path: "" });
  };
  return (
    <form className="form-container grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
      <div>
        <div className="floating-style-container">
          <div className="floating-input-container">
            <p className="input-title">Tech Stack</p>
            <button
              type="button"
              className="text-primaryColor"
              onClick={(event) => handleTechStack(event)}
            >
              Add New
            </button>
          </div>
          <div className="py-[1rem] px-[2rem]">
            {techStackField.map((field, index) => (
              <TechStack
                key={field.id}
                title={`${index + 1}. TechStack ${index + 1}`}
                index={index}
                control={control}
                remove={techStackRemove}
                errors={errors}
                technologyOptions={technologyOptions}
              />
            ))}
          </div>
        </div>
        <p className="text-red-500 text-start -mt-[2rem]">
          {errors?.techStack?.message}
        </p>
      </div>
      <div>
        <div className="floating-style-container">
          <div className="floating-input-container">
            <p className="input-title">Use Case</p>
            <button
              type="button"
              className="text-primaryColor"
              onClick={(event) => handleUseCase(event)}
            >
              Add New
            </button>
          </div>
          <div className="py-[1rem] px-[2rem]">
            {useCaseField.map((field, index) => (
              <UseCase
                key={field.id}
                title={`${index + 1}. Use Case ${index + 1}`}
                index={index}
                control={control}
                remove={useCaseRemove}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
            ))}
          </div>
        </div>
        <p className="text-red-500 text-start -mt-[2rem]">
          {errors?.useCases?.message}
        </p>
      </div>
      <div className="flex gap-[2rem]">
        <button
          className="bg-gray-400 px-[10px] py-[0.5rem] text-white rounded-[0.3rem] flex items-center gap-[10px]"
          onClick={() => setTab("Overview")}
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

function TechStack({
  title,
  control,
  index,
  remove,
  errors,
  technologyOptions,
}: TechStackProps) {
  const handleRemoveButton = (event: React.FormEvent) => {
    event.preventDefault();
    remove(index);
  };
  return (
    <div className="floating-style-container">
      <div className="floating-input-container">
        <span className="input-title">{title}</span>
        <button
          type="button"
          className="text-red-500"
          onClick={(event) => handleRemoveButton(event)}
        >
          Remove
        </button>
      </div>
      <div className="py-[1rem] px-[2rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
        <Controller
          name={`techStack.${index}.title`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Name"
              placeholder="Enter title"
              error={errors.techStack?.[index]?.title?.message}
            />
          )}
        />
        <Controller
          name={`techStack.${index}.choosed`}
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              options={technologyOptions}
              label="Name"
              placeholder="Enter title"
              error={errors.techStack?.[index]?.title?.message}
            />
          )}
        />
      </div>
    </div>
  );
}

function UseCase({
  title,
  control,
  index,
  remove,
  errors,
  setValue,
  getValues,
}: UseCaseProps) {
  const [open, setOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const icons = Object.keys(FaIcons);

  const handleInput = (name: string) => {
    setValue(`useCases.${index}.img_path`, name);
    setOpen(false);
  };

  const filteredIcons = icons.filter((icon) =>
    icon.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRemoveButton = (event: React.FormEvent) => {
    event.preventDefault();
    remove(index);
  };
  return (
    <div className="floating-style-container">
      <div className="floating-input-container">
        <span className="input-title">{title}</span>
        <button
          type="button"
          className="text-red-500"
          onClick={(event) => handleRemoveButton(event)}
        >
          Remove
        </button>
      </div>
      <div className="py-[1rem] px-[2rem] grid grid-cols-1 gap-[1rem]">
        <Controller
          name={`useCases.${index}.title`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Name"
              placeholder="Enter title"
              error={errors.useCases?.[index]?.title?.message}
            />
          )}
        />
        <Input
          label="Icon"
          value={getValues(`useCases.${index}.img_path`)}
          onClick={() => setOpen(true)}
        />
        {/* <Controller
          name={`useCases.${index}.img_path`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Icon"
              placeholder="Enter Icon"
              error={errors.useCases?.[index]?.img_path?.message}
            />
          )}
        /> */}
        <Controller
          name={`useCases.${index}.description`}
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              label="Description"
              placeholder="Enter Description"
              error={errors.useCases?.[index]?.description?.message}
            />
          )}
        />
      </div>
      <CustomModal open={open} setOpen={setOpen} title="Select Icons">
        <>
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border rounded"
          />{" "}
          <input />
          <div className="grid grid-cols-6 gap-6">
            {filteredIcons.map((each: string, index: number) => {
              const IconComponent = FaIcons[each as keyof IconsType];
              return (
                <div
                  className="flex flex-col items-center overflow-hidden"
                  onClick={() => handleInput(each)}
                >
                  <IconComponent className="text-black" size={50} key={index} />
                  <span className="text-secondary2">{each}</span>
                </div>
              );
            })}
          </div>
        </>
      </CustomModal>
    </div>
  );
}
