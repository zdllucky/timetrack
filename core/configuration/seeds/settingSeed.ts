import { KeystoneContext } from "@keystone-6/core/types";
import { DatabaseInitFunction } from "../database";

const settingSeed: DatabaseInitFunction = async (ctx: KeystoneContext) => {
  if (!(await ctx.db.Setting.count()))
    await ctx.db.Setting.createOne({ data: {} });
};

export default settingSeed;
