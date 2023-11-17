/*
  Warnings:

  - You are about to drop the column `email` on the `user_table` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user_table` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `user_table` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_table` DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `image`;
