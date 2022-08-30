import { NamedRoute } from "./types";
import { DeepReadonly } from "../../helpers";

const _routes: Record<string, NamedRoute> = {};

export const getRoutes = () => _routes as DeepReadonly<typeof _routes>;
export const getRoute = (name: string) =>
  _routes[name] as DeepReadonly<NamedRoute>;

export const createNamedRoute = (
  name: string,
  component: NamedRoute["component"]
) =>
  (_routes[name] = {
    component,
  });
