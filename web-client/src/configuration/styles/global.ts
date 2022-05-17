import { css } from "@emotion/react";

export const globalStyle = css`
  html {
    overscroll-behavior: auto !important;
    overflow-scrolling: touch !important;
    user-select: none;
    scroll-behavior: smooth !important;
  }
  body,
  #root {
    width: 100vw;
    height: 100vh;
  }
`;
