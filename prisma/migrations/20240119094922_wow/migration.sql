-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `cars_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `reports` DROP FOREIGN KEY `reports_reportee_id_fkey`;

-- DropForeignKey
ALTER TABLE `reports` DROP FOREIGN KEY `reports_reporter_id_fkey`;

-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_car_id_fkey`;

-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_mechanic_id_fkey`;

-- DropForeignKey
ALTER TABLE `requests` DROP FOREIGN KEY `requests_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `shops` DROP FOREIGN KEY `shops_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_details` DROP FOREIGN KEY `user_details_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `user_details` ADD CONSTRAINT `user_details_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shops` ADD CONSTRAINT `shops_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_mechanic_id_fkey` FOREIGN KEY (`mechanic_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_reporter_id_fkey` FOREIGN KEY (`reporter_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_reportee_id_fkey` FOREIGN KEY (`reportee_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
