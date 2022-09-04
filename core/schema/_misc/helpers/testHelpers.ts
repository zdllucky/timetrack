import { KeystoneContext } from "@keystone-6/core/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUserSession = (context: KeystoneContext, user: any) =>
  context.withSession({
    itemId: user.id,
    listKey: "User",
    data: user,
  });
