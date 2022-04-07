// const runner = setupTestRunner({ config });

import { KeystoneContext } from "@keystone-6/core/types";
import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import config from "../../keystone";
import { redisClient } from "../../configuration";
import { accesses } from "../index";
import { SystemAccess } from "./_misc/types";

describe("Accesses logic", () => {
  it("is not circular", async () => {
    expect.assertions(1);
    await expect(checkForCircularAccesses(accesses)).resolves.not.toThrow();
  });
});

describe("Accesses schema", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();
  });

  afterAll(async () => {
    await testEnv.disconnect();
    await redisClient.quit();
  });

  it("inserts to database", async () => {
    const res = await context.sudo().query.Access.count();

    expect(Number(res)).toBe(accesses.length);
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
