/*
  Warnings:

  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "slug" TEXT NOT NULL;
