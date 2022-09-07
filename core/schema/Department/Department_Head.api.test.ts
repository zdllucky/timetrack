import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";

describe("Department Head", () => {
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

  it.todo("can (dis)connect Users as Heads/Managers to Department");
  it.todo("can create subDepartments and set Heads/Managers to it");
});
