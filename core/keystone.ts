import { config } from "@keystone-6/core";
import db from "./configuration/database";
import session from "./configuration/session";
import server from "./configuration/server";
import ui from "./configuration/ui";
import lists from "./schema";
import withAuth from "./configuration/auth";
import graphql from "./configuration/graphql";

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
