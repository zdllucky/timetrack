import User from "./user";
import Access, { declareAccess, SystemAccess } from "./access";
import { accessAccesses } from "./access/accesses";
import { userAccesses } from "./user/accesses";
import { departmentAccesses } from "./department/accesses";
import { Department } from "./department";
import { settingAccesses } from "./setting/accesses";
import Setting from "./setting";

export const accesses: Array<SystemAccess> = [
  ...accessAccesses,
  ...userAccesses,
  ...departmentAccesses,
  ...settingAccesses,
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
      "UpdateAnySetting",
    ],
  }),
  declareAccess({
    name: "User",
    contains: [
      "QueryAnyUser",
      "QueryUserAccess",
      "QueryAnyDepartment",
      "QueryAnySetting",
    ],
  }),
];

const lists = {
  User,
  Access,
  Department,
  Setting,
};

export default lists;
