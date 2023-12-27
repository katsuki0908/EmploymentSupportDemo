/*
  Warnings:

  - You are about to drop the column `cource_id` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the `cource_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "student_table" DROP CONSTRAINT "student_table_cource_id_fkey";

-- AlterTable
ALTER TABLE "student_table" DROP COLUMN "cource_id",
ADD COLUMN     "course_id" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "cource_table";

-- CreateTable
CREATE TABLE "course_table" (
    "course_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "course_table_pkey" PRIMARY KEY ("course_id")
);

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course_table"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
