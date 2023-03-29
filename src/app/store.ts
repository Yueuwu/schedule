import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import schedule from "../features/schedule/scheduleSlice";

export const store = configureStore({
  reducer: {
    schedule
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
