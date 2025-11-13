import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from './store'

export interface Post {
  id: number
  title: string
  content: string
  category: string
  author: string
  authorId: number
  createdAt: string
  updatedAt?: string
}

export interface User {
  id: number
  username: string
  email: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getCurrentUser: builder.query<{ user: User }, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    // Category endpoints
    getCategories: builder.query<string[], void>({
      query: () => '/categories',
    }),

    // Post endpoints
    getPosts: builder.query<Post[], string | void>({
      query: (category) => category ? `/posts?category=${category}` : '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, { id: number; data: Partial<Post> }>({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }, 'Post'],
    }),
    deletePost: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    searchPosts: builder.query<Post[], { query: string; category?: string }>({
      query: ({ query, category }) => 
        category 
          ? `/posts/search/${query}?category=${category}` 
          : `/posts/search/${query}`,
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useGetCategoriesQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useSearchPostsQuery,
  useLazySearchPostsQuery,
} = apiSlice
