import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import { MutationCreateDepartmentArgs } from "../../schema_types";
import { gql } from "@keystone-6/core";

describe("Department hierarchy", () => {
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

  it("is not circular downside", async () => {
    const ac = context.sudo();

    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: { name: "test11" },
    });

    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: {
        name: "test12",
        controls: { connect: [{ name: "test11" }] },
      },
    });
    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: {
        name: "test13",
        controls: { connect: [{ name: "test12" }] },
      },
    });

    const connectRes = await ac.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test11" }
            data: { controls: { connect: { name: "test13" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(connectRes.errors).toHaveLength(1);
  });

  it("is not circular upside", async () => {
    const ac = context.sudo();

    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: { name: "test21" },
    });

    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: {
        name: "test22",
        isControlledBy: { connect: { name: "test21" } },
      },
    });
    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: {
        name: "test23",
        isControlledBy: { connect: { name: "test22" } },
      },
    });

    const connectRes = await ac.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test21" }
            data: { isControlledBy: { connect: { name: "test23" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(connectRes.errors).toHaveLength(1);
  });

  it("is not self connected", async () => {
    const ac = context.sudo();

    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: { name: "test41" },
    });

    const connectResUp = await ac.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test41" }
            data: { isControlledBy: { connect: { name: "test41" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(connectResUp.errors).toHaveLength(1);

    const connectResDown = await ac.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "test41" }
            data: { isControlledBy: { connect: { name: "test41" } } }
          ) {
            id
          }
        }
      `,
    });

    expect(connectResDown.errors).toHaveLength(1);
  });

  it("is not circular on creation", async () => {
    const ac = context.sudo();

    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: { name: "test31" },
    });

    await ac.query.Department.createOne(<MutationCreateDepartmentArgs>{
      data: {
        name: "test32",
        controls: { connect: [{ name: "test31" }] },
      },
    });

    const connectRes = await ac.graphql.raw({
      query: gql`
        mutation {
          createDepartment(
            data: {
              name: "test33"
              controls: { connect: { name: "test32" } }
              isControlledBy: { connect: { name: "test31" } }
            }
          ) {
            id
          }
        }
      `,
    });

    expect(connectRes.errors).toHaveLength(1);
  });
});
