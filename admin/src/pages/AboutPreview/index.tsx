import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { handleError, handleResponse } from "@/utils/responseHandler";
import {
  useGetAboutPreviewQuery,
  useUpdateAboutPreviewMutation,
} from "@/redux/services/aboutPreview";

interface FormValues {
  badge: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  buttonLink: string;
  imageAlt: string;
  floatingTitle: string;
  floatingText: string;
  isPublished: boolean;
  image?: FileList;
}

const AboutPreviewPage = () => {
  const [preview, setPreview] = useState<string>("");

  const { data: detail, isLoading: isLoadingDetail } =
    useGetAboutPreviewQuery("");
  const [updateAboutPreview, { isLoading: isUpdating }] =
    useUpdateAboutPreviewMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      badge: "",
      title: "",
      paragraph1: "",
      paragraph2: "",
      buttonText: "",
      buttonLink: "",
      imageAlt: "",
      floatingTitle: "",
      floatingText: "",
      isPublished: true,
    },
  });

  useEffect(() => {
    if (detail?.data) {
      const d = detail.data;
      reset({
        badge: d.badge ?? "",
        title: d.title ?? "",
        paragraph1: d.paragraph1 ?? "",
        paragraph2: d.paragraph2 ?? "",
        buttonText: d.buttonText ?? "",
        buttonLink: d.buttonLink ?? "",
        imageAlt: d.imageAlt ?? "",
        floatingTitle: d.floatingTitle ?? "",
        floatingText: d.floatingText ?? "",
        isPublished: d.isPublished ?? true,
      });

      if (d.imageUrl) {
        // If your backend returns a relative path, prepend the base URL if needed
        setPreview(d.imageUrl);
      }
    }
  }, [detail, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select JPG, JPEG, PNG, WEBP or GIF image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();

      formData.append("badge", values.badge);
      formData.append("title", values.title);
      formData.append("paragraph1", values.paragraph1);
      formData.append("paragraph2", values.paragraph2);
      formData.append("buttonText", values.buttonText);
      formData.append("buttonLink", values.buttonLink);
      formData.append("imageAlt", values.imageAlt);
      formData.append("floatingTitle", values.floatingTitle);
      formData.append("floatingText", values.floatingText);
      formData.append("isPublished", String(values.isPublished));

      if (values.image && values.image.length > 0) {
        formData.append("image", values.image[0]);
      }

      const res = await updateAboutPreview(formData).unwrap();

      handleResponse({
        res,
        onSuccess: () => {
          // No navigation needed since it's a single form page
        },
      });
    } catch (error) {
      handleError({ error });
    }
  };

  if (isLoadingDetail) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">About Preview</h1>
        <p className="text-sm text-slate-500">
          This section appears on the BATO Foundation home page.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Badge"
            isRequired
            placeholder="e.g. What is BATO Foundation?"
            {...register("badge", { required: "Badge is required" })}
            error={errors.badge}
          />

          <Input
            label="Title"
            isRequired
            placeholder="e.g. A road from talent to opportunity."
            {...register("title", { required: "Title is required" })}
            error={errors.title}
          />

          <Input
            label="Button Text"
            isRequired
            placeholder="e.g. Learn More About BATO"
            {...register("buttonText", { required: "Button text is required" })}
            error={errors.buttonText}
          />

          <Input
            label="Button Link"
            isRequired
            placeholder="e.g. /about"
            {...register("buttonLink", { required: "Button link is required" })}
            error={errors.buttonLink}
          />

          <Input
            label="Floating Title"
            isRequired
            placeholder="e.g. STEM"
            {...register("floatingTitle", {
              required: "Floating title is required",
            })}
            error={errors.floatingTitle}
          />

          <Input
            label="Floating Text"
            isRequired
            placeholder="e.g. Learning that reaches where roads don't."
            {...register("floatingText", {
              required: "Floating text is required",
            })}
            error={errors.floatingText}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="input-label">
              Paragraph 1 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              className="border rounded px-3 py-2 w-full"
              placeholder="First paragraph..."
              {...register("paragraph1", {
                required: "Paragraph 1 is required",
              })}
            />
            {errors.paragraph1 && (
              <span className="input-error">{errors.paragraph1.message}</span>
            )}
          </div>

          <div>
            <label className="input-label">
              Paragraph 2 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              className="border rounded px-3 py-2 w-full"
              placeholder="Second paragraph..."
              {...register("paragraph2", {
                required: "Paragraph 2 is required",
              })}
            />
            {errors.paragraph2 && (
              <span className="input-error">{errors.paragraph2.message}</span>
            )}
          </div>
        </div>

        <div>
          <label className="input-label">
            Section Image <span className="text-red-500">*</span>
          </label>
          <div className="border border-dashed border-gray-300 rounded-lg p-5">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              {...register("image")}
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            <p className="text-xs text-gray-500 mt-2">
              JPG, JPEG, PNG, WEBP or GIF. Maximum size: 5MB.
            </p>

            {preview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Image Preview</p>
                <div className="relative w-full max-w-sm">
                  <img
                    src={preview}
                    alt="About preview"
                    className="w-full h-52 object-cover rounded-lg border"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Input
          label="Image Alt Text"
          isRequired
          placeholder="e.g. Teacher helping students build robots"
          {...register("imageAlt", { required: "Image alt text is required" })}
          error={errors.imageAlt}
        />

        <div className="flex items-center gap-3">
          <input
            id="isPublished"
            type="checkbox"
            className="h-4 w-4"
            {...register("isPublished")}
          />
          <label htmlFor="isPublished" className="text-sm font-medium">
            Published (visible on the public website)
          </label>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AboutPreviewPage;
