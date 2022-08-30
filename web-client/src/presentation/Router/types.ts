import { Context, ReactNode } from "react";

export type StackNavigatorPushOptions = {
  replace?: number;
  isModal?: boolean;
  props?: any[];
};

export type NamedRoute = {
  component(...params: any): ReactNode;
};

export type PushRoute<C extends ReactNode | string> = (
  child: C,
  options?: C extends string
    ? StackNavigatorPushOptions
    : Omit<StackNavigatorPushOptions, "props">
) => Promise<any>;

export type StackNavigatorContextData = {
  push: PushRoute<ReactNode | string>;
  pop(result?: any): void;
  popAll(): void;
  canPop: boolean;
  isModal: boolean;
};

export type StackEntry = {
  child: ReactNode;
  name?: string;
  id: string;
  resolve: (result: any) => void;
  options: StackNavigatorPushOptions;
};

export type StackNavigatorProps = {
  root: ReactNode;
  ctx: () => Context<StackNavigatorContextData>;
  hidden: boolean;
};
