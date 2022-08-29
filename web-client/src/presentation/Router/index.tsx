import { NamedRoute, StackNavigatorContextData } from "./types";
import { DeepReadonly } from "../../helpers";

// TODO: Add 'popSome' method
// TODO: Blocked system pop for route
// TODO: 'render' prop to unload scaffold render after pushing route
// WISH: Add shadow
// WISH: Swipe-able pop method
// WISH: Adjust animation

export const defaultContextData: StackNavigatorContextData = {
  push: async () => {},
  pop() {},
  popAll() {},
  canPop: false,
  isModal: false,
};

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

export * from "./types";
export * from "./components/StackNavigator";
export * from "./useStackNavigator";
