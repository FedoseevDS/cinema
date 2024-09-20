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
      query: ({ page }) => ({
        method: 'get',
        params: { limit: 50, notNullFields: 'name', page },
        url: '/movie',
      }),
    }),
    getFilters: builder.query({
      query: ({ year, ratings, genres, country, page }) => {
        return {
          method: 'get',
          params: {
            ...(country ? { 'countries.name': country } : null),
            ...(genres ? { 'genres.name': genres } : null),
            limit: 50,
            page,
            ...(ratings ? { 'rating.kp': ratings } : null),
            ...(year ? { year: year } : null),
            notNullFields: 'name',
          },
          url: `/movie`,
        };
      },
    }),
    getItem: builder.query({
      query: ({ id }) => ({
        method: 'get',
        url: `/movie/${id}`,
      }),
    }),
    getSearch: builder.query({
      query: ({ value, page }) => ({
        method: 'get',
        params: {
          limit: 50,
          page,
          query: value,
        },
        url: '/movie/search',
      }),
    }),
  }),
  reducerPath: 'requestsApi',
});
