import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import TabsConfig from "./config";

const TabsContext = createContext<{
  currentTab: number;
  setTab: (index: number) => void;
}>({ currentTab: 0, setTab() {} });

export const useTabs = () => useContext(TabsContext);

const TabsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
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
export * from "./config";
export default TabsProvider;
