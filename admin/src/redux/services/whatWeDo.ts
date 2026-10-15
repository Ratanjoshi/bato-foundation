// admin/src/redux/services/whatWeDo.ts
import { api } from "../store/api";

interface WhatWeDoItem {
  id: number;
  icon: string;
  title: string;
  slug: string;
  desc: string;
  points: string[];
  image: string | null;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ListQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

interface SaveResponse {
  success: boolean;
  item: WhatWeDoItem;
}

interface DetailResponse {
  success: boolean;
  item: WhatWeDoItem;
}

const whatWeDoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /* ------------------------------------------------------------------ */
    /* Create                                                              */
    /* ------------------------------------------------------------------ */
    createWhatWeDo: builder.mutation<SaveResponse, Record<string, any>>({
      query: (body) => ({
        url: "what-we-do",
        method: "POST",
        body,
      }),
      invalidatesTags: ["what-we-do"],
    }),

    /* ------------------------------------------------------------------ */
    /* List                                                                */
    /* ------------------------------------------------------------------ */
    listWhatWeDo: builder.query<
      { success: boolean; items: WhatWeDoItem[]; pagination: any },
      ListQuery
    >({
      query: ({ page = 1, limit = 10, search, isActive } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) params.set("search", search);
        if (typeof isActive !== "undefined") {
          params.set("isActive", String(isActive));
        }
        return `what-we-do?${params.toString()}`;
      },
      providesTags: ["what-we-do"],
    }),

    /* ------------------------------------------------------------------ */
    /* Get By ID                                                           */
    /* ------------------------------------------------------------------ */
    getWhatWeDoById: builder.query<DetailResponse, number | string>({
      query: (id) => `what-we-do/${id}`,
      providesTags: ["what-we-do"],
    }),

    /* ------------------------------------------------------------------ */
    /* Update                                                              */
    /* ------------------------------------------------------------------ */
    updateWhatWeDo: builder.mutation<
      SaveResponse,
      { id: number | string; body: Record<string, any> }
    >({
      query: ({ id, body }) => ({
        url: `what-we-do/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["what-we-do"],
    }),

    /* ------------------------------------------------------------------ */
    /* Delete                                                              */
    /* ------------------------------------------------------------------ */
    deleteWhatWeDo: builder.mutation<
      { success: boolean; id: number },
      number | string
    >({
      query: (id) => ({
        url: `what-we-do/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["what-we-do"],
    }),

    /* ------------------------------------------------------------------ */
    /* Toggle Active (PATCH)                                               */
    /* ------------------------------------------------------------------ */
    toggleWhatWeDoActive: builder.mutation<
      SaveResponse,
      { id: number | string; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `what-we-do/${id}`,
        method: "PATCH",
        body: { isActive },
      }),
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
  useToggleWhatWeDoActiveMutation,
} = whatWeDoApi;
