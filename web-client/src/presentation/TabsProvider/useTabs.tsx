import { useContext } from "react";
import { TabsContext } from "./components/TabsProvider";

export const useTabs = () => useContext(TabsContext);
