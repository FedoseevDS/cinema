import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TOKEN = import.meta.env.VITE_API_KEY;

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.kinopoisk.dev/v1.4/' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ limit }) => ({
        headers: { 'X-API-KEY': TOKEN },
        method: 'get',
        params: { limit },
        url: '/movie',
      }),
    }),
    getItem: builder.query({
      query: ({ id }) => ({
        headers: { 'X-API-KEY': TOKEN },
        method: 'get',
        url: `/movie/${id}`,
      }),
    }),
    getSearch: builder.query({
      query: ({ value, limit }) => ({
        headers: { 'X-API-KEY': TOKEN },
        method: 'get',
        params: {
          limit,
          query: value,
        },
        url: '/movie/search',
      }),
    }),
  }),
  reducerPath: 'requestsApi',
});
