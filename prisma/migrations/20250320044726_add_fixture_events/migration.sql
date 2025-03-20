-- CreateTable
CREATE TABLE "fixture_events" (
    "id" SERIAL NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "elapsed" INTEGER NOT NULL,
    "extra" INTEGER,
    "teamId" INTEGER NOT NULL,
    "teamName" TEXT NOT NULL,
    "playerId" INTEGER,
    "playerName" TEXT,
    "assistId" INTEGER,
    "assistName" TEXT,
    "type" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "fixture_events_pkey" PRIMARY KEY ("id")
);
