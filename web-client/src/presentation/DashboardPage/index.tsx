import { FC } from "react";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useIsAuthenticated } from "../../app/hooks/auth";
import { useTranslation } from "react-i18next";
import { useLocalTheme } from "../../app/hooks/theme";
import Scaffold from "../Scaffold";
import BottomNavigationBar from "../common/BottomNavigationBar";
import DummyBlock from "../common/DummyBlock";

const Dashboard: FC = () => {
  const { theme, toggleMode } = useLocalTheme();
  const isAuthenticated: boolean = useIsAuthenticated();
  const { t, i18n } = useTranslation("translations");

  return (
    <Scaffold
      bottomBar={<BottomNavigationBar />}
      appBar={
        <AppBar variant="elevation" position="static">
          <Toolbar>
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
      </Stack>
      <DummyBlock />
      <DummyBlock />
      <DummyBlock />
      <DummyBlock />
    </Scaffold>
  );
};

export default Dashboard;
