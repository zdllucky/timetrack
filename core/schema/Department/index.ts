import { list } from "@keystone-6/core";
import { updateHistory } from "../_misc/plugins/history";
import { relationship, text } from "@keystone-6/core/fields";
import { a, filterOr } from "../Access";
import { DepartmentAccessResolvers } from "./accesses";
import DepartmentHooks from "./_misc/hooks";

export const Department = list({
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique",
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
      many: false,
      hooks: {
        validateInput: async (data) => {
          await Promise.all([
            await DepartmentHooks.checkForCircularDepartments(data),
            await DepartmentHooks.prohibitSetAction(data),
          ]);
        },
      },
      access: {
        update: async (data) => await a(data)`UpdateAnyDepartment`,
      },
    }),
    controls: relationship({
      ref: "Department.isControlledBy",
      many: true,
      hooks: {
        validateInput: async (data) => {
          await Promise.all([
            await DepartmentHooks.checkForCircularDepartments(data),
            await DepartmentHooks.prohibitSetAction(data),
          ]);
        },
      },
      access: {
        update: async (data) => await a(data)`UpdateAnyDepartment`,
      },
    }),
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
