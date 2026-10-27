import { api } from "../store/api";

const timelineApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    createTimeline: builder.mutation({
      query: (body) => ({
        url: "timeline",
        method: "POST",
        body,
      }),

      invalidatesTags: ["timeline"],
    }),

    /*
    |--------------------------------------------------------------------------
    | List
    |--------------------------------------------------------------------------
    */

    listTimelines: builder.query({
      query: ({ page = 1, limit = 10, search, isPublished }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(limit));

        if (search) {
          params.set("search", search);
        }

        if (typeof isPublished !== "undefined" && isPublished !== "") {
          params.set("isPublished", String(isPublished));
        }

        return `timeline?${params.toString()}`;
      },

      providesTags: ["timeline"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Get By ID
    |--------------------------------------------------------------------------
    */

    getTimelineById: builder.query({
      query: (id) => `timeline/${id}`,

      providesTags: ["timeline"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    updateTimelineById: builder.mutation({
      query: ({ id, body }) => ({
        url: `timeline/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["timeline"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    deleteTimeline: builder.mutation({
      query: (id) => ({
        url: `timeline/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["timeline"],
    }),

    /*
    |--------------------------------------------------------------------------
    | Publish
    |--------------------------------------------------------------------------
    */

    publishTimelineById: builder.mutation({
      query: ({ id, isPublished }) => ({
        url: `timeline/${id}`,
        method: "PATCH",
        body: {
          isPublished,
        },
      }),

      invalidatesTags: ["timeline"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateTimelineMutation,
  useListTimelinesQuery,
  useGetTimelineByIdQuery,
  useUpdateTimelineByIdMutation,
  useDeleteTimelineMutation,
  usePublishTimelineByIdMutation,
} = timelineApi;
