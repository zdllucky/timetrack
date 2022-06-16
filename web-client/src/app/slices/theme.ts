import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ThemeMode = "light" | "dark";

export type SafeArea = {
  offsetLeft: number;
  offsetTop: number;
  offsetBottom: number;
  offsetRight: number;
  width: number;
  height: number;
};

const initialState: ThemeState = {
  mode: "light",
  area: {
    offsetLeft: 0,
    offsetTop: 0,
    offsetBottom: 0,
    offsetRight: 0,
    width: 0,
    height: 0,
  },
};

export type ThemeState = {
  mode: ThemeMode;
  area: SafeArea;
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setArea: (state, action: PayloadAction<SafeArea>) => {
      state.area = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const { setMode, toggleMode, setArea } = themeSlice.actions;

export const getTheme = (state: RootState) => state.theme;

export {};
