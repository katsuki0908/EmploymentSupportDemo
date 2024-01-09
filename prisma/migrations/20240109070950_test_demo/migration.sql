-- CreateTable
CREATE TABLE "user_table" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "furigana" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "student_table" (
    "student_id" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "face_photo" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "course_id" INTEGER NOT NULL,
    "personal_address" TEXT,
    "personal_phone" TEXT,
    "personal_email" TEXT,
    "emergency_address" TEXT,
    "emergency_phone" TEXT,

    CONSTRAINT "student_table_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "admin_table" (
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "admin_table_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "instruction_table" (
    "instruction_id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "instruction_table_pkey" PRIMARY KEY ("instruction_id")
);

-- CreateTable
CREATE TABLE "course_table" (
    "course_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "course_table_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "career_action_table" (
    "career_action_id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "action_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "career_path_id" INTEGER NOT NULL,
    "action_id" INTEGER NOT NULL,

    CONSTRAINT "career_action_table_pkey" PRIMARY KEY ("career_action_id")
);

-- CreateTable
CREATE TABLE "action_table" (
    "action_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "action_table_pkey" PRIMARY KEY ("action_id")
);

-- CreateTable
CREATE TABLE "career_path_table" (
    "career_path_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "furigana" TEXT NOT NULL,
    "website" TEXT,

    CONSTRAINT "career_path_table_pkey" PRIMARY KEY ("career_path_id")
);

-- CreateTable
CREATE TABLE "obog_table" (
    "oboj_id" SERIAL NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "personal_number" INTEGER NOT NULL,
    "career_path_id" INTEGER NOT NULL,

    CONSTRAINT "obog_table_pkey" PRIMARY KEY ("oboj_id")
);

-- CreateTable
CREATE TABLE "job_listing_table" (
    "job_listing_id" SERIAL NOT NULL,
    "application_format" TEXT NOT NULL,
    "submission_date" TIMESTAMP(3),
    "visit_date" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "career_path_id" INTEGER NOT NULL,
    "notes" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_listing_table_pkey" PRIMARY KEY ("job_listing_id")
);

-- CreateTable
CREATE TABLE "notice_table" (
    "notice_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notice_table_pkey" PRIMARY KEY ("notice_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "action_table_name_key" ON "action_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "career_path_table_name_key" ON "career_path_table"("name");

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user_table"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_table" ADD CONSTRAINT "student_table_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course_table"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_table" ADD CONSTRAINT "admin_table_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "user_table"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instruction_table" ADD CONSTRAINT "instruction_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_table"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instruction_table" ADD CONSTRAINT "instruction_table_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin_table"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_action_table" ADD CONSTRAINT "career_action_table_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_table"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_action_table" ADD CONSTRAINT "career_action_table_career_path_id_fkey" FOREIGN KEY ("career_path_id") REFERENCES "career_path_table"("career_path_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_action_table" ADD CONSTRAINT "career_action_table_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "action_table"("action_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obog_table" ADD CONSTRAINT "obog_table_career_path_id_fkey" FOREIGN KEY ("career_path_id") REFERENCES "career_path_table"("career_path_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_listing_table" ADD CONSTRAINT "job_listing_table_career_path_id_fkey" FOREIGN KEY ("career_path_id") REFERENCES "career_path_table"("career_path_id") ON DELETE RESTRICT ON UPDATE CASCADE;
