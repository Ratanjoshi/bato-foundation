import { api } from "../store/api";
import type { WhatWeDoItem } from "@/pages/WhatWeDo/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  msg?: string;
}

interface ListResponse {
  items: WhatWeDoItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ListQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

const whatWeDoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createWhatWeDo: builder.mutation<
      ApiResponse<WhatWeDoItem>,
      Partial<WhatWeDoItem>
    >({
      query: (body) => ({ url: "what-we-do", method: "POST", body }),
      invalidatesTags: ["what-we-do"],
    }),
    listWhatWeDo: builder.query<ApiResponse<ListResponse>, ListQuery>({
      query: ({ page = 1, limit = 10, search, isActive } = {}) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (search) params.set("search", search);
        if (isActive !== undefined) params.set("isActive", String(isActive));
        return `what-we-do?${params}`;
      },
      transformResponse: (
        response: ApiResponse<any>,
      ): ApiResponse<ListResponse> => ({
        ...response,
        data: {
          items: response.data?.data ?? [],
          pagination: {
            total: response.data?.total ?? 0,
            page: response.data?.page ?? 1,
            limit: response.data?.limit ?? 10,
            totalPages: response.data?.totalPages ?? 1,
          },
        },
      }),
      providesTags: ["what-we-do"],
    }),
    getWhatWeDoById: builder.query<ApiResponse<WhatWeDoItem>, number | string>({
      query: (id) => `what-we-do/${id}`,
      providesTags: ["what-we-do"],
    }),
    updateWhatWeDo: builder.mutation<
      ApiResponse<WhatWeDoItem>,
      { id: number | string; body: Partial<WhatWeDoItem> }
    >({
      query: ({ id, body }) => ({
        url: `what-we-do/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["what-we-do"],
    }),
    deleteWhatWeDo: builder.mutation<ApiResponse<null>, number | string>({
      query: (id) => ({ url: `what-we-do/${id}`, method: "DELETE" }),
      invalidatesTags: ["what-we-do"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateWhatWeDoMutation,
  useListWhatWeDoQuery,
  useGetWhatWeDoByIdQuery,
  useUpdateWhatWeDoMutation,
  useDeleteWhatWeDoMutation,
} = whatWeDoApi;
