import { KeystoneContext } from "@keystone-6/core/types";

export default async (ctx: KeystoneContext) => {
  if (!(await ctx.db.Setting.count()))
    await ctx.db.Setting.createOne({ data: {} });
};
