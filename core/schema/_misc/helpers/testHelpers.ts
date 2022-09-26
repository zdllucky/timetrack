import { KeystoneContext } from "@keystone-6/core/types";
import { MutationCreateUserArgs, User } from "../../../schema_types";

export const provide = {
  session: (context: KeystoneContext, user: User) =>
    context.withSession({
      itemId: user.id,
      listKey: "User",
      data: user,
    }),
  user: async (
    context: KeystoneContext,
    user?: MutationCreateUserArgs["data"]
  ) => {
    const parsedUser = {
      login: "testUser",
      access: { connect: [{ name: "User" }] },
      password: "test123123",
      ...(user ?? {}),
    };

    return (await context.sudo().query.User.createOne(<MutationCreateUserArgs>{
      data: parsedUser,
      query: "id, login, access { name }",
    })) as User;
  },
};
