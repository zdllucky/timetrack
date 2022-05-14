import { store } from "app/store";
import { Provider as StoreProvider } from "react-redux";
import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { useLocalTheme } from "../app/hooks/theme";
import { createContext, useMemo, useState } from "react";
import LoginPage from "./LoginPage";
import { globalStyle } from "../configuration/styles/global";
import { SnackbarProvider } from "notistack";
import { useIsAuthenticated } from "../app/hooks/auth";
import DashboardPage from "./DashboardPage";

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
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {isAuthenticated ? <RoutedApp /> : <LoginPage />}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const mainTabs = [{ name: "main" } /*, { name: "table" }, { name: "user" }*/];

const TabsContext = createContext<any>(null);

const RoutedApp = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<0 | 1 | 2>(0);

  return (
    <TabsContext.Provider
      value={{
        current: {
          index: currentTabIndex,
          name: mainTabs[currentTabIndex].name,
        },
        switchTab: setCurrentTabIndex,
      }}
    >
      {mainTabs.map(({ name }) => (
        <DashboardPage key={name} />
      ))}

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
    </TabsContext.Provider>
  );
};

export default App;
