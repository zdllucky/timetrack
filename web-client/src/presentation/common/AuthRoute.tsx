import { useIsAuthenticated } from "app/hooks/auth";
import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute: FC<PropsWithChildren<{}>> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRoute;
