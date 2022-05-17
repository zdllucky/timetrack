import { FC } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useTabs } from "../TabsProvider";
import TabsConfig from "../TabsProvider/config";

const BottomNavigationBar: FC = () => {
  const { currentTab, setTab } = useTabs();

  return (
    <BottomNavigation
      showLabels
      value={currentTab}
      onChange={(event, newValue) => setTab(newValue)}
    >
      {TabsConfig.map(({ label, icon }) => (
        <BottomNavigationAction label={label} icon={icon} />
      ))}
    </BottomNavigation>
  );
};

export default BottomNavigationBar;
