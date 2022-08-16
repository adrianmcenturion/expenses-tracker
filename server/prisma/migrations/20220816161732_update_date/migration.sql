/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `categoryName` on the `ExpenseCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category]` on the table `ExpenseCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `ExpenseCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ExpenseCategory_categoryName_key";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "createdAt",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ExpenseCategory" DROP COLUMN "categoryName",
ADD COLUMN     "category" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseCategory_category_key" ON "ExpenseCategory"("category");
