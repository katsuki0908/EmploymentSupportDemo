/*
  Warnings:

  - You are about to drop the column `action_name` on the `action_table` table. All the data in the column will be lost.
  - The primary key for the `instruction_table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_enrolled` on the `student_table` table. All the data in the column will be lost.
  - Added the required column `name` to the `action_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `affiliation` to the `student_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "action_table" DROP COLUMN "action_name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contact_table" ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "instruction_table" DROP CONSTRAINT "instruction_table_pkey",
ADD COLUMN     "instruction_id" SERIAL NOT NULL,
ADD CONSTRAINT "instruction_table_pkey" PRIMARY KEY ("instruction_id");

-- AlterTable
ALTER TABLE "student_table" DROP COLUMN "is_enrolled",
ADD COLUMN     "affiliation" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ALTER COLUMN "face_photo" DROP NOT NULL;
