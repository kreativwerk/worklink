-- AlterTable
ALTER TABLE "CompanyInquiry" ADD COLUMN     "jobDescription" TEXT,
ALTER COLUMN "industry" DROP NOT NULL;
