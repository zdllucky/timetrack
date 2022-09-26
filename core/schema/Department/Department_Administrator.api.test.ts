import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import { Maybe, MutationCreateDepartmentArgs, User } from "../../schema_types";
import { provide } from "../_misc/helpers/testHelpers";
import { gql } from "@keystone-6/core";

describe("Administrator", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let testAdminUser: Maybe<User>;

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();

    testAdminUser = await provide.user(context, {
      login: "TestAdmin",
      access: { connect: [{ name: "Administrator" }] },
    });

    await provide.user(context, { login: "TestUser" });
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });

  it("can create/delete Department", async () => {
    const ac = await provide.session(context, testAdminUser);

    const createRes = await ac.graphql.raw({
      query: gql`
        mutation {
          createDepartment(data: { name: "Test1" }) {
            id
          }
        }
      `,
    });

    expect(createRes.errors).toBeUndefined();

    const deleteRes = await ac.graphql.raw({
      query: gql`
        mutation {
          deleteDepartment(where: { name: "Test1" }) {
            id
          }
        }
      `,
    });

    expect(deleteRes.errors).toBeUndefined();
  });
  it("can (dis)connect Users as Heads/Managers/Users to Department", async () => {
    const ac = await provide.session(context, testAdminUser);

    await ac.graphql.raw({
      query: gql`
        mutation {
          createDepartment(data: { name: "Test2" }) {
            id
          }
        }
      `,
    });

    const connectRes = await ac.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "Test2" }
            data: {
              heads: { connect: { login: "TestUser" } }
              managers: { connect: { login: "TestUser" } }
              workers: { connect: { login: "TestUser" } }
            }
          ) {
            id
          }
        }
      `,
    });

    expect(connectRes.errors).toBeUndefined();

    const disconnectRes = await ac.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "Test2" }
            data: {
              heads: { disconnect: true }
              managers: { disconnect: { login: "TestUser" } }
              workers: { disconnect: { login: "TestUser" } }
            }
          ) {
            id
          }
        }
      `,
    });

    expect(disconnectRes.errors).toBeUndefined();
  });
  it("can (dis)connect departments to each other (hierarchy)", async () => {
    const ac = await provide.session(context, testAdminUser);

    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: { name: "test31" },
    });

    const connectRes = await ac.graphql.raw({
      query: gql`
        mutation {
          createDepartment(
            data: { name: "test32", controls: { connect: { name: "test31" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(connectRes.errors).toBeUndefined();

    const disconnectRes = await ac.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test31" }
            data: { isControlledBy: { disconnect: true } }
          ) {
            id
          }
        }
      `,
    });

    expect(disconnectRes.errors).toBeUndefined();
  });
});
