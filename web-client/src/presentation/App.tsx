import { store } from "app/store";
import { Provider as StoreProvider } from "react-redux";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { useLocalTheme } from "../app/hooks/theme";
import { useMemo } from "react";
import LoginPage from "./LoginPage";
import { globalStyle } from "../configuration/styles/global";
import { SnackbarProvider } from "notistack";
import { useIsAuthenticated } from "../app/hooks/auth";
import MainScaffold from "./MainScaffold";

const App = () => (
  <StoreProvider store={store}>
    <StyledApp />
  </StoreProvider>
);

const StyledApp = () => {
  const isAuthenticated = useIsAuthenticated();
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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyle} />
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {isAuthenticated ? <MainScaffold /> : <LoginPage />}
        {/*<Routes>*/}
        {/*  <Route*/}
        {/*    index*/}
        {/*    element={*/}
        {/*      <AuthRoute>*/}
        {/*        */}
        {/*      </AuthRoute>*/}
        {/*    }*/}
        {/*  />*/}
        {/*  <Route path="login" element={} />*/}
        {/*</Routes>*/}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
