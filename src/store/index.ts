// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import pointsReducer from "./pointsSlice";

export const store = configureStore({
  reducer: {
    points: pointsReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
