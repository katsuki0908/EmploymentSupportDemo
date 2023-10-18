/*
  Warnings:

  - You are about to drop the column `updated_date` on the `career_action_table` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `career_action_table` table. All the data in the column will be lost.
  - You are about to drop the column `career_path_name` on the `career_path_table` table. All the data in the column will be lost.
  - The primary key for the `contact_table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `contact_table` table. All the data in the column will be lost.
  - You are about to drop the column `course_name` on the `cource_table` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `job_listing_table` table. All the data in the column will be lost.
  - The primary key for the `student_table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_name` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the `teacher_table` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `student_id` to the `career_action_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `career_action_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `career_path_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `contact_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `cource_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `job_listing_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact1` to the `student_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact2` to the `student_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `student_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `student_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `student_table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "career_action_table" DROP CONSTRAINT "career_action_table_user_id_fkey";

-- DropForeignKey
ALTER TABLE "contact_table" DROP CONSTRAINT "contact_table_user_id_fkey";

-- DropForeignKey
ALTER TABLE "student_table" DROP CONSTRAINT "student_table_user_id_fkey";

-- DropForeignKey
ALTER TABLE "teacher_table" DROP CONSTRAINT "teacher_table_user_id_fkey";

-- AlterTable
CREATE SEQUENCE action_table_action_id_seq;
ALTER TABLE "action_table" ALTER COLUMN "action_id" SET DEFAULT nextval('action_table_action_id_seq');
ALTER SEQUENCE action_table_action_id_seq OWNED BY "action_table"."action_id";

-- AlterTable
CREATE SEQUENCE career_action_table_career_action_id_seq;
ALTER TABLE "career_action_table" DROP COLUMN "updated_date",
DROP COLUMN "user_id",
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "career_action_id" SET DEFAULT nextval('career_action_table_career_action_id_seq');
ALTER SEQUENCE career_action_table_career_action_id_seq OWNED BY "career_action_table"."career_action_id";

-- AlterTable
CREATE SEQUENCE career_path_table_career_path_id_seq;
ALTER TABLE "career_path_table" DROP COLUMN "career_path_name",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "career_path_id" SET DEFAULT nextval('career_path_table_career_path_id_seq');
ALTER SEQUENCE career_path_table_career_path_id_seq OWNED BY "career_path_table"."career_path_id";

-- AlterTable
ALTER TABLE "contact_table" DROP CONSTRAINT "contact_table_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "contact_id" SERIAL NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD CONSTRAINT "contact_table_pkey" PRIMARY KEY ("contact_id");

-- AlterTable
CREATE SEQUENCE cource_table_cource_id_seq;
ALTER TABLE "cource_table" DROP COLUMN "course_name",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "cource_id" SET DEFAULT nextval('cource_table_cource_id_seq');
ALTER SEQUENCE cource_table_cource_id_seq OWNED BY "cource_table"."cource_id";

-- AlterTable
CREATE SEQUENCE job_listing_table_job_listing_id_seq;
ALTER TABLE "job_listing_table" DROP COLUMN "updated_date",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "job_listing_id" SET DEFAULT nextval('job_listing_table_job_listing_id_seq');
ALTER SEQUENCE job_listing_table_job_listing_id_seq OWNED BY "job_listing_table"."job_listing_id";

-- AlterTable
CREATE SEQUENCE notice_table_notice_id_seq;
ALTER TABLE "notice_table" ALTER COLUMN "notice_id" SET DEFAULT nextval('notice_table_notice_id_seq');
ALTER SEQUENCE notice_table_notice_id_seq OWNED BY "notice_table"."notice_id";

-- AlterTable
ALTER TABLE "student_table" DROP CONSTRAINT "student_table_pkey",
DROP COLUMN "student_name",
DROP COLUMN "teacher_id",
DROP COLUMN "updated_date",
DROP COLUMN "user_id",
ADD COLUMN     "contact1" INTEGER NOT NULL,
ADD COLUMN     "contact2" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "student_table_pkey" PRIMARY KEY ("student_id");

-- DropTable
DROP TABLE "teacher_table";

-- CreateTable
CREATE TABLE "admin_table" (
    "admin_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "furigana" TEXT NOT NULL,

    CONSTRAINT "admin_table_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "instruction_table" (
    "subject" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "instruction_table_pkey" PRIMARY KEY ("subject","student_id","admin_id")
);

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user_table"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_contact1_fkey" FOREIGN KEY ("contact1") REFERENCES "contact_table"("contact_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_contact2_fkey" FOREIGN KEY ("contact2") REFERENCES "contact_table"("contact_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_table" ADD CONSTRAINT "admin_table_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "user_table"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instruction_table" ADD CONSTRAINT "instruction_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_table"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instruction_table" ADD CONSTRAINT "instruction_table_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin_table"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_table" ADD CONSTRAINT "contact_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_table"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_action_table" ADD CONSTRAINT "career_action_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_table"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
