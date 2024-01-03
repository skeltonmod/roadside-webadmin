-- AlterTable
ALTER TABLE `users` ADD COLUMN `requestId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE
    `Request` (
        `id` VARCHAR(191) NOT NULL,
        `car_id` VARCHAR(191) NOT NULL,
        -- `location` JSON NULL,
        `mechanic_id` VARCHAR(191) NOT NULL,
        `user_id` VARCHAR(191) NOT NULL,
        `owner_rating` INTEGER NOT NULL,
        `mechanic_rating` INTEGER NOT NULL,

UNIQUE INDEX `Request_car_id_key`(`car_id`),
UNIQUE INDEX `Request_mechanic_id_key`(`mechanic_id`),
UNIQUE INDEX `Request_user_id_key`(`user_id`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users`
ADD
    CONSTRAINT `users_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE
SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request`
ADD
    CONSTRAINT `Request_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;