import { apiSlice } from './apiSlice'

const USERS_URL = 'https://codewayjobboard.vercel.app/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST', 
                body: data,
                credentials: "include"
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: "include",

            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                credentials: "include",

            })
        }),  
    }),
})


export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useUpdateProfileMutation,
     useTestMutation,
    useTesttestQuery } = usersApiSlice;