import { useMemo } from "react";
import { createTheme } from "@mui/material";
import { ThemeMode } from "../../app/slices/theme";
import { deepPurple } from "@mui/material/colors";

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
          primary: {
            main: deepPurple["A200"],
          },
          secondary: {
            main: "#fff",
          },
          mode,
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [mode]
  );

export default useCreateAppTheme;
