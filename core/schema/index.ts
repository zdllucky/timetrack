import User from "./user";
import Access from "./access";
import { accessAccesses } from "./access/accesses";
import { SystemAccess } from "./access/types";
import { userAccesses } from "./user/accesses";
import { declareAccess } from "./access/helpers";

export const accesses: Array<SystemAccess> = [
  ...accessAccesses,
  ...userAccesses,
  declareAccess({
    name: "AdminAnything",
    contains: ["AdminAnyUser", "AdminAnyAccess"],
  }),
  declareAccess({
    name: "Owner",
    contains: ["Administrator"],
  }),
  declareAccess({
    name: "Administrator",
    contains: ["User", "UpdateAnyNonOwnerUser", "ElevateUserToAdmin"],
  }),
  declareAccess({
    name: "User",
    contains: ["UpdateOwnUser", "QueryAnyUser", "QueryUserAccess"],
  }),
];

const lists = {
  User,
  Access,
};

export default lists;
