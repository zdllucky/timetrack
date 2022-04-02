import { list } from "@keystone-6/core";
import { e } from "../../helpers";
import { relationship, select, text } from "@keystone-6/core/fields";
import { access, filterOr } from "./_misc/helpers";

export enum AccessTypes {
  SYSTEM = "System",
  CUSTOM = "Custom",
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
      // TODO: Add circular access checkup on access creation
    }),
    contains: relationship({
      ref: "Access.isContainedIn",
      many: true,
    }),
    type: select({
      type: "enum",
      options: [
        { value: AccessTypes.SYSTEM, label: AccessTypes.SYSTEM },
        { value: AccessTypes.CUSTOM, label: AccessTypes.CUSTOM },
      ],
      defaultValue: AccessTypes.CUSTOM,
      validation: { isRequired: true },
    }),
  },
  ui: {
    isHidden: e`NODE_ENV` === "production",
    hideCreate: e`NODE_ENV` === "production",
    hideDelete: e`NODE_ENV` === "production",
  },
  access: {
    operation: {
      create: async (data) => await access(data)`CreateAnyAccess`,
    },
    filter: {
      query: async (data) =>
        filterOr(
          await access(data)`QueryAnyAccess`,
          await access(data, {
            name: { in: ["User", "Administrator", "Owner"] },
          })`QueryUserAccess`
        ),
      update: async (data) =>
        await access(data, {
          type: { notIn: AccessTypes.SYSTEM },
        })`UpdateAnyAccess`,
      delete: async (data) =>
        await access(data, {
          type: { notIn: AccessTypes.SYSTEM },
        })`DeleteAnyAccess`,
    },
    item: {
      create: ({ inputData }) => inputData.type !== AccessTypes.SYSTEM,
      update: ({ inputData }) => inputData.type !== AccessTypes.SYSTEM,
    },
  },
});

export default Access;
