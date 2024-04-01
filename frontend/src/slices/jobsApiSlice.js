import { apiSlice } from './apiSlice';

const JOBS_URL = 'http://localhost:5000/jobs';

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
     })
  })
})


export const {
 useFetchJobsQuery,
 useCreateJobsMutation,
 useFetchJobByIdQuery
} = jobsApiSlice
