import { useLocalTheme } from "../../app/hooks/theme";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { globalStyle } from "../../configuration/styles/global";
import { useDispatch } from "react-redux";
import { SafeArea, setArea } from "../../app/slices/theme";
import { flutterCall } from "./types";
import { css, Global } from "@emotion/react";
import { disableScrolling, enableScrolling } from "../../helpers";

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
  const dispatch = useDispatch();
  const [height, setHeight] = useState<number>(window.visualViewport.height);

  function updateSafeArea(event: Event) {
    dispatch(setArea((event as CustomEvent<SafeArea>).detail));
  }

  useEffect(() => {
    flutterCall((f) =>
      f.callHandler("set_safe_constraints").then(updateSafeArea)
    );
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("update_safe_constraints", updateSafeArea);
    disableScrolling();
    setHeight(window.visualViewport.height);

    return () => {
      enableScrolling();
      window.removeEventListener("update_safe_constraints", updateSafeArea);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      <Global
        styles={css`
          html,
          body,
          #root {
            height: ${height}px !important;
            overflow: hidden !important;
          }
        `}
      />
      {children}
    </ThemeProvider>
  );
};

export * from "./types";

export default StyleProvider;
