/*
  Warnings:

  - The primary key for the `user_table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user_table` table. All the data in the column will be lost.
  - Added the required column `id` to the `user_table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `admin_table` DROP FOREIGN KEY `admin_table_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `student_table` DROP FOREIGN KEY `student_table_student_id_fkey`;

-- AlterTable
ALTER TABLE `user_table` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `student_table` ADD CONSTRAINT `student_table_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `user_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin_table` ADD CONSTRAINT `admin_table_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `user_table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
