import { KeystoneContext } from "@keystone-6/core/types";
import { accesses } from "../../schema";
import {
  MutationCreateUserArgs,
  MutationUpdateUserArgs,
  QueryUserArgs,
} from "../../schema_types";

export default async (ctx: KeystoneContext) => {
  const providedAccesses: Record<string, string> = {};

  for (const { name, type } of accesses) {
    let resAccess = await ctx.query.Access.findOne(<QueryUserArgs>{
      where: { name },
      query: "id",
    });

    if (!resAccess)
      resAccess = await ctx.query.Access.createOne(<MutationCreateUserArgs>{
        data: { name, type },
        query: "id",
      });

    providedAccesses[name] = resAccess.id;
  }

  for (const access of accesses) {
    if (access.contains.length)
      await ctx.query.Access.updateOne(<MutationUpdateUserArgs>{
        where: { id: providedAccesses[access.name] },
        data: {
          contains: {
            set: access.contains.map((name) => ({ name })),
          },
        },
        query: "id",
      });
  }
};
