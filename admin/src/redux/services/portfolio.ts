import { api } from "../store/api";

const portfolioApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPortfolio: builder.mutation({
      query: (body) => ({
        url: "portfolio",
        method: "POST",
        body,
      }),
      invalidatesTags: ["portfolio"],
    }),
    listAllPortfolio: builder.query({
      query: ({ page, limit }) => `portfolio/list?page=${page}&limit=${limit}`,
      providesTags: ["portfolio"],
    }),
    getPortfolioBySlug: builder.query({
      query: (id) => `portfolio/${id}`,
      providesTags: ["portfolio"],
    }),
    updatePortfolioById: builder.mutation({
      query: ({ body, id }) => ({
        url: `portfolio/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["portfolio"],
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `portfolio/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["portfolio"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePortfolioMutation,
  useListAllPortfolioQuery,
  useGetPortfolioBySlugQuery,
  useUpdatePortfolioByIdMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
