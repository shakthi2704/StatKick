-- DropIndex
DROP INDEX "Country_code_key";

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "code" DROP NOT NULL;
