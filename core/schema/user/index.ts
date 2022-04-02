import { list } from "@keystone-6/core";
import { password, relationship, text } from "@keystone-6/core/fields";
import { a, filterOr } from "../access/_misc/helpers";
import { history, updateHistory } from "../_misc/plugins/history";
import { UserAccessResolvers } from "./accesses";

const User = list({
  fields: {
    login: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      access: {
        update: () => false,
      },
    }),
    password: password({
      validation: { isRequired: true },
      ui: {
        listView: {
          fieldMode: "hidden",
        },
        itemView: {
          fieldMode: async (data) =>
            (await UserAccessResolvers.updateOwnItem(data)) ? "edit" : "read",
        },
      },
      access: {
        update: UserAccessResolvers.updateOwnItem,
      },
    }),
    access: relationship({
      ref: "Access",
      many: true,
      access: {
        update: async (data) => await a(data)`UpdateAnyAccess`,
        create: async (data) => await a(data)`CreateAnyAccess`,
      },
    }),
    worksIn: relationship({ ref: "Department.workers", many: true }),
    manages: relationship({ ref: "Department.managers", many: true }),
    headOf: relationship({ ref: "Department.heads", many: true }),
    history: history(),
  },
  access: {
    operation: {
      query: async (data) => await a(data)`QueryAnyUser`,
      create: async (data) => await a(data)`CreateAnyUser`,
    },
    filter: {
      update: async (data) =>
        filterOr(
          await a(data)`UpdateAnyUser`,
          await UserAccessResolvers.updateOwnFilter(data),
          await UserAccessResolvers.manageFilter(data)
        ),
      delete: async (data) =>
        await a(data, {
          access: { none: { name: { in: ["Owner"] } } },
        })`DeleteAnyUser`,
    },
  },
  ui: {
    labelField: "login",
  },
  hooks: {
    afterOperation: updateHistory,
  },
});

export default User;
