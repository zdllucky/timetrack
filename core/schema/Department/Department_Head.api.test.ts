import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import { Maybe, MutationCreateDepartmentArgs, User } from "../../schema_types";
import { provide } from "../_misc/helpers/testHelpers";
import { gql } from "@keystone-6/core";

describe("Department Head", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let headUser: Maybe<User>;

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;
    await testEnv.connect();

    headUser = await provide.user(context, {
      login: "HeadUser",
      headOf: { create: [{ name: "test1" }] },
    });

    await provide.user(context, { login: "WorkerUser1" });
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });

  it("can (dis)connect Users as Managers to Department", async () => {
    const hc = provide.session(context, headUser);

    const connectRes = await hc.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test1" }
            data: { managers: { connect: { login: "WorkerUser1" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(connectRes.errors).toBeUndefined();

    const disconnectRes = await hc.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test1" }
            data: { managers: { disconnect: { login: "WorkerUser1" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(disconnectRes.errors).toBeUndefined();
  });
  it("can connect Users as Managers/ to subDepartments", async () => {
    const hc = await provide.session(context, headUser);

    await context.sudo().query.Department.createOne(<
      MutationCreateDepartmentArgs
    >{
      data: {
        name: "test21",
        isControlledBy: {
          create: {
            name: "test22",
            isControlledBy: {
              create: {
                name: "test23",
                heads: { connect: { login: "HeadUser" } },
              },
            },
          },
        },
      },
    });

    const connectRes = await hc.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test21" }
            data: { managers: { connect: { login: "WorkerUser1" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(connectRes.errors).toBeUndefined();

    const disconnectRes = await hc.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test21" }
            data: { managers: { disconnect: { login: "WorkerUser1" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(disconnectRes.errors).toBeUndefined();
  });
});
