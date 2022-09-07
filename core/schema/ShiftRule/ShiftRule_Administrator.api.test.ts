/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import {
  MutationCreateDepartmentsArgs,
  MutationCreateUsersArgs,
  QueryShiftRuleArgs,
} from "../../schema_types";
import { gql } from "@keystone-6/core";
import { createUserSession } from "../_misc/helpers/testHelpers";

describe("Administrator", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let testAdminUser: any;

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
          login: "TestAdmin",
          password: "test123123",
          access: { connect: [{ name: "Administrator" }] },
        },
      ],
      query: "id, login, access { name }",
    });

    testAdminUser = createTestUsersRes.find(
      ({ login }) => login === "TestAdmin"
    );
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });

  it("can create/update/delete ShiftRule", async () => {
    const adminContext = await createUserSession(context, testAdminUser);

    const createRes = await adminContext.graphql.raw({
      query: gql`
        mutation {
          createShiftRule(
            data: {
              name: "Test rule"
              departments: { connect: { name: "TestDepartment" } }
            }
          ) {
            id
          }
        }
      `,
    });

    expect(createRes.errors).toBeUndefined();

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
});
