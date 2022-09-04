/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import {
  MutationCreateDepartmentsArgs,
  MutationCreateShiftRuleArgs,
  MutationCreateUsersArgs,
} from "../../schema_types";
import { gql } from "@keystone-6/core";
import { createUserSession } from "../_misc/helpers/testHelpers";

describe("Shift rules schema", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let testUser: any;
  let testDepartManagerUser: any;

  // Create rule, department, user +
  // Link user to the department +
  // Link rule to the department, link rule to user of the department then unlink
  // Link Manager to another department, repeat upper step
  it.skip("can be linked to departments/users by manager for his departments only", async () => {
    const managerContext = await createUserSession(
      context,
      testDepartManagerUser
    );
    const userContext = await createUserSession(context, testUser);

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

    expect(connectResFailing.errors).toHaveLength(2);

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
      variables: { id: createRes.data?.createShiftRule.id },
    });

    expect(disconnectResFailing.errors).toHaveLength(2);

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
      variables: { id: createRes.data?.createShiftRule.id },
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
      query: "id",
    });

    const createTestUsersRes = await context.sudo().query.User.createMany(<
      MutationCreateUsersArgs
    >{
      data: [
        {
          login: "TestManager",
          password: "test123123",
          manages: { connect: [{ name: "TestDepartment" }] },
        },
        {
          login: "TestUser",
          password: "test123123",
          access: { connect: [{ name: "User" }] },
          worksIn: { connect: { name: "TestDepartment" } },
        },
        {
          login: "TestOtherUser",
          access: { connect: [{ name: "User" }] },
          password: "test123123",
        },
      ],
      query: "id, login, access { name }",
    });

    testDepartManagerUser = createTestUsersRes.find(
      ({ login }) => login === "TestManager"
    );
    testUser = createTestUsersRes.find(({ login }) => login === "TestUser");
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });
});
