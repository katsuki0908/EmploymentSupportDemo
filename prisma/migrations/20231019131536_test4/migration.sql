/*
  Warnings:

  - You are about to drop the column `furigana` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `student_table` table. All the data in the column will be lost.
  - Added the required column `furigana` to the `user_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job_listing_table" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "student_table" DROP COLUMN "furigana",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "user_table" ADD COLUMN     "furigana" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
