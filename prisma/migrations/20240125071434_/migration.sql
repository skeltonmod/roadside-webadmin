/*
  Warnings:

  - You are about to drop the column `details` on the `shops` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `shops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `shops` DROP COLUMN `details`,
    DROP COLUMN `phone`,
    ADD COLUMN `permit_image` LONGTEXT NULL,
    ADD COLUMN `specialities` JSON NULL;
