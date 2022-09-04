import { declareAccess } from "./_misc/helpers";
import { SystemAccess } from "./_misc/types";

export const accessAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyAccess" }),
  declareAccess({
    name: "AdminAnyAccess",
    contains: ["QueryAnyAccess"],
  }),
];
