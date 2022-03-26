/*
  Warnings:

  - You are about to drop the column `historyLogs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "historyLogs",
ADD COLUMN     "history" JSONB DEFAULT E'[]';
