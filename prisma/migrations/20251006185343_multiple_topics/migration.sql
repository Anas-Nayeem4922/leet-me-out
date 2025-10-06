/*
  Warnings:

  - The `topics` column on the `Submissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Submissions" DROP COLUMN "topics",
ADD COLUMN     "topics" TEXT[];
