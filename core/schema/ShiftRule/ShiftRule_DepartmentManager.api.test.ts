import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import {
  Maybe,
  MutationCreateDepartmentsArgs,
  MutationCreateShiftRuleArgs,
  User,
} from "../../schema_types";
import { gql } from "@keystone-6/core";
import { provide } from "../_misc/helpers/testHelpers";

describe("Department Manager", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let testUser: Maybe<User>;
  let testDepartManagerUser: Maybe<User>;

  it("can link Department Users to ShiftRule", async () => {
    const managerContext = await provide.session(
      context,
      testDepartManagerUser
    );
    const userContext = await provide.session(context, testUser);

    const createRes = await context.sudo().query.ShiftRule.createOne(<
      MutationCreateShiftRuleArgs
    >{
      data: { name: "Test rule", active: true },
      query: "id",
    });

    const connectRes = await managerContext.graphql.raw({
      query: gql`
        mutation ($id: ID!) {
          updateShiftRule(
            data: {
              departments: { connect: [{ name: "TestDepartment" }] }
              users: { connect: [{ login: "TestUser" }] }
            }
            where: { id: $id }
          ) {
            id
            active
          }
        }
      `,
      variables: { id: createRes.id },
    });

    expect(connectRes.errors).toBeUndefined();

    const connectResFailing = await userContext.graphql.raw({
      query: gql`
        mutation ($id: ID!) {
          updateShiftRule(
            data: {
              departments: { connect: [{ name: "TestOtherDepartment" }] }
              users: { connect: [{ login: "TestManager" }] }
            }
            where: { id: $id }
          ) {
            id
            active
          }
        }
      `,
      variables: { id: createRes.id },
    });

    expect(connectResFailing.errors).toHaveLength(1);

    const disconnectResFailing = await userContext.graphql.raw({
      query: gql`
        mutation ($id: ID!) {
          updateShiftRule(
            data: {
              departments: { disconnect: [{ name: "TestDepartment" }] }
              users: { disconnect: [{ login: "TestUser" }] }
            }
            where: { id: $id }
          ) {
            id
            active
          }
        }
      `,
      variables: { id: createRes.id },
    });

    expect(disconnectResFailing.errors).toHaveLength(1);

    const disconnectRes = await managerContext.graphql.raw({
      query: gql`
        mutation ($id: ID!) {
          updateShiftRule(
            data: {
              departments: { disconnect: [{ name: "TestDepartment" }] }
              users: { disconnect: [{ login: "TestUser" }] }
            }
            where: { id: $id }
          ) {
            id
            active
          }
        }
      `,
      variables: { id: createRes.id },
    });

    expect(disconnectRes.errors).toBeUndefined();
  });

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();

    await context.sudo().query.Department.createMany(<
      MutationCreateDepartmentsArgs
    >{
      data: [{ name: "TestDepartment" }, { name: "OtherTestDepartment" }],
    });

    testDepartManagerUser = await provide.user(context, {
      login: "TestManager",
      manages: { connect: [{ name: "TestDepartment" }] },
    });

    testUser = await provide.user(context, {
      login: "TestUser",
      worksIn: { connect: [{ name: "TestDepartment" }] },
    });

    await provide.user(context, {
      login: "TestOtherUser",
    });
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });
});
