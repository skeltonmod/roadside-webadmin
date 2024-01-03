/*
 Warnings:
 - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
 */
-- DropForeignKey
ALTER TABLE `Request` DROP FOREIGN KEY `Request_car_id_fkey`;

-- DropTable
DROP TABLE `Request`;

-- CreateTable
CREATE TABLE
    `requests` (
        `id` VARCHAR(191) NOT NULL,
        `car_id` VARCHAR(191) NOT NULL,
        `mechanic_id` VARCHAR(191) NOT NULL,
        `user_id` VARCHAR(191) NOT NULL,
        `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
        `owner_rating` INTEGER NULL,
        `mechanic_rating` INTEGER NULL,

UNIQUE INDEX `requests_car_id_key`(`car_id`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `requests`
ADD
    CONSTRAINT `requests_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;