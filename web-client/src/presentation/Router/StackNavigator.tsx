import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";
import {
  getRoute,
  PushRoute,
  StackEntry,
  StackNavigatorProps,
  StackNavigatorPushOptions,
} from "./";
import { useSwipeable } from "react-swipeable";
import { nanoid } from "nanoid";

const swipeConfig = {
  delta: Math.min(window.innerWidth * 0.7, 150), // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: true, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: true, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: 200, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};

const StackScaffold: FC<
  PropsWithChildren<{ index: number; callback: () => void; routeProps?: any }>
> = ({ children, index, callback }) => {
  const handlers = useSwipeable({
    onSwipedRight: (eventData) => eventData.initial[0] <= 82 && callback(),
    ...swipeConfig,
  });

  return (
    <div className="rsn-route" style={{ zIndex: index + 1000 }} {...handlers}>
      {children}
    </div>
  );
};

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
