import { KeystoneContext } from "@keystone-6/core/types";
import { accesses } from "../../schema";
import { AccessTypes } from "../../schema/access";
import { SystemAccess } from "../../schema/access/_misc/types";

export default async (ctx: KeystoneContext) => {
  const providedAccesses: Record<string, string> = {};

  try {
    await checkForCircularAccesses(accesses);
  } catch (e) {
    console.log("Failed to initiate accesses, reason: ", e);
  }

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

const checkForCircularAccesses = async (
  accesses: SystemAccess[],
  tester?: string
) => {
  if (tester && accesses.find(({ name }) => name === tester))
    throw new Error(`Circular access chain detected on "${tester}"!`);

  if (accesses.length)
    if (!tester)
      await Promise.all(
        accesses.map(({ name, contains }) =>
          checkForCircularAccesses(
            accesses.filter(({ name }) => contains.includes(name), name)
          )
        )
      );
    else
      await Promise.all(
        accesses.map(
          async ({ contains }) =>
            await checkForCircularAccesses(
              accesses.filter(({ name }) => contains.includes(name), tester)
            )
        )
      );
};
