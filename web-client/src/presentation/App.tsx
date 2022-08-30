import LoginPage from "./LoginPage";
import { SnackbarProvider } from "notistack";
import { useIsAuthenticated, useLocalTheme } from "../app/hooks";
import StyleProvider from "./StyleProvider";
import { StackNavigator } from "./Router";
import { FC } from "react";
import { store } from "../app/store";
import { Provider as StoreProvider } from "react-redux";
import { css, Global } from "@emotion/react";
import { TabsConfig, TabsProvider, useTabs } from "./TabsProvider";
import { NativeCallMocker } from "./NativeCallMocker";

// TODO: Provide context action buttons to imitate flutter calls

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
const AppWithNativeCallMocks: FC = () => (
  <NativeCallMocker>
    <AppWithTabs />
  </NativeCallMocker>
);

const AppWithStyles: FC = () => (
  <StyleProvider>
    <AppWithNativeCallMocks />
  </StyleProvider>
);

const AppWithStore: FC = () => (
  <StoreProvider store={store}>
    <AppWithStyles />
  </StoreProvider>
);

export default AppWithStore;
