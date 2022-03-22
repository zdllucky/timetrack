import { BaseKeystoneTypeInfo, ServerConfig } from "@keystone-6/core/types";

const server: ServerConfig<BaseKeystoneTypeInfo> = {
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
