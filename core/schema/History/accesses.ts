import { declareAccess, SystemAccess } from "../Access";

export const historyAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyHistory" }),
];
