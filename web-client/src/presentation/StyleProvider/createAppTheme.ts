import { useMemo } from "react";
import { createTheme } from "@mui/material";
import { ThemeMode } from "../../app/slices/theme";

const useCreateAppTheme = (mode: ThemeMode) =>
  useMemo(
    () =>
      createTheme({
        components: {
          MuiAppBar: {
            defaultProps: {
              elevation: 1,
              color: "secondary",
            },
          },
          MuiTextField: {
            defaultProps: {
              color: "primary",
            },
          },
        },
        palette: {
          secondary: {
            main: "#fff",
          },
          mode,
        },
      }),
    [mode]
  );

export default useCreateAppTheme;
