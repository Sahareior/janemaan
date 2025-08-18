import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"



export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://chasethecashsa.com/api/v1/",
    
    prepareHeaders: (headers) => {
      
      const token = localStorage.getItem('token')
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
        //  headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (build) => ({
    // auth...................
    signIn: build.mutation({
      query: (signinData) => {
        console.log(signinData, "from slice");
        return {
          url: "accounts/login/",
          method: "POST",
          body: signinData,
        };
      },
    }),

    getProfile: build.query({
      query: () => "/accounts/profile",
    }),

    // overview...............................

    getPrgress: build.query({
      query: () => "/progress",
    }),

    getDashboardStats: build.query({
      query: () => "cores/dashboard-stats/",
    }),

    getUserList: build.query({
      query: () => "accounts/users",
    }),

    // hunts.......................................
    getHunts: build.query({
      query: () => "hunts",
    }),

    createHunts: build.mutation({
      query: (newHunt) => {
        console.log(newHunt);
        return {
          url: "hunts/create/",

          method: "POST",
          body: newHunt,
        };
      },
    }),
    // http://10.10.13.19:8000/api/v1/hunts/f9460baf-847c-405e-8330-96be17e33103/update/
updateHunt: build.mutation({
  query: ({ id, formData }) => ({
    url: `hunts/${id}/update/`,
    method: "PATCH",
    body: formData,
    // No Content-Type header needed - browser will set it automatically with boundary
  }),
}),
    deleteHunt: build.mutation({
      query: (id) => ({
        url: `hunts/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    getTopHunt: build.query ({
      query: () => "/top-hunts/"
    }),

getHuntProgress: build.query({
  query: (id) => `/hunt-progress/${id}/`
}),
    // claims

    getClaims: build.query({
      query: () => "claims",
    }),


        deleteClaims: build.mutation({
      query: (id) => ({
        url: `claims/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    // cluse..................

    createClues: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `clues/${data.id}/create/`,
          method: "POST",
          body: data.clues,
        };
      },
    }),
    updateClues: build.mutation({
      query: ({ id, clueData }) => {
        console.log(id, clueData);
        return {
          url: `clues/${id}/update/`,
          method: "PATCH",
          body: clueData,
        };
      },
    }),

    deleteClue: build.mutation({
      query: (id) => ({
        url: `clues/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    // /clues/341e0a73-f78e-4b90-a344-3f2fef501144/delete/

    claimsUpdate: build.mutation({
      query: ({ id, formData }) => {
        console.log(id, formData);
        return {
          url: `claims/${id}/update/`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    // claims/1/update/

    getClues: build.query({
      query: () => "clues",
    }),

    // plans.................................................

    getPlan: build.query({
      query: () => "/subscriptions/plans",
    }),

    createPlans: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `subscriptions/plans/create/`,
          method: "POST",
          body: data,
        };
      },
    }),

    updatePlans: build.mutation({
      query: ({ id, dataToLog }) => {
        console.log(id);
        return {
          url: `subscriptions/plans/${id}/update/`,
          method: "PATCH",
          body: dataToLog,
        };
      },
    }),

    deletePlan: build.mutation({
      query: (id) => ({
        url: `subscriptions/plans/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    getUserGrowth: build.query({
      query: () => "subscriptions/growth-history/",
    }),
    getUserRevinew: build.query({
      query: () => "subscriptions/revenue-history/",
    }),

    // http://10.10.13.19:8000/api/v1/subscriptions/plans/3/create/
    // Qr Codes.............................

    getQrCodes: build.query({
      query: () => "/qrcodes",
    }),

    deleteQrCode: build.mutation({
      query: (id) => ({
        url: `qrcodes/${id}/delete/`,
        method: "DELETE",
      }),
    }),

    updateQrCode: build.mutation({
      query: ({ id, qrData }) => {
        console.log(id, qrData);
        return {
          url: `qrcodes/${id}/update/`,
          method: "PATCH",
          body: qrData,
        };
      },
    }),

    // settings...............................................
    getPrivacy: build.query({
      query: () => "cores/privacy-policy/",
    }),

    getPolicy: build.query({
      query: () => "cores/terms-conditions/",
    }),

    updatePolicy: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "cores/terms-conditions/update/",
          method: "POST",
          body: data,
        };
      },
    }),

    updatePrivacy: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `cores/privacy-policy/update/`,
          method: "POST",
          body: data,
        };
      },
    }),
    // users.....................

    getUsers: build.query({
      query: () => "accounts/users/",
    }),

    getAllVoucher: build.query({
      query: () => '/vouchers'
    }),

    createVoucher: build.mutation({
      query: ({huntId,payload}) =>{
        console.log(payload,huntId)
        return{
          url: `vouchers/${huntId}/create/`,
          method:"POST",
          body:payload
        }
      }
    }),

    updateVoucher: build.mutation({
        query: ({payload,huntId}) =>{
        console.log(payload,huntId)
        return{
          url: `vouchers/${huntId}/update/`,
          method:"PATCH",
          body:payload
        }
      }
    }),
        deleteVoucher: build.mutation({
      query: (id) => ({
        url: `/vouchers/${id}/delete/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useClaimsUpdateMutation,
  useDeleteVoucherMutation,
  useUpdateVoucherMutation,
  useGetAllVoucherQuery,
  useCreateVoucherMutation,
  useGetPrgressQuery,
  useGetDashboardStatsQuery,
  useGetPolicyQuery,
  useGetHuntsQuery,
  useCreateHuntsMutation,
  useUpdatePolicyMutation,
  useDeleteHuntMutation,
  useSignInMutation,
  useUpdateHuntMutation,
  useCreatePlansMutation,
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
  useCreateCluesMutation,
  useGetCluesQuery,
  useGetQrCodesQuery,
  getClueProgress,
  useDeleteClueMutation,
  useGetPlanQuery,
  useDeletePlanMutation,
  useUpdatePlansMutation,
  useUpdateQrCodeMutation,
  useGetUsersQuery,
  useGetUserGrowthQuery,
  useGetUserRevinewQuery,
  useGetClaimsQuery,
  useUpdateCluesMutation,
  useDeleteQrCodeMutation,
  useGetTopHuntQuery,
  useGetHuntProgressQuery,
  useDeleteClaimsMutation
} = apiSlice;
