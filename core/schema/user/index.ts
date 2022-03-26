import { list } from "@keystone-6/core";
import { password, relationship, text } from "@keystone-6/core/fields";

const User = list({
  fields: {
    name: text(),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({
      validation: { isRequired: true },
    }),
    access: relationship({
      ref: "Access",
      many: true,
    }),
  },
});

export default User;
