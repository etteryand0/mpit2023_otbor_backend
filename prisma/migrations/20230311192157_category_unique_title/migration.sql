/*
  Warnings:

  - You are about to drop the column `media_type` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "media_type";

-- DropEnum
DROP TYPE "MediaType";

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");
