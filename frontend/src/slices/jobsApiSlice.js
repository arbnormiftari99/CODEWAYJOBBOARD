import { apiSlice } from './apiSlice';

const JOBS_URL = 'https://codewayjobboard.vercel.app/jobs';

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchJobs: builder.query({
      query: () => ({
        url: JOBS_URL,
        method: 'GET'
      }),
      providesTags: (result, error, arg) => [
        { type: 'Jobs', id: 'fetchall' }
    ],
    }),
    fetchJobById: builder.query({
      query: (id) => ({
        url: `${JOBS_URL}/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [
        {type: 'Jobs', id}
      ]
    }),
    createJobs: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/createjob`,
        method: 'POST',
        body: data,
        credentials: "include"
      }),
      invalidatesTags: [{ type: 'Jobs', id: 'fetchall' }]   
     }),
     applyJob: builder.mutation({
      query: (data) => ({
        url: `${JOBS_URL}/applyjob`,
        method: 'POST',
        body: data,
        credentials: "include"
      })
     }),
     deleteJob: builder.mutation({
      query: (id) => ({
        url: `${JOBS_URL}/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: [{ type: 'Jobs', id: 'fetchall' }]   
     })
  })
})


export const {
 useFetchJobsQuery,
 useCreateJobsMutation,
 useFetchJobByIdQuery,
 useApplyJobMutation,
 useDeleteJobMutation
} = jobsApiSlice
