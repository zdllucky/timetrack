import { createAuth } from "@keystone-6/auth";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["email", "password"],
    skipKeystoneWelcome: true,
  },
});

export default withAuth;
