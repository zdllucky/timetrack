import {
  a,
  AccessTypes,
  condition,
  declareAccess,
  SystemAccess,
} from "../Access";
import {
  DepartmentWhereInput,
  QueryDepartmentArgs,
  QueryUsersArgs,
} from "../../schema_types";
import {
  FieldUpdateItemAccessArgs,
  UpdateListItemAccessControl,
} from "@keystone-6/core/types";
import {
  IndividualFieldAccessControl,
  ListFilterAccessControl,
} from "@keystone-6/core/dist/declarations/src/types/config/access-control";
import { BaseListTypeInfo } from "@keystone-6/core/dist/declarations/src/types/type-info";

export const departmentAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyDepartment" }),
  declareAccess({ name: "QueryUserDepartment" }),
  declareAccess({ name: "CreateAnyDepartment" }),
  declareAccess({ name: "UpdateAnyDepartment" }),
  declareAccess({ name: "DeleteAnyDepartment" }),
  declareAccess({ name: "CreateSubDepartment", type: AccessTypes.ROLE }),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _baseHeadOfSuper = async (data: any) =>
  await a(data, async ({ session: { itemId }, item, context }) => {
    let name: string | undefined = item.name;

    while (name) {
      const res = await context.sudo().query.Department.findOne(<
        QueryDepartmentArgs
      >{
        where: { name },
        query: `
          isControlledBy {
            name
            heads { id } }
        `,
      });

      if (res?.isControlledBy?.heads?.id === itemId) return true;

      name = res?.isControlledBy?.name;
    }
    return false;
  })`User`;

export const DepartmentAccessResolvers: {
  headOfFilter: ListFilterAccessControl<"update", BaseListTypeInfo>;
  managerFilter: ListFilterAccessControl<"update", BaseListTypeInfo>;
  workerFilter: ListFilterAccessControl<"update", BaseListTypeInfo>;
  headOfItem: IndividualFieldAccessControl<
    FieldUpdateItemAccessArgs<BaseListTypeInfo>
  >;
  headOfSuperItem: UpdateListItemAccessControl<BaseListTypeInfo>;
  headOfSuperField: IndividualFieldAccessControl<
    FieldUpdateItemAccessArgs<BaseListTypeInfo>
  >;
} = {
  headOfFilter: async (data) => {
    return await a(data, <DepartmentWhereInput>{
      heads: { id: { equals: data.session.itemId } },
    })`User`;
  },
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
  headOfSuperField: _baseHeadOfSuper,
  headOfSuperItem: async (data) => {
    const { context, item } = data;

    const filter = condition.filter.or(
      await a(data)`UpdateAnyDepartment`,
      await DepartmentAccessResolvers.managerFilter(data),
      await DepartmentAccessResolvers.headOfFilter(data)
    );

    if (typeof filter === "boolean") return true;

    const res = await context.query.Department.findMany({
      where: filter as NonNullable<never>,
      query: "id",
    });

    return (
      res.some(({ id }) => id === item.id) || (await _baseHeadOfSuper(data))
    );
  },
};
