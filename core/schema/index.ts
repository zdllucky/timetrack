import User from "./User";
import Access, { AccessTypes, declareAccess, SystemAccess } from "./Access";
import { accessAccesses } from "./Access/accesses";
import { departmentAccesses } from "./Department/accesses";
import { Department } from "./Department";
import { settingAccesses } from "./Setting/accesses";
import Setting from "./Setting";
import History from "./History";
import { ListSchemaConfig } from "@keystone-6/core/types";
import { historyAccesses } from "./History/accesses";
import { shiftRuleAccesses } from "./ShiftRule/accesses";
import ShiftRule from "./ShiftRule";
import { userAccesses } from "./User/accesses";

export const accesses: Array<SystemAccess> = [
  ...accessAccesses,
  ...userAccesses,
  ...departmentAccesses,
  ...settingAccesses,
  ...historyAccesses,
  ...shiftRuleAccesses,
  declareAccess({
    name: "AdminAnything",
    contains: ["AdminAnyUser", "AdminAnyAccess", "AdminAnyDepartment"],
  }),
  declareAccess({
    name: "Owner",
    type: AccessTypes.ROLE,
    contains: ["Administrator", "QueryAnyHistory", "CreateAnyUser"],
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
      "AdminAnyShiftRule",
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
      "QueryAnyShiftRule",
    ],
  }),
];

const lists: ListSchemaConfig = {
  User,
  Access,
  Department,
  Setting,
  History,
  ShiftRule,
};

export default lists;
