-- CreateEnum
CREATE TYPE "AccessTypeType" AS ENUM ('System', 'Custom');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Access" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "type" "AccessTypeType" NOT NULL DEFAULT E'Custom',

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Access_contains" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Access_name_key" ON "Access"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_Access_contains_AB_unique" ON "_Access_contains"("A", "B");

-- CreateIndex
CREATE INDEX "_Access_contains_B_index" ON "_Access_contains"("B");

-- AddForeignKey
ALTER TABLE "_Access_contains" ADD FOREIGN KEY ("A") REFERENCES "Access"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Access_contains" ADD FOREIGN KEY ("B") REFERENCES "Access"("id") ON DELETE CASCADE ON UPDATE CASCADE;
