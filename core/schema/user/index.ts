import { list } from "@keystone-6/core";
import { password, relationship, text } from "@keystone-6/core/fields";
import { access, filterOr } from "../access/helpers";
import { history, updateHistory } from "../plugins/history";

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
      },
      access: {
        update: async (data) =>
          await access(
            data,
            ({ session: { itemId }, item: { id } }) => itemId === id
          )`UpdateOwnUser`,
      },
    }),
    access: relationship({
      ref: "Access",
      many: true,
      access: {
        update: async (data) => await access(data)`UpdateAnyAccess`,
        create: async (data) => await access(data)`CreateAnyAccess`,
      },
    }),
    history: history(),
  },
  access: {
    operation: {
      query: async (data) => await access(data)`QueryAnyUser`,
      create: async (data) => await access(data)`CreateAnyUser`,
    },
    filter: {
      update: async (data) =>
        filterOr(
          await access(data)`UpdateAnyUser`,
          await access(data, {
            id: { equals: data.session.itemId },
          })`UpdateOwnUser`,
          await access(data, {
            access: { none: { name: { in: ["Owner"] } } },
          })`UpdateAnyNonOwnerUser`
        ),
      delete: async (data) =>
        await access(data, {
          access: { none: { name: { in: ["Owner"] } } },
        })`DeleteAnyUser`,
    },
  },
  hooks: {
    afterOperation: updateHistory,
  },
});

export default User;
