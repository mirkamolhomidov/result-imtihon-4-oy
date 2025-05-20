/*
  Warnings:

  - You are about to drop the column `moviesId` on the `moviefiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "moviefiles" DROP CONSTRAINT "moviefiles_moviesId_fkey";

-- DropIndex
DROP INDEX "moviefiles_movie_id_key";

-- AlterTable
ALTER TABLE "moviefiles" DROP COLUMN "moviesId";

-- AddForeignKey
ALTER TABLE "moviefiles" ADD CONSTRAINT "moviefiles_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
