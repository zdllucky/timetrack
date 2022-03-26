import { declareAccess } from "./helpers";
import { SystemAccess } from "./types";

export const accessAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyAccess" }),
  declareAccess({ name: "QueryUserAccess" }),
  declareAccess({ name: "CreateAnyAccess" }),
  declareAccess({ name: "UpdateAnyAccess" }),
  declareAccess({ name: "DeleteAnyAccess" }),
  declareAccess({
    name: "AdminAnyAccess",
    contains: [
      "QueryAnyAccess",
      "CreateAnyAccess",
      "UpdateAnyAccess",
      "DeleteAnyAccess",
    ],
  }),
];
