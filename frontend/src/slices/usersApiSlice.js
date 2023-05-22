import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
     updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
     deleteMyAccount: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/delete`,
        method: 'DELETE',
      }),
    }),
     allUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/all`,
        method: 'GET',
      }),
    }),
    getUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'GET'
      }),
    }),
    followUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/follow`,
        method: 'PUT',
        body: data,
      }),
    }),
    unfollowUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/unfollow`,
        method: 'PUT',
        body: data,
      }),
    }),
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteMyAccountMutation,
  useAllUsersMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserMutation
} = usersApiSlice;


