import { createContext, FC, PropsWithChildren, useState } from "react";
import { TabsConfig } from "../config";

export const TabsContext = createContext<{
  currentTab: number;
  setTab: (index: number) => void;
}>({ currentTab: 0, setTab() {} });

export const TabsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const setTab = (index: number) =>
    index >= 0 && index < TabsConfig.length && setCurrentTabIndex(index);

  return (
    <TabsContext.Provider
      value={{
        currentTab: currentTabIndex,
        setTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
