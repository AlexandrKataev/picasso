import { postApi, postReducer } from '@entities/post';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: { postState: postReducer, [postApi.reducerPath]: postApi.reducer },
  devTools: import.meta.env.NODE_ENV === 'development',

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([postApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
