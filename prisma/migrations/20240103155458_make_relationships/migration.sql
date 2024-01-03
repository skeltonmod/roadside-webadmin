-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requests` ADD CONSTRAINT `requests_mechanic_id_fkey` FOREIGN KEY (`mechanic_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
