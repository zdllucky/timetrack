import LoginPage from "./LoginPage";
import { SnackbarProvider } from "notistack";
import { useIsAuthenticated } from "../app/hooks/auth";
import StyleProvider from "./StyleProvider";
import TabsProvider, { useTabs } from "./TabsProvider";
import { StackNavigator } from "./Router";
import { FC } from "react";
import { store } from "../app/store";
import { Provider as StoreProvider } from "react-redux";
import TabsConfig from "./TabsProvider/config";
import { useLocalTheme } from "../app/hooks/theme";
import { css, Global } from "@emotion/react";

const AppWithNavigation: FC = () => {
  const { currentTab } = useTabs();

  return (
    <>
      {TabsConfig.map(({ ctx, root, label }, index) => (
        <StackNavigator
          key={label}
          root={root}
          ctx={() => ctx}
          hidden={currentTab !== index}
        />
      ))}
    </>
  );
};

const AppWithTabs: FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const { theme } = useLocalTheme();

  return (
    <>
      <Global
        styles={css`
          .snackbar-container-override {
            margin-top: ${theme.area?.offsetTop || 0}px !important;
          }
        `}
      />
      <SnackbarProvider
        preventDuplicate
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          containerAnchorOriginTopCenter: "snackbar-container-override",
        }}
      >
        {isAuthenticated ? (
          <TabsProvider>
            <AppWithNavigation />
          </TabsProvider>
        ) : (
          <LoginPage />
        )}
      </SnackbarProvider>
    </>
  );
};

const AppWithStyles: FC = () => (
  <StyleProvider>
    <AppWithTabs />
  </StyleProvider>
);

const AppWithStore: FC = () => (
  <StoreProvider store={store}>
    <AppWithStyles />
  </StoreProvider>
);

export default AppWithStore;
