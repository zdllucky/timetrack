import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import { MutationCreateUserArgs, QueryShiftRuleArgs } from "../../schema_types";
import { gql } from "@keystone-6/core";

describe("Shift rules schema", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let testAdminUser: any;

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();

    testAdminUser = await context.sudo().query.User.createOne(<
      MutationCreateUserArgs
    >{
      data: {
        login: "TestAdmin",
        password: "test123123",
        access: { connect: [{ name: "Administrator" }] },
      },
      query: "id, login, access { name }",
    });
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });

  it("can be CRUD by administrator", async () => {
    const adminContext = await context.withSession({
      itemId: testAdminUser.id,
      listKey: "User",
      data: testAdminUser,
    });

    const createRes = await adminContext.graphql.raw({
      query: gql`
        mutation {
          createShiftRule(data: { name: "Test rule" }) {
            id
          }
        }
      `,
    });

    expect(createRes.errors).toBeUndefined();

    const readRes = await adminContext.query.ShiftRule.findOne(<
      QueryShiftRuleArgs
    >{
      where: { id: createRes.data?.createShiftRule.id },
      query: "name",
    });

    expect(readRes.name).toBe("Test rule");

    const updateRes = await adminContext.graphql.raw({
      query: gql`
        mutation ($id: ID!) {
          updateShiftRule(data: { active: true }, where: { id: $id }) {
            id
            active
          }
        }
      `,
      variables: { id: createRes.data?.createShiftRule.id },
    });

    expect(updateRes.data?.updateShiftRule.active).toBeTruthy();

    const deleteRes = await adminContext.graphql.raw({
      query: gql`
        mutation ($id: ID!) {
          deleteShiftRule(where: { id: $id }) {
            id
          }
        }
      `,
      variables: { id: createRes.data?.createShiftRule.id },
    });

    expect(deleteRes.errors).toBeUndefined();

    const queryDeletedRes = await adminContext.query.ShiftRule.findOne(<
      QueryShiftRuleArgs
    >{
      where: { id: createRes.data?.createShiftRule.id },
      query: "name",
    });

    expect(queryDeletedRes).toBeNull();
  });

  it.todo("can be created/changed by head/manager for his departments");
  it.todo("can be created/changed by head/manager for his department's users");
});
