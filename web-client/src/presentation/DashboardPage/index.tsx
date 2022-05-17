import { FC } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useIsAuthenticated } from "../../app/hooks/auth";
import { useTranslation } from "react-i18next";
import { useLocalTheme } from "../../app/hooks/theme";
import Scaffold from "../Scaffold";
import BottomNavigationBar from "../common/BottomNavigationBar";
import DummyBlock from "../common/DummyBlock";
import { ArrowBack } from "@mui/icons-material";
import { useStackNavigator } from "../Router";
import { useTabs } from "../TabsProvider";

const Dashboard: FC = () => {
  const { theme, toggleMode } = useLocalTheme();
  const isAuthenticated: boolean = useIsAuthenticated();
  const { t, i18n } = useTranslation("translations");
  const { pop, push, canPop } = useStackNavigator();
  const { currentTab } = useTabs();

  return (
    <Scaffold
      bottomBar={canPop ? undefined : <BottomNavigationBar />}
      appBar={
        <AppBar variant="elevation" position="static">
          <Toolbar>
            {canPop && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={pop}
              >
                <ArrowBack />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t(`${isAuthenticated ? "dashboard" : "sign_in"}`)}
            </Typography>
          </Toolbar>
        </AppBar>
      }
    >
      <Stack sx={{ p: 2 }} direction="row" spacing={1}>
        <Button
          variant={"outlined"}
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "ru" : "en")
          }
        >
          {t`locale.button`}
        </Button>
        <Button variant={"outlined"} onClick={toggleMode}>
          {t(`theme.${theme.mode}`)}
        </Button>
        <Button variant={"outlined"} onClick={() => push(<Dashboard />)}>
          Navigate
        </Button>
        <Button variant={"outlined"} onClick={() => push(<Dashboard />, true)}>
          Navigate modal
        </Button>
        <Button variant={"outlined"} disabled={!canPop} onClick={pop}>
          Pop
        </Button>
      </Stack>
      {`Current tab is: ${currentTab}.`}
      <br />
      <TextField name="password" label="Password" type="password" />
      <DummyBlock />
      <DummyBlock />
      <DummyBlock />
      <DummyBlock />
      <TextField name="password" label="Password" type="password" />
    </Scaffold>
  );
};

export default Dashboard;
