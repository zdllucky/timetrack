import { storedSessions } from "@keystone-6/core/session";
import { redisSessionStore } from "@keystone-6/session-store-redis";
import { e } from "../helpers";
import { createClient } from "@redis/client";

export const client = createClient({
  url: `redis://${e`REDIS_HOST`}:6379`,
});

const session = storedSessions({
  store: redisSessionStore({ client: client as never }),
  secret: e`SESSION_SECRET`,
  secure: e`NODE_ENV` === "production",
});

export default session;
