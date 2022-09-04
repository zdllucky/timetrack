import { AccessResolvers, declareAccess, SystemAccess } from "../Access";

export const shiftRuleAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyShiftRule" }),
  declareAccess({ name: "UpdateAnyShiftRule" }),
  declareAccess({ name: "CreateAnyShiftRule" }),
  declareAccess({ name: "DeleteAnyShiftRule" }),
  declareAccess({
    name: "AdminAnyShiftRule",
    contains: [
      "QueryAnyShiftRule",
      "CreateAnyShiftRule",
      "UpdateAnyShiftRule",
      "DeleteAnyShiftRule",
    ],
  }),
];

export const ShiftRuleAccessResolvers: AccessResolvers = {};
