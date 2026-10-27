import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/tokenHandler";
import { BACKEND_BASE_URL } from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken("token");
    if (token) {
      headers.set("authorization", `Admin ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "users",
    "role",
    "media-category",
    "media",
    "department",
    "interview",
    "question",
    "cliparts",
    "seo",
    "social",
    "setting",
    "faq",
    "notification",
    "email-template",
    "smtp",
    "service",
    "portfolio",
    "technologies",
    "testimonial",
    "bato-program",
    "besides-program",
    "AboutPreview",
    "what-we-do",
    "Formation",
    "Leadership",
    "DirectorMessage",
    "timeline", // ✅ ADDED
  ],
  endpoints: () => ({}),
});

// ==========================================
// ✅ Formation API
// ==========================================
export const formationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFormation: builder.query<any, void>({
      query: () => "/formation",
      providesTags: ["Formation"],
    }),
    updateFormation: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/formation",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Formation"],
    }),
  }),
});

export const { useGetFormationQuery, useUpdateFormationMutation } =
  formationApi;

// ==========================================
// ✅ Leadership API
// ==========================================
export const leadershipApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listLeaderships: builder.query<any, any>({
      query: (params) => ({
        url: "/leadership",
        method: "GET",
        params,
      }),
      providesTags: ["Leadership"],
    }),
    getLeadershipById: builder.query<any, string | number>({
      query: (id) => ({
        url: `/leadership/${id}`,
        method: "GET",
      }),
      providesTags: ["Leadership"],
    }),
    createLeadership: builder.mutation<any, any>({
      query: (body) => ({
        url: "/leadership",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leadership"],
    }),
    updateLeadership: builder.mutation<any, { id: string | number; body: any }>(
      {
        query: ({ id, body }) => ({
          url: `/leadership/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Leadership"],
      },
    ),
    deleteLeadership: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/leadership/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leadership"],
    }),
  }),
});

export const {
  useListLeadershipsQuery,
  useGetLeadershipByIdQuery,
  useCreateLeadershipMutation,
  useUpdateLeadershipMutation,
  useDeleteLeadershipMutation,
} = leadershipApi;

// ==========================================
// ✅ Director Message API
// ==========================================
export const directorMessageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDirectorMessage: builder.query<any, string>({
      query: () => "/directormessage/active",
      providesTags: ["DirectorMessage"],
    }),
    updateDirectorMessage: builder.mutation<any, any>({
      query: (body) => ({
        url: `/directormessage/1`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DirectorMessage"],
    }),
  }),
});

export const { useGetDirectorMessageQuery, useUpdateDirectorMessageMutation } =
  directorMessageApi;

// ==========================================
// ✅ NEW: Timeline API
// ==========================================
export const timelineApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listTimelines: builder.query<any, any>({
      query: ({ page = 1, limit = 10, search, isPublished }) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));

        if (search) params.set("search", search);

        if (typeof isPublished !== "undefined" && isPublished !== "") {
          params.set("isPublished", String(isPublished));
        }

        return {
          url: `/timeline?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["timeline"],
    }),

    getTimelineById: builder.query<any, string | number>({
      query: (id) => ({
        url: `/timeline/${id}`,
        method: "GET",
      }),
      providesTags: ["timeline"],
    }),

    createTimeline: builder.mutation<any, any>({
      query: (body) => ({
        url: "/timeline",
        method: "POST",
        body,
      }),
      invalidatesTags: ["timeline"],
    }),

    updateTimelineById: builder.mutation<
      any,
      { id: string | number; body: any }
    >({
      query: ({ id, body }) => ({
        url: `/timeline/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["timeline"],
    }),

    deleteTimeline: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/timeline/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["timeline"],
    }),

    publishTimelineById: builder.mutation<
      any,
      { id: string | number; isPublished: boolean }
    >({
      query: ({ id, isPublished }) => ({
        url: `/timeline/${id}`,
        method: "PATCH",
        body: { isPublished },
      }),
      invalidatesTags: ["timeline"],
    }),
  }),
});

// ✅ Export all timeline hooks
export const {
  useListTimelinesQuery,
  useGetTimelineByIdQuery,
  useCreateTimelineMutation,
  useUpdateTimelineByIdMutation,
  useDeleteTimelineMutation,
  usePublishTimelineByIdMutation,
} = timelineApi;
