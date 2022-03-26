import { KeystoneContext } from "@keystone-6/core/types";
import { accesses } from "../../schema";
import { AccessTypes } from "../../schema/access";

export default async (ctx: KeystoneContext) => {
  const providedAccesses: Record<string, string> = {};

  for (const access of accesses) {
    let resAccess = await ctx.query.Access.findOne({
      where: { name: access.name },
      query: "id",
    });

    if (!resAccess)
      resAccess = await ctx.query.Access.createOne({
        data: {
          name: access.name,
          type: AccessTypes.SYSTEM,
        },
        query: "id",
      });

    providedAccesses[access.name] = resAccess.id;
  }

  for (const access of accesses) {
    if (access.contains.length)
      await ctx.query.Access.updateOne({
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
