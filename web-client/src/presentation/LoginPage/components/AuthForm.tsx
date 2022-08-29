import { object, string } from "yup";
import { FC } from "react";
import {
  Button,
  CircularProgress,
  Collapse,
  Stack,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  AuthenticateUserWithPasswordMutation,
  useAuthenticateUserWithPasswordMutation,
} from "../../../app/repository/auth/authenticateUserWithPassword.generated";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";

const authSchema = object({
  login: string().lowercase().trim().min(3).required(),
  password: string().required().min(8),
});

declare type AuthSchemaType = typeof authSchema.__outputType;

const AuthForm: FC = () => {
  const { t } = useTranslation();
  const [authenticate] = useAuthenticateUserWithPasswordMutation();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchemaType>({
    mode: "onChange",
    defaultValues: { login: "", password: "" },
    resolver: yupResolver(authSchema),
  });

  const onSubmit = async (values: AuthSchemaType) => {
    // await new Promise((r) => setTimeout(r, 2000));
    const res: any = await authenticate(values);

    if (res.error)
      enqueueSnackbar(res.error.message, {
        variant: "error",
      });
    else {
      const { authenticateUserWithPassword: m } =
        res.data as AuthenticateUserWithPasswordMutation;

      if (m?.__typename === "UserAuthenticationWithPasswordFailure") {
        enqueueSnackbar(m.message, {
          variant: "error",
        });
      }
    }
  };

  return (
    <Stack component="form" spacing={1} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="login"
        control={control}
        render={({ field }) => (
          <TextField
            label="Login"
            {...field}
            error={!!errors.login}
            helperText={errors.login?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            label="Password"
            type="password"
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting || !isEmpty(errors)}
      >
        <Collapse orientation="horizontal" in={isSubmitting}>
          <CircularProgress
            color="inherit"
            size=".875em"
            sx={{
              marginRight: ".5em",
            }}
          />
        </Collapse>
        {t`p.login.appbar`}
      </Button>
    </Stack>
  );
};

export default AuthForm;
