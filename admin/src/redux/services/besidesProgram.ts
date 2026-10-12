import { api } from "../store/api";

const besidesProgramApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */
    createBesidesProgram: builder.mutation({
      query: (body) => ({
        url: "besidprogram-admin/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["besides-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | List
    |--------------------------------------------------------------------------
    */
    listBesidesPrograms: builder.query({
      query: ({ page = 1, limit = 10, search, isPublished }) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) params.set("search", search);
        if (typeof isPublished !== "undefined" && isPublished !== "") {
          params.set("isPublished", String(isPublished));
        }
        return `besidprogram-admin/list?${params.toString()}`;
      },
      providesTags: ["besides-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Get By ID
    |--------------------------------------------------------------------------
    */
    getBesidesProgramById: builder.query({
      query: (id) => `besidprogram-admin/${id}`,
      providesTags: ["besides-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */
    updateBesidesProgramById: builder.mutation({
      query: ({ id, body }) => ({
        url: `besidprogram-admin/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["besides-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */
    deleteBesidesProgram: builder.mutation({
      query: (id) => ({
        url: `besidprogram-admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["besides-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Publish Toggle
    |--------------------------------------------------------------------------
    */
    publishBesidesProgramById: builder.mutation({
      query: (id) => ({
        url: `besidprogram-admin/toggle-publish/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["besides-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Reorder (drag & drop)
    |--------------------------------------------------------------------------
    */
    reorderBesidesPrograms: builder.mutation({
      query: (items: { id: number; order: number }[]) => ({
        url: `besidprogram-admin/reorder`,
        method: "PATCH",
        body: { items },
      }),
      invalidatesTags: ["besides-program"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateBesidesProgramMutation,
  useListBesidesProgramsQuery,
  useGetBesidesProgramByIdQuery,
  useUpdateBesidesProgramByIdMutation,
  useDeleteBesidesProgramMutation,
  usePublishBesidesProgramByIdMutation,
  useReorderBesidesProgramsMutation,
} = besidesProgramApi;
