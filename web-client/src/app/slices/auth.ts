import { createSlice } from "@reduxjs/toolkit";
import { api } from "../repository/auth/authenticateUserWithPassword.generated";
import { UserAuthenticationWithPasswordSuccess } from "../services/types.generated";
import { RootState } from "../store";

type AuthState = {
  token: string | undefined;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: undefined } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.authenticateUserWithPassword.matchFulfilled,
      (state, { payload }) => {
        state.token = (
          payload.authenticateUserWithPassword as UserAuthenticationWithPasswordSuccess
        ).sessionToken;
      }
    );
  },
});

export default authSlice.reducer;

export const getAuthToken = (state: RootState) => state.auth.token;

export {};
