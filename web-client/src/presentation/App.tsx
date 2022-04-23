import { store } from "app/store";
import { Provider as StoreProvider } from "react-redux";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import Dashboard from "./dashboard";
import { useLocalTheme } from "../app/hooks/theme";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./login";
import AuthRoute from "./common/AuthRoute";
import { globalStyle } from "../configuration/styles/global";
import { SnackbarProvider } from "notistack";

const App = () => (
  <StoreProvider store={store}>
    <BrowserRouter>
      <StyledApp />
    </BrowserRouter>
  </StoreProvider>
);

const StyledApp = () => {
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
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
