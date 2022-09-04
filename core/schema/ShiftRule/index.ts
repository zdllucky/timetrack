import { list } from "@keystone-6/core";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { a } from "../Access";
import { updateHistory } from "../_misc/plugins/history";

const ShiftRule = list({
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
      isIndexed: "unique",
    }),
    users: relationship({
      ref: "User",
      many: true,
    }),
    departments: relationship({
      ref: "Department",
      many: true,
    }),
    active: checkbox({
      defaultValue: false,
    }),
  },
  access: {
    operation: {
      query: async (data) => await a(data)`QueryAnyShiftRule`,
      update: async (data) => await a(data)`UpdateAnyShiftRule`,
      create: async (data) => await a(data)`CreateAnyShiftRule`,
      delete: async (data) => await a(data)`DeleteAnyShiftRule`,
    },
  },
  hooks: {
    afterOperation: updateHistory,
  },
});

export default ShiftRule;
