-- CreateTable
CREATE TABLE "Coach" (
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
    "photoUrl" TEXT,
    "teamId" INTEGER,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachCareer" (
    "id" SERIAL NOT NULL,
    "coachId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),

    CONSTRAINT "CoachCareer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_externalId_key" ON "Coach"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "CoachCareer_coachId_teamId_start_key" ON "CoachCareer"("coachId", "teamId", "start");

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachCareer" ADD CONSTRAINT "CoachCareer_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachCareer" ADD CONSTRAINT "CoachCareer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
