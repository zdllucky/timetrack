-- CreateTable
CREATE TABLE "_User_access" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_User_access_AB_unique" ON "_User_access"("A", "B");

-- CreateIndex
CREATE INDEX "_User_access_B_index" ON "_User_access"("B");

-- AddForeignKey
ALTER TABLE "_User_access" ADD FOREIGN KEY ("A") REFERENCES "Access"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_access" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
