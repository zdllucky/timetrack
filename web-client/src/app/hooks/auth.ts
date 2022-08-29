import { getAuthToken } from "../slices/auth";
import { useMemo } from "react";
import { useTypedSelector } from "./store";

export const useIsAuthenticated = () => {
  const authToken = useTypedSelector(getAuthToken);

  return useMemo(() => !!authToken, [authToken]);
};
