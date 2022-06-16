export const e = ([env]: TemplateStringsArray) =>
  process.env[
    env.startsWith("CUSTOM_") ? env.substring(7) : `REACT_APP_${env}`
  ] ?? "undefined";

export function disableScrolling() {
  const x = window.scrollX;
  const y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}

export const enableScrolling = () => (window.onscroll = function () {});
