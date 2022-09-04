import { accesses } from "../index";
import { SystemAccess } from "./_misc/types";

describe("Accesses logic", () => {
  it("is not circular", async () => {
    expect.assertions(1);
    await expect(checkForCircularAccesses(accesses)).resolves.not.toThrow();
  });
});

const checkForCircularAccesses = async (
  accesses: SystemAccess[],
  tester?: string
): Promise<void> => {
  if (tester && accesses.find(({ name }) => name === tester))
    throw new Error(`Circular access chain detected on "${tester}"!`);

  if (accesses.length)
    if (!tester)
      await Promise.all(
        accesses.map(({ name, contains }) =>
          checkForCircularAccesses(
            accesses.filter(
              ({ name }) => contains && contains.includes(name),
              name
            )
          )
        )
      );
    else
      await Promise.all(
        accesses.map(
          async ({ contains }) =>
            await checkForCircularAccesses(
              accesses.filter(
                ({ name }) => contains && contains.includes(name),
                tester
              )
            )
        )
      );
};
