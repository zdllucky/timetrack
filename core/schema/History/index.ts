import { list } from "@keystone-6/core";
import { json, text, timestamp } from "@keystone-6/core/fields";
import { a } from "../Access";
import { CommonFieldConfig } from "@keystone-6/core/dist/declarations/src/types/config/fields";
import { BaseListTypeInfo } from "@keystone-6/core/dist/declarations/src/types/type-info";

/**
 * Readonly field
 * @type {{itemView: {fieldMode: string}}}
 */
const ui: CommonFieldConfig<BaseListTypeInfo>["ui"] = {
  itemView: {
    fieldMode: "read",
  },
};

const History = list({
  fields: {
    list: text({ ui }),
    ref: text({ ui }),
    at: timestamp({ ui }),
    by: text({ ui }),
    operation: text({ ui }),
    updatedFields: json({ ui }),
  },
  access: {
    operation: {
      query: async (data) => await a(data)`Owner`,
      delete: () => false,
      update: () => false,
      create: () => false,
    },
  },
});

export default History;
