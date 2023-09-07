-- DropForeignKey
ALTER TABLE "SceneRating" DROP CONSTRAINT "SceneRating_userId_fkey";

-- AddForeignKey
ALTER TABLE "SceneRating" ADD CONSTRAINT "SceneRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("authId") ON DELETE SET NULL ON UPDATE CASCADE;
