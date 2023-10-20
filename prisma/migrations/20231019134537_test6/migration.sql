/*
  Warnings:

  - Made the column `student_id` on table `contact_table` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contact_table" DROP CONSTRAINT "contact_table_student_id_fkey";

-- DropForeignKey
ALTER TABLE "student_table" DROP CONSTRAINT "student_table_contact1_fkey";

-- DropForeignKey
ALTER TABLE "student_table" DROP CONSTRAINT "student_table_contact2_fkey";

-- AlterTable
ALTER TABLE "contact_table" ALTER COLUMN "student_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "student_table" ALTER COLUMN "contact1" DROP NOT NULL,
ALTER COLUMN "contact2" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_contact1_fkey" FOREIGN KEY ("contact1") REFERENCES "contact_table"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_contact2_fkey" FOREIGN KEY ("contact2") REFERENCES "contact_table"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_table" ADD CONSTRAINT "contact_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_table"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
