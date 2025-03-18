-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "country" TEXT NOT NULL,
    "founded" INTEGER,
    "national" BOOLEAN NOT NULL,
    "logo" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venueId" INTEGER,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" SERIAL NOT NULL,
    "venueId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "capacity" INTEGER,
    "surface" TEXT,
    "image" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamId_key" ON "Team"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_venueId_key" ON "Venue"("venueId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
