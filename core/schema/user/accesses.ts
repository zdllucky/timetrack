import { SystemAccess } from "../access/_misc/types";
import { declareAccess } from "../access/_misc/helpers";

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
