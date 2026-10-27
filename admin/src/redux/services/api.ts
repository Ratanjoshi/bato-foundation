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
    "Leadership", // ✅ ADDED THIS
  ],
  endpoints: () => ({}),
});

// ✅ Formation API
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

// ✅ Leadership API
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
