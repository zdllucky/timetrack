import { createAuth } from "@keystone-6/auth";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["email", "password"],
    skipKeystoneWelcome: true,
  },
  sessionData: "id, email, access {name}",
});

export default withAuth;
