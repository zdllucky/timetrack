import { e } from "../helpers";
import { BaseKeystoneTypeInfo, DatabaseConfig } from "@keystone-6/core/types";

const db: DatabaseConfig<BaseKeystoneTypeInfo> = {
  provider: "postgresql",
  url: `postgres://${e`POSTGRES_USER`}:${e`POSTGRES_PASSWORD`}@${e`POSTGRES_HOST`}:5432/${e`POSTGRES_DB`}`,
  useMigrations: true,
  idField: { kind: "cuid" },
  async onConnect() {
    console.log("Seeding complete!");
  },
};

export default db;
