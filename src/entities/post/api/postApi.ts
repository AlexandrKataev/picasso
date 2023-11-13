import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from './types';
import { BASE_URL } from '@shared/api';
import { setPosts, setTotalCount } from '../model/postSlice';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 1000000000,
  endpoints: (build) => ({
    getPosts: build.query<Post[], { limit: number; start: number }>({
      query: ({ limit, start }) => ({
        url: '/posts',
        params: {
          _limit: limit,
          _start: start,
        },
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
          const { meta } = await queryFulfilled;
          const totalCount = meta?.response?.headers.get('X-Total-Count');
          totalCount && dispatch(setTotalCount(+totalCount));
        } catch (error) {
          console.log(args, error);
        }
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
