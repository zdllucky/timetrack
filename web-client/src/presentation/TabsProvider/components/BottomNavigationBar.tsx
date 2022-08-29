import { FC } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useStackNavigator } from "../../Router";
import { getTheme } from "../../../app/slices/theme";
import { useTypedSelector } from "../../../app/hooks";
import { useTabs } from "../useTabs";
import { TabsConfig } from "../config";

export const BottomNavigationBar: FC = () => {
  const { currentTab, setTab } = useTabs();
  const { popAll } = useStackNavigator(currentTab);
  const { area } = useTypedSelector(getTheme);

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
