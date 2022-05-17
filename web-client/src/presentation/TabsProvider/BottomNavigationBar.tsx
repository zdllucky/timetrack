import { FC } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useTabs } from "./index";
import TabsConfig from "./config";

export const BottomNavigationBar: FC = () => {
  const { currentTab, setTab } = useTabs();

  return (
    <BottomNavigation
      showLabels
      value={currentTab}
      onChange={(event, newValue) => setTab(newValue)}
    >
      {TabsConfig.map(({ label, icon }) => (
        <BottomNavigationAction label={label} icon={icon} key={label} />
      ))}
    </BottomNavigation>
  );
};
