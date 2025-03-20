-- CreateTable
CREATE TABLE "PlayerSidelined" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerSidelined_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSidelined_playerId_type_startDate_key" ON "PlayerSidelined"("playerId", "type", "startDate");

-- AddForeignKey
ALTER TABLE "PlayerSidelined" ADD CONSTRAINT "PlayerSidelined_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
