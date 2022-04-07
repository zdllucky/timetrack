import { declareAccess, SystemAccess } from "../access";

export const settingAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnySetting" }),
  declareAccess({ name: "UpdateAnySetting" }),
  declareAccess({
    name: "AdminAnySetting",
    contains: ["QueryAnySetting", "UpdateAnySetting"],
  }),
];
