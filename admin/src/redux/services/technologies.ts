import { api } from "../store/api";

const technologiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTechnology: builder.mutation({
      query: (body) => ({
        url: "technologies",
        method: "POST",
        body,
      }),
      invalidatesTags: ["technologies"],
    }),
    listAllTechnologies: builder.query({
      query: ({ page, limit }) =>
        `technologies/list?page=${page}&limit=${limit}`,
      providesTags: ["technologies"],
    }),
    getTechnologyById: builder.query({
      query: (id) => `technologies/${id}`,
      providesTags: ["technologies"],
    }),
    updateTechnologyById: builder.mutation({
      query: ({ body, id }) => ({
        url: `technologies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["technologies"],
    }),
    deleteTechnology: builder.mutation({
      query: (id) => ({
        url: `technologies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["technologies"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateTechnologyMutation,
  useUpdateTechnologyByIdMutation,
  useListAllTechnologiesQuery,
  useGetTechnologyByIdQuery,
  useDeleteTechnologyMutation,
} = technologiesApi;
