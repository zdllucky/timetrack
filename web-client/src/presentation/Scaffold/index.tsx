import { FC, PropsWithChildren, ReactNode, useMemo } from "react";
import { Box, Paper, useTheme } from "@mui/material";
import { BoxProps } from "@mui/material/Box/Box";
import { merge } from "lodash";

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

  const defaultScaffoldBoxProps: Partial<BoxProps> = useMemo(
    () => ({
      height: `calc(100vh - ${fullscreen || bottomBar ? "0px" : "56px"})`,
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0,
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
