/*
  Warnings:

  - Made the column `name` on table `career_path_table` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `contact_table_student_id_fkey` ON `contact_table`;

-- AlterTable
ALTER TABLE `career_path_table` MODIFY `name` VARCHAR(191) NOT NULL;
