import { setupTestEnv, TestEnv } from "@keystone-6/core/testing";
import { KeystoneContext } from "@keystone-6/core/types";
import config from "../../keystone";
import { provide } from "../_misc/helpers/testHelpers";
import {
  Maybe,
  MutationCreateDepartmentArgs,
  Query,
  User,
} from "../../schema_types";
import { gql } from "@keystone-6/core";

describe("User", () => {
  let testEnv: TestEnv;
  let context: KeystoneContext;
  let user: Maybe<User>;

  beforeAll(async () => {
    testEnv = await setupTestEnv({ config });
    context = testEnv.testArgs.context;

    await testEnv.connect();

    user = await provide.user(context);
  });

  afterAll(async () => {
    await testEnv.disconnect();
  });

  it("can query departments", async () => {
    const uc = provide.session(context, user);

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
                workers: { connect: [{ login: "testUser" }] },
              },
            },
          },
        },
      },
    });

    const queryRes = await uc.graphql.raw<Pick<Query, "departments">, never>({
      query: gql`
        query {
          departments {
            name
            heads {
              login
            }
            workers {
              login
            }
            managers {
              login
            }
            isControlledBy {
              name
            }
            controls {
              name
            }
          }
        }
      `,
    });

    expect(queryRes.errors).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-explicit-any
    expect(queryRes.data?.departments?.length).toBe(3);
  });
});
