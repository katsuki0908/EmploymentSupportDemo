/*
  Warnings:

  - You are about to drop the column `updated_date` on the `notice_table` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `notice_table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contact_table" DROP CONSTRAINT "contact_table_student_id_fkey";

-- AlterTable
ALTER TABLE "contact_table" ALTER COLUMN "student_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "notice_table" DROP COLUMN "updated_date",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "contact_table" ADD CONSTRAINT "contact_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_table"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;
