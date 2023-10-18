-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_cource_id_fkey" FOREIGN KEY ("cource_id") REFERENCES "cource_table"("cource_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_table" ADD CONSTRAINT "teacher_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_table" ADD CONSTRAINT "contact_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_action_table" ADD CONSTRAINT "career_action_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_action_table" ADD CONSTRAINT "career_action_table_career_action_id_fkey" FOREIGN KEY ("career_action_id") REFERENCES "career_path_table"("career_path_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_action_table" ADD CONSTRAINT "career_action_table_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "action_table"("action_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_listing_table" ADD CONSTRAINT "job_listing_table_career_path_id_fkey" FOREIGN KEY ("career_path_id") REFERENCES "career_path_table"("career_path_id") ON DELETE RESTRICT ON UPDATE CASCADE;
