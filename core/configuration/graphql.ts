import { GraphQLConfig } from "@keystone-6/core/dist/declarations/src/types/config";

const graphql: GraphQLConfig = {
  debug: true,
  apolloConfig: {
    formatError: (err) => {
      console.error(err);
      delete err.extensions?.errors;
      delete err.extensions?.exception?.errors;
      delete err.extensions?.exception?.stacktrace;
      return err;
    },
  },
};

export default graphql;
