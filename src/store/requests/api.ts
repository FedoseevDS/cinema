import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TOKEN = import.meta.env.VITE_API_KEY;

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/v1.4/',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', TOKEN);
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ params, search }) => {
        const query = new URLSearchParams(search.query ? search : params).toString();
        return {
          method: 'get',
          url: search.query ? `/movie/search?${query}` : `/movie?${query}`,
        };
      },
    }),
    getItem: builder.query({
      query: ({ id }) => ({
        method: 'get',
        url: `/movie/${id}`,
      }),
    }),
  }),
  reducerPath: 'requestsApi',
});
