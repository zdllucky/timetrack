export const e = ([env]: TemplateStringsArray) =>
  process.env[
    env.startsWith("CUSTOM_") ? env.substring(7) : `REACT_APP_${env}`
  ] ?? "undefined";
