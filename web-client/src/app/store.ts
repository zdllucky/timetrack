import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/baseApi";
import logger from "redux-logger";
import authReducer from "./slices/auth";
import themeReducer from "./slices/theme";
import { e } from "../helpers";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(api.middleware);

    if (e`NODE_ENV` !== "development") middlewares.concat(logger);

    return middlewares;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
