/*
  Warnings:

  - A unique constraint covering the columns `[singleton]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Institution" ADD COLUMN     "singleton" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Institution_singleton_key" ON "Institution"("singleton");
