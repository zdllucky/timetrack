import { Context, createContext, ReactNode } from "react";
import { defaultContextData, StackNavigatorContextData } from "../Router";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dashboard from "../DashboardPage";

export type TabConfig = {
  label: string;
  icon: ReactNode;
  root: ReactNode;
  ctx: Context<StackNavigatorContextData>;
};

const TabsConfig: TabConfig[] = [
  {
    label: "Main",
    icon: <RestoreIcon />,
    root: <Dashboard />,
    ctx: createContext(defaultContextData),
  },
  {
    label: "Profile",
    root: <Dashboard />,
    icon: <FavoriteIcon />,
    ctx: createContext(defaultContextData),
  },
];

export default TabsConfig;
