import { useLocalTheme } from "../../app/hooks/theme";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { globalStyle } from "../../configuration/styles/global";

const StyleProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const {
    theme: { mode },
  } = useLocalTheme();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const [height, setHeight] = useState<number>(window.visualViewport.height);

  useEffect(() => {
    setHeight(window.visualViewport.height);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      <style>
        {`html, body, #root {
        height: ${height}px !important;
        overflow: hidden !important;
      }`}
      </style>
      {children}
    </ThemeProvider>
  );
};

export default StyleProvider;
