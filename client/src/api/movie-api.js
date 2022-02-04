import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const movieAPI = createApi({
  reducerPath: 'movieAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  tagTypes: ['Movie'],
  endpoints: (build) => ({
    fetchMovie: build.query({
      query: () => ({
        url: '/movie'
      }),
      providesTags: () => ['Movie']
    }),
    fetchFullMovieInfo: build.mutation({
      query: (ids) => ({
        url: '/fullMovieInfo',
        method: 'POST',
        body: ids
      })
    })
  })
});
