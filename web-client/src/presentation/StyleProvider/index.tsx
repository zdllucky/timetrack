import { useAppDispatch, useLocalTheme } from "../../app/hooks";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import globalStyle from "./globalStyle";
import { SafeArea, setArea } from "../../app/slices/theme";
import { flutterCall } from "../NativeCallMocker";
import { css, Global } from "@emotion/react";
import { disableScrolling, enableScrolling } from "../../helpers";
import useCreateAppTheme from "./useCreateAppTheme";

const StyleProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const {
    theme: { mode },
  } = useLocalTheme();
  const theme = useCreateAppTheme(mode);
  const dispatch = useAppDispatch();
  const [height, setHeight] = useState<number>(window.visualViewport.height);

  function updateSafeArea(event: Event) {
    dispatch(setArea((event as CustomEvent<SafeArea>).detail));
  }

  useEffect(() => {
    flutterCall((f) =>
      f.callHandler("set_safe_constraints").then(updateSafeArea)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("update_safe_constraints", updateSafeArea);
    disableScrolling();
    setHeight(window.visualViewport.height);

    return () => {
      enableScrolling();
      window.removeEventListener("update_safe_constraints", updateSafeArea);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default StyleProvider;
