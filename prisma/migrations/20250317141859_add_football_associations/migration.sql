-- CreateTable
CREATE TABLE "football_associations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "football_associations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "football_associations_name_key" ON "football_associations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "football_associations_code_key" ON "football_associations"("code");
