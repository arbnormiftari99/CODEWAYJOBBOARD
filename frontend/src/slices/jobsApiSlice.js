import { apiSlice } from './apiSlice';

const JOBS_URL = 'http://localhost:5000/jobs';

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchJobs: builder.query({
      query: () => ({
        url: JOBS_URL,
        method: 'GET'
      })
    }),
  })
})


export const {
 useFetchJobsQuery
} = jobsApiSlice
