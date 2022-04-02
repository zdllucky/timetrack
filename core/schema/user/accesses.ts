import { SystemAccess } from "../access/_misc/types";
import { a, declareAccess } from "../access/_misc/helpers";

export const userAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyUser" }),
  declareAccess({ name: "CreateAnyUser" }),
  declareAccess({ name: "UpdateAnyUser" }),
  declareAccess({ name: "DeleteAnyUser" }),
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

export const UserAccessResolvers = {
  manageFilter: async (data) =>
    await a(data, {
      access: { none: { name: { in: ["Owner"] } } },
    })`Administrator`,
  updateOwnFilter: async (data) =>
    await a(data, {
      id: { equals: data.session.itemId },
    })`User`,
  updateOwnItem: async (data) =>
    await a(
      data,
      ({ session: { itemId }, item: { id } }) => itemId === id
    )`User`,
};
