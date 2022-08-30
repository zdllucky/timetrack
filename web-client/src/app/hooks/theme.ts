import { getTheme, setMode, ThemeMode, toggleMode } from "../slices/theme";
import { useMemo } from "react";
import { useAppDispatch, useTypedSelector } from "./store";

export const useLocalTheme = () => {
  const theme = useTypedSelector(getTheme);
  const dispatch = useAppDispatch();

  // noinspection JSUnusedGlobalSymbols
  return useMemo(
    () => ({
      theme,
      setMode: (mode: ThemeMode) => dispatch(setMode(mode)),
      toggleMode: () => dispatch(toggleMode()),
    }),
    // eslint-disable-next-line
    [theme]
  );
};
