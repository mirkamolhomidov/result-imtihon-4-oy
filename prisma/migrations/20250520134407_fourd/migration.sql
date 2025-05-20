-- AlterTable
ALTER TABLE "moviefiles" ADD COLUMN     "moviesId" UUID;

-- AddForeignKey
ALTER TABLE "moviefiles" ADD CONSTRAINT "moviefiles_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
