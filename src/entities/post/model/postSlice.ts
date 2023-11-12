import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../api/types';

interface PostState {
  posts: Post[] | null;
  limit: number;
  page: number;
  totalCount: number;
}

const initialState: PostState = {
  posts: null,
  limit: 10,
  page: 0,
  totalCount: 0,
};

export const postSlice = createSlice({
  initialState,
  name: 'postSlice',
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    nextPage: (state) => {
      state.page = state.page + 1;
    },
  },
});

export const postReducer = postSlice.reducer;

export const { setPosts, setTotalCount, nextPage } = postSlice.actions;
