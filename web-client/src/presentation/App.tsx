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

  return (
    <StyleProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
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
    </StyleProvider>
  );
};

const AppWithStore: FC = () => (
  <StoreProvider store={store}>
    <AppWithTabs />
  </StoreProvider>
);

export default AppWithStore;
