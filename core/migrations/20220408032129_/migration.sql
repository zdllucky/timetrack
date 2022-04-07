/*
  Warnings:

  - The values [SYSTEM,USER] on the enum `AccessTypeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccessTypeType_new" AS ENUM ('System', 'User');
ALTER TABLE "Access" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Access" ALTER COLUMN "type" TYPE "AccessTypeType_new" USING ("type"::text::"AccessTypeType_new");
ALTER TYPE "AccessTypeType" RENAME TO "AccessTypeType_old";
ALTER TYPE "AccessTypeType_new" RENAME TO "AccessTypeType";
DROP TYPE "AccessTypeType_old";
ALTER TABLE "Access" ALTER COLUMN "type" SET DEFAULT 'System';
COMMIT;

-- AlterTable
ALTER TABLE "Access" ALTER COLUMN "type" SET DEFAULT E'System';
