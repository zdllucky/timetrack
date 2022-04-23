import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ThemeMode = "light" | "dark";

export type ThemeState = {
  mode: ThemeMode;
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" } as ThemeState,
  reducers: {
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export default themeSlice.reducer;

export const { setMode, toggleMode } = themeSlice.actions;

export const getTheme = (state: RootState) => state.theme;

export {};
