import { ReactNode } from "react";

// TODO: Named routes with dynamic linking
// TODO: Swipe-able pop method
// TODO: Add 'popSome' method
// TODO: Add shadow
// TODO: Blocked pop method for route
// TODO: 'render' prop to unload scaffold render after pushing route

export type StackNavigatorPushOptions = {
  replace?: number;
  isModal?: boolean;
};

export interface StackNavigatorContextData {
  push(
    child: ReactNode | string,
    options?: StackNavigatorPushOptions
  ): Promise<any>;
  pop(result?: any): void;
  popAll(): void;
  canPop: boolean;
  isModal: boolean;
}

export const defaultContextData: StackNavigatorContextData = {
  push: async () => {},
  pop() {},
  popAll() {},
  canPop: false,
  isModal: false,
};

export * from "./StackNavigator";
export * from "./useStackNavigator";
