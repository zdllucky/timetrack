import { SystemAccess } from "../access/types";
import { declareAccess } from "../access/helpers";

export const userAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyUser" }),
  declareAccess({ name: "CreateAnyUser" }),
  declareAccess({ name: "UpdateAnyUser" }),
  declareAccess({ name: "DeleteAnyUser" }),
  declareAccess({ name: "UpdateOwnUser" }),
  declareAccess({ name: "UpdateAnyNonOwnerUser" }),
  declareAccess({ name: "ElevateUserToAdmin" }),
  declareAccess({
    name: "AdminAnyUser",
    contains: [
      "QueryAnyUser",
      "CreateAnyUser",
      "UpdateAnyUser",
      "DeleteAnyUser",
    ],
  }),
];
