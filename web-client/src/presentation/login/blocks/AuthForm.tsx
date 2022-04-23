import { object, string } from "yup";
import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { Button, CircularProgress, Collapse, Stack } from "@mui/material";
import { TextField } from "formik-mui";
import { useTranslation } from "react-i18next";
import {
  AuthenticateUserWithPasswordMutation,
  useAuthenticateUserWithPasswordMutation,
} from "../../../app/repository/auth/authenticateUserWithPassword.generated";
import { useSnackbar } from "notistack";

interface AuthValues {
  login: string;
  password: string;
}

const validationSchema = object({
  login: string().lowercase().trim().min(3).required(),
  password: string().required().min(8),
});

const AuthForm: FC = () => {
  const { t } = useTranslation();
  const [authenticate] = useAuthenticateUserWithPasswordMutation();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values: AuthValues) => {
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
      }}
      validateOnBlur
      enableReinitialize
    >
      {({ errors, touched, handleChange, isSubmitting }) => (
        <Form>
          <Stack spacing={1}>
            <Field
              component={TextField}
              name="login"
              label="Login"
              onChange={handleChange}
              error={touched.login && Boolean(errors.login)}
              helperText={touched.login && errors.login}
            />
            <Field
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              component={TextField}
            />
            <Button type="submit" disabled={isSubmitting} variant="contained">
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
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
