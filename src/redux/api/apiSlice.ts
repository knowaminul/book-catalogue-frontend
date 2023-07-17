import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catelogue.vercel.app/api/v1/',
  }),
  tagTypes: ['books', 'reviews'],
  endpoints: () => ({}),
});
