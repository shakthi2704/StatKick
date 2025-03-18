-- CreateTable
CREATE TABLE "LeagueSeason" (
    "id" SERIAL NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeagueSeason_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeagueSeason_leagueId_seasonId_key" ON "LeagueSeason"("leagueId", "seasonId");

-- AddForeignKey
ALTER TABLE "LeagueSeason" ADD CONSTRAINT "LeagueSeason_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeagueSeason" ADD CONSTRAINT "LeagueSeason_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
