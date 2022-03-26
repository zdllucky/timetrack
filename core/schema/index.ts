import User from "./user";
import Access from "./access";
import { accessAccesses } from "./access/accesses";
import { SystemAccess } from "./access/helpers";

export const accesses: Array<SystemAccess> = [...accessAccesses];

const lists = {
  User,
  Access,
};

export default lists;
