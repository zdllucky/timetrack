import { a, AccessResolvers, declareAccess, SystemAccess } from "../access";
import { QueryUsersArgs } from "../../schema_types";

export const departmentAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyDepartment" }),
  declareAccess({ name: "QueryUserDepartment" }),
  declareAccess({ name: "CreateAnyDepartment" }),
  declareAccess({ name: "UpdateAnyDepartment" }),
  declareAccess({ name: "DeleteAnyDepartment" }),
  declareAccess({
    name: "AdminAnyDepartment",
    contains: [
      "QueryAnyDepartment",
      "CreateAnyDepartment",
      "UpdateAnyDepartment",
      "DeleteAnyDepartment",
    ],
  }),
];

export const DepartmentAccessResolvers: AccessResolvers = {
  headOfFilter: async (data) =>
    await a(data, {
      heads: { some: { id: { equals: data.session.itemId } } },
    })`User`,
  managerFilter: async (data) =>
    await a(data, {
      managers: { some: { id: { equals: data.session.itemId } } },
    })`User`,
  workerFilter: async (data) =>
    await a(data, {
      workers: { some: { id: { equals: data.session.itemId } } },
    })`User`,
  headOfItem: async (data) =>
    await a(
      data,
      async ({ session: { itemId }, item, context }) =>
        !!(
          await context.sudo().query.User.findMany(<QueryUsersArgs>{
            where: {
              id: { equals: itemId },
              headOf: { some: { id: { equals: item?.id } } },
            },
            take: 1,
          })
        ).length
    )`User`,
};
