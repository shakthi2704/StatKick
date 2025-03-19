/*
  Warnings:

  - You are about to drop the column `country` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `football_associations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FootballAssociationCountry" DROP CONSTRAINT "FootballAssociationCountry_associationId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_venueId_fkey";

-- DropIndex
DROP INDEX "Team_teamId_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "country",
DROP COLUMN "teamId",
DROP COLUMN "venueId",
ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "externalId" INTEGER NOT NULL,
ADD COLUMN     "homeVenueId" INTEGER,
ALTER COLUMN "national" DROP NOT NULL;

-- DropTable
DROP TABLE "football_associations";

-- CreateTable
CREATE TABLE "FootballAssociation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FootballAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "age" INTEGER,
    "birthDate" TIMESTAMP(3),
    "birthPlace" TEXT,
    "birthCountry" TEXT,
    "nationality" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "position" TEXT,
    "photoUrl" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerTeam" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,

    CONSTRAINT "PlayerTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStatistic" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "gamesPlayed" INTEGER,
    "minutesPlayed" INTEGER,
    "goals" INTEGER,
    "assists" INTEGER,
    "yellowCards" INTEGER,
    "redCards" INTEGER,
    "cleanSheets" INTEGER,

    CONSTRAINT "PlayerStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerTransfer" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "fromTeamId" INTEGER,
    "toTeamId" INTEGER,
    "transferDate" TIMESTAMP(3),
    "transferFee" TEXT,

    CONSTRAINT "PlayerTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FootballAssociation_name_key" ON "FootballAssociation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FootballAssociation_code_key" ON "FootballAssociation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Player_externalId_key" ON "Player"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerTeam_playerId_teamId_season_key" ON "PlayerTeam"("playerId", "teamId", "season");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStatistic_playerId_teamId_leagueId_season_key" ON "PlayerStatistic"("playerId", "teamId", "leagueId", "season");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerTransfer_playerId_fromTeamId_toTeamId_transferDate_key" ON "PlayerTransfer"("playerId", "fromTeamId", "toTeamId", "transferDate");

-- CreateIndex
CREATE UNIQUE INDEX "Team_externalId_key" ON "Team"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "FootballAssociationCountry" ADD CONSTRAINT "FootballAssociationCountry_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "FootballAssociation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_homeVenueId_fkey" FOREIGN KEY ("homeVenueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStatistic" ADD CONSTRAINT "PlayerStatistic_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStatistic" ADD CONSTRAINT "PlayerStatistic_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStatistic" ADD CONSTRAINT "PlayerStatistic_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTransfer" ADD CONSTRAINT "PlayerTransfer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTransfer" ADD CONSTRAINT "PlayerTransfer_fromTeamId_fkey" FOREIGN KEY ("fromTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTransfer" ADD CONSTRAINT "PlayerTransfer_toTeamId_fkey" FOREIGN KEY ("toTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
