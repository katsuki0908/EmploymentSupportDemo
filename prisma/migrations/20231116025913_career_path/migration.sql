/*
  Warnings:

  - A unique constraint covering the columns `[action_name]` on the table `action_table` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `career_path_table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `action_table_action_name_key` ON `action_table`(`action_name`);

-- CreateIndex
CREATE UNIQUE INDEX `career_path_table_name_key` ON `career_path_table`(`name`);
