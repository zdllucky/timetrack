import User from "./user";
import Access from "./access";
import { accessAccesses } from "./access/accesses";
import { SystemAccess } from "./access/_misc/types";
import { userAccesses } from "./user/accesses";
import { declareAccess } from "./access/_misc/helpers";
import { departmentAccesses } from "./department/accesses";
import { Department } from "./department";

export const accesses: Array<SystemAccess> = [
  ...accessAccesses,
  ...userAccesses,
  ...departmentAccesses,
  declareAccess({
    name: "AdminAnything",
    contains: ["AdminAnyUser", "AdminAnyAccess", "AdminAnyDepartment"],
  }),
  declareAccess({
    name: "Owner",
    contains: ["Administrator"],
  }),
  declareAccess({
    name: "Administrator",
    contains: [
      "User",
      "ElevateUserToAdmin",
      "DeleteAnyDepartment",
      "CreateAnyDepartment",
      "UpdateAnyDepartment",
    ],
  }),
  declareAccess({
    name: "User",
    contains: ["QueryAnyUser", "QueryUserAccess", "QueryAnyDepartment"],
  }),
];

const lists = {
  User,
  Access,
  Department,
};

export default lists;
