-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "history" JSONB DEFAULT E'[]',

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Department_workers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Department_managers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Department_heads" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Department_controls" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Department_workers_AB_unique" ON "_Department_workers"("A", "B");

-- CreateIndex
CREATE INDEX "_Department_workers_B_index" ON "_Department_workers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Department_managers_AB_unique" ON "_Department_managers"("A", "B");

-- CreateIndex
CREATE INDEX "_Department_managers_B_index" ON "_Department_managers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Department_heads_AB_unique" ON "_Department_heads"("A", "B");

-- CreateIndex
CREATE INDEX "_Department_heads_B_index" ON "_Department_heads"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Department_controls_AB_unique" ON "_Department_controls"("A", "B");

-- CreateIndex
CREATE INDEX "_Department_controls_B_index" ON "_Department_controls"("B");

-- AddForeignKey
ALTER TABLE "_Department_workers" ADD FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Department_workers" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Department_managers" ADD FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Department_managers" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Department_heads" ADD FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Department_heads" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Department_controls" ADD FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Department_controls" ADD FOREIGN KEY ("B") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
