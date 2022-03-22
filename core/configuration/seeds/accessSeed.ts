import { KeystoneContext } from "@keystone-6/core/types";

export default async (ctx: KeystoneContext) => {
  if (await ctx.db.Access.count()) return;

  await ctx.db.Access.createMany({ data: [{}] });
};
