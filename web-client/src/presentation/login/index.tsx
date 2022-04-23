import { FC } from "react";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { useIsAuthenticated } from "../../app/hooks/auth";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";
import AuthForm from "./blocks/AuthForm";

const LoginPage: FC = () => {
  const isAuthenticated: boolean = useIsAuthenticated();
  const { t } = useTranslation("translations");
  const { state }: any = useLocation();

  return isAuthenticated ? (
    <Navigate to={state?.from ?? "/"} replace />
  ) : (
    <Box height="100vh" flexDirection="column" display="flex">
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t`p.login.appbar`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack flexGrow={1} />
      <Stack spacing={0} padding={2} overflow="auto">
        <AuthForm />
      </Stack>
    </Box>
  );
};

export default LoginPage;
