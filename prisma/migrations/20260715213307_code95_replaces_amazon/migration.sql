/*
  Warnings:

  - You are about to drop the column `amazonExperience` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "amazonExperience",
ADD COLUMN     "code95" TEXT;
