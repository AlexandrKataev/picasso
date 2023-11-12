import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from './types';
import { BASE_URL } from '@shared/api';
import { setTotalCount } from '../model/postSlice';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPosts: build.query<Post[], { limit: number; start: number }>({
      query: ({ limit, start }) => ({
        url: '/posts',
        params: {
          _limit: limit,
          _start: start,
        },
        keepUnusedDataFor: 600,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCachedPosts, newPosts) => {
        currentCachedPosts.push(...newPosts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.start !== previousArg?.start;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          console.log(args);
          const { meta } = await queryFulfilled;
          const totalCount = meta?.response?.headers.get('X-Total-Count');
          totalCount && dispatch(setTotalCount(+totalCount));
        } catch (error) {}
      },
    }),

    getPostById: build.query<Post, number>({
      query: (id: number = 1) => ({
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postApi;
