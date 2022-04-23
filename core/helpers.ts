export const e = ([env]: TemplateStringsArray) =>
  process.env[env] ?? "undefined";

// export const a = ({ session }: { session: any }) => {
//   Promise.all();
// };
