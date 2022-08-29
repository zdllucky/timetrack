import { useSwipeable } from "react-swipeable";
import { FC, PropsWithChildren } from "react";

const swipeConfig = {
  delta: Math.min(window.innerWidth * 0.7, 150), // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: true, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: true, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: 200, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};

export const StackScaffold: FC<
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
