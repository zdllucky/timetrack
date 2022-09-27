import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import { provide } from "../_misc/helpers/testHelpers";
import { Maybe, User } from "../../schema_types";
import { gql } from "@keystone-6/core";

describe("Department Manager", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let managerUser: Maybe<User>;

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();

    managerUser = await provide.user(context, {
      login: "ManagerUser",
      manages: {
        create: [
          {
            name: "TestDepartment",
          },
        ],
      },
    });

    await provide.user(context);
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });

  it("can (dis)connect Users as Workers to Department", async () => {
    const mc = provide.session(context, managerUser);

    const connectRes = await mc.graphql.raw({
      query: gql`
        mutation {
          updateDepartment(
            where: { name: "TestDepartment" }
            data: { workers: { connect: [{ login: "testUser" }] } }
          ) {
            name
          }
        }
      `,
    });

    expect(connectRes.errors).toBeUndefined();
  });
});
