import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch } from 'react-redux';
import newsReducer from './newsSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useReduxDispatch;

export default store;
