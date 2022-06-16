import { FC, PropsWithChildren, ReactNode, useMemo } from "react";
import { Box, Paper, useTheme } from "@mui/material";
import { BoxProps } from "@mui/material/Box/Box";
import { merge } from "lodash";
import { useLocalTheme } from "../../app/hooks/theme";

const Scaffold: FC<
  PropsWithChildren<
    {
      appBar?: ReactNode;
      bottomBar?: ReactNode;
      fullscreen?: boolean;
    } & Partial<BoxProps>
  >
> = ({
  children,
  appBar = null,
  bottomBar = null,
  fullscreen = false,
  ...boxProps
}) => {
  const theme = useTheme();
  const {
    theme: { area },
  } = useLocalTheme();

  const defaultScaffoldBoxProps: Partial<BoxProps> = useMemo(
    () => ({
      height: `calc(100dvh - ${
        fullscreen || bottomBar ? "0px" : theme.spacing(7)
      } - ${(!(fullscreen || bottomBar) && area?.offsetBottom) || 0}px)`,
      boxShadow:
        (!fullscreen &&
          !bottomBar &&
          "inset 0px 1px 10px 0px rgb(0 0 0 / 12%)") ||
        "none",
      width: "100vw",
      overflow: "hidden",
      sx: {
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
      },
    }),
    [theme, fullscreen, bottomBar]
  );

  return (
    <Box {...merge({}, defaultScaffoldBoxProps, boxProps)}>
      {appBar && <Paper elevation={0}>{appBar}</Paper>}
      <Box flexGrow={1} overflow="auto">
        {children}
      </Box>
      {bottomBar && <Paper elevation={4}>{bottomBar}</Paper>}
    </Box>
  );
};

export default Scaffold;
