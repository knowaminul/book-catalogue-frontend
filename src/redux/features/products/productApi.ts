import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentlyAddedProducts: builder.query({
      query: () => '/recently-added-books',
    }),
    getProducts: builder.query({
      query: () => ({
        url: '/books',
      }),
    }),
    singleProduct: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ['books'],
    }),
    createProduct: builder.mutation({
      query: ({ data }) => ({
        url: '/add-book',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit-book/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: `/review/${data.id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReview: builder.query({
      query: (id) => `/review/${id}`,
      providesTags: ['reviews'],
    }),
    getSearchResult: builder.query({
      query: ({ keyword }) => ({
        url: `/books/search`,
        params: { keyword },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetRecentlyAddedProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  usePostReviewMutation,
  useGetReviewQuery,
  useSingleProductQuery,
  useGetSearchResultQuery,
} = productApi;
