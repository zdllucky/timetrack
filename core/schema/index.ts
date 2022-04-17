import User from "./user";
import Access, { AccessTypes, declareAccess, SystemAccess } from "./access";
import { accessAccesses } from "./access/accesses";
import { userAccesses } from "./user/accesses";
import { departmentAccesses } from "./department/accesses";
import { Department } from "./department";
import { settingAccesses } from "./setting/accesses";
import Setting from "./setting";
import { ListSchemaConfig } from "@keystone-6/core/types";

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
    type: AccessTypes.ROLE,
    contains: ["Administrator"],
  }),
  declareAccess({
    name: "Administrator",
    type: AccessTypes.ROLE,
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
    type: AccessTypes.ROLE,
    contains: [
      "QueryAnyUser",
      "QueryAnyAccess",
      "QueryAnyDepartment",
      "QueryAnySetting",
    ],
  }),
];

const lists: ListSchemaConfig = {
  User,
  Access,
  Department,
  Setting,
};

export default lists;
