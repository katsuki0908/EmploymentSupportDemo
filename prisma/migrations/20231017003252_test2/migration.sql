/*
  Warnings:

  - The primary key for the `career_action_table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `career_action` on the `career_action_table` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `career_path_table` table. All the data in the column will be lost.
  - The primary key for the `contact_table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `context` on the `notice_table` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `teacher_table` table. All the data in the column will be lost.
  - Added the required column `career_action_id` to the `career_action_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `career_path_name` to the `career_path_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `notice_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_name` to the `student_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_name` to the `teacher_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "career_action_table" DROP CONSTRAINT "career_action_table_pkey",
DROP COLUMN "career_action",
ADD COLUMN     "career_action_id" INTEGER NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL,
ADD CONSTRAINT "career_action_table_pkey" PRIMARY KEY ("career_action_id");

-- AlterTable
ALTER TABLE "career_path_table" DROP COLUMN "name",
ADD COLUMN     "career_path_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contact_table" DROP CONSTRAINT "contact_table_pkey",
ADD CONSTRAINT "contact_table_pkey" PRIMARY KEY ("contact_type", "user_id");

-- AlterTable
ALTER TABLE "notice_table" DROP COLUMN "context",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_table" DROP COLUMN "name",
ADD COLUMN     "student_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teacher_table" DROP COLUMN "name",
ADD COLUMN     "teacher_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
