-- CreateTable
CREATE TABLE "SceneRating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "live" BOOLEAN NOT NULL DEFAULT true,
    "vibe" INTEGER NOT NULL DEFAULT 5,
    "crowded" INTEGER NOT NULL DEFAULT 5,
    "sceneId" TEXT,
    "userId" TEXT,

    CONSTRAINT "SceneRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SceneRating_userId_sceneId_key" ON "SceneRating"("userId", "sceneId");

-- AddForeignKey
ALTER TABLE "SceneRating" ADD CONSTRAINT "SceneRating_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SceneRating" ADD CONSTRAINT "SceneRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
