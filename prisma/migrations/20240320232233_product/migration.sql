/*
  Warnings:

  - You are about to drop the column `descripsion` on the `ProductCategory` table. All the data in the column will be lost.
  - Added the required column `description` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "descripsion",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductInventory" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductInventory_pkey" PRIMARY KEY ("id")
);
