import PageTitle from "@/components/PageTitle";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PagesFormType, PagesSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { PAGES_URL } from "@/constants/apiUrlConstants";
import { useEffect, useMemo } from "react";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { PAGES_LIST_ROUTE } from "@/routes/routeNames";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import MultiInput from "@/components/MultipleInput";

import RichTextEditor from "@/components/RichTextEditor";
import { changeTagType } from "@/utils/generalHelper";

export default function AddEditPages() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    watch,
    setValue,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PagesFormType>({
    resolver: zodResolver(PagesSchema),
  });

  const [createPages, { isLoading: creatingPages }] = useCreateApiMutation();
  const [updatePages, { isLoading: updatingPages }] = useUpdateApiMutation();
  const {
    data: pagesData,
    isSuccess: success,
    isLoading: loading,
  } = useGetApiQuery(`${PAGES_URL}${id}`, {
    skip: !isEditMode,
  });

  useEffect(() => {
    if (pagesData && pagesData?.data) {
      const changedMetaKeywords = changeTagType(pagesData?.data?.meta_keywords);
      reset({ ...pagesData?.data, meta_keywords: changedMetaKeywords });
    }
  }, [pagesData]);

  const onSubmit = async (data: PagesFormType) => {
    const body = { ...data };
    try {
      const response = isEditMode
        ? await updatePages({
            url: `${PAGES_URL}${pagesData?.data?.id}`,
            body,
          }).unwrap()
        : await createPages({
            url: `${PAGES_URL}`,
            body,
          }).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {
          navigate(PAGES_LIST_ROUTE);
        },
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  const formFields = useMemo(
    () => [
      { name: "title", label: "Title", Component: Input },
      { name: "header_title", label: "Header Title", Component: Input },
      { name: "og_title", label: "OG Title", Component: Input },
      { name: "og_description", label: "OG Description", Component: Input },
      { name: "og_image", label: "OG Image Link", Component: Input },
      { name: "meta_title", label: "Meta Title", Component: Input },
      {
        name: "meta_description",
        label: "Meta Description",
        Component: TextArea,
      },
      { name: "meta_keywords", label: "Meta Keywords", Component: MultiInput },
      // { name: "page_description", label: "Description", Component: TextArea },
    ],
    [],
  );

  return (
    <>
      <PageTitle title={id ? "Edit Pages" : "Add Pages"} isBack />
      <form
        className="form-container space-y-[1rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFields.map(({ name, label, Component }) => (
          <Controller
            key={name}
            name={name as keyof PagesFormType}
            control={control}
            render={({ field }) => (
              <Component
                {...field}
                label={label}
                control={control}
                placeholder={`Enter ${label}`}
                error={errors[name as keyof PagesFormType]?.message}
                className="w-full md:w-1/2"
              />
            )}
          />
        ))}
        {(!id || success) && (
          <RichTextEditor
            data={watch("page_description")}
            onChange={(value) => setValue("page_description", value)} // Update value
            error={errors.page_description?.message}
            className="w-1/4"
          />
        )}

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
