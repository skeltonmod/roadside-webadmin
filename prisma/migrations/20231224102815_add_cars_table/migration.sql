/*
  Warnings:

  - You are about to drop the `UserCar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `UserCar`;

-- CreateTable
CREATE TABLE `cars` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `fuel` VARCHAR(191) NOT NULL,
    `transmission` ENUM('Automatic', 'Manual') NOT NULL,

    UNIQUE INDEX `cars_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
