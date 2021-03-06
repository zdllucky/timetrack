import { list } from "@keystone-6/core";
import { relationship, select, text } from "@keystone-6/core/fields";
import { a } from "./_misc/helpers";
import { e } from "../../helpers";

export enum AccessTypes {
  SYSTEM = "System",
  ROLE = "Role",
}

const Access = list({
  fields: {
    name: text({
      isIndexed: "unique",
      validation: { isRequired: true },
    }),
    isContainedIn: relationship({
      ref: "Access.contains",
      many: true,
    }),
    contains: relationship({
      ref: "Access.isContainedIn",
      many: true,
    }),
    type: select({
      type: "enum",
      options: Object.values(AccessTypes).map((k) => ({
        value: k,
        label: k,
      })),
      defaultValue: AccessTypes.SYSTEM,
      validation: { isRequired: true },
    }),
  },
  ui: {
    isHidden: async (data) =>
      !(await a({ listKey: "Access", ...data })`AdminAnything`),
    hideCreate: e`NODE_ENV` === "production",
    hideDelete: e`NODE_ENV` === "production",
  },
  access: {
    operation: {
      create: () => false,
      update: () => false,
      delete: () => false,
    },
    filter: {
      query: async (data) =>
        await a(data, {
          type: { equals: AccessTypes.ROLE },
        })`QueryAnyAccess`,
    },
  },
});

export default Access;

export * from "./_misc/helpers";
export * from "./_misc/types";
