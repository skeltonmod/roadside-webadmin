-- DropForeignKey
ALTER TABLE `email_verification_token` DROP FOREIGN KEY `email_verification_token_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `email_verification_token` ADD CONSTRAINT `email_verification_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
