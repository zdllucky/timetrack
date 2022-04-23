import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { e } from "../../helpers";

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: `http${
      e`NODE_ENV` === "production" ? "s" : ""
    }://${e`CORE_HOST`}:${e`CORE_PORT`}/api/graphql`,
  }),
  endpoints: () => ({}),
});
