/*
  Warnings:

  - The values [System,Custom] on the enum `AccessTypeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccessTypeType_new" AS ENUM ('SYSTEM', 'USER');
ALTER TABLE "Access" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Access" ALTER COLUMN "type" TYPE "AccessTypeType_new" USING ("type"::text::"AccessTypeType_new");
ALTER TYPE "AccessTypeType" RENAME TO "AccessTypeType_old";
ALTER TYPE "AccessTypeType_new" RENAME TO "AccessTypeType";
DROP TYPE "AccessTypeType_old";
ALTER TABLE "Access" ALTER COLUMN "type" SET DEFAULT 'SYSTEM';
COMMIT;

-- AlterTable
ALTER TABLE "Access" ALTER COLUMN "type" SET DEFAULT E'SYSTEM';
