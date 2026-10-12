import { api } from "../store/api";

const batoProgramApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    createBatoProgram: builder.mutation({
      query: (body) => ({
        url: "bato-program",
        method: "POST",
        body,
      }),

      invalidatesTags: ["bato-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | List
    |--------------------------------------------------------------------------
    */

    listBatoPrograms: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search,
        category,
        status,
        isPublished,
      }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));

        params.set("limit", String(limit));

        if (search) {
          params.set("search", search);
        }

        if (category) {
          params.set("category", category);
        }

        if (status) {
          params.set("status", status);
        }

        if (typeof isPublished !== "undefined") {
          params.set("isPublished", String(isPublished));
        }

        return `bato-program/admin/list?${params.toString()}`;
      },

      providesTags: ["bato-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Get By ID
    |--------------------------------------------------------------------------
    */

    getBatoProgramById: builder.query({
      query: (id) => `bato-program/${id}`,

      providesTags: ["bato-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    updateBatoProgramById: builder.mutation({
      query: ({ id, body }) => ({
        url: `bato-program/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["bato-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    deleteBatoProgram: builder.mutation({
      query: (id) => ({
        url: `bato-program/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["bato-program"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Publish
    |--------------------------------------------------------------------------
    */

    publishBatoProgramById: builder.mutation({
      query: ({ id, isPublished }) => ({
        url: `bato-program/${id}`,
        method: "PATCH",
        body: {
          isPublished,
        },
      }),

      invalidatesTags: ["bato-program"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateBatoProgramMutation,
  useListBatoProgramsQuery,
  useGetBatoProgramByIdQuery,
  useUpdateBatoProgramByIdMutation,
  useDeleteBatoProgramMutation,
  usePublishBatoProgramByIdMutation,
} = batoProgramApi;
