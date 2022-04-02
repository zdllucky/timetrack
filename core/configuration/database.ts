import { e } from "../helpers";
import { BaseKeystoneTypeInfo, DatabaseConfig } from "@keystone-6/core/types";
import accessSeed from "./seeds/accessSeed";

const db: DatabaseConfig<BaseKeystoneTypeInfo> = {
  provider: "postgresql",
  url: `postgres://${e`POSTGRES_USER`}:${e`POSTGRES_PASSWORD`}@${e`POSTGRES_HOST`}:5432/${e`POSTGRES_DB`}`,
  useMigrations: true,
  idField: { kind: "cuid" },
  prismaPreviewFeatures: ["filterJson"],
  // enableLogging: true,
  async onConnect(ctx) {
    await accessSeed(ctx);
  },
};

export default db;
