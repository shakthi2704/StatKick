-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "logo" TEXT,
    "countryId" INTEGER,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "League_leagueId_key" ON "League"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "league_country_unique" ON "League"("countryId");

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
