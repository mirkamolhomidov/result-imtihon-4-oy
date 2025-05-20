/*
  Warnings:

  - A unique constraint covering the columns `[user_id,movie_id]` on the table `favourites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "favourites_movie_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "favourites_user_id_movie_id_key" ON "favourites"("user_id", "movie_id");
