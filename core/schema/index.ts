import User from "./user";
import Access, { AccessTypes, declareAccess, SystemAccess } from "./access";
import { accessAccesses } from "./access/accesses";
import { userAccesses } from "./user/accesses";
import { departmentAccesses } from "./department/accesses";
import { Department } from "./department";
import { settingAccesses } from "./setting/accesses";
import Setting from "./setting";
import History from "./history";
import { ListSchemaConfig } from "@keystone-6/core/types";
import { historyAccesses } from "./history/accesses";
import { shiftRuleAccesses } from "./shift_rule/accesses";
import ShiftRule from "./shift_rule";

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
