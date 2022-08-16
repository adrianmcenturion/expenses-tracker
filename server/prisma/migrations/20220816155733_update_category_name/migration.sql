/*
  Warnings:

  - You are about to drop the column `name` on the `ExpenseCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryName]` on the table `ExpenseCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `ExpenseCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ExpenseCategory_name_key";

-- AlterTable
ALTER TABLE "ExpenseCategory" DROP COLUMN "name",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseCategory_categoryName_key" ON "ExpenseCategory"("categoryName");
