import { api } from "@/redux/store/api";

export const aboutPreviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Fetch the singleton About Preview record
    getAboutPreview: builder.query({
      query: () => `about-preview/`,
      providesTags: ["AboutPreview"],
    }),

    createAboutPreview: builder.mutation({
      query: (body) => ({
        url: `about-preview/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AboutPreview"],
    }),

    updateAboutPreview: builder.mutation({
      query: ({ id, body }) => ({
        url: `about-preview/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AboutPreview"],
    }),
  }),
});

export const {
  useGetAboutPreviewQuery,
  useCreateAboutPreviewMutation,
  useUpdateAboutPreviewMutation,
} = aboutPreviewApi;
