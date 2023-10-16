-- CreateTable
CREATE TABLE "notice_table" (
    "notice_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notice_table_pkey" PRIMARY KEY ("notice_id")
);

-- CreateTable
CREATE TABLE "action_table" (
    "action_id" INTEGER NOT NULL,
    "action_name" TEXT NOT NULL,

    CONSTRAINT "action_table_pkey" PRIMARY KEY ("action_id")
);

-- CreateTable
CREATE TABLE "career_action_table" (
    "career_action" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "career_path_id" INTEGER NOT NULL,
    "action_id" INTEGER NOT NULL,
    "action_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "career_action_table_pkey" PRIMARY KEY ("career_action")
);

-- CreateTable
CREATE TABLE "career_path_table" (
    "career_path_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "furigana" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "career_path_table_pkey" PRIMARY KEY ("career_path_id")
);

-- CreateTable
CREATE TABLE "contact_table" (
    "contact_type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "contact_table_pkey" PRIMARY KEY ("contact_type")
);

-- CreateTable
CREATE TABLE "cource_table" (
    "cource_id" INTEGER NOT NULL,
    "course_name" TEXT NOT NULL,

    CONSTRAINT "cource_table_pkey" PRIMARY KEY ("cource_id")
);

-- CreateTable
CREATE TABLE "job_listing_table" (
    "job_listing_id" INTEGER NOT NULL,
    "application_format" TEXT NOT NULL,
    "submission_date" TIMESTAMP(3) NOT NULL,
    "visit_date" TIMESTAMP(3) NOT NULL,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "career_path_id" INTEGER NOT NULL,

    CONSTRAINT "job_listing_table_pkey" PRIMARY KEY ("job_listing_id")
);

-- CreateTable
CREATE TABLE "student_table" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "furigana" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "is_enrolled" BOOLEAN NOT NULL,
    "grade" INTEGER NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "face_photo" TEXT NOT NULL,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "cource_id" INTEGER NOT NULL,
    "teacher_id" TEXT NOT NULL,

    CONSTRAINT "student_table_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "teacher_table" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "furigana" TEXT NOT NULL,
    "subject" TEXT NOT NULL,

    CONSTRAINT "teacher_table_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_table" (
    "user_id" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("user_id")
);
