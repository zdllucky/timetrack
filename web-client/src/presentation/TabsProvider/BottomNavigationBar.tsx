import { FC } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useTabs } from "./index";
import TabsConfig from "./config";
import { useStackNavigator } from "../Router";
import { useSelector } from "react-redux";
import { getTheme } from "../../app/slices/theme";

export const BottomNavigationBar: FC = () => {
  const { currentTab, setTab } = useTabs();
  const { popAll } = useStackNavigator(currentTab);
  const { area } = useSelector(getTheme);

  return (
    <BottomNavigation
      showLabels
      value={currentTab}
      onChange={(event, newValue) => setTab(newValue)}
      sx={{
        height: `calc(56px + ${area.offsetBottom}px)`,
        pb: `${area.offsetBottom}px`,
      }}
    >
      {TabsConfig.map(({ ctx, label, icon }, index) => (
        <BottomNavigationAction
          onClick={() => currentTab === index && popAll()}
          label={label}
          icon={icon}
          key={label}
        />
      ))}
    </BottomNavigation>
  );
};
