/*
  Warnings:

  - You are about to drop the column `requestId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_requestId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `requestId`;
