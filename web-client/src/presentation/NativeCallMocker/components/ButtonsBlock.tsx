import { FC } from "react";
import { Button, Stack } from "@mui/material";

export const ButtonsBlock: FC<{ close: () => void }> = ({ close }) => {
  return (
    <Stack sx={{ p: 2 }} direction="row" gap={1} flexWrap={"wrap"}>
      <Button
        variant={"outlined"}
        onClick={() => {
          close();
          window.dispatchEvent(
            new CustomEvent("pop_action_call", { detail: null })
          );
        }}
      >
        Native "Back" call
      </Button>
    </Stack>
  );
};
