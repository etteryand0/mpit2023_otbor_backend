/*
  Warnings:

  - You are about to drop the column `age` on the `Kid` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kid" DROP COLUMN "age";

-- CreateTable
CREATE TABLE "ProjectCheckPoint" (
    "id" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectCheckPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectCheckPoint" ADD CONSTRAINT "ProjectCheckPoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
