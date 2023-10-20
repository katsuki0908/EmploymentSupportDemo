/*
  Warnings:

  - You are about to drop the column `furigana` on the `admin_table` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `admin_table` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admin_table" DROP COLUMN "furigana",
DROP COLUMN "name";
