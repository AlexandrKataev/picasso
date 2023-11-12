import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@shared/api';
import { Comment } from './types';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getComments: build.query<Comment[], number>({
      query: (postId) => ({
        url: `/comments?postId=${postId}`,
        keepUnusedDataFor: 600000,
      }),
    }),
  }),
});

export const { useGetCommentsQuery } = commentApi;
