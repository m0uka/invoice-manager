/*
  Warnings:

  - Added the required column `quantity` to the `InvoiceLine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceLine" ADD COLUMN     "quantity" INTEGER NOT NULL;
