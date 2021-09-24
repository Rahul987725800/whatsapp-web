import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./reducers/generalReducer";
import messageReducer from "./reducers/messageReducer";
export const store = configureStore({
  reducer: {
    message: messageReducer,
    general: generalReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
