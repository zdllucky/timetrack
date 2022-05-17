import React, { Context, FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";
import { StackNavigatorContextData } from "./";

interface StackEntry {
  child: ReactNode;
  resolve: (result: any) => void;
  isModal: boolean;
}

export interface StackNavigatorProps {
  /**
   * The route at the bottom of the stack
   */
  root?: ReactNode;
  ctx: () => Context<StackNavigatorContextData>;
  hidden: boolean;
}

export const StackNavigator: FC<StackNavigatorProps> = ({
  root,
  ctx,
  hidden,
}) => {
  const [stack, setStack] = useState<StackEntry[]>([]);
  const Context = ctx();

  const popRoute = (result?: any) => {
    const currentRoute = stack[stack.length - 1];

    setStack((stack) => {
      currentRoute.resolve(result);
      return stack.slice(0, stack.length - 1);
    });
  };

  const push = (child: ReactNode, isModal: boolean = false) => {
    return new Promise<any>((resolve) =>
      pushRoute({ child, resolve, isModal })
    );
  };

  const pushRoute = (route: StackEntry) => {
    setStack((stack) => [...stack, route]);
  };

  const pop = (result?: any) => {
    popRoute(result);
  };

  return (
    <div hidden={hidden}>
      <Context.Provider
        value={{
          push,
          pop,
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
              timeout={300}
              classNames={route.isModal ? "rsn-modal-route" : "rsn-route"}
            >
              <Context.Provider
                value={{
                  push,
                  pop,
                  canPop: true,
                  isModal: route.isModal,
                }}
              >
                <div className="rsn-route" style={{ zIndex: i + 1000 }}>
                  {route.child}
                </div>
              </Context.Provider>
            </CSSTransition>
          ))}
        </TransitionGroup>,
        document.body
      )}
    </div>
  );
};
