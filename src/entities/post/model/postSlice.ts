import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../api/types';

interface PostState {
  posts: Post[] | null;
  limit: number;
  page: number;
}

const initialState: PostState = {
  posts: null,
  limit: 10,
  page: 0,
};

export const postSlice = createSlice({
  initialState,
  name: 'postSlice',
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const postReducer = postSlice.reducer;

export const { setPosts } = postSlice.actions;
