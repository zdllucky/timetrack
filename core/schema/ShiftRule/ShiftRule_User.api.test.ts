import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import { Maybe, MutationCreateShiftRuleArgs, User } from "../../schema_types";
import { provide } from "../_misc/helpers/testHelpers";
import { gql } from "@keystone-6/core";

describe("As User: ShiftRule", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let testUser: Maybe<User>;

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();

    testUser = await provide.user(context);
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });

  it("can be queried", async () => {
    const userContext = await provide.session(context, testUser);

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
