/*
  Warnings:

  - You are about to drop the column `category` on the `ExpenseCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ExpenseCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ExpenseCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ExpenseCategory_category_key";

-- AlterTable
ALTER TABLE "ExpenseCategory" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseCategory_name_key" ON "ExpenseCategory"("name");
