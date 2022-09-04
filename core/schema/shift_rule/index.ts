import { list } from "@keystone-6/core";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { a } from "../access";

const ShiftRule = list({
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    users: relationship({
      ref: "User",
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
});

export default ShiftRule;
