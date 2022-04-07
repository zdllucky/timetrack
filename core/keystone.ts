import { config } from "@keystone-6/core";
import { db, graphql, server, session, ui, withAuth } from "./configuration";
import lists from "./schema";

export default config(
  withAuth({
    lists,
    session,
    db,
    ui,
    server,
    graphql,
  })
);
