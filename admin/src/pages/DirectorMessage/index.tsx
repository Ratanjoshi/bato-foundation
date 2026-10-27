import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserCircle, Plus, Trash2 } from "lucide-react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import RichTextEditor from "@/components/RichTextEditor";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { getToken } from "@/utils/tokenHandler";
import { BACKEND_BASE_URL } from "@/constants";

interface FormValues {
  name: string;
  role: string;
  org: string;
  photo: string;
  message: { text: string }[];
}

const DirectorMessageAdmin = () => {
  const navigate = useNavigate();
  const hasInitialized = useRef(false);

  // ✅ Native State instead of Redux
  const [response, setResponse] = useState<any>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      role: "",
      org: "",
      photo: "",
      message: [{ text: "" }],
    },
  });

  const { handleConfirmImage, isImageModelOpen, setIsImageModelOpen } =
    useSingleImageHandler<FormValues>(setValue, getValues, "photo");

  const photoUrl = watch("photo");

  // ✅ Native Fetch Function
  const fetchData = async () => {
    setIsLoadingDetail(true);
    setIsError(false);
    setError(null);
    hasInitialized.current = false; // Reset to allow form population

    try {
      const token = getToken("token");
      const res = await fetch(`${BACKEND_BASE_URL}/directormessage/active`, {
        headers: {
          authorization: `Admin ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

      const json = await res.json();
      setResponse(json);
    } catch (err) {
      setIsError(true);
      setError(err);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Populate form when data loads
  useEffect(() => {
    if (response?.data && !hasInitialized.current) {
      hasInitialized.current = true; // Mark as initialized
      const d = response.data;

      let messageArray = [{ text: "" }];
      if (Array.isArray(d.message)) {
        messageArray = d.message.map((msg: string) => ({ text: msg || "" }));
      }

      reset({
        name: d.name ?? "",
        role: d.role ?? "",
        org: d.org ?? "",
        photo: d.photo ?? "",
        message: messageArray.length > 0 ? messageArray : [{ text: "" }],
      });
    }
  }, [response, reset]);

  const onSubmit = async (values: FormValues) => {
    setIsUpdating(true);
    try {
      const token = getToken("token");
      const payload = {
        name: values.name,
        role: values.role,
        org: values.org,
        photo: values.photo,
        message: values.message.map((m) => m.text),
      };

      const res = await fetch(`${BACKEND_BASE_URL}/directormessage/1`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Admin ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update");

      const json = await res.json();
      handleResponse({
        res: json,
        onSuccess: () => navigate("/admin/about/director-message"),
      });
    } catch (error) {
      handleError({ error });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingDetail)
    return <div className="p-6">Loading from Backend...</div>;

  if (isError) {
    return (
      <div className="p-6 text-red-500 bg-red-50 m-6 rounded border border-red-200">
        <h2 className="font-bold text-lg mb-2">Failed to load data!</h2>
        <pre className="text-xs bg-white p-4 rounded border border-red-100 overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Manage Director Message</h1>
        <Button
          type="button"
          onClick={fetchData}
          className="text-sm border px-4 py-2 rounded hover:bg-gray-50"
        >
          Reload Data
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-8"
      >
        {/* ================= HEADER / HERO ================= */}
        <div>
          <h2 className="text-lg font-medium border-b pb-2 mb-4">
            Director Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Name"
              isRequired
              placeholder="e.g. Prashant Thapa"
              {...register("name", { required: "Required" })}
              error={errors.name}
            />
            <Input
              label="Role"
              isRequired
              placeholder="e.g. Executive Director"
              {...register("role", { required: "Required" })}
              error={errors.role}
            />
            <Input
              label="Organization"
              isRequired
              placeholder="e.g. BATO Foundation"
              {...register("org", { required: "Required" })}
              error={errors.org}
            />
          </div>
        </div>

        {/* ================= IMAGE SECTION ================= */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primaryColor/10 text-primaryColor">
              <UserCircle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Director Photo
              </h2>
              <p className="text-xs text-gray-500">
                Pick an image from the media library.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Profile Image <span className="text-red-500">*</span>
                  </label>
                  {photoUrl && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Selected
                    </span>
                  )}
                </div>

                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4 transition hover:border-primaryColor/40 hover:bg-gray-50">
                  <input type="hidden" {...register("photo")} />
                  <MediaComponent
                    title={
                      <ImageInputUIComponent
                        type="large"
                        error=""
                        image={photoUrl || undefined}
                      />
                    }
                    isMultiSelect={false}
                    open={isImageModelOpen}
                    setOpen={setIsImageModelOpen}
                    handleConfirmImage={handleConfirmImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MESSAGE PARAGRAPHS ================= */}
        <div>
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-medium">Message Paragraphs</h2>
          </div>

          <Controller
            control={control}
            name="message"
            render={({ field }) => {
              const fieldValue = Array.isArray(field.value)
                ? field.value
                : [{ text: "" }];

              return (
                <div className="space-y-4">
                  {fieldValue.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50 relative"
                    >
                      <div className="flex-1">
                        <RichTextEditor
                          label={`Paragraph ${index + 1}`}
                          data={item.text}
                          onChange={(val) => {
                            const newArray = [...fieldValue];
                            newArray[index] = { text: val };
                            field.onChange(newArray);
                          }}
                          error={errors.message?.[index]?.text?.message}
                        />
                      </div>
                      {fieldValue.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newArray = [...fieldValue];
                            newArray.splice(index, 1);
                            field.onChange(newArray);
                          }}
                          className="mt-8 text-red-500 hover:text-red-700 p-2"
                          title="Remove paragraph"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      field.onChange([...fieldValue, { text: "" }])
                    }
                    className="flex items-center gap-2 text-sm text-primaryColor border border-primaryColor px-4 py-2 rounded hover:bg-primaryColor/5"
                  >
                    <Plus className="w-4 h-4" /> Add Paragraph
                  </Button>
                </div>
              );
            }}
          />
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex gap-3 pt-6 border-t">
          <Button
            type="submit"
            isLoading={isUpdating}
            className="bg-primaryColor text-white px-8 py-2 rounded"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DirectorMessageAdmin;
