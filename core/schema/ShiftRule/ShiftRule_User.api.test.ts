/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import {
  MutationCreateShiftRuleArgs,
  MutationCreateUsersArgs,
} from "../../schema_types";
import { createUserSession } from "../_misc/helpers/testHelpers";
import { gql } from "@keystone-6/core";

describe("Shift rules schema", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let testUser: any;

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();

    const createTestUsersRes = await context.sudo().query.User.createMany(<
      MutationCreateUsersArgs
    >{
      data: [
        {
          login: "TestUser",
          password: "test123123",
          access: { connect: [{ name: "User" }] },
        },
      ],
      query: "id, login, access { name }",
    });

    testUser = createTestUsersRes.find(({ login }) => login === "TestUser");
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });

  it("can be queried by user", async () => {
    const userContext = await createUserSession(context, testUser);

    const createRes = await context.sudo().query.ShiftRule.createOne(<
      MutationCreateShiftRuleArgs
    >{
      data: { name: "Test rule" },
      query: "id",
    });

    const readRes = await userContext.graphql.raw({
      query: gql`
        query ($id: ID!) {
          shiftRule(where: { id: $id }) {
            id
            name
            users {
              login
            }
            departments {
              name
            }
            active
          }
        }
      `,
      variables: { id: createRes.id },
    });

    expect(readRes.errors).toBeUndefined();
    expect(readRes.data?.shiftRule.name).toBe("Test rule");
  });
});
