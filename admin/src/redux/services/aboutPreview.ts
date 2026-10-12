import { api } from "@/redux/store/api";

export const aboutPreviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch the singleton About Preview record
    getAboutPreview: builder.query({
      query: () => `about-preview/`,
      providesTags: ["AboutPreview"],
    }),

    // PUT: Update the singleton About Preview record (with image upload)
    updateAboutPreview: builder.mutation({
      query: (body: FormData) => ({
        url: `about-preview/`,
        method: "PUT",
        body,
        formData: true,
      }),
      invalidatesTags: ["AboutPreview"],
    }),
  }),
});

export const { useGetAboutPreviewQuery, useUpdateAboutPreviewMutation } =
  aboutPreviewApi;
