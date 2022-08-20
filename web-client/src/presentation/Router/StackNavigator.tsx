import React, {
  Context,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";
import { StackNavigatorContextData, StackNavigatorPushOptions } from "./";
import { useSwipeable } from "react-swipeable";

interface StackEntry {
  child: ReactNode;
  resolve: (result: any) => void;
  isModal: boolean;
  options: StackNavigatorPushOptions;
}

export interface StackNavigatorProps {
  /**
   * The route at the bottom of the stack
   */
  root?: ReactNode;
  ctx: () => Context<StackNavigatorContextData>;
  hidden: boolean;
}

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
  PropsWithChildren<{ index: number; callback: () => void }>
> = ({ children, index, callback }) => {
  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      if (eventData.initial[0] <= 82) callback();
    },
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

        currentRoute.resolve(result);
        return stack.slice(0, stack.length - 1);
      });
    },
    [setStack, stack]
  );

  const pushRoute = useCallback(
    (route: StackEntry) =>
      setStack((stack) => [
        ...(route.options.replace
          ? stack.slice(0, -route.options.replace)
          : stack),
        route,
      ]),
    [setStack]
  );

  const push = (
    child: ReactNode,
    isModal: boolean = false,
    options: StackNavigatorPushOptions = { replace: 0 }
  ) => {
    return new Promise<any>((resolve) =>
      pushRoute({ child, resolve, isModal, options })
    );
  };

  const pop = (result?: any) => popRoute(result);

  const popAll = () => popRoute(null, true);

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
              key={`stack-route-${i}`}
              timeout={500}
              classNames={route.isModal ? "rsn-modal-route" : "rsn-route"}
            >
              <Context.Provider
                value={{
                  push,
                  pop,
                  popAll,
                  canPop: true,
                  isModal: route.isModal,
                }}
              >
                <StackScaffold index={i} callback={pop}>
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
