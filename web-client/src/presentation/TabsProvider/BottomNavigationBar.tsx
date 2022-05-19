import { FC } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useTabs } from "./index";
import TabsConfig from "./config";
import { useStackNavigator } from "../Router";

export const BottomNavigationBar: FC = () => {
  const { currentTab, setTab } = useTabs();
  const { popAll } = useStackNavigator(currentTab);

  return (
    <BottomNavigation
      showLabels
      value={currentTab}
      onChange={(event, newValue) => setTab(newValue)}
    >
      {TabsConfig.map(({ ctx, label, icon }, index) => (
        <BottomNavigationAction
          onClick={() => {
            if (currentTab === index) popAll();
          }}
          label={label}
          icon={icon}
          key={label}
        />
      ))}
    </BottomNavigation>
  );
};
