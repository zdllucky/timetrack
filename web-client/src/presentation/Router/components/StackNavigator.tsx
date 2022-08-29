import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";
import {
  getRoute,
  PushRoute,
  StackEntry,
  StackNavigatorProps,
  StackNavigatorPushOptions,
} from "../index";
import { nanoid } from "nanoid";
import StackScaffold from "./StackScaffold";

export const StackNavigator: FC<StackNavigatorProps> = ({
  root,
  ctx,
  hidden,
}) => {
  const [stack, setStack] = useState<StackEntry[]>([]);
  const Context = ctx();

  const popRoute = useCallback(
    (result?: any, all = false) => {
      const currentRoute = stack[stack.length - 1];

      setStack((stack) => {
        if (all) return [];

        result && currentRoute.resolve(result);
        return stack.slice(0, -1);
      });
    },
    [setStack, stack]
  );

  const pushRoute = useCallback(
    (route: StackEntry) => {
      setStack((stack) => [
        ...(route.options.replace
          ? stack.slice(0, -route.options.replace!)
          : stack),
        route,
      ]);
    },
    [setStack]
  );

  const push: PushRoute<ReactNode | string> = (child, options = {}) =>
    new Promise<any>((resolve) =>
      pushRoute({
        child:
          typeof child === "string"
            ? getRoute(child).component(
                (options as StackNavigatorPushOptions).props
              )
            : child,
        resolve,
        name: typeof child === "string" ? child : undefined,
        options,
        id: nanoid(6),
      })
    );

  const pop = (result?: any) => popRoute(result);

  const popAll = () => popRoute(null, true);

  useEffect(() => {
    function popCurrent() {
      hidden || !stack.length || popRoute();
    }

    window.addEventListener("pop_action_call", popCurrent);

    return () => window.removeEventListener("pop_action_call", popCurrent);
  }, [stack, hidden, popRoute]);

  return (
    <div hidden={hidden}>
      <Context.Provider
        value={{
          push,
          pop,
          popAll,
          canPop: false,
          isModal: false,
        }}
      >
        {root}
      </Context.Provider>
      {createPortal(
        <TransitionGroup hidden={hidden}>
          {stack.map((route, i) => (
            <CSSTransition
              key={`stack-route-${route.id}`}
              timeout={350}
              classNames={
                route.options.isModal ? "rsn-modal-route" : "rsn-route"
              }
            >
              <Context.Provider
                value={{
                  push,
                  pop,
                  popAll,
                  canPop: true,
                  isModal: !!route.options.isModal,
                }}
              >
                <StackScaffold
                  index={i}
                  callback={pop}
                  routeProps={route.options.props}
                >
                  {route.child}
                </StackScaffold>
              </Context.Provider>
            </CSSTransition>
          ))}
        </TransitionGroup>,
        document.body
      )}
    </div>
  );
};
