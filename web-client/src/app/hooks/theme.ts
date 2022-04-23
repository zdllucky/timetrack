import { useDispatch, useSelector } from "react-redux";
import { getTheme, setMode, ThemeMode, toggleMode } from "../slices/theme";
import { useMemo } from "react";

export const useLocalTheme = () => {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();

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
