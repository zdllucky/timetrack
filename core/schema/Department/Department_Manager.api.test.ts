import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";

describe("Department Manager", () => {
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

  it.todo("can (dis)connect Users as Workers to Department");
});
