import User from "./user";
import Access from "./access";

// export type systemAccess = {
//   name: string;
//   label?: string;
//   description?: string;
//   contains?: Array<string>;
//   isContainedIn?: Array<string>;
// };

// (ctx: KeystoneContext) => Promise<void>

// export const accesses: Array<GenerateAccess> = [];

const lists = {
  User,
  Access,
};

export default lists;
