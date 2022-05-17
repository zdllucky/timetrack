import { Context, createContext, ReactNode } from "react";
import { defaultContextData, StackNavigatorContextData } from "../Router";
import MainPage from "../MainPage";
import ProfilePage from "../ProfilePage";
import { Dashboard, Person } from "@mui/icons-material";

export type TabConfig = {
  label: string;
  icon: ReactNode;
  root: ReactNode;
  ctx: Context<StackNavigatorContextData>;
};

const TabsConfig: TabConfig[] = [
  {
    label: "Main",
    icon: <Dashboard />,
    root: <MainPage />,
    ctx: createContext(defaultContextData),
  },
  {
    label: "Profile",
    root: <ProfilePage />,
    icon: <Person />,
    ctx: createContext(defaultContextData),
  },
];

export default TabsConfig;
