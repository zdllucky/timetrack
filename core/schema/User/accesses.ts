import { a, AccessResolvers, declareAccess, pa, SystemAccess } from "../Access";

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

export const UserAccessResolvers: AccessResolvers = {
  manageFilter: async (data) =>
    await a(data, {
      access: { none: { name: { in: await pa(data)`Owner` } } },
    })`Administrator`,
  updateOwnFilter: async (data) =>
    await a(data, {
      id: { equals: data.session.itemId },
    })`User`,
  updateOwnItem: async (data) =>
    await a(data, ({ session: { itemId }, item }) => itemId === item?.id)`User`,
};
