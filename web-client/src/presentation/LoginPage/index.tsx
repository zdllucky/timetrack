import { FC } from "react";
import { AppBar, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthForm from "./blocks/AuthForm";
import Scaffold from "../Scaffold";
import { useLocalTheme } from "../../app/hooks/theme";

const LoginPage: FC = () => {
  const { t } = useTranslation("translations");
  const {
    theme: { area },
  } = useLocalTheme();
  const theme = useTheme();

  return (
    <Scaffold
      flexDirection="column"
      display="flex"
      fullscreen
      sx={{
        pb: `${area?.offsetBottom}px`,
      }}
      appBar={
        <AppBar
          sx={{
            pt: `${area?.offsetTop}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t`p.login.appbar`}
            </Typography>
          </Toolbar>
        </AppBar>
      }
    >
      <Stack
        padding={2}
        height="100%"
        flexDirection="column"
        flexWrap="nowrap"
        overflow="auto"
        sx={{
          "& > :first-of-type": {
            mt: "auto",
          },
        }}
      >
        <AuthForm />
      </Stack>
    </Scaffold>
  );
};

export default LoginPage;
