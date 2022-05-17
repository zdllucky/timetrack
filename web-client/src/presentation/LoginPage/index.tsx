import { FC } from "react";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthForm from "./blocks/AuthForm";
import Scaffold from "../Scaffold";

const LoginPage: FC = () => {
  const { t } = useTranslation("translations");

  return (
    <Scaffold
      flexDirection="column"
      display="flex"
      fullscreen
      appBar={
        <AppBar elevation={0} color="transparent">
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
