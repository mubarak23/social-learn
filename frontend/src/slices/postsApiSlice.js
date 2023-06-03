import { POSTS_URL } from '../constants';
import { apiSlice } from './apiSlice';


export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostsFeed: builder.query({
      query: () => ({
        url: `${POSTS_URL}/feed`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Posts'],
    }),
    getPostDetails: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: 'GET'
      }),
      keepUnusedDataFor: 5,
    }),
    getUserPosts: builder.query({
      query: (userId) => ({
        url: `${POSTS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
     deletePost: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: 'POST',
         body: data,
      }),
    }),
}),

})

export const {
  useCreatePostMutation,
  useGetPostsFeedQuery,
  useGetPostDetailsMutation,
  useGetUserPostsQuery,
  useDeletePostQuery
} = postsApiSlice;