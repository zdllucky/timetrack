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
import { useIsAuthenticated, useLocalTheme } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import Scaffold from "../Scaffold";
import DummyBlock from "../common/DummyBlock";
import { ArrowBack } from "@mui/icons-material";
import { createNamedRoute, useStackNavigator } from "../Router";
import { BottomNavigationBar, useTabs } from "../TabsProvider";

const MainPage: FC<{ testProp?: number }> = ({ testProp }) => {
  const {
    theme: { area, mode },
    toggleMode,
  } = useLocalTheme();
  const isAuthenticated: boolean = useIsAuthenticated();
  const { t, i18n } = useTranslation("translations");
  const { pop, push, canPop } = useStackNavigator();
  const { currentTab } = useTabs();

  return (
    <Scaffold
      bottomBar={canPop ? undefined : <BottomNavigationBar />}
      appBar={
        <AppBar
          position="static"
          sx={{
            pt: `${area?.offsetTop}px`,
          }}
        >
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
              {`${t(`${isAuthenticated ? "dashboard" : "sign_in"}`)} ${
                testProp ?? 0
              }`}
            </Typography>
          </Toolbar>
        </AppBar>
      }
    >
      <Stack sx={{ p: 2 }} direction="row" gap={1} flexWrap={"wrap"}>
        <Button
          variant={"outlined"}
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "ru" : "en")
          }
        >
          {t`locale.button`}
        </Button>
        <Button variant={"outlined"} onClick={toggleMode}>
          {t(`theme.${mode}`)}
        </Button>
        <Button
          variant={"outlined"}
          onClick={() =>
            push(<MainPage />).then(() => console.log("Hello Japan!"))
          }
        >
          Navigate
        </Button>

        <Button
          variant={"outlined"}
          onClick={() =>
            push("/", { props: [10] }).then(() => console.log("Hello Japan!"))
          }
        >
          Named navigate
        </Button>

        <Button
          variant={"outlined"}
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("pop_action_call", { detail: null })
            )
          }
        >
          Imitate pop
        </Button>

        <Button
          variant={"outlined"}
          onClick={() =>
            push(<MainPage />, {
              replace: 2,
              props: [12],
            }).then(() => console.log("Hello Japan!"))
          }
        >
          Navigate with replace x2
        </Button>
        <Button
          variant={"outlined"}
          onClick={() =>
            push(<MainPage />, { isModal: true }).then((v: any) =>
              console.log(v)
            )
          }
        >
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

createNamedRoute("/", (testProp) => <MainPage testProp={testProp} />);

export default MainPage;
