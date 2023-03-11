/*
  Warnings:

  - You are about to drop the column `userId` on the `Kid` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Kid" DROP CONSTRAINT "Kid_userId_fkey";

-- AlterTable
ALTER TABLE "Kid" DROP COLUMN "userId";
