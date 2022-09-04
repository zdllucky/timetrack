import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { updateHistory } from "../_misc/plugins/history";
import { a } from "../Access";

const Setting = list({
  fields: {
    projectID: text({
      defaultValue: "horns_n_hooves",
      validation: {
        isRequired: true,
        match: {
          regex: /^\w{3,}$/g,
        },
      },
      access: {
        update: () => false,
      },
    }),
    projectName: text({
      validation: {
        isRequired: true,
      },
      defaultValue: "Horns&Hooves",
      access: {
        update: (data) => a(data)`Owner`,
      },
    }),
  },
  access: {
    operation: {
      create: () => false,
      query: (data) => a(data)`QueryAnySetting`,
      update: (data) => a(data)`UpdateAnySetting`,
      delete: () => false,
    },
  },
  hooks: {
    afterOperation: updateHistory,
  },
  graphql: {
    omit: ["delete", "create"],
  },
  ui: {
    listView: {
      defaultFieldMode: "hidden",
    },
    isHidden: true,
    hideCreate: true,
    hideDelete: true,
  },
});

export default Setting;
