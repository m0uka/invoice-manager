/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_number_key" ON "Customer"("number");
