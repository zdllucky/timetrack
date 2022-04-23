import { BaseKeystoneTypeInfo, ServerConfig } from "@keystone-6/core/types";
import { e } from "../helpers";

const server: ServerConfig<BaseKeystoneTypeInfo> = {
  cors: {
    origin: "*",
    credentials: false,
  },
  port: Number(e`CORE_PORT`),
  healthCheck: {
    path: "/health",
    data: () => ({
      status: "Ok!",
      timestamp: Date.now(),
      uptime: process.uptime(),
    }),
  },
};

export default server;
