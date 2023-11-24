-- DropForeignKey
ALTER TABLE "career_action_table" DROP CONSTRAINT "career_action_table_career_action_id_fkey";

-- AddForeignKey
ALTER TABLE "career_action_table" ADD CONSTRAINT "career_action_table_career_path_id_fkey" FOREIGN KEY ("career_path_id") REFERENCES "career_path_table"("career_path_id") ON DELETE RESTRICT ON UPDATE CASCADE;
