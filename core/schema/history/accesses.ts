import { declareAccess, SystemAccess } from "../access";

export const historyAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyHistory" }),
];
