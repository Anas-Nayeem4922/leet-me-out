/*
  Warnings:

  - Changed the type of `problem` on the `Problems` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Problems" DROP COLUMN "problem",
ADD COLUMN     "problem" JSONB NOT NULL;
