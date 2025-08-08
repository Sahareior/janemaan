import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.19:8000/api/v1/",
    // http://10.10.13.19:8000/api/v1/hunts/  "http://10.10.13.19:8000/api/v1/cores/", hunts/create/

    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU0NzM2NzUxLCJpYXQiOjE3NTQ2NTAzNTEsImp0aSI6IjU5Y2VhOGY3ODZiZDRjOGM5MDkzYTkzNzM3MzA0MTVhIiwidXNlcl9pZCI6Nn0.1vHTuD7mC0S4koISvl8tsMKjdkH6Cjn77wgMm6P_ioM";

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getDashboardStats: build.query({
      query: () => "dashboard-stats",
    }),

    getPrgress: build.query({
      query: () => "progress",
    }),

// hunts.......................................
getHunts: build.query({
    query: () => "hunts",
}),

    createHunts: build.mutation({
      query: (newHunt) => ({
        url: "hunts/create/",
        method: "POST",
        body: newHunt,
        formData: true,
      }),
    }),

  }),
});

export const
 { useGetPrgressQuery, useGetDashboardStatsQuery,useGetHuntsQuery, useCreateHuntsMutation


 } = apiSlice;
