import { useContext } from "react";
import { TabsConfig, useTabs } from "../TabsProvider";
import { StackNavigatorContextData } from "./";

export const useStackNavigator = (
  tabIndex: number = -1
): StackNavigatorContextData => {
  const { currentTab } = useTabs();
  const tab = tabIndex >= 0 ? tabIndex : currentTab;

  return useContext(TabsConfig[tab].ctx);
};
