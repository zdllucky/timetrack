-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "projectID" TEXT NOT NULL DEFAULT E'Horns-n-hooves',
    "projectName" TEXT NOT NULL DEFAULT E'Horns&Hooves',
    "history" JSONB DEFAULT '[]',

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
