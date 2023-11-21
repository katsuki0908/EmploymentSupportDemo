/*
  Warnings:

  - You are about to drop the column `contact1` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the column `contact2` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `student_table` table. All the data in the column will be lost.
  - You are about to drop the `contact_table` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end_date` to the `job_listing_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `job_listing_table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contact_table" DROP CONSTRAINT "contact_table_student_id_fkey";

-- DropForeignKey
ALTER TABLE "student_table" DROP CONSTRAINT "student_table_contact1_fkey";

-- DropForeignKey
ALTER TABLE "student_table" DROP CONSTRAINT "student_table_contact2_fkey";

-- AlterTable
ALTER TABLE "job_listing_table" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "student_table" DROP COLUMN "contact1",
DROP COLUMN "contact2",
DROP COLUMN "grade",
DROP COLUMN "notes",
ADD COLUMN     "emergency_address" TEXT,
ADD COLUMN     "emergency_phone" TEXT,
ADD COLUMN     "personal_address" TEXT,
ADD COLUMN     "personal_email" TEXT,
ADD COLUMN     "personal_phone" TEXT;

-- DropTable
DROP TABLE "contact_table";

-- CreateTable
CREATE TABLE "obog_table" (
    "oboj_id" SERIAL NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "personal_number" INTEGER NOT NULL,
    "career_path_id" INTEGER NOT NULL,

    CONSTRAINT "obog_table_pkey" PRIMARY KEY ("oboj_id")
);

-- AddForeignKey
ALTER TABLE "obog_table" ADD CONSTRAINT "obog_table_career_path_id_fkey" FOREIGN KEY ("career_path_id") REFERENCES "career_path_table"("career_path_id") ON DELETE RESTRICT ON UPDATE CASCADE;
