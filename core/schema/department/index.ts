import { list } from "@keystone-6/core";
import { history, updateHistory } from "../_misc/plugins/history";
import { relationship, text } from "@keystone-6/core/fields";
import { a, filterOr } from "../access";
import { DepartmentAccessResolvers } from "./accesses";

export const Department = list({
  fields: {
    name: text({
      validation: { isRequired: true },
      access: {
        update: async (data) =>
          (await a(data)`UpdateAnyDepartment`) ||
          DepartmentAccessResolvers.headOfItem(data),
      },
    }),
    heads: relationship({
      ref: "User.headOf",
      many: true,
      access: {
        update: async (data) => await a(data)`UpdateAnyDepartment`,
      },
    }),
    managers: relationship({
      ref: "User.manages",
      many: true,
      access: {
        update: async (data) =>
          (await a(data)`UpdateAnyDepartment`) ||
          DepartmentAccessResolvers.headOfItem(data),
      },
    }),
    workers: relationship({ ref: "User.worksIn", many: true }),
    isControlledBy: relationship({
      ref: "Department.controls",
      many: true,
      access: {
        update: async (data) => await a(data)`UpdateAnyDepartment`,
      },
    }),
    controls: relationship({
      ref: "Department.isControlledBy",
      many: true,
      access: {
        update: async (data) => await a(data)`UpdateAnyDepartment`,
      },
    }),
    history: history(),
  },
  hooks: {
    afterOperation: updateHistory,
  },
  access: {
    operation: {
      query: async (data) => await a(data)`QueryAnyDepartment`,
      create: async (data) => await a(data)`CreateAnyDepartment`,
      delete: async (data) => await a(data)`DeleteAnyDepartment`,
    },
    filter: {
      update: async (data) =>
        filterOr(
          await a(data)`UpdateAnyDepartment`,
          await DepartmentAccessResolvers.managerFilter(data),
          await DepartmentAccessResolvers.headOfFilter(data)
        ),
    },
  },
});
