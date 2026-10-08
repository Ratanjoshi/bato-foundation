import { api } from "../store/api";

const serviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (body) => ({
        url: "service",
        method: "POST",
        body,
      }),
      invalidatesTags: ["service"],
    }),
    listAllService: builder.query({
      query: ({ page, limit }) => `service/list?page=${page}&limit=${limit}`,
      providesTags: ["service"],
    }),
    getServiceBySlug: builder.query({
      query: (id) => `service/${id}`,
      providesTags: ["service"],
    }),
    updateServiceById: builder.mutation({
      query: ({ body, id }) => ({
        url: `service/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateServiceMutation,
  useListAllServiceQuery,
  useGetServiceBySlugQuery,
  useUpdateServiceByIdMutation,
  useDeleteServiceMutation,
} = serviceApi;
