import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import { accesses } from "../index";

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
  });

  it("inserts to database", async () => {
    const res = await context.sudo().query.Access.count();

    expect(Number(res)).toBe(accesses.length);
  });
});
