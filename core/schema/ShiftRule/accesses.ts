import { declareAccess, SystemAccess } from "../Access";
import { UpdateListItemAccessControl } from "@keystone-6/core/types";
import { BaseListTypeInfo } from "@keystone-6/core/dist/declarations/src/types/type-info";
import { QueryDepartmentsArgs } from "../../schema_types";

export const shiftRuleAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyShiftRule" }),
  declareAccess({ name: "UpdateAnyShiftRule" }),
  declareAccess({ name: "CreateAnyShiftRule" }),
  declareAccess({ name: "DeleteAnyShiftRule" }),
  declareAccess({
    name: "AdminAnyShiftRule",
    contains: [
      "QueryAnyShiftRule",
      "CreateAnyShiftRule",
      "UpdateAnyShiftRule",
      "DeleteAnyShiftRule",
    ],
  }),
];

const manageConnectedUnderSameDepartment: UpdateListItemAccessControl<
  BaseListTypeInfo
> = async ({ session, context, inputData }) => {
  const usersToUpdate = {
    logins: [
      ...(inputData.users?.disconnect ?? [])
        .filter(({ login }: { login: string }) => login)
        .map(({ login }: { login: string }) => login),
      ...(inputData.users?.connect ?? [])
        .filter(({ login }: { login: string }) => login)
        .map(({ login }: { login: string }) => login),
    ],
    ids: [
      ...(inputData.users?.disconnect ?? [])
        .filter(({ id }: { id: string }) => id)
        .map(({ id }: { id: string }) => id),
      ...(inputData.users?.connect ?? [])
        .filter(({ id }: { id: string }) => id)
        .map(({ id }: { id: string }) => id),
    ],
  };

  const updatedUserDepartmentsRes = await context
    .sudo()
    .query.Department.findMany(<QueryDepartmentsArgs>{
      where: {
        OR: [
          { workers: { some: { id: { in: usersToUpdate.ids } } } },
          { workers: { some: { login: { in: usersToUpdate.logins } } } },
        ],
      },
      query: "id",
    });

  const departmentsToUpdate = {
    names: [
      ...(inputData.departments?.disconnect ?? [])
        .filter(({ name }: { name: string }) => name)
        .map(({ name }: { name: string }) => name),
      ...(inputData.departments?.connect ?? [])
        .filter(({ name }: { name: string }) => name)
        .map(({ name }: { name: string }) => name),
    ],
    ids: [
      ...updatedUserDepartmentsRes.map(({ id }) => id),
      ...(inputData.departments?.disconnect ?? [])
        .filter(({ id }: { id: string }) => id)
        .map(({ id }: { id: string }) => id),
      ...(inputData.departments?.connect ?? [])
        .filter(({ id }: { id: string }) => id)
        .map(({ id }: { id: string }) => id),
    ],
  };

  const userDepartmentsRes = await context.sudo().query.Department.findMany(<
    QueryDepartmentsArgs
  >{
    where: { managers: { some: { id: { equals: session.itemId } } } },
    query: "id, name",
  });

  const userDepartmentParsed = {
    names: userDepartmentsRes.map(({ name }) => name),
    ids: userDepartmentsRes.map(({ id }) => id),
  };

  return !(
    departmentsToUpdate.names.some(
      (name) => !userDepartmentParsed.names.includes(name)
    ) ||
    departmentsToUpdate.names.some(
      (id) => !userDepartmentParsed.names.includes(id)
    )
  );
};

export const ShiftRuleAccessResolvers = {
  manageConnectedUnderSameDepartment,
};
