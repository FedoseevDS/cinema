import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TOKEN = import.meta.env.VITE_API_KEY;

export const requestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.kinopoisk.dev/v1.4/' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => ({
        headers: { 'X-API-KEY': TOKEN },
        method: 'get',
        params: { limit: 20 },
        url: '/movie',
      }),
    }),
  }),
  reducerPath: 'requestsApi',
});
