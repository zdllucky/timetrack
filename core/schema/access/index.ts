import { list } from "@keystone-6/core";
import { e } from "../../helpers";
import { relationship, select, text } from "@keystone-6/core/fields";

enum AccessTypes {
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
});

export default Access;
