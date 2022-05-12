import { FC } from "react";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthForm from "./blocks/AuthForm";

const LoginPage: FC = () => {
  const { t } = useTranslation("translations");

  return (
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
