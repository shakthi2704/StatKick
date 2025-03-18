-- DropIndex
DROP INDEX "league_country_unique";

-- CreateTable
CREATE TABLE "FootballAssociationCountry" (
    "id" SERIAL NOT NULL,
    "associationId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FootballAssociationCountry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FootballAssociationCountry_associationId_countryId_key" ON "FootballAssociationCountry"("associationId", "countryId");

-- AddForeignKey
ALTER TABLE "FootballAssociationCountry" ADD CONSTRAINT "FootballAssociationCountry_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "football_associations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FootballAssociationCountry" ADD CONSTRAINT "FootballAssociationCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
