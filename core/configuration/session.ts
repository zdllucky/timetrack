import { storedSessions } from "@keystone-6/core/session";
import { redisSessionStore } from "@keystone-6/session-store-redis";
import { e } from "../helpers";
import { createClient } from "redis";

const session = storedSessions({
  store: redisSessionStore({
    client: createClient({
      url: `redis://localhost:6379`,
    }),
  }),
  secret: e`SESSION_SECRET`,
  secure: e`NODE_ENV` === "production",
});

export default session;
