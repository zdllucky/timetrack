import { KeystoneContext } from "@keystone-6/core/types";
import { MutationCreateUserArgs, QueryUsersArgs } from "../../schema_types";
import { e } from "../../helpers";
import { DatabaseInitFunction } from "../database";

const userSeed: DatabaseInitFunction = async (ctx: KeystoneContext) => {
  const amount = await ctx.db.User.findMany(<QueryUsersArgs>{
    where: { access: { some: { name: { equals: "Owner" } } } },
    take: 1,
    query: "id",
  });

  if (!amount.length)
    await ctx.db.User.createOne(<MutationCreateUserArgs>{
      data: {
        login: e`OWNER_USERNAME`,
        password: e`OWNER_PASSWORD`,
        access: { connect: [{ name: "Owner" }] },
      },
    });
};

export default userSeed;
