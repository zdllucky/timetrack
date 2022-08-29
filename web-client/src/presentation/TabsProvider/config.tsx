import { Context, createContext, ReactNode } from "react";
import { StackNavigatorContextData } from "../Router";
import MainPage from "../MainPage";
import ProfilePage from "../ProfilePage";
import { Dashboard, Person } from "@mui/icons-material";

const data: StackNavigatorContextData = {
  push: async () => {},
  pop() {},
  popAll() {},
  canPop: false,
  isModal: false,
};

export const createDefaultContextData: () => Context<StackNavigatorContextData> =
  () => createContext(data);

export type TabConfig = {
  label: string;
  icon: ReactNode;
  root: ReactNode;
  ctx: Context<StackNavigatorContextData>;
};

export const TabsConfig: TabConfig[] = [
  {
    label: "Main",
    icon: <Dashboard />,
    root: <MainPage />,
    ctx: createDefaultContextData(),
  },
  {
    label: "Profile",
    root: <ProfilePage />,
    icon: <Person />,
    ctx: createDefaultContextData(),
  },
];
