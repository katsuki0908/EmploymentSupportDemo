-- CreateTable
CREATE TABLE `user_table` (
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `furigana` VARCHAR(191) NOT NULL,
    `user_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_table` (
    `student_id` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `is_enrolled` BOOLEAN NOT NULL,
    `grade` INTEGER NOT NULL,
    `graduation_year` INTEGER NOT NULL,
    `face_photo` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `cource_id` INTEGER NOT NULL,
    `contact1` INTEGER NULL,
    `contact2` INTEGER NULL,

    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_table` (
    `admin_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instruction_table` (
    `subject` VARCHAR(191) NOT NULL,
    `student_id` VARCHAR(191) NOT NULL,
    `admin_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`subject`, `student_id`, `admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cource_table` (
    `cource_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cource_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_table` (
    `contact_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contact_type` VARCHAR(191) NOT NULL,
    `phone_number` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `student_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`contact_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `career_action_table` (
    `career_action_id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `action_date` DATETIME(3) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `career_path_id` INTEGER NOT NULL,
    `action_id` INTEGER NOT NULL,

    PRIMARY KEY (`career_action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `action_table` (
    `action_id` INTEGER NOT NULL AUTO_INCREMENT,
    `action_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `career_path_table` (
    `career_path_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `furigana` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`career_path_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_listing_table` (
    `job_listing_id` INTEGER NOT NULL AUTO_INCREMENT,
    `application_format` VARCHAR(191) NOT NULL,
    `submission_date` DATETIME(3) NOT NULL,
    `visit_date` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `career_path_id` INTEGER NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`job_listing_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice_table` (
    `notice_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`notice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student_table` ADD CONSTRAINT `student_table_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `user_table`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_table` ADD CONSTRAINT `student_table_cource_id_fkey` FOREIGN KEY (`cource_id`) REFERENCES `cource_table`(`cource_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_table` ADD CONSTRAINT `student_table_contact1_fkey` FOREIGN KEY (`contact1`) REFERENCES `contact_table`(`contact_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_table` ADD CONSTRAINT `student_table_contact2_fkey` FOREIGN KEY (`contact2`) REFERENCES `contact_table`(`contact_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin_table` ADD CONSTRAINT `admin_table_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `user_table`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instruction_table` ADD CONSTRAINT `instruction_table_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `student_table`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instruction_table` ADD CONSTRAINT `instruction_table_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin_table`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_table` ADD CONSTRAINT `contact_table_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `student_table`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `career_action_table` ADD CONSTRAINT `career_action_table_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `student_table`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `career_action_table` ADD CONSTRAINT `career_action_table_career_action_id_fkey` FOREIGN KEY (`career_action_id`) REFERENCES `career_path_table`(`career_path_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `career_action_table` ADD CONSTRAINT `career_action_table_action_id_fkey` FOREIGN KEY (`action_id`) REFERENCES `action_table`(`action_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_listing_table` ADD CONSTRAINT `job_listing_table_career_path_id_fkey` FOREIGN KEY (`career_path_id`) REFERENCES `career_path_table`(`career_path_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
