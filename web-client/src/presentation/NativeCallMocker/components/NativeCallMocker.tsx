import { FlutterWindow } from "../types";
import {
  FC,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useState,
} from "react";
import { Fab, SwipeableDrawer } from "@mui/material";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import { ButtonsBlock } from "./ButtonsBlock";

export const NativeCallMocker: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open ?? !isOpen);
    };

  return (
    <>
      {children}
      {!!(window as FlutterWindow).flutter_inappwebview || (
        <>
          <Fab
            sx={{
              position: "fixed",
              bottom: 8,
              right: 16,
            }}
            size="small"
            color="primary"
            aria-label="tools"
            onClick={() => setIsOpen(true)}
          >
            <AddToHomeScreenIcon />
          </Fab>
          <SwipeableDrawer
            anchor="bottom"
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <ButtonsBlock close={() => setIsOpen(false)} />
          </SwipeableDrawer>
        </>
      )}
    </>
  );
};
