import { createAuth } from "@keystone-6/auth";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "login",
  secretField: "password",
  initFirstItem: {
    fields: ["login", "password"],
    skipKeystoneWelcome: true,
    itemData: { access: { connect: { name: "Owner" } } },
  },
  sessionData: "login, access {name}",
});

export default withAuth;
