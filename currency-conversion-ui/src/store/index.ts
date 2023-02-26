import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "./history.store";
import currencyReducer from "./exchange.store";

export const store = configureStore({
  reducer: {
    exchange: exchangeReducer,
    currency: currencyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
