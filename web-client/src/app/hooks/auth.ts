import { useSelector } from "react-redux";
import { getAuthToken } from "../slices/auth";
import { useMemo } from "react";

export const useIsAuthenticated = () => {
  const authToken = useSelector(getAuthToken);

  return useMemo(() => !!authToken, [authToken]);
};
