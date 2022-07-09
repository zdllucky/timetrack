import { css } from "@emotion/react";

const globalStyle = css`
  html {
    overscroll-behavior: none !important;
    overflow-scrolling: touch !important;
    user-select: none;
    //scroll-behavior: ;
  }
  body,
  #root {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }
`;

export default globalStyle;
